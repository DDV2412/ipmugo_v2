import { Request, Response, NextFunction } from "express";
import validation from "../validation";
import ErrorHandler from "../helper/errorHandler";

export default {
  search: async (req: Request, res: Response, next: NextFunction) => {
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
      filterByJournal,
    } = req.query;

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

    if (typeof filterByJournal != "undefined" && filterByJournal != null) {
      filter.push({
        term: {
          "journal.name": filterByJournal,
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
                match_all: {},
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
          journal: {
            terms: {
              field: "journal.name",
            },
          },
          min_year: { min: { field: "publish_date", format: "yyyy" } },
          max_year: { max: { field: "publish_date", format: "yyyy" } },
        },
      },
    });

    res.json({
      status: "success",
      articles: articles,
    });
  },

  featuredArticles: async (req: Request, res: Response, next: NextFunction) => {
    let articles = await req.FeatruredUC.search({
      indexName: "articles",
      body: {
        sort: {
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
        },
        query: {
          match_all: {},
        },
      },
    });

    res.json({
      status: "success",
      articles: articles,
    });
  },

  featuredAuthors: async (req: Request, res: Response, next: NextFunction) => {
    let articles = await req.FeatruredUC.search({
      indexName: "articles",
      body: {
        sort: {
          "assign_author.scholar_profile.h_index": {
            order: "desc",
            nested: {
              path: "assign_author",
            },
          },
        },
        query: {
          match_all: {},
        },
      },
    });

    res.json({
      status: "success",
      articles: articles,
    });
  },

  advanced: async (req: Request, res: Response, next: NextFunction) => {
    const {
      searchDefault,
      page,
      size,
      sortByDate,
      sortByTitle,
      sortByRelevance,
      sortByCited,
      range,
      filterByTopic,
      filterByJournal,
    } = req.body;

    const { error } = validation.advancedSearch({
      searchDefault: searchDefault,
    });

    if (error) return next(new ErrorHandler(error["details"][0].message, 400));

    let must: any = [];

    let must_not: any = [];

    let should: any = [];

    must.push({ match_phrase: searchDefault });

    if (typeof req.body["AND"] != "undefined" && req.body["AND"].length != 0) {
      req.body["AND"].map(async (data: any) => {
        if (
          Object.keys(data)[0] != "authors.firstname" ||
          Object.keys(data)[0] != "authors.lastname"
        ) {
          must.push({
            nested: {
              path: "authors",
              query: {
                bool: {
                  must: [{ match_phrase: data }],
                },
              },
            },
          });
        } else {
          must.push({ match_phrase: data });
        }
      });
    }

    if (typeof req.body["OR"] != "undefined" && req.body["OR"].length != 0) {
      req.body["OR"].map(async (data: any) => {
        if (
          Object.keys(data)[0] != "authors.firstname" ||
          Object.keys(data)[0] != "authors.lastname"
        ) {
          should.push({
            nested: {
              path: "authors",
              query: {
                bool: {
                  should: [{ match_phrase: data }],
                },
              },
            },
          });
        } else {
          should.push({ match_phrase: data });
        }
      });
    }

    if (typeof req.body["NOT"] != "undefined" && req.body["NOT"].length != 0) {
      req.body["NOT"].map(async (data: any) => {
        if (
          Object.keys(data)[0] != "authors.firstname" ||
          Object.keys(data)[0] != "authors.lastname"
        ) {
          must_not.push({
            nested: {
              path: "authors",
              query: {
                bool: {
                  must_not: [{ match_phrase: data }],
                },
              },
            },
          });
        } else {
          must_not.push({ match_phrase: data });
        }
      });
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

    if (typeof filterByJournal != "undefined" && filterByJournal != null) {
      filter.push({
        term: {
          "journal.name": filterByJournal,
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
        query: {
          bool: {
            must: must.length != 0 ? must : { match_all: {} },
            must_not: must.length != 0 ? must_not : { match_all: {} },
            should: must.length != 0 ? should : { match_all: {} },
            filter: filter,
          },
        },
        aggs: {
          topic: {
            terms: {
              field: "topic",
            },
          },
          journal: {
            terms: {
              field: "journal.name",
            },
          },
          min_year: { min: { field: "publish_date", format: "yyyy" } },
          max_year: { max: { field: "publish_date", format: "yyyy" } },
        },
      },
    });

    res.json({
      status: "success",
      articles: articles,
    });
  },
};
