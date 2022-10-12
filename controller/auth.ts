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

    if (!user) {
      return next(new ErrorHandler("Email or username not available", 403));
    }

    res.json({
      status: "success",
      user: user["user"],
      token: user["token"],
    });
  },

  forgotPassword: async (req: Request, res: Response, next: NextFunction) => {
    const { error } = validation.forgotPass(req.body);

    if (error) return next(new ErrorHandler(error["details"][0].message, 400));

    const checkEmail = await req.UserUC.getUserByEmail(req.body["email"]);

    if (!checkEmail) {
      return next(new ErrorHandler("Email not available", 403));
    }

    let reset = await req.AuthUC.forgotPassword(req.body["email"]);

    if (reset == null) {
      return next(new ErrorHandler("Email not available", 403));
    }

    res.json({
      status: "success",
      message: `Email sent to ${req.body.email} successfully`,
    });
  },

  resetPassword: async (req: Request, res: Response, next: NextFunction) => {
    const { token, email } = req.query;

    const { error } = validation.resetPassword(req.body);

    if (error) return next(new ErrorHandler(error["details"][0].message, 400));

    if (req.body["password"] !== req.body["confirmPassword"]) {
      return next(new ErrorHandler("Password not match", 400));
    }

    let reset = await req.AuthUC.resetPassword(
      token,
      email,
      req.body["password"]
    );

    if (reset == null) {
      return next(
        new ErrorHandler(
          "Token has expired. Please try password reset again.",
          400
        )
      );
    }

    res.json({
      status: "success",
      message: `Password reset. Please login with your new password.`,
    });
  },
};
