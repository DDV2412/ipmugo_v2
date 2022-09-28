import { Request, Response, NextFunction } from "express";
import ErrorHandler from "../helper/errorHandler";
import validation from "../validation";

export default {
  searchByElastic: async (req: Request, res: Response, next: NextFunction) => {
    try {
      let size: any = 10;

      let { search, from } = req.query;

      if (
        typeof req.query["size"] != "undefined" ||
        req.query["size"] != null
      ) {
        size = req.query["size"];
      }

      let interests = await req.InterestUC.searchByElastic({
        name: search,
        size: size,
        from: from,
      });

      if (interests == null) {
        interests = [];
      }

      res.status(200).json({
        status: "success",
        total: interests["hits"]["total"]["value"],
        interests: interests["hits"]["hits"],
        currentPage: from ? +from : 0,
        countPage: Math.ceil(interests["hits"]["total"]["value"] / size),
      });
    } catch (err: any) {
      return next(new ErrorHandler(err["message"], 500));
    }
  },

  interestById: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const interestId = req.params["interestId"];

      let interest = await req.InterestUC.interestById(interestId);

      if (!interest) {
        return next(new ErrorHandler("Interest not found", 404));
      }

      res.status(200).json({
        status: "success",
        interest: interest,
      });
    } catch (err: any) {
      return next(new ErrorHandler(err["message"], 500));
    }
  },
  createInterest: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { error } = validation.interest(req.body);

      if (error)
        return next(new ErrorHandler(error["details"][0].message, 400));

      let interest = await req.InterestUC.createInterest(req.body);

      res.status(201).json({
        status: "success",
        interest: interest,
      });
    } catch (err: any) {
      return next(new ErrorHandler(err["message"], 500));
    }
  },
  updateInterest: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const interestId = req.params["interestId"];

      let checkInterest = await req.InterestUC.interestById(interestId);

      if (!checkInterest) {
        return next(new ErrorHandler("Interest not found", 404));
      }

      const { error } = validation.interest(req.body);

      if (error)
        return next(new ErrorHandler(error["details"][0].message, 400));

      let interest = await req.InterestUC.updateInterest(
        checkInterest,
        req.body
      );

      res.status(200).json({
        status: "success",
        interest: interest,
      });
    } catch (err: any) {
      return next(new ErrorHandler(err["message"], 500));
    }
  },
  deleteInterest: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const interestId = req.params["interestId"];

      let checkInterest = await req.InterestUC.interestById(interestId);

      if (!checkInterest) {
        return next(new ErrorHandler("Interest not found", 404));
      }

      await req.InterestUC.deleteInterest(checkInterest);

      res.status(200).json({
        status: "success",
        message: `Successfully deleted interest ${checkInterest["name"]}`,
      });
    } catch (err: any) {
      return next(new ErrorHandler(err["message"], 500));
    }
  },
};
