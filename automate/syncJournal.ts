import ElasticRepo from "../repository/elastic";
import JournalRepo from "../repository/journal";

class Sync {
  JournalRepo: any;
  Elastic: any;
  constructor() {
    this.JournalRepo = new JournalRepo();
    this.Elastic = new ElasticRepo();
  }

  bulk = async () => {
    const journals = await this.JournalRepo.allJournals({});

    const dataset: Array<{}> = [];

    journals.rows.map((journal: {}) => {
      dataset.push({
        id: journal["id"],
        name: journal["name"],
        abbreviation: journal["abbreviation"],
        publisher: journal["publisher"],
        thumbnail: journal["thumbnail"],
        cover: journal["cover"],
        issn: journal["issn"],
        e_issn: journal["e_issn"],
        description: journal["description"],
        base_url: journal["base_url"],
        createdAt: journal["createdAt"],
        updatedAt: journal["updatedAt"],
        interests: journal["interests"],
      });
    });

    await this.Elastic.bulk(dataset, {
      indexName: "journals",
      properties: {
        id: { type: "keyword" },
        name: { type: "text" },
        abbreviation: { type: "keyword" },
        publisher: { type: "text" },
        thumbnail: { type: "text" },
        cover: { type: "text" },
        issn: { type: "keyword" },
        e_issn: { type: "keyword" },
        description: { type: "text" },
        base_url: { type: "keyword" },
        createdAt: { type: "date" },
        updatedAt: { type: "date" },
        interests: { type: "nested" },
      },
    });
  };
}

new Sync().bulk();
