import db from "../models";
import Article from "../models/article";
import Author from "../models/author";
import Interest from "../models/interest";
import Journal from "../models/journal";
import fs from "fs";
import path from "path";

import { requestPagination } from "../helper/requestPagination";

class ArticleRepo {
  Article: typeof Article;
  Author: typeof Author;
  Interest: typeof Interest;
  Journal: typeof Journal;
  constructor() {
    this.Article = Article;
    this.Author = Author;
    this.Interest = Interest;
    this.Journal = Journal;
  }

  allArticles = async (filters: {}) => {
    try {
      const { limit, sort, page, sortBy } = requestPagination(filters);

      let articles = await db.transaction(async (transaction) => {
        return await this.Article.findAndCountAll({
          offset: (page - 1) * limit,
          limit,
          include: [this.Journal],
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
          include: [this.Journal],
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
      let article = await db.transaction(async () => {
        return await this.Article.create(articleData);
      });

      Object.assign(articleData.authors, { article_id: article["id"] });

      console.log(articleData.authors);

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

      return update;
    } catch (error: any) {
      return error["message"];
    }
  };

  deleteArticle = async (article: any) => {
    try {
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

      return await db.transaction(async () => {
        return await article.destroy();
      });
    } catch (error: any) {
      return error["message"];
    }
  };
}

export default ArticleRepo;
