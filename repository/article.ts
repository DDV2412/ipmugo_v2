import db from "../models";
import Article from "../models/article";
import Author from "../models/author";
import Interest from "../models/interest";
import Journal from "../models/journal";
import fs from "fs";
import path from "path";
import { IncludeOptions, Op } from "sequelize";
import ArticleInterest from "../models/article_interest";

import { requestPagination } from "../helper/requestPagination";

class ArticleRepo {
  Article: typeof Article;
  Author: typeof Author;
  Interest: typeof Interest;
  Journal: typeof Journal;
  ArticleInterest: typeof ArticleInterest;
  constructor() {
    this.Article = Article;
    this.Author = Author;
    this.Interest = Interest;
    this.Journal = Journal;
    this.ArticleInterest = ArticleInterest;
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
    } catch (err: any) {
      return null;
    }
  };

  createArticle = async (articleData: any) => {
    try {
      let article = await db.transaction(async (transaction) => {
        return await this.Article.create(articleData);
      });

      await articleData["authors"].map(async (author: any) => {
        Object.assign(author, { article_id: article["id"] });

        await this.Author.create(author);
      });

      await articleData["interests"].map(async (interest: any) => {
        const check = await this.Interest.findOne({
          where: {
            name: interest["name"],
          },
        });

        if (check) {
          await this.ArticleInterest.create({
            article_id: article["id"],
            interest_id: check["id"],
          });
        }
      });

      return article;
    } catch (error: any) {
      return error["message"];
    }
  };

  updateArticle = async (article: any, articleData: any) => {
    try {
      let update = await db.transaction(async (transaction) => {
        return await article.update(articleData, transaction);
      });

      if (
        articleData["interests"] != undefined &&
        articleData["interests"] != null
      ) {
        await articleData["interests"].map(async (interest: any) => {
          const check = await this.Interest.findOne({
            where: {
              name: interest["name"],
            },
          });

          if (check) {
            const isExists = await this.ArticleInterest.findOne({
              where: {
                article_id: article["id"],
                interest_id: check["id"],
              },
            });

            if (!isExists) {
              await this.ArticleInterest.create({
                article_id: article["id"],
                interest_id: check["id"],
              });
            }
          }
        });
      }

      if (
        articleData["authors"] != undefined &&
        articleData["authors"] != null
      ) {
        await articleData["authors"].map(async (author: any) => {
          Object.assign(author, { article_id: article["id"] });

          const authorCheck = await this.Author.findOne({
            where: {
              article_id: update["id"],
              email: author["email"],
            },
          });

          if (!authorCheck) {
            await this.Author.create(author);
          } else {
            await authorCheck.update(author);
          }
        });
      }

      return update;
    } catch (error: any) {
      return error["message"];
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
    } catch (error: any) {
      return error["message"];
    }
  };
}

export default ArticleRepo;
