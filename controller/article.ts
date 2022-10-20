import { Request, Response, NextFunction } from "express";
import ErrorHandler from "../helper/errorHandler";
import validation from "../validation";

export default {
  allArticles: async (req: Request, res: Response, next: NextFunction) => {
    /**
      #swagger.tags = ['Article']
      #swagger.summary = 'Article list'
      #swagger.description = 'Article list'
      #swagger.responses[200] = {
            description: 'Article successfully.',
            schema: [{ $ref: '#/definitions/Article' }]
      }

      */
    const { page, size, filters } = req.query;

    let articles = await req.ArticleUC.allArticles(page, size, filters);

    if (!articles) {
      articles = [];
    }

    res.json({
      status: "success",
      total: articles.total,
      currentPage: articles.currentPage,
      countPage: articles.countPage,
      articles: articles.articles,
    });
  },

  articleById: async (req: Request, res: Response, next: NextFunction) => {
    /**
     #swagger.tags = ['Article']
     #swagger.summary = 'Article by ID'
     #swagger.description = 'Article by ID'
     #swagger.responses[200] = {
       description: 'Article successfully.',
       schema: [{ $ref: '#/definitions/Article' }]
     }
     #swagger.responses[404] = {
       description: 'Article not found',
       schema: {
         status: "error", 
          message: "Article not found",
       }
     }
       
     */

    const articleId = req.params["articleId"];

    let article = await req.ArticleUC.articleById(articleId);

    if (!article) {
      return next(new ErrorHandler("Article not found", 404));
    }

    let release = await req.FeatruredUC.search({
      indexName: "articles",
      body: {
        from: 0,
        size: 5,
        sort:
          article["keyword"] != null
            ? { _score: { order: "desc" } }
            : {
                publish_date: {
                  order: "desc",
                  format: "strict_date_optional_time_nanos",
                },
              },
        query: {
          bool: {
            must: [
              article["keyword"] != null
                ? { match_phrase: { keyword: article["keyword"] } }
                : { match_all: {} },
            ],
          },
        },
      },
    });

    res.json({
      status: "success",
      article: article,
      release: release,
    });
  },

  createArticle: async (req: Request, res: Response, next: NextFunction) => {
    /**
        #swagger.tags = ['Article']
        #swagger.security = [{ "Bearer": [] }]
        #swagger.summary = 'Create Article '
        #swagger.description = 'Create Article '
        #swagger.parameters['obj'] = {
            in: 'body',
            description: 'Add Article',
            required: true,
            schema: {
              $ref: '#/definitions/InsertArticle'
            }
          },
        #swagger.responses[201] = {
          description: 'Successfully added new article.',
          schema: { $ref: '#/definitions/Articles' }
        }
        #swagger.responses[404] = {
          description: 'Journal by ID not found',
          schema: {
            status: "error", 
            
            message: "Journal not found"
          }
        }
        #swagger.responses[400] = {
          description: 'Validation error',
          schema: {
            status: "error", 
            
            message: "____"
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
    const { error } = validation.article(req.body);

    if (error) return next(new ErrorHandler(error["details"][0].message, 400));

    let journal = await req.JournalUC.journalById(req.body["journal_id"]);

    if (!journal) {
      return next(new ErrorHandler("Journal not found", 404));
    }

    let article = await req.ArticleUC.createArticle(req.body);

    if (!article) {
      return next(new ErrorHandler("Article DOI not available", 400));
    }

    res.json({
      status: "success",
      article: article,
    });
  },

  updateArticle: async (req: Request, res: Response, next: NextFunction) => {
    /**
       #swagger.tags = ['Article']
       #swagger.security = [{ "Bearer": [] }]
        #swagger.summary = 'Update Article by ID'
        #swagger.description = 'Update Article by ID'
        #swagger.parameters['obj'] = {
            in: 'body',
            description: 'Add Article',
            required: true,
            schema: {
              $ref: '#/definitions/InsertArticle'
            }
          },
        #swagger.responses[201] = {
          description: 'Successfully added new article.',
          schema: { $ref: '#/definitions/Articles' }
        }
        #swagger.responses[404] = {
          description: 'Journal by ID not found',
          schema: {
            status: "error", 
            
            message: "Journal not found"
          }
        }
        #swagger.responses[400] = {
          description: 'Validation error',
          schema: {
            status: "error", 
            
            message: "____"
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

    const articleId = req.params["articleId"];

    let checkArticle = await req.ArticleUC.articleById(articleId);

    if (!checkArticle) {
      return next(new ErrorHandler("Article not found", 404));
    }

    const { error } = validation.article(req.body);
    if (error) return next(new ErrorHandler(error["details"][0].message, 400));

    await req.ArticleUC.updateArticle(articleId, req.body);

    res.json({
      status: "success",
      message: `Successfully updated article`,
    });
  },

  deleteArticle: async (req: Request, res: Response, next: NextFunction) => {
    /**
        #swagger.tags = ['Article']
        #swagger.security = [{ "Bearer": [] }]
        #swagger.summary = 'Delete article by ID'
        #swagger.description = 'Delete  article by ID'
        #swagger.responses[200] = {
          description: 'Successfully deleted article.',
          schema: { $ref: '#/definitions/Article' }
        }
        #swagger.responses[404] = {
          description: 'Article not found',
          schema: {
            status: "error", 
            message: "Article not found",
          }
        }
       
       */

    const articleId = req.params["articleId"];

    let checkArticle = await req.ArticleUC.articleById(articleId);

    if (!checkArticle) {
      return next(new ErrorHandler("Article not found", 404));
    }

    await req.ArticleUC.deleteArticle(articleId);

    res.json({
      status: "success",
      message: `Successfully deleted article`,
    });
  },
};
