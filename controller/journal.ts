import { Request, Response, NextFunction } from "express";
import ErrorHandler from "../helper/errorHandler";
import validation from "../validation";

export default {
  allJournals: async (req: Request, res: Response, next: NextFunction) => {
    /**
        #swagger.tags = ['Journal']
        #swagger.summary = 'Journal List'
        #swagger.description = 'Journal List'
        #swagger.responses[200] = {
          description: 'Successfully get journal list',
        }
        #swagger.responses[500] = {
          description: 'Server error',
          schema: {
            status: "error", 
            
            message: "____"
          }
        }
       
       */
    const { page, size, filters } = req.query;
    let journals = await req.JournalUC.allJournals(page, size, filters);

    if(!journals){
      journals = []
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
    /**
        #swagger.tags = ['Journal']
        #swagger.summary = 'Journal By ID'
        #swagger.description = 'Journal By ID'
        #swagger.responses[200] = {
          description: 'Successfully journal',
        }
        #swagger.responses[404] = {
          description: 'Journal not found',
          schema: {
            status: "error", 
            message: "Journal not found",
          }
        }
        #swagger.responses[500] = {
          description: 'Server error',
          schema: {
            status: "error", 
            
            message: "____"
          }
        }
       
       */
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
    /**
        #swagger.tags = ['Journal']
        #swagger.security = [{ "Bearer": [] }]
        #swagger.summary = 'Create Journal'
        #swagger.description = 'Create Journal'
        #swagger.parameters['obj'] = {
            in: 'body',
            description: 'Create Journal',
            required: true,
            schema: {
              "name": "International Journal of Power Electronics and Drive Systems (IJPEDS)",
    "abbreviation": "IJPEDS",
    "publisher": "Institute of Advanced Engineering and Science (IAES)",
    "thumbnail": "http://127.0.0.1:5000/thumnail\\IJPEDS - Journal Cover web.jpg",
    "cover": "http://127.0.0.1:5000/cover\\03  IJPEDS 2021.jpg",
    "issn": "2088-8694",
    "e_issn": "2722-256X",
    "description": "The International Journal of Power Electronics and Drive Systems (IJPEDS), p-ISSN: 2088-8694, e-ISSN 2722-256X, is the official publication of the Institute of Advanced Engineering and Science (IAES). This is a SCOPUS indexed journal, SJR Q3 on Electrical and Electronics Engineering, CiteScore: 3.3, SJR: 0.346, and SNIP: 0.638. The scope of the journal includes all issues in the field of power electronics and drive systems. Included are techniques for advanced power semiconductor devices; control in power electronics; low and high power converters (inverters, converters, controlled and uncontrolled rectifiers); control algorithms and techniques applied to power electronics; electromagnetic and thermal performance of electronic power converters and inverters; power quality and utility applications; renewable energy; electric machines; modelling, simulation, analysis, design and implementations of the application of power circuit components (power semiconductors, inductors, high frequency transformers, capacitors), EMI/EMC considerations; power devices and components; integrated and packaged; induction motor drives; synchronous motor drives; synchronous motor drives; permanent magnet motor drives; ASDs (adjustable speed drives); multi-phase machines and converters; applications in motor drives; electric vehicles; wind energy systems; solar; battery chargers; UPS; and other applications.",
    "base_url": "https://ijpeds.iaescore.com/index.php/IJPEDS",
    "interests": [
        {
            "name": "Computer Science"
        }
    ]
            }
          },
        #swagger.responses[200] = {
          description: 'Successfully journal',
          schema: [{ $ref: '#/definitions/Journal' }]
        }
        #swagger.responses[404] = {
          description: 'Journal ISSN or E-ISSN not available',
          schema: {
            status: "error", 
            message: "Journal ISSN or E-ISSN not available",
          }
        }
        #swagger.responses[500] = {
          description: 'Server error',
          schema: {
            status: "error", 
            
            message: "____"
          }
        }
       
       */
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
    /**
        #swagger.tags = ['Journal']
        #swagger.security = [{ "Bearer": [] }]
        #swagger.summary = 'Update Journal'
        #swagger.description = 'Update Journal'
         #swagger.parameters['obj'] = {
            in: 'body',
            description: 'Update Journal',
            required: true,
            schema: {
              "name": "International Journal of Power Electronics and Drive Systems (IJPEDS)",
    "abbreviation": "IJPEDS",
    "publisher": "Institute of Advanced Engineering and Science (IAES)",
    "thumbnail": "http://127.0.0.1:5000/thumnail\\IJPEDS - Journal Cover web.jpg",
    "cover": "http://127.0.0.1:5000/cover\\03  IJPEDS 2021.jpg",
    "issn": "2088-8694",
    "e_issn": "2722-256X",
    "description": "The International Journal of Power Electronics and Drive Systems (IJPEDS), p-ISSN: 2088-8694, e-ISSN 2722-256X, is the official publication of the Institute of Advanced Engineering and Science (IAES). This is a SCOPUS indexed journal, SJR Q3 on Electrical and Electronics Engineering, CiteScore: 3.3, SJR: 0.346, and SNIP: 0.638. The scope of the journal includes all issues in the field of power electronics and drive systems. Included are techniques for advanced power semiconductor devices; control in power electronics; low and high power converters (inverters, converters, controlled and uncontrolled rectifiers); control algorithms and techniques applied to power electronics; electromagnetic and thermal performance of electronic power converters and inverters; power quality and utility applications; renewable energy; electric machines; modelling, simulation, analysis, design and implementations of the application of power circuit components (power semiconductors, inductors, high frequency transformers, capacitors), EMI/EMC considerations; power devices and components; integrated and packaged; induction motor drives; synchronous motor drives; synchronous motor drives; permanent magnet motor drives; ASDs (adjustable speed drives); multi-phase machines and converters; applications in motor drives; electric vehicles; wind energy systems; solar; battery chargers; UPS; and other applications.",
    "base_url": "https://ijpeds.iaescore.com/index.php/IJPEDS",
    "interests": [
        {
            "name": "Computer Science"
        }
    ]
            }
          },
        #swagger.responses[200] = {
          description: 'Successfully update journal',
          schema: {
            status: "success",
            message: "Successfully updated journal"
          }
        }
        #swagger.responses[404] = {
          description: 'Journal not found',
          schema: {
            status: "error", 
            message: "Journal not found",
          }
        }
        #swagger.responses[500] = {
          description: 'Server error',
          schema: {
            status: "error", 
            
            message: "____"
          }
        }
       
       */
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
      message: `Successfully updated journal`,
    });
  },
  deleteJournal: async (req: Request, res: Response, next: NextFunction) => {
    /**
        #swagger.tags = ['Journal']
        #swagger.security = [{ "Bearer": [] }]
        #swagger.summary = 'Journal By ID'
        #swagger.description = 'Journal By ID'
        #swagger.responses[200] = {
          description: 'Successfully journal',
          schema: {
            status: "success",
            message: "Successfully deleted journal"
          }
        }
        #swagger.responses[404] = {
          description: 'Journal not found',
          schema: {
            status: "error", 
            message: "Journal not found",
          }
        }
        #swagger.responses[500] = {
          description: 'Server error',
          schema: {
            status: "error", 
            
            message: "____"
          }
        }
       
       */
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
