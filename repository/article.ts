import db from "../models";
import Article from "../models/article";
import Author from "../models/author";
import Interest from "../models/interest";
import Journal from "../models/journal";
import ElasticRepo from "./elastic";
import fs from "fs";
import path from "path";
import { IncludeOptions, Op } from "sequelize";
import ArticleInterest from "../models/article_interest";
import loggerWinston from "../helper/logger-winston";

import { requestPagination } from "../helper/requestPagination";

class ArticleRepo {
  Article: typeof Article;
  Author: typeof Author;
  Interest: typeof Interest;
  Journal: typeof Journal;
  ArticleInterest: typeof ArticleInterest;
  Elastic: any;
  constructor() {
    this.Article = Article;
    this.Author = Author;
    this.Interest = Interest;
    this.Journal = Journal;
    this.ArticleInterest = ArticleInterest;
    this.Elastic = new ElasticRepo();
  }

  allArticles = async (filters: {}) => {
    try {
      const { limit, sort, page, sortBy } = requestPagination(filters);

      let where = filters["search"]
        ? {
            [Op.or]: {
              title: { [Op.like]: `%${filters["search"]}%` },
              abstract: { [Op.like]: `%${filters["search"]}%` },
              topic: { [Op.like]: `%${filters["search"]}%` },
            },
          }
        : {};

      let articles = await db.transaction(async (transaction) => {
        return await this.Article.findAndCountAll({
          where: where,
          offset: (page - 1) * limit,
          limit,
          include: [
            {
              model: this.Journal,
              as: "journal",
              transaction,
            } as IncludeOptions,
            {
              model: this.Author,
              as: "authors",
              transaction,
            } as IncludeOptions,
            {
              model: this.Interest,
              as: "interests",
              transaction,
            } as IncludeOptions,
          ],
          order: [[sortBy, sort]],
          distinct: true,
          transaction,
        });
      });

      return articles;
    } catch (error) {
      loggerWinston.error(error);
      return null;
    }
  };

  getAllforElastic = async () => {
    try {
      let articles = await db.transaction(async (transaction) => {
        return await this.Article.findAndCountAll({
          include: [
            {
              model: this.Journal,
              as: "journal",
              transaction,
            } as IncludeOptions,
            {
              model: this.Author,
              as: "authors",
              transaction,
            } as IncludeOptions,
            {
              model: this.Interest,
              as: "interests",
              transaction,
            } as IncludeOptions,
          ],
          distinct: true,
          transaction,
        });
      });

      return articles;
    } catch (error) {
      loggerWinston.error(error);
      return null;
    }
  };

  searchByElastic = async (filters: {}) => {
    try {
      const _search = filters["search"]
        ? {
            from: filters["from"] ? filters["from"] - 1 : 0,
            size: filters["size"],
            query: {
              bool: {
                should: [
                  {
                    term: { title: filters["search"] },
                  },
                  {
                    term: { topic: filters["search"] },
                  },
                  {
                    term: { abstract: filters["search"] },
                  },
                  {
                    term: { doi: filters["search"] },
                  },
                ],
              },
            },
          }
        : {
            size: filters["size"] ? filters["size"] : 25,
            query: {
              match_all: {},
            },
          };

      let articles = await this.Elastic.search("articles", _search);

      return articles;
    } catch (error) {
      loggerWinston.error(error);
      return null;
    }
  };

  advancedByElastic = async (bodyQuery: {}) => {
    try {
      let articles = await this.Elastic.search("articles", bodyQuery);

      return articles;
    } catch (error) {
      loggerWinston.error(error);
      return null;
    }
  };

  articleById = async (id: string) => {
    try {
      let journal = await db.transaction(async (transaction) => {
        return await this.Article.findOne({
          where: {
            id: id,
          },
          include: [
            {
              model: this.Journal,
              as: "journal",
              transaction,
            } as IncludeOptions,
            {
              model: this.Author,
              as: "authors",
              transaction,
            } as IncludeOptions,
            {
              model: this.Interest,
              as: "interests",
              transaction,
            } as IncludeOptions,
          ],
          transaction,
        });
      });

      return journal;
    } catch (error) {
      loggerWinston.error(error);
      return null;
    }
  };

