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
      journals: journals.journals,
    });
  },

  journalById: async (req: Request, res: Response, next: NextFunction) => {
    const journalId = req.params["journalId"];
    const {
      search,
      page,
      size,
      sortByDate,
      sortByTitle,
      sortByRelevance,
      sortByCited,
      range,
      filterByTopic,
      filterByIssue,
    } = req.query;

    let journal = await req.JournalUC.journalById(journalId);

    if (!journal) {
      return next(new ErrorHandler("Journal not found", 404));
    }

    const filter: any = [];

    filter.push({
      range: {
        publish_year: {
          gte: range ? (range as string).split("-")[0] : "2000",
          lt: range ? (range as string).split("-")[1] : "now",
        },
      },
    });

    if (typeof filterByTopic != "undefined" && filterByTopic != null) {
      filter.push({
        term: {
          topic: filterByTopic,
        },
      });
    }

    if (typeof filterByIssue != "undefined" && filterByIssue != null) {
      filter.push({
        term: {
          resources: filterByIssue,
        },
      });
    }

    const sort: any = [];

    if (typeof sortByDate !== "undefined") {
      sort.push({
        publish_date: {
          order: sortByDate,
          format: "strict_date_optional_time_nanos",
        },
      });
    }

    if (typeof sortByTitle !== "undefined") {
      sort.push({
        title: {
          order: sortByTitle,
        },
      });
    }

    if (typeof sortByCited !== "undefined") {
      sort.push({
        "citations.count": {
          order: "desc",
          nested: {
            path: "citations",
            filter: {
              match: {
                "citations.source": "Scopus",
              },
            },
          },
        },
      });
    }

    if (typeof sortByRelevance !== "undefined") {
      sort.push({
        _score: { order: "desc" },
      });
    }
    const query =
      typeof search != "undefined"
        ? {
            bool: {
              must: {
                match: {
                  "journal.id": journalId,
                },
              },
              should: [
                { match_phrase: { title: search } },
                { match_phrase: { abstract: search } },
                { match_phrase: { keywords: search } },
              ],
              filter: filter,
            },
          }
        : {
            bool: {
              must: {
                match: {
                  "journal.id": journalId,
                },
              },
              filter: filter,
            },
          };

    let articles = await req.FeatruredUC.search({
      indexName: "articles",
      body: {
        from: page ? +page : 0,
        size: size ? size : 15,
        sort:
          sort.length != 0
            ? sort
            : {
                publish_date: {
                  order: "desc",
                  format: "strict_date_optional_time_nanos",
                },
              },
        query: query,
        aggs: {
          topic: {
            terms: {
              field: "topic",
            },
          },
          issues: {
            terms: {
              field: "resources",
            },
          },
          min_year: { min: { field: "publish_date", format: "yyyy" } },
          max_year: { max: { field: "publish_date", format: "yyyy" } },
        },
      },
    });

    res.json({
      status: "success",
      journal: journal,
      articles: articles,
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
