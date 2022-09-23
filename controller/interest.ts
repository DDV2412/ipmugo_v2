import { Request, Response, NextFunction } from "express";
import ErrorHandler from "../helper/errorHandler";
import validation from "../validation";

export default {
  allInterests: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { search } = req.query;

      let interests = await req.uc.InterestUC.allInterests({
        search,
      });

      if (interests == null) {
        interests = [];
      }

      res.status(200).json({
        status: "success",
        total: interests.count,
        interests: interests.rows,
      });
    } catch (err: any) {
      return next(new ErrorHandler(err["message"], 500));
    }
  },
  interestById: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const interestId = req.params["interestId"];

      let interest = await req.uc.InterestUC.interestById(interestId);

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

      let interest = await req.uc.InterestUC.createInterest(req.body);

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

      let checkInterest = await req.uc.InterestUC.interestById(interestId);

      if (!checkInterest) {
        return next(new ErrorHandler("Interest not found", 404));
      }

      const { error } = validation.interest(req.body);

      if (error)
        return next(new ErrorHandler(error["details"][0].message, 400));

      let article = await req.uc.InterestUC.updateInterest(
        checkInterest,
        req.body
      );

      res.status(200).json({
        status: "success",
        article: article,
      });
    } catch (err: any) {
      return next(new ErrorHandler(err["message"], 500));
    }
  },
  deleteInterest: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const interestId = req.params["interestId"];

      let checkInterest = await req.uc.InterestUC.interestById(interestId);

      if (!checkInterest) {
        return next(new ErrorHandler("Interest not found", 404));
      }

      await req.uc.InterestUC.deleteInterest(checkInterest);

      res.status(200).json({
        status: "success",
        message: `Successfully deleted interest ${checkInterest["name"]}`,
      });
    } catch (err: any) {
      return next(new ErrorHandler(err["message"], 500));
    }
  },
};
