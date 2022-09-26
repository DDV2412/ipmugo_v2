import ElasticRepo from "../repository/elastic";
import ArticleRepo from "../repository/article";

class Sync {
  Article: any;
  Elastic: any;
  constructor() {
    this.Article = new ArticleRepo();
    this.Elastic = new ElasticRepo();
  }

  bulk = async () => {
    const articles = await this.Article.allArticles();

    const dataset: Array<{}> = [];

    articles.rows.map((article: {}) => {
      dataset.push({
        id: article["id"],
        journal_id: article["journal_id"],
        identifier: article["identifier"],
        publishDate: article["publishDate"],
        topic: article["topic"],
        title: article["title"],
        abstract: article["abstract"],
        format: article["format"],
        year: article["year"],
        resources: article["resources"],
        pages: article["pages"],
        doi: article["doi"],
        language: article["language"],
        file: article["file"],
        articleParsing: article["articleParsing"],
        keywords: article["keywords"],
        dateModify: article["dateModify"],
        createdAt: article["createdAt"],
        updatedAt: article["updatedAt"],
        journal: article["journal"],
        authors: article["authors"],
        interests: article["interests"],
      });
    });

    await this.Elastic.bulk(dataset, {
      indexName: "articles",
      properties: {
        id: { type: "keyword" },
        journal_id: { type: "keyword" },
        identifier: { type: "keyword" },
        publishDate: { type: "date" },
        topic: { type: "text" },
        title: { type: "text" },
        abstract: { type: "text" },
        format: { type: "keyword" },
        year: { type: "keyword" },
        resources: { type: "text" },
        pages: { type: "text" },
        doi: { type: "text" },
        language: { type: "text" },
        file: { type: "text" },
        articleParsing: { type: "text" },
        keywords: { type: "text" },
        dateModify: { type: "date" },
        createdAt: { type: "date" },
        updatedAt: { type: "date" },
        journal: {
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
          },
        },
        authors: { type: "nested" },
        interests: { type: "nested" },
      },
    });
  };
}

new Sync().bulk();
