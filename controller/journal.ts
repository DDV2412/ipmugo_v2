import { Request, Response, NextFunction } from "express";
import ErrorHandler from "../helper/errorHandler";
import validation from "../validation";

export default {
  allJournals: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { limit, sort, page, sortBy } = req.query;

      let journals = await req.uc.JournalUC.allJournals({
        limit,
        sort,
        page,
        sortBy,
      });

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
  journalById: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const journalId = req.params["journalId"];

      let journal = await req.uc.JournalUC.journalById(journalId);

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

      let journal = await req.uc.JournalUC.createJournal(req.body);

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

      let checkJournal = await req.uc.JournalUC.journalById(journalId);

      if (!checkJournal) {
        return next(new ErrorHandler("Journal not found", 404));
      }

      const { error } = validation.journal(req.body);
      if (error)
        return next(new ErrorHandler(error["details"][0].message, 400));

      let journal = await req.uc.JournalUC.updateJournal(
        checkJournal,
        req.body
      );

      res.status(200).json({
        status: "success",
        journal: journal,
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

      let checkJournal = await req.uc.JournalUC.journalById(journalId);

      if (!checkJournal) {
        return next(new ErrorHandler("Journal not found", 404));
      }

      await req.uc.JournalUC.deleteJournal(checkJournal);

      res.status(200).json({
        status: "success",
        message: `Successfully deleted journal name ${checkJournal["name"]}`,
      });
    } catch (err: any) {
      return next(new ErrorHandler(err["message"], 500));
    }
  },
};
