import { Request, Response, NextFunction } from "express";
import ErrorHandler from "../helper/errorHandler";
import validation from "../validation";
import bcryptjs from "bcryptjs";

export default {
  allUsers: async (req: Request, res: Response, next: NextFunction) => {
    try {
      let { search } = req.query;

      let users = await req.UserUC.allUsers({
        name: search,
      });

      if (users == null) {
        users = [];
      }

      res.status(200).json({
        status: "success",
        total: users.count,
        users: users.rows,
      });
    } catch (err: any) {
      return next(new ErrorHandler(err["message"], 500));
    }
  },

  getUserById: async (req: Request, res: Response, next: NextFunction) => {
    try {
      let { userId } = req.params;

      let user = await req.UserUC.getUserById(userId);

      if (!user) {
        return next(new ErrorHandler("User not found", 404));
      }

      res.status(200).json({
        status: "success",
        user: user,
      });
    } catch (err: any) {
      return next(new ErrorHandler(err["message"], 500));
    }
  },
  createUser: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { error } = validation.user(req.body);

      if (error)
        return next(new ErrorHandler(error["details"][0].message, 400));

      let roles: any = [];
      req.body["roles"].map(async (role: {}) => {
        const check = await req.RoleUC.roleByName(role["role_name"]);

        if (!check) return next(new ErrorHandler("Role not found", 404));

        roles.push(check);
      });

      req.body["role"] = roles;

      req.body["password"] = bcryptjs.hashSync(req.body["password"], 12);

      let user = await req.UserUC.createUser(req.body);

      if (!user) {
        return next(new ErrorHandler("Username or email not available", 400));
      }

      res.status(201).json({
        status: "success",
        user: user,
      });
    } catch (err: any) {
      return next(new ErrorHandler(err["message"], 500));
    }
  },
  updateUser: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.params["userId"];

      let checkuser = await req.UserUC.getUserById(userId);

      if (!checkuser) {
        return next(new ErrorHandler("User not found", 404));
      }

      const { error } = validation.user(req.body);

      if (error)
        return next(new ErrorHandler(error["details"][0].message, 400));

      let roles: any = [];
      req.body["roles"].map(async (role: {}) => {
        const check = await req.RoleUC.roleByName(role["role_name"]);

        if (!check) return next(new ErrorHandler("Role not found", 404));

        roles.push(check);
      });

      req.body["role"] = roles;

      if (
        typeof req.body["password"] != "undefined" &&
        req.body["password"] != null
      ) {
        req.body["password"] = bcryptjs.hashSync(req.body["password"], 12);
      }
      let user = await req.UserUC.updateUser(checkuser, req.body);

      res.status(200).json({
        status: "success",
        user: user,
      });
    } catch (err: any) {
      return next(new ErrorHandler(err["message"], 500));
    }
  },
  deleteUser: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.params["userId"];

      let checkuser = await req.UserUC.getUserById(userId);

      if (!checkuser) {
        return next(new ErrorHandler("User not found", 404));
      }

      await req.UserUC.deleteUser(checkuser);

      res.status(200).json({
        status: "success",
        message: `Successfully deleted user ${checkuser["name"]}`,
      });
    } catch (err: any) {
      return next(new ErrorHandler(err["message"], 500));
    }
  },

  saveBookmark: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { user_id, article_id } = req.body;

      let checkuser = await req.UserUC.getUserById(user_id);

      if (!checkuser) {
        return next(new ErrorHandler("User not found", 404));
      }

      let checkArticle = await req.ArticleUC.articleById(article_id);

      if (!checkArticle) {
        return next(new ErrorHandler("Article not found", 404));
      }

      await req.UserUC.saveBookmark({
        user_id: checkuser["id"],
        article_id: checkArticle["id"],
      });

      res.status(200).json({
        status: "success",
        message: `Successfully saved bookmark ${checkArticle["title"]}`,
      });
    } catch (err: any) {
      return next(new ErrorHandler(err["message"], 500));
    }
  },

  deleteBookmark: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { user_id, article_id } = req.params;

      let checkBook = await req.UserUC.bookmarkById({
        user_id: user_id,
        article_id: article_id,
      });

      if (!checkBook) {
        return next(new ErrorHandler("Bookmark not found", 404));
      }

      await req.UserUC.deleteBookmark({
        user_id: user_id,
        article_id: article_id,
      });

      res.status(200).json({
        status: "success",
        message: `Successfully deleted bookmark`,
      });
    } catch (err: any) {
      return next(new ErrorHandler(err["message"], 500));
    }
  },
};
