import elastic from "../models/elastic";
import { Client } from "@elastic/elasticsearch";
import loggerWinston from "../helper/logger-winston";
import { Elastic } from "../types/elastic";
import ElasticType = Elastic.SearchBody;

class ElasticRepo {
  client: Client;
  constructor() {
    this.client = elastic.client;
  }
  bulk = async (dataset: [{}], options: any) => {
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

    const operations = await dataset.flatMap((doc) => [
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

  search = async (indexName: string, query: {}) => {
    return await this.client.search<ElasticType>({
      index: indexName,
      body: query,
    });
  };
}

export default ElasticRepo;
