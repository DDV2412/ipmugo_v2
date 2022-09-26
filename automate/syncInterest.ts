import ElasticRepo from "../repository/elastic";
import InterestRepo from "../repository/interest";

class Sync {
  Interest: any;
  Elastic: any;
  constructor() {
    this.Interest = new InterestRepo();
    this.Elastic = new ElasticRepo();
  }

  bulk = async () => {
    const interest = await this.Interest.allInterests({});

    const dataset: Array<{}> = [];

    interest.rows.map((interest: {}) => {
      dataset.push({
        id: interest["id"],
        name: interest["name"],
      });
    });

    await this.Elastic.bulk(dataset, {
      indexName: "interests",
      properties: {
        id: { type: "keyword" },
        name: { type: "text" },
      },
    });
  };
}

new Sync().bulk();
