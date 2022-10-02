import { Request, Response, NextFunction } from "express";
import ErrorHandler from "../helper/errorHandler";

export default {
  search: async (req: Request, res: Response, next: NextFunction) => {
    const { search } = req.query;

    let articles = await req.FeatruredUC.search({
      indexName: "articles",
      body: {
        size: 25,
        from: 0,
        query: {
          should: [
            {
              term: {
                title: search,
              },
            },
            {
              term: {
                topic: search,
              },
            },
            {
              term: {
                abstract: search,
              },
            },
            {
              term: {
                keywords: search,
              },
            },
          ],
        },
        sort: [{ createdAt: { order: "asc" } }],
        aggs: {},
      },
    });

    res.json({
      status: "success",
      articles: articles,
    });
  },
};
