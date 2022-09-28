import passport from "passport";
import { Request, Response, NextFunction } from "express";
import ErrorHandler from "../helper/errorHandler";

export default {
  authenticate: (req: Request, res: Response, next: NextFunction) => {
    passport.authenticate("jwt", { session: false }, (err, user) => {
      if (err || !user) {
        return next(new ErrorHandler("Unauthorized", 401));
      }

      req.user = user;

      next();
    })(req, res, next);
  },
};
