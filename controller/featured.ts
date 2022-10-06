import { Request, Response, NextFunction } from "express";
import ErrorHandler from "../helper/errorHandler";

export default {
  search: async (req: Request, res: Response, next: NextFunction) => {
    const { search, page, size } = req.query;

    let articles = await req.FeatruredUC.search({
      indexName: "articles",
      body: {
        from: page ? +page : 0,
        size: size ? size : 15,
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
};
