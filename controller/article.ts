import { Request, Response, NextFunction } from "express";
import ErrorHandler from "../helper/errorHandler";
import validation from "../validation";

export default {
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

      let articles = await req.ArticleUC.searchByElastic({
        search: search,
        size: size,
        from: from,
      });

      if (articles == null) {
        articles = [];
      }

      res.status(200).json({
        status: "success",
        total: articles["hits"]["total"]["value"],
        articles: articles["hits"]["hits"],
        currentPage: from ? +from : 0,
        countPage: Math.ceil(articles["hits"]["total"]["value"] / size),
      });
    } catch (err: any) {
      return next(new ErrorHandler(err["message"], 500));
    }
  },

  advancedByElastic: async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      let bodyQuery = {
        from: req.query["from"] || 0,
        size: req.query["size"] || 25,
        query: {
          nested: {
            path: "authors",
            query: {
              bool: {
                should: [{ match: { "authors.firstname": "dian" } }],
              },
            },
          },
        },
      };

      let articles = await req.ArticleUC.advancedByElastic(bodyQuery);

      if (articles == null) {
        articles = [];
      }

      res.status(200).json({
        status: "success",
        total: articles["hits"]["total"]["value"],
        articles: articles["hits"]["hits"],
        currentPage: req.body["from"] ? +req.body["from"] : 0,
        countPage: Math.ceil(
          articles["hits"]["total"]["value"] / req.body["size"]
        ),
      });
    } catch (err: any) {
      return next(new ErrorHandler(err["message"], 500));
    }
  },

  articleById: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const articleId = req.params["articleId"];

      let article = await req.ArticleUC.articleById(articleId);

      if (!article) {
        return next(new ErrorHandler("Article not found", 404));
      }

      res.status(200).json({
        status: "success",
        article: article,
      });
    } catch (err: any) {
      return next(new ErrorHandler(err["message"], 500));
    }
  },

  createArticle: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { error } = validation.article(req.body);

      if (error)
        return next(new ErrorHandler(error["details"][0].message, 400));

      let journal = await req.JournalUC.journalById(req.body["journal_id"]);

      if (!journal) {
        return next(new ErrorHandler("Journal not found", 404));
      }

      let article = await req.ArticleUC.createArticle(req.body);

      if (!article) {
        return next(new ErrorHandler("Article DOI not available", 400));
      }

      res.status(201).json({
        status: "success",
        article: article,
      });
    } catch (err: any) {
      return next(new ErrorHandler(err["message"], 500));
    }
  },
  updateArticle: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const articleId = req.params["articleId"];

      let checkArticle = await req.ArticleUC.articleById(articleId);

      if (!checkArticle) {
        return next(new ErrorHandler("Article not found", 404));
      }

      const { error } = validation.article(req.body);
      if (error)
        return next(new ErrorHandler(error["details"][0].message, 400));

      let article = await req.ArticleUC.updateArticle(checkArticle, req.body);

      res.status(200).json({
        status: "success",
        article: article,
      });
    } catch (err: any) {
      return next(new ErrorHandler(err["message"], 500));
    }
  },
  deleteArticle: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const articleId = req.params["articleId"];

      let checkArticle = await req.ArticleUC.articleById(articleId);

      if (!checkArticle) {
        return next(new ErrorHandler("Article not found", 404));
      }

      await req.ArticleUC.deleteArticle(checkArticle);

      res.status(200).json({
        status: "success",
        message: `Successfully deleted article ${checkArticle["title"]}`,
      });
    } catch (err: any) {
      return next(new ErrorHandler(err["message"], 500));
    }
  },
};
