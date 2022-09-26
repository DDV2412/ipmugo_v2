import { Client } from "@elastic/elasticsearch";

require("dotenv").config();

class Elastic {
  client: Client;
  constructor() {
    this.client = new Client({
      node: "http://localhost:9200",
      auth: {
        username: process.env.ELASTIC_USER || "",
        password: process.env.ELASTIC_PASS || "",
      },
    });
  }
}

export default new Elastic();
