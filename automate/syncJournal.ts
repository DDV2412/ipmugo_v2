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
        editorials: journal["editorials"],
        scopus_metric: journal["scopus_metric"],
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
        editorials: { type: "nested" },
        scopus_metric: {
          type: "object",
          properties: {
            id: { type: "keyword" },
            journal_id: { type: "keyword" },
            sjr: { type: "fload" },
            snip: { type: "fload" },
            citeScore: { type: "fload" },
            year: { type: "number" },
            trackScore: { type: "fload" },
            trackYear: { type: "number" },
          },
        },
      },
    });
  };
}

new Sync().bulk();
