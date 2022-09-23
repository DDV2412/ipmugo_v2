import { Request, Response, NextFunction } from "express";
import ErrorHandler from "../helper/errorHandler";
import validation from "../validation";

export default {
  allArticles: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { limit, sort, page, sortBy } = req.query;

      let articles = await req.uc.ArticleUC.allArticles({
        limit,
        sort,
        page,
        sortBy,
      });

      if (articles == null) {
        articles = [];
      }

      res.status(200).json({
        status: "success",
        total: articles.count,
        articles: articles.rows,
      });
    } catch (err: any) {
      return next(new ErrorHandler(err["message"], 500));
    }
  },
  articleById: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const articleId = req.params["articleId"];

      let article = await req.uc.ArticleUC.articleById(articleId);

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

      console.log(req.body);

      let article = await req.uc.ArticleUC.createArticle(req.body);

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

      let checkArticle = await req.uc.ArticleUC.articleById(articleId);

      if (!checkArticle) {
        return next(new ErrorHandler("Article not found", 404));
      }

      const { error } = validation.article(req.body);
      if (error)
        return next(new ErrorHandler(error["details"][0].message, 400));

      let journal = await req.uc.ArticleUC.updateJournal(
        checkArticle,
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
  deleteArticle: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { error } = validation.journal(req.body);

      const articleId = req.params["articleId"];

      if (error)
        return next(new ErrorHandler(error["details"][0].message, 400));

      let checkArticle = await req.uc.ArticleUC.articleById(articleId);

      if (!checkArticle) {
        return next(new ErrorHandler("Article not found", 404));
      }

      await req.uc.ArticleUC.deleteJournal(checkArticle);

      res.status(200).json({
        status: "success",
        message: `Successfully deleted journal name ${checkArticle["title"]}`,
      });
    } catch (err: any) {
      return next(new ErrorHandler(err["message"], 500));
    }
  },
};
