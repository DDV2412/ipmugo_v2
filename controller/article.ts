import { Request, Response, NextFunction } from "express";
import ErrorHandler from "../helper/errorHandler";
import validation from "../validation";

export default {
  allArticles: async (req: Request, res: Response, next: NextFunction) => {
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
    const articleId = req.params["articleId"];

    let article = await req.ArticleUC.articleById(articleId);

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

    if (!article) {
      return next(new ErrorHandler("Article not found", 404));
    }

    res.json({
      status: "success",
      article: article,
      release: release,
    });
  },

  createArticle: async (req: Request, res: Response, next: NextFunction) => {
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
