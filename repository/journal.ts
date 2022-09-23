import db from "../models";
import Journal from "../models/journal";
import fs from "fs";
import path from "path";
import Article from "../models/article";
import { IncludeOptions } from "sequelize";
import { requestPagination } from "../helper/requestPagination";

class JournalRepo {
  Journal: typeof Journal;
  Article: typeof Article;
  constructor() {
    this.Journal = Journal;
    this.Article = Article;
  }
  allJournals = async (filters: {}) => {
    try {
      const { limit, sort, page, sortBy } = requestPagination(filters);

      let journals = await db.transaction(async (transaction) => {
        return await this.Journal.findAndCountAll({
          offset: (page - 1) * limit,
          limit,
          include: [
            {
              model: this.Article,
              as: "articles",
              transaction,
            } as IncludeOptions,
          ],
          order: [[sortBy, sort]],
          distinct: true,
          transaction,
        });
      });

      return journals;
    } catch (err: any) {
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
          include: [{ model: this.Article, transaction } as IncludeOptions],
          transaction,
        });
      });

      return journal;
    } catch (err: any) {
      return null;
    }
  };

  createJournal = async (journalData: any) => {
    try {
      let journal = await db.transaction(async () => {
        return await this.Journal.create(journalData);
      });

      return journal;
    } catch (error: any) {
      return error["message"];
    }
  };

  updateJournal = async (journal: any, journalData: any) => {
    try {
      let update = await db.transaction(async (transaction) => {
        return await journal.update(journalData, transaction);
      });

      return update;
    } catch (error: any) {
      return error["message"];
    }
  };

  deleteJournal = async (journal: any) => {
    try {
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

      return await db.transaction(async () => {
        return await journal.destroy();
      });
    } catch (error: any) {
      return error["message"];
    }
  };
}

export default JournalRepo;
