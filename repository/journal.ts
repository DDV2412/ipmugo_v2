import db from "../models";
import Journal from "../models/journal";
import Interest from "../models/interest";
import { IncludeOptions, Op } from "sequelize";
import JournalInterest from "../models/journal_interest";
import loggerWinston from "../helper/logger-winston";
import ElasticRepo from "./elastic";
import User from "../models/user";
import ScopusMetric from "../models/scopus_metric";

class JournalRepo {
  Journal: typeof Journal;
  Interest: typeof Interest;
  JournalInterest: typeof JournalInterest;
  Elastic: any;
  ScopusMetric: typeof ScopusMetric;
  User: typeof User;
  constructor() {
    this.Journal = Journal;
    this.Interest = Interest;
    this.JournalInterest = JournalInterest;
    this.Elastic = new ElasticRepo();
    this.User = User;
    this.ScopusMetric = ScopusMetric;
  }
  allJournals = async () => {
    try {
      let journals = await db.transaction(async (transaction) => {
        return await this.Journal.findAndCountAll({
          include: [
            {
              model: this.Interest,
              transaction,
              as: "interests",
            } as IncludeOptions,
            {
              model: this.User,
              transaction,
              as: "editorials",
            } as IncludeOptions,
            {
              model: this.ScopusMetric,
              transaction,
              as: "scopus_metric",
            } as IncludeOptions,
          ],
          distinct: true,
          transaction,
        });
      });

      return journals;
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
                    term: { id: filters["search"] },
                  },
                  {
                    term: { name: filters["search"] },
                  },
                  {
                    term: { issn: filters["search"] },
                  },
                  {
                    term: { description: filters["search"] },
                  },
                  {
                    term: { e_issn: filters["search"] },
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

      let articles = await this.Elastic.search("journals", _search);

      return articles;
    } catch (error) {
      loggerWinston.error(error);
      return null;
    }
  };

  journalById = async (id: string) => {
    try {
      let journal = await db.transaction(async (transaction) => {
        return await this.Journal.findOne({
          where: {
            id: id,
          },
          include: [
            {
              model: this.Interest,
              transaction,
              as: "interests",
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

  createJournal = async (journalData: any) => {
    try {
      let journal = await db.transaction(async () => {
        return await this.Journal.create(journalData);
      });

      await journalData["interests"].map(async (interest: any) => {
        const check = await this.Interest.findOne({
          where: {
            name: interest["name"],
          },
        });

        if (check) {
          await this.JournalInterest.create({
            journal_id: journal["id"],
            interest_id: check["id"],
          });
        }
      });

      return journal;
    } catch (error) {
      loggerWinston.error(error);
      return null;
    }
  };

  updateJournal = async (journal_id: string, journalData: any) => {
    try {
      let update = await db.transaction(async (transaction) => {
        return await this.Journal.update(journalData, {
          where: {
            id: journal_id,
          },
          transaction,
        });
      });

      if (
        journalData["interests"] != undefined &&
        journalData["interests"] != null
      ) {
        await journalData["interests"].map(async (interest: any) => {
          const check = await this.Interest.findOne({
            where: {
              name: interest["name"],
            },
          });

          if (check) {
            const isExists = await this.JournalInterest.findOne({
              where: {
                journal_id: journal_id,
                interest_id: check["id"],
              },
            });

            if (!isExists) {
              await this.JournalInterest.create({
                journal_id: journal_id,
                interest_id: check["id"],
              });
            }
          }
        });
      }

      return update;
    } catch (error) {
      loggerWinston.error(error);
      return null;
    }
  };

  deleteJournal = async (journal_id: string) => {
    try {
      let results = await db.transaction(async (transaction) => {
        return await this.Journal.destroy({
          where: {
            id: journal_id,
          },
          transaction,
        });
      });

      return results;
    } catch (error) {
      loggerWinston.error(error);
      return null;
    }
  };

  scopusMetric = async (journal_id: string, metricData: {}) => {
    try {
      return await db.transaction(async (transaction) => {
        let scopusMetric = await this.ScopusMetric.findOne({
          where: {
            journal_id: journal_id,
          },
        });

        if (
          metricData["interests"] != undefined &&
          metricData["interests"] != null
        ) {
          await metricData["interests"].map(async (interest: any) => {
            const check = await this.Interest.findOne({
              where: {
                name: interest["$"],
              },
            });

            if (check) {
              const isExists = await this.JournalInterest.findOne({
                where: {
                  journal_id: journal_id,
                  interest_id: check["id"],
                },
              });

              if (!isExists) {
                await this.JournalInterest.create({
                  journal_id: journal_id,
                  interest_id: check["id"],
                });
              }
            }
          });
        }

        if (scopusMetric) {
          return await this.ScopusMetric.update(metricData, {
            where: {
              journal_id: journal_id,
            },
            transaction,
          });
        } else {
          return await this.ScopusMetric.create({
            journal_id: journal_id,
            sjr: metricData["sjr"],
            snip: metricData["snip"],
            citeScore: metricData["citeScore"],
            year: metricData["year"],
            trackScore: metricData["trackScore"],
            trackYear: metricData["trackYear"],
          });
        }
      });
    } catch (error) {
      loggerWinston.error(error);
      return null;
    }
  };
}

export default JournalRepo;
