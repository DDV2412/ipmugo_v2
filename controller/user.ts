import { Request, Response, NextFunction } from "express";
import ErrorHandler from "../helper/errorHandler";
import validation from "../validation";
import bcryptjs from "bcryptjs";

export default {
  allUsers: async (req: Request, res: Response, next: NextFunction) => {
    const { page, size, filters } = req.query;

    let users = await req.UserUC.allUsers(page, size, filters);

    if (users == null) {
      users = [];
    }

    res.json({
      status: "success",
      total: users.total,
      currentPage: users.currentPage,
      countPage: users.countPage,
      users: users.users,
    });
  },

  getUserById: async (req: Request, res: Response, next: NextFunction) => {
    const { userId } = req.params;

    let user = await req.UserUC.getUserById(userId);

    if (!user) {
      return next(new ErrorHandler("User not found", 404));
    }

    res.json({
      status: "success",
      user: user,
    });
  },
  createUser: async (req: Request, res: Response, next: NextFunction) => {
    const { error } = validation.user(req.body);

    if (error) return next(new ErrorHandler(error["details"][0].message, 400));

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

    res.json({
      status: "success",
      user: user,
    });
  },
  updateUser: async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.params["userId"];

    let checkuser = await req.UserUC.getUserById(userId);

    if (!checkuser) {
      return next(new ErrorHandler("User not found", 404));
    }

    const { error } = validation.user(req.body);

    if (error) return next(new ErrorHandler(error["details"][0].message, 400));

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
    await req.UserUC.updateUser(userId, req.body);

    res.json({
      status: "success",
      message: `Successfully updated user`,
    });
  },
  deleteUser: async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.params["userId"];

    let checkuser = await req.UserUC.getUserById(userId);

    if (!checkuser) {
      return next(new ErrorHandler("User not found", 404));
    }

    await req.UserUC.deleteUser(userId);

    res.json({
      status: "success",
      message: `Successfully deleted user`,
    });
  },

  saveBookmark: async (req: Request, res: Response, next: NextFunction) => {
    if (!req.User) {
      return next(new ErrorHandler("Unauthorized", 401));
    }
    const { error } = validation.bookmarks(req.body);

    if (error) return next(new ErrorHandler(error["details"][0].message, 400));

    await req.body["bookmarks"].map(async (bookmark: []) => {
      await req.UserUC.saveBookmark({
        user_id: req.User["id"],
        article_id: bookmark["article_id"],
      });
    });

    res.json({
      status: "success",
      message: `Successfully saved bookmark`,
    });
  },

  deleteBookmark: async (req: Request, res: Response, next: NextFunction) => {
    if (!req.User) {
      return next(new ErrorHandler("Unauthorized", 401));
    }

    const { error } = validation.bookmarks(req.body);

    if (error) return next(new ErrorHandler(error["details"][0].message, 400));

    await req.body["bookmarks"].map(async (bookmark: {}) => {
      await req.UserUC.deleteBookmark({
        user_id: req.User["id"],
        article_id: bookmark["article_id"],
      });
    });

    res.json({
      status: "success",
      message: `Successfully deleted bookmark`,
    });
  },

  assignAuthor: async (req: Request, res: Response, next: NextFunction) => {
    const { error } = validation.assignAuthor(req.body);

    if (error) return next(new ErrorHandler(error["details"][0].message, 400));

    await req.body["authors"].map(async (author: {}) => {
      await req.UserUC.assignAuthor({
        author_id: author["author_id"],
        article_id: author["article_id"],
      });
    });

    res.json({
      status: "success",
      message: `Successfully added author`,
    });
  },

  deleteAuthor: async (req: Request, res: Response, next: NextFunction) => {
    const { error } = validation.assignAuthor(req.body);

    if (error) return next(new ErrorHandler(error["details"][0].message, 400));

    await req.body["authors"].map(async (author: {}) => {
      await req.UserUC.deleteAuthor({
        author_id: author["author_id"],
        article_id: author["article_id"],
      });
    });

    res.json({
      status: "success",
      message: `Successfully deleted author`,
    });
  },

  assignEditor: async (req: Request, res: Response, next: NextFunction) => {
    const { error } = validation.assignEditor(req.body);

    if (error) return next(new ErrorHandler(error["details"][0].message, 400));

    await req.body["editors"].map(async (editor: {}) => {
      await req.UserUC.assignEditor({
        editor_id: editor["editor_id"],
        journal_id: editor["journal_id"],
      });
    });

    res.json({
      status: "success",
      message: `Successfully added editor`,
    });
  },

  deleteEditor: async (req: Request, res: Response, next: NextFunction) => {
    const { error } = validation.assignEditor(req.body);

    if (error) return next(new ErrorHandler(error["details"][0].message, 400));

    await req.body["editors"].map(async (editor: {}) => {
      await req.UserUC.deleteEditor({
        editor_id: editor["editor_id"],
        journal_id: editor["journal_id"],
      });
    });

    res.json({
      status: "success",
      message: `Successfully deleted editor`,
    });
  },
};
