import db from "../models";
import Article from "../models/article";
import Author from "../models/author";
import Interest from "../models/interest";
import Journal from "../models/journal";
import { IncludeOptions, Op } from "sequelize";
import ArticleInterest from "../models/article_interest";
import loggerWinston from "../helper/logger-winston";
import User from "../models/user";
import Citation from "../models/citation";
import ScopusMetric from "../models/scopus_metric";
import RequestPagination from "../helper/requestPagination";
import ScholarProfile from "../models/scholar_profile";
import ScholarStatistic from "../models/scholar_statistic";

class ArticleRepo {
  Article: typeof Article;
  Author: typeof Author;
  Interest: typeof Interest;
  Journal: typeof Journal;
  ArticleInterest: typeof ArticleInterest;
  Citation: typeof Citation;
  ScopusMetric: typeof ScopusMetric;
  User: typeof User;
  ScholarProfile: typeof ScholarProfile;
  ScholarStatistic: typeof ScholarStatistic;
  constructor() {
    this.Article = Article;
    this.Author = Author;
    this.Interest = Interest;
    this.Journal = Journal;
    this.ArticleInterest = ArticleInterest;
    this.User = User;
    this.Citation = Citation;
    this.ScopusMetric = ScopusMetric;
    this.ScholarProfile = ScholarProfile;
    this.ScholarStatistic = ScholarStatistic;
  }

  allArticles = async (page: number, size: number, filters: string) => {
    try {
      const { limit, offset } = new RequestPagination(page, size);

      let where =
        typeof filters != "undefined"
          ? {
              [Op.or]: {
                title: { [Op.like]: `%${filters}%` },
                abstract: { [Op.like]: `%${filters}%` },
                doi: { [Op.like]: `%${filters}%` },
              },
            }
          : {};

      let articles = await db.transaction(async (transaction) => {
        return await this.Article.findAndCountAll({
          where: where,
          include: [
            {
              model: this.Journal,
              include: [this.ScopusMetric],
              transaction,
            } as IncludeOptions,
            {
              model: this.Author,
              transaction,
            } as IncludeOptions,
            {
              model: this.Interest,
              transaction,
            } as IncludeOptions,
            {
              model: this.User,
              as: "assign_author",
              include: [
                {
                  model: this.ScholarProfile,
                  include: [{ model: this.ScholarStatistic }],
                  transaction,
                } as IncludeOptions,
              ],
              transaction,
            } as IncludeOptions,
            {
              model: this.Citation,
              transaction,
            } as IncludeOptions,
          ],
          limit: limit,
          offset: offset,
          distinct: true,
          transaction,
        });
      });

      return {
        total: articles.count,
        currentPage: page ? +page : 0,
        countPage: Math.ceil(articles.count / limit),
        articles: articles.rows,
      };
    } catch (error) {
      loggerWinston.error(error);
      return null;
    }
  };

  GetArticles = async () => {
    try {
      let articles = await db.transaction(async (transaction) => {
        return await this.Article.findAndCountAll({
          include: [
            {
              model: this.Journal,
              include: [this.ScopusMetric],
              transaction,
            } as IncludeOptions,
            {
              model: this.Author,
              transaction,
            } as IncludeOptions,
            {
              model: this.Interest,
              transaction,
            } as IncludeOptions,
            {
              model: this.User,
              as: "assign_author",
              include: [
                {
                  model: this.ScholarProfile,
                  include: [{ model: this.ScholarStatistic }],
                  transaction,
                } as IncludeOptions,
              ],
              transaction,
            } as IncludeOptions,
            {
              model: this.Citation,
              transaction,
            } as IncludeOptions,
          ],
          distinct: true,
          transaction,
        });
      });

      return {
        total: articles.count,
        articles: articles.rows,
      };
    } catch (error) {
      loggerWinston.error(error);
      return null;
    }
  };

