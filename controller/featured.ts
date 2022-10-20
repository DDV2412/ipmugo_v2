import { Request, Response, NextFunction } from "express";
import validation from "../validation";
import ErrorHandler from "../helper/errorHandler";

export default {
  search: async (req: Request, res: Response, next: NextFunction) => {
    /**
        #swagger.tags = ['Featured']
        #swagger.summary = 'Featured Search and Get Articles'
        #swagger.description = 'Featured Search and Get Articles'
        #swagger.parameters['search'] = {
            in: 'query',
            description: 'Query Search',
          },
          #swagger.parameters['range'] = {
            in: 'query',
            description: 'Query range',
          },
          #swagger.parameters['sortByDate'] = {
            in: 'query',
            description: 'Query sortByDate',
          },
           #swagger.parameters['filterByTopic'] = {
            in: 'query',
            description: 'Query filterByTopic',
          }
        #swagger.responses[200] = {
          description: 'Successfully Search',
          schema: {
            $ref: '#/definitions/SearchArticles'
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
      },
    });

    res.json({
      status: "success",
      total: articles.total,
      currentPage: articles.currentPage,
      countPage: articles.countPage,
      articles: articles.articles,
      aggregations: articles.aggregations,
    });
  },

  featuredArticles: async (req: Request, res: Response, next: NextFunction) => {
    /**
        #swagger.tags = ['Featured']
        #swagger.summary = 'Featured  Articles'
        #swagger.description = 'Featured  Articles'
        #swagger.responses[200] = {
          description: 'Successfully Search',
        }
        #swagger.responses[500] = {
          description: 'Server error',
          schema: {
            status: "error", 
            
            message: "____"
          }
        }
       
       */
    let articles = await req.FeatruredUC.search({
      indexName: "articles",
      body: {
        from: 0,
        size: 4,
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
      total: articles.total,
      currentPage: articles.currentPage,
      countPage: articles.countPage,
      articles: articles.articles,
      aggregations: articles.aggregations,
    });
  },

  featuredAuthors: async (req: Request, res: Response, next: NextFunction) => {
    /**
        #swagger.tags = ['Featured']
        #swagger.summary = 'Featured  Authors'
        #swagger.description = 'Featured  Authors'
        #swagger.responses[200] = {
          description: 'Successfully Search',
        }
        #swagger.responses[500] = {
          description: 'Server error',
          schema: {
            status: "error", 
            
            message: "____"
          }
        }
       
       */
    let articles = await req.FeatruredUC.search({
      indexName: "articles",
      body: {
        from: 0,
        size: 25,
        sort: {
          "assign_author.scholar_profile.h_index": {
            order: "desc",
            nested: {
              path: "assign_author",
            },
          },
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
      total: articles.total,
      currentPage: articles.currentPage,
      countPage: articles.countPage,
      articles: articles.articles,
      aggregations: articles.aggregations,
    });
  },

  advanced: async (req: Request, res: Response, next: NextFunction) => {
    /**
        #swagger.tags = ['Featured']
        #swagger.summary = 'Featured Advanced Search'
        #swagger.description = 'Featured Advanced Search'
        #swagger.parameters['obj'] = {
            in: 'body',
            description: 'Featured Advanced Search',
            required: true,
            schema: {
              $ref: '#/definitions/Advanced'
            }
          },
        #swagger.responses[200] = {
          description: 'Successfully Search',
          schema: {
            $ref: '#/definitions/SearchArticles'
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
      },
    });

    res.json({
      status: "success",
      total: articles.total,
      currentPage: articles.currentPage,
      countPage: articles.countPage,
      articles: articles.articles,
      aggregations: articles.aggregations,
    });
  },

  contact: async (req: Request, res: Response, next: NextFunction) => {
    /**
        #swagger.tags = ['Featured']
        #swagger.summary = 'Featured Contact'
        #swagger.description = 'Featured Contact'
        #swagger.parameters['obj'] = {
            in: 'body',
            description: 'Featured Send Message',
            required: true,
            schema: {
              
               "name": "Dian Dwi Vaputra",
               "email": "dhyan@gmail.com",
               "subject": "Testing Contact",
               "message": "Message Example"
            
            }
          },
        #swagger.responses[200] = {
          description: 'Successfully Search',
          schema: {
            
               status: "success",
              message: "Message sended successfully",
            
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
    const { error } = validation.contact(req.body);

    if (error) return next(new ErrorHandler(error["details"][0].message, 400));

    await req.FeatruredUC.contact(req.body);

    res.json({
      status: "success",
      message: "Message sended successfully",
    });
  },

  subscribe: async (req: Request, res: Response, next: NextFunction) => {
    /**
        #swagger.tags = ['Featured']
        #swagger.summary = 'Featured Subscribe'
        #swagger.description = 'Featured Subscribe'
        #swagger.parameters['obj'] = {
            in: 'body',
            description: 'Featured Subscribe',
            required: true,
            schema: {
               "name": "Dian Dwi Vaputra",
               "email": "dhyan@gmail.com",
               "country": "Indonesia",
               "city": "Yogyakarta",
              "phone": "087835111061"
            }
          },
        #swagger.responses[200] = {
          description: 'Successfully Search',
          schema:{
               status: "success",
              message: "Subscription added successfully",
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
    const { error } = validation.subscription(req.body);

    if (error) return next(new ErrorHandler(error["details"][0].message, 400));

    await req.FeatruredUC.subscribe(req.body);

    res.json({
      status: "success",
      message: "Subscription added successfully",
    });
  },

  subscribeList: async (req: Request, res: Response, next: NextFunction) => {
    /**
        #swagger.tags = ['User -- Admin Access']
        #swagger.security = [{ "Bearer": [] }]
        #swagger.summary = 'Subscribe List'
        #swagger.description = 'Subscribe List'
        #swagger.responses[200] = {
          description: 'Successfully get subscribe list',
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

    let subscribe = await req.FeatruredUC.subscribeList(page, size, filters);

    if (!subscribe) {
      subscribe = [];
    }

    res.json({
      status: "success",
      total: subscribe.total,
      currentPage: subscribe.currentPage,
      countPage: subscribe.countPage,
      subscribe: subscribe.subscribe,
    });
  },
  contactList: async (req: Request, res: Response, next: NextFunction) => {
    /**
        #swagger.tags = ['User -- Admin Access']
        #swagger.security = [{ "Bearer": [] }]
        #swagger.summary = 'Contact List'
        #swagger.description = 'Contact List'
        #swagger.responses[200] = {
          description: 'Successfully get contact list',
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

    let contact = await req.FeatruredUC.contactList(page, size, filters);

    if (!contact) {
      contact = [];
    }

    res.json({
      status: "success",
      total: contact.total,
      currentPage: contact.currentPage,
      countPage: contact.countPage,
      contact: contact.contact,
    });
  },
  contactDetail: async (req: Request, res: Response, next: NextFunction) => {
    /**
        #swagger.tags = ['User -- Admin Access']
        #swagger.security = [{ "Bearer": [] }]
        #swagger.summary = 'Contact by ID'
        #swagger.description = 'Contact by ID'
        #swagger.responses[200] = {
          description: 'Successfully get Contact by ID',
        }
        #swagger.responses[404] = {
          description: '"Contact not found',
          schema: {
            status: "error", 
            
            message: "Contact not found"
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
    const contactId = req.params["contactId"];

    let contact = await req.FeatruredUC.contactDetail(contactId);

    if (!contact) {
      return next(new ErrorHandler("Contact not found", 404));
    }

    res.json({
      status: "success",
      contact: contact,
    });
  },
};
