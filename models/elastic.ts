import { Client } from "@elastic/elasticsearch";

class Elastic {
  client: Client;
  constructor() {
    this.client = new Client({
      node: "http://localhost:9200",
      auth: {
        username: String(process.env.ELASTIC_USER),
        password: String(process.env.ELASTIC_PASS),
      },
    });
  }
}

export default new Elastic();
