import db from "../models";
import Journal from "../models/journal";
import fs from "fs";
import path from "path";
import Interest from "../models/interest";
import { IncludeOptions, Op } from "sequelize";
import JournalInterest from "../models/journal_interest";
import { requestPagination } from "../helper/requestPagination";
import loggerWinston from "../helper/logger-winston";

class JournalRepo {
  Journal: typeof Journal;
  Interest: typeof Interest;
  JournalInterest: typeof JournalInterest;
  constructor() {
    this.Journal = Journal;
    this.Interest = Interest;
    this.JournalInterest = JournalInterest;
  }
  allJournals = async (filters: {}) => {
    try {
      const { limit, sort, page, sortBy } = requestPagination(filters);

      let where = filters["search"]
        ? {
            [Op.or]: {
              name: { [Op.like]: `%${filters["search"]}%` },
              abbreviation: { [Op.like]: `%${filters["search"]}%` },
              description: { [Op.like]: `%${filters["search"]}%` },
            },
          }
        : {};

      let journals = await db.transaction(async (transaction) => {
        return await this.Journal.findAndCountAll({
          where: where,
          offset: (page - 1) * limit,
          limit,
          include: [
            {
              model: this.Interest,
              transaction,
              as: "interests",
            } as IncludeOptions,
          ],
          order: [[sortBy, sort]],
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
