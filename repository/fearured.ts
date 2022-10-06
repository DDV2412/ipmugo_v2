import elastic from "../models/elastic";
import { Client } from "@elastic/elasticsearch";
import { Elastic } from "../types/elastic";
import ElasticType = Elastic.SearchBody;
import loggerWinston from "../helper/logger-winston";

class FeatruredRepo {
  client: Client;
  constructor() {
    this.client = elastic.client;
  }

  bulk = async (dataSet: Array<Record<string, string>>, options: any) => {
    const isExists = await this.client.indices.exists({
      index: options["indexName"],
    });

    if (!isExists) {
      await this.client.indices.create(
        {
          index: options["indexName"],
          body: {
            mappings: {
              properties: options["properties"],
            },
          },
        },
        { ignore: [400] }
      );
    } else {
      await this.client.indices.delete({
        index: options["indexName"],
      });

      await this.client.indices.create(
        {
          index: options["indexName"],
          body: {
            mappings: {
              properties: options["properties"],
            },
          },
        },
        { ignore: [400] }
      );
    }

    const operations = await dataSet.flatMap((doc) => [
      {
        index: {
          _index: options["indexName"],
          _id: doc["id"],
        },
      },
      doc,
    ]);

    const bulkRes = await this.client.bulk({
      refresh: true,
      operations: operations,
    });

    if (bulkRes.errors) {
      const errorDoc: any = [];

      bulkRes.items.forEach((action, i) => {
        const operation = Object.keys(action)[0];
        if (action[operation].error) {
          errorDoc.push({
            status: action[operation].status,
            error: action[operation].error,
          });
        }
      });

      loggerWinston.error(errorDoc);
    }
  };

  search = async (search: {}) => {
    return await this.client.search<ElasticType>({
      index: search["indexName"],
      body: search["body"],
    });
  };
}

export default FeatruredRepo;
