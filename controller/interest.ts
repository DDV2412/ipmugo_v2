import { Request, Response, NextFunction } from "express";
import ErrorHandler from "../helper/errorHandler";
import validation from "../validation";

export default {
  allInterests: async (req: Request, res: Response, next: NextFunction) => {
    let interests = await req.InterestUC.allInterests();

    if (interests == null) {
      interests = [];
    }

    res.json({
      status: "success",
      total: interests.count,
      interests: interests.rows,
    });
  },

  interestById: async (req: Request, res: Response, next: NextFunction) => {
    const interestId = req.params["interestId"];

    let interest = await req.InterestUC.interestById(interestId);

    if (!interest) {
      return next(new ErrorHandler("Interest not found", 404));
    }

    res.json({
      status: "success",
      interest: interest,
    });
  },
  createInterest: async (req: Request, res: Response, next: NextFunction) => {
    const { error } = validation.interest(req.body);

    if (error) return next(new ErrorHandler(error["details"][0].message, 400));

    let interest = await req.InterestUC.createInterest(req.body);

    res.json({
      status: "success",
      interest: interest,
    });
  },
  updateInterest: async (req: Request, res: Response, next: NextFunction) => {
    const interestId = req.params["interestId"];

    let checkInterest = await req.InterestUC.interestById(interestId);

    if (!checkInterest) {
      return next(new ErrorHandler("Interest not found", 404));
    }

    const { error } = validation.interest(req.body);

    if (error) return next(new ErrorHandler(error["details"][0].message, 400));

    await req.InterestUC.updateInterest(interestId, req.body);

    res.json({
      status: "success",
      message: `Successfully deleted interest`,
    });
  },
  deleteInterest: async (req: Request, res: Response, next: NextFunction) => {
    const interestId = req.params["interestId"];

    let checkInterest = await req.InterestUC.interestById(interestId);

    if (!checkInterest) {
      return next(new ErrorHandler("Interest not found", 404));
    }

    await req.InterestUC.deleteInterest(interestId);

    res.json({
      status: "success",
      message: `Successfully deleted interest`,
    });
  },
};
