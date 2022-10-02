import elastic from "../models/elastic";
import { Client } from "@elastic/elasticsearch";
import { Elastic } from "../types/elastic";
import ElasticType = Elastic.SearchBody;

class FeatruredRepo {
  client: Client;
  constructor() {
    this.client = elastic.client;
  }

  search = async (search: {}) => {
    return await this.client.search<ElasticType>({
      index: search["indexName"],
      body: search["body"],
    });
  };
}

export default FeatruredRepo;