  articleByDOI = async (doi: string) => {
    try {
      let journal = await db.transaction(async (transaction) => {
        return await this.Article.findOne({
          where: {
            doi: doi,
          },
          include: [
            {
              model: this.Journal,
              as: "journal",
              transaction,
            } as IncludeOptions,
            {
              model: this.Author,
              as: "authors",
              transaction,
            } as IncludeOptions,
            {
              model: this.Interest,
              as: "interests",
              transaction,
            } as IncludeOptions,
          ],
          transaction,
        });
      });

      return journal;
    } catch (error) {
      loggerWinston.error(error);
      return null;
    }
  };

  createArticle = async (articleData: any) => {
    try {
      let article = await db.transaction(async (transaction) => {
        return await this.Article.create(articleData);
      });

      await articleData["authors"].map(async (author: any) => {
        await this.Author.create({
          article_id: article["id"],
          firstname: author["firstname"],
          lastname: author["lastname"],
          email: author["email"] ? author["email"] : null,
          affiliation: author["affiliation"] ? author["affiliation"] : null,
          orcid: author["orcid"] ? author["orcid"] : null,
        });
      });

      if (
        typeof articleData["interests"] != "undefined" &&
        articleData["interests"] != null &&
        articleData["interests"].length != 0
      ) {
        await articleData["interests"].map(async (interest: any) => {
          const check = await this.Elastic.search("interests", {
            from: 0,
            size: 1,
            query: {
              match: {
                name: interest["name"],
              },
            },
          });

          if (check["hits"]["total"]["value"] != 0) {
            await this.ArticleInterest.create({
              article_id: article["id"],
              interest_id: check["hits"]["hits"][0]["_id"],
            });
          }
        });
      }

      return article;
    } catch (error) {
      loggerWinston.error(error);
      return null;
    }
  };

  updateArticle = async (article: any, articleData: any) => {
    try {
      let update = await db.transaction(async (transaction) => {
        return await article.update(articleData, transaction);
      });

      if (
        typeof articleData["interests"] != "undefined" &&
        articleData["interests"] != null &&
        articleData["interests"].length != 0
      ) {
        await articleData["interests"].map(async (interest: any) => {
          const check = await this.Elastic.search("interests", {
            from: 0,
            size: 1,
            query: {
              match: {
                name: interest["name"],
              },
            },
          });

          if (check["hits"]["total"]["value"] != 0) {
            const isExists = await this.ArticleInterest.findOne({
              where: {
                article_id: article["id"],
                interest_id: check["hits"]["hits"][0]["_id"],
              },
            });

            if (!isExists) {
              await this.ArticleInterest.create({
                article_id: article["id"],
                interest_id: check["hits"]["hits"][0]["_id"],
              });
            }
          }
        });
      }

      if (
        typeof articleData["authors"] != "undefined" &&
        articleData["authors"] != null &&
        articleData["authors"].length != 0
      ) {
        await articleData["authors"].map(async (author: any) => {
          const authorCheck = await this.Author.findOne({
            where: {
              article_id: update["id"],
              firstname: author["firstname"],
            },
          });

          if (!authorCheck) {
            await this.Author.create({
              article_id: article["id"],
              firstname: author["firstname"],
              lastname: author["lastname"],
              email: author["email"] ? author["email"] : null,
              affiliation: author["affiliation"] ? author["affiliation"] : null,
              orcid: author["orcid"] ? author["orcid"] : null,
            });
          } else {
            await authorCheck.update(author);
          }
        });
      }

      return update;
    } catch (error) {
      loggerWinston.error(error);
      return null;
    }
  };

  deleteArticle = async (article: any) => {
    try {
      if (
        article["file"] != null &&
        article["file"].replace(
          `http://127.0.0.1:5000`,
          path.join(__dirname + "/../static")
        ) != undefined
      ) {
        fs.unlink(
          article["file"].replace(
            `http://127.0.0.1:5000`,
            path.join(__dirname + "/../static")
          ),
          (err) => {
            if (err) {
              return;
            }
          }
        );
      }

      let results = await db.transaction(async () => {
        return await article.destroy();
      });

      return results;
    } catch (error) {
      loggerWinston.error(error);
      return null;
    }
  };
}

export default ArticleRepo;
