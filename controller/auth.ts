import { Request, Response, NextFunction } from "express";
import ErrorHandler from "../helper/errorHandler";
import validation from "../validation";

export default {
  login: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { error } = validation.login(req.body);

      if (error)
        return next(new ErrorHandler(error["details"][0].message, 400));

      let user = await req.AuthUC.login(req.body);

      if (!user) {
        return next(new ErrorHandler("Incorrect username or password", 403));
      }

      res.status(200).json({
        status: "success",
        user: user["user"],
        tokenAccess: user["tokenAccess"],
      });
    } catch (err: any) {
      return next(new ErrorHandler(err["message"], 500));
    }
  },
};
