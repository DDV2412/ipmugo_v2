import db from "../models";
import Journal from "../models/journal";
import Interest from "../models/interest";
import { IncludeOptions, Op } from "sequelize";
import JournalInterest from "../models/journal_interest";
import loggerWinston from "../helper/logger-winston";
import User from "../models/user";
import ScopusMetric from "../models/scopus_metric";
import RequestPagination from "../helper/requestPagination";

class JournalRepo {
  Journal: typeof Journal;
  Interest: typeof Interest;
  JournalInterest: typeof JournalInterest;
  ScopusMetric: typeof ScopusMetric;
  User: typeof User;
  constructor() {
    this.Journal = Journal;
    this.Interest = Interest;
    this.JournalInterest = JournalInterest;
    this.User = User;
    this.ScopusMetric = ScopusMetric;
  }
  allJournals = async (
    page: number,
    size: number,
    filters: Record<string, string>
  ) => {
    try {
      const { limit, offset } = new RequestPagination(page, size);
      let journals = await db.transaction(async (transaction) => {
        return await this.Journal.findAndCountAll({
          include: [
            {
              model: this.Interest,
              transaction,
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
          limit: limit,
          offset: offset,
          distinct: true,
          transaction,
        });
      });

      return {
        total: journals.count,
        currentPage: page ? +page : 0,
        countPage: Math.ceil(journals.count / limit),
        journals: journals.rows,
      };
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

  updateJournal = async (
    journal_id: string,
    journalData: Record<string, any>
  ) => {
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
        journalData["interests"] != null &&
        journalData["interests"].length != 0
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

  scopusMetric = async (
    journal_id: string,
    metricData: Record<string, any>
  ) => {
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