  articleById = async (id: string) => {
    try {
      return await db.transaction(async (transaction) => {
        return await this.Article.findOne({
          where: {
            id: id,
          },
          include: [
            {
              model: this.Journal,
              include: [this.ScopusMetric],
              transaction,
            } as IncludeOptions,
            {
              model: this.Author,
              transaction,
            } as IncludeOptions,
            {
              model: this.Interest,
              transaction,
            } as IncludeOptions,
            {
              model: this.User,
              as: "assign_author",
              include: [
                {
                  model: this.ScholarProfile,
                  include: [{ model: this.ScholarStatistic }],
                  transaction,
                } as IncludeOptions,
              ],
              transaction,
            } as IncludeOptions,
            {
              model: this.Citation,
              transaction,
            } as IncludeOptions,
          ],
          transaction,
        });
      });
    } catch (error) {
      loggerWinston.error(error);
      return null;
    }
  };

  articleByDOI = async (doi: string) => {
    try {
      return await db.transaction(async (transaction) => {
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
    } catch (error) {
      loggerWinston.error(error);
      return null;
    }
  };

  createArticle = async (articleData: any) => {
    try {
      return await db.transaction(async (transaction) => {
        const article = await this.Article.create(articleData);

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
            const check = await this.Interest.findOne({
              where: {
                name: interest["name"],
              },
            });

            if (check != null) {
              await this.ArticleInterest.create({
                article_id: article["id"],
                interest_id: check["id"],
              });
            }
          });
        }

        return article;
      });
    } catch (error) {
      loggerWinston.error(error);
      return null;
    }
  };

  updateArticle = async (
    article_id: string,
    articleData: Record<string, any>
  ) => {
    try {
      return await db.transaction(async (transaction) => {
        const update = await this.Article.update(articleData, {
          where: {
            id: article_id,
          },
          transaction,
        });

        if (
          typeof articleData["interests"] != "undefined" &&
          articleData["interests"] != null &&
          articleData["interests"].length != 0
        ) {
          await articleData["interests"].map(async (interest: any) => {
            const check = await this.Interest.findOne({
              where: {
                name: interest["name"],
              },
            });

            if (check != null) {
              const isExists = await this.ArticleInterest.findOne({
                where: {
                  article_id: article_id,
                  interest_id: check["id"],
                },
              });

              if (!isExists) {
                await this.ArticleInterest.create({
                  article_id: article_id,
                  interest_id: check["id"],
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
                article_id: article_id,
                firstname: author["firstname"],
                lastname: author["lastname"],
              },
            });

            if (!authorCheck) {
              await this.Author.create({
                article_id: article_id,
                firstname: author["firstname"],
                lastname: author["lastname"],
                email: author["email"] ? author["email"] : null,
                affiliation: author["affiliation"],
                orcid: author["orcid"] ? author["orcid"] : null,
              });
            }
          });
        }

        return update;
      });
    } catch (error) {
      loggerWinston.error(error);
      return null;
    }
  };

  deleteArticle = async (article_id: string) => {
    try {
      return await db.transaction(async (transaction) => {
        return await this.Article.destroy({
          where: {
            id: article_id,
          },
          transaction,
        });
      });
    } catch (error) {
      loggerWinston.error(error);
      return null;
    }
  };

  citations = async (article_id: string, citationData: Record<string, any>) => {
    try {
      return await db.transaction(async (transaction) => {
        let citation = await this.Citation.findOne({
          where: {
            article_id: article_id,
            source: citationData["source"],
          },
        });

        if (citation) {
          return await this.Citation.update(
            {
              count: citationData["count"],
            },
            {
              where: {
                article_id: article_id,
                source: citationData["source"],
              },
              transaction,
            }
          );
        } else {
          return await this.Citation.create({
            article_id: article_id,
            source: citationData["source"],
            count: citationData["count"],
          });
        }
      });
    } catch (error) {
      loggerWinston.error(error);
      return null;
    }
  };
}

export default ArticleRepo;
