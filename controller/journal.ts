import { Request, Response, NextFunction } from "express";
import ErrorHandler from "../helper/errorHandler";
import validation from "../validation";

export default {
  allJournals: async (req: Request, res: Response, next: NextFunction) => {
    try {
      let journals = await req.JournalUC.allJournals({});

      if (journals == null) {
        journals = [];
      }

      res.status(200).json({
        status: "success",
        total: journals.count,
        journals: journals.rows,
      });
    } catch (err: any) {
      return next(new ErrorHandler(err["message"], 500));
    }
  },
  searchByElastic: async (req: Request, res: Response, next: NextFunction) => {
    try {
      let size: any = 25;

      let { search, from } = req.query;

      if (
        typeof req.query["size"] != "undefined" ||
        req.query["size"] != null
      ) {
        size = req.query["size"];
      }

      let journals = await req.JournalUC.searchByElastic({
        search: search,
        size: size,
        from: from,
      });

      if (journals == null) {
        journals = [];
      }

      res.status(200).json({
        status: "success",
        total: journals["hits"]["total"]["value"],
        journals: journals["hits"]["hits"],
        currentPage: from ? +from : 0,
        countPage: Math.ceil(journals["hits"]["total"]["value"] / size),
      });
    } catch (err: any) {
      return next(new ErrorHandler(err["message"], 500));
    }
  },

  journalById: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const journalId = req.params["journalId"];

      let journal = await req.JournalUC.journalById(journalId);

      if (!journal) {
        return next(new ErrorHandler("Journal not found", 404));
      }

      res.status(200).json({
        status: "success",
        journal: journal,
      });
    } catch (err: any) {
      return next(new ErrorHandler(err["message"], 500));
    }
  },
  createJournal: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { error } = validation.journal(req.body);

      if (error)
        return next(new ErrorHandler(error["details"][0].message, 400));

      let journal = await req.JournalUC.createJournal(req.body);

      if (!journal) {
        return next(
          new ErrorHandler("Journal ISSN or E-ISSN not available", 400)
        );
      }

      res.status(201).json({
        status: "success",
        journal: journal,
      });
    } catch (err: any) {
      return next(new ErrorHandler(err["message"], 500));
    }
  },
  updateJournal: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const journalId = req.params["journalId"];

      let checkJournal = await req.JournalUC.journalById(journalId);

      if (!checkJournal) {
        return next(new ErrorHandler("Journal not found", 404));
      }

      const { error } = validation.journal(req.body);
      if (error)
        return next(new ErrorHandler(error["details"][0].message, 400));

      let journal = await req.JournalUC.updateJournal(
        checkJournal["id"],
        req.body
      );

      res.status(200).json({
        status: "success",
        message: `Successfully deleted journal ${checkJournal["name"]}`,
      });
    } catch (err: any) {
      return next(new ErrorHandler(err["message"], 500));
    }
  },
  deleteJournal: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { error } = validation.journal(req.body);

      const journalId = req.params["journalId"];

      if (error)
        return next(new ErrorHandler(error["details"][0].message, 400));

      let checkJournal = await req.JournalUC.journalById(journalId);

      if (!checkJournal) {
        return next(new ErrorHandler("Journal not found", 404));
      }

      await req.JournalUC.deleteJournal(checkJournal["id"]);

      res.status(200).json({
        status: "success",
        message: `Successfully deleted journal name ${checkJournal["name"]}`,
      });
    } catch (err: any) {
      return next(new ErrorHandler(err["message"], 500));
    }
  },
};
