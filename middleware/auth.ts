import passport from "passport";
import { Request, Response, NextFunction } from "express";
import ErrorHandler from "../helper/errorHandler";

export default {
  authenticate: (req: Request, res: Response, next: NextFunction) => {
    passport.authenticate("jwt", { session: false }, (err, user) => {
      if (err || !user) {
        return next(new ErrorHandler("Unauthorized", 401));
      }

      req.User = user;

      if (!req.User) {
        return next(new ErrorHandler("Unauthorized", 401));
      }

      next();
    })(req, res, next);
  },
  google: (req: Request, res: Response, next: NextFunction) => {
    passport.authenticate(
      "google",
      { scope: ["profile", "email"] },
      (err, user) => {
        if (err || !user) {
          return next(new ErrorHandler("Unauthorized", 401));
        }

        req.User = user;

        if (!req.User) {
          return next(new ErrorHandler("Unauthorized", 401));
        }

        next();
      }
    )(req, res, next);
  },
};
