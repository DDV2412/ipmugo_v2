import { Request, Response, NextFunction } from "express";
import ErrorHandler from "../helper/errorHandler";
import validation from "../validation";

export default {
  allJournals: async (req: Request, res: Response, next: NextFunction) => {
    const { page, size, filters } = req.query;
    let journals = await req.JournalUC.allJournals(page, size, filters);

    if (journals == null) {
      journals = [];
    }

    res.json({
      status: "success",
      total: journals.total,
      currentPage: journals.currentPage,
      countPage: journals.countPage,
      journals: journals.journals || journals,
    });
  },

  journalById: async (req: Request, res: Response, next: NextFunction) => {
    const journalId = req.params["journalId"];

    let journal = await req.JournalUC.journalById(journalId);

    if (!journal) {
      return next(new ErrorHandler("Journal not found", 404));
    }

    res.json({
      status: "success",
      journal: journal,
    });
  },
  createJournal: async (req: Request, res: Response, next: NextFunction) => {
    const { error } = validation.journal(req.body);

    if (error) return next(new ErrorHandler(error["details"][0].message, 400));

    let journal = await req.JournalUC.createJournal(req.body);

    if (!journal) {
      return next(
        new ErrorHandler("Journal ISSN or E-ISSN not available", 400)
      );
    }

    res.json({
      status: "success",
      journal: journal,
    });
  },
  updateJournal: async (req: Request, res: Response, next: NextFunction) => {
    const journalId = req.params["journalId"];

    let checkJournal = await req.JournalUC.journalById(journalId);

    if (!checkJournal) {
      return next(new ErrorHandler("Journal not found", 404));
    }

    const { error } = validation.journal(req.body);
    if (error) return next(new ErrorHandler(error["details"][0].message, 400));

    await req.JournalUC.updateJournal(journalId, req.body);

    res.json({
      status: "success",
      message: `Successfully deleted journal`,
    });
  },
  deleteJournal: async (req: Request, res: Response, next: NextFunction) => {
    const { error } = validation.journal(req.body);

    const journalId = req.params["journalId"];

    if (error) return next(new ErrorHandler(error["details"][0].message, 400));

    let checkJournal = await req.JournalUC.journalById(journalId);

    if (!checkJournal) {
      return next(new ErrorHandler("Journal not found", 404));
    }

    await req.JournalUC.deleteJournal(journalId);

    res.json({
      status: "success",
      message: `Successfully deleted journal`,
    });
  },
};
