import ArticleRepo from "../repository/article";
import InterestRepo from "../repository/interest";
import Elastic from "../repository/fearured";
require("events").EventEmitter.defaultMaxListeners = 0;

class Synchronize {
  Article: any;
  Interest: any;
  Elastic: any;

  constructor() {
    this.Article = new ArticleRepo();
    this.Interest = new InterestRepo();
    this.Elastic = new Elastic();
  }

  bulkArticles = async () => {
    const article = await this.Article.GetArticles();

    const dataSet: Array<Record<string, string>> = [];

    article.articles.map((article: {}) => {
      dataSet.push({
        id: article["id"],
        journal_id: article["journal_id"],
        identifier: article["identifier"],
        publish_date: article["publish_date"],
        topic: article["topic"],
        title: article["title"],
        abstract: article["abstract"],
        format: article["format"],
        publish_year: article["publish_year"],
        resources: article["resources"],
        pages: article["pages"],
        doi: article["doi"],
        publish_language: article["publish_language"],
        file: article["file"],
        article_parsing: article["article_parsing"],
        keywords: article["keywords"],
        date_modify: article["date_modify"],
        created_at: article["createdAt"],
        updated_at: article["updatedAt"],
        journal: article["journal"],
        authors: article["authors"],
        interests: article["interests"],
        assign_author: article["assign_author"],
        citations: article["citations"],
      });
    });

    await this.Elastic.bulk(dataSet, {
      indexName: "articles",
      properties: {
        id: { type: "keyword" },
        journal_id: { type: "keyword" },
        identifier: { type: "keyword" },
        publish_date: { type: "date" },
        topic: { type: "keyword" },
        title: { type: "keyword" },
        abstract: { type: "text" },
        format: { type: "text" },
        publish_year: { type: "keyword" },
        resources: { type: "keyword" },
        pages: { type: "text" },
        doi: { type: "keyword" },
        publish_language: { type: "keyword" },
        file: { type: "keyword" },
        article_parsing: { type: "keyword" },
        keywords: { type: "text" },
        date_modify: { type: "date" },
        created_at: { type: "date" },
        updated_at: { type: "date" },
        journal: {
          type: "object",
          properties: {
            id: { type: "keyword" },
            name: { type: "keyword" },
            abbreviation: { type: "keyword" },
            publisher: { type: "text" },
            thumbnail: { type: "keyword" },
            cover: { type: "keyword" },
            issn: { type: "keyword" },
            e_issn: { type: "keyword" },
            description: { type: "text" },
            base_url: { type: "keyword" },
            createdAt: { type: "date" },
            updatedAt: { type: "date" },
            scopus_metric: {
              type: "object",
              properties: {
                id: { type: "keyword" },
                journal_id: { type: "keyword" },
                sjr: { type: "keyword" },
                snip: { type: "keyword" },
                citeScore: { type: "keyword" },
                year: { type: "keyword" },
                trackScore: { type: "keyword" },
                trackYear: { type: "keyword" },
              },
            },
          },
        },
        authors: { type: "nested" },
        interests: { type: "nested" },
        assign_author: {
          type: "nested",
          properties: {
            scholar_profile: {
              type: "object",
              properties: {
                count: { type: "integer" },
              },
            },
          },
        },
        citations: {
          type: "nested",
          properties: {
            count: { type: "integer" },
          },
        },
      },
    });
  };
}

new Synchronize().bulkArticles();
