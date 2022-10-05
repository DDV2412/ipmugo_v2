import { Request, Response, NextFunction } from "express";
import ErrorHandler from "../helper/errorHandler";
import validation from "../validation";

export default {
  login: async (req: Request, res: Response, next: NextFunction) => {
    const { error } = validation.login(req.body);

    if (error) return next(new ErrorHandler(error["details"][0].message, 400));

    let user = await req.AuthUC.login(req.body);

    if (!user) {
      return next(new ErrorHandler("Incorrect username or password", 403));
    }

    res.json({
      status: "success",
      user: user["user"],
      token: user["token"],
    });
  },

  register: async (req: Request, res: Response, next: NextFunction) => {
    const { error } = validation.register(req.body);

    if (error) return next(new ErrorHandler(error["details"][0].message, 400));

    let user = await req.AuthUC.register(req.body);

    res.json({
      status: "success",
      user: user["user"],
      token: user["token"],
    });
  },
};
