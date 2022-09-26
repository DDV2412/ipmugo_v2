import db from "../models";
import Journal from "../models/journal";
import fs from "fs";
import path from "path";
import Interest from "../models/interest";
import { IncludeOptions, Op } from "sequelize";
import JournalInterest from "../models/journal_interest";
import loggerWinston from "../helper/logger-winston";
import ElasticRepo from "./elastic";

class JournalRepo {
  Journal: typeof Journal;
  Interest: typeof Interest;
  JournalInterest: typeof JournalInterest;
  Elastic: any;
  constructor() {
    this.Journal = Journal;
    this.Interest = Interest;
    this.JournalInterest = JournalInterest;
    this.Elastic = new ElasticRepo();
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

  updateJournal = async (journal: any, journalData: any) => {
    try {
      let update = await db.transaction(async (transaction) => {
        return await journal.update(journalData, transaction);
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
                journal_id: update["id"],
                interest_id: check["id"],
              },
            });

            if (!isExists) {
              await this.JournalInterest.create({
                journal_id: journal["id"],
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

  deleteJournal = async (journal: any) => {
    try {
      if (
        journal["thumbnail"] != null &&
        journal["thumbnail"].replace(
          `http://127.0.0.1:5000`,
          path.join(__dirname + "/../static") != undefined
        )
      ) {
        fs.unlink(
          journal["thumbnail"].replace(
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

      if (
        journal["cover"] != null &&
        journal["cover"].replace(
          `http://127.0.0.1:5000`,
          path.join(__dirname + "/../static") != undefined
        )
      ) {
        fs.unlink(
          journal["cover"].replace(
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
        return await journal.destroy();
      });

      return results;
    } catch (error) {
      loggerWinston.error(error);
      return null;
    }
  };
}

export default JournalRepo;
