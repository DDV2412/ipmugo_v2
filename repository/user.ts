import db from "../models";
import loggerWinston from "../helper/logger-winston";
import User from "../models/user";
import Role from "../models/role";
import { IncludeOptions } from "sequelize";
import UserRole from "../models/user_role";
import Bookmark from "../models/bookmark";
import Article from "../models/article";
import bcryptjs from "bcryptjs";

class UserRepo {
  User: typeof User;
  Role: typeof Role;
  UserRole: typeof UserRole;
  Bookmark: typeof Bookmark;
  Article: typeof Article;

  constructor() {
    this.User = User;
    this.Role = Role;
    this.UserRole = UserRole;
    this.Bookmark = Bookmark;
    this.Article = Article;
  }

  allUsers = async (filters: {}) => {
    try {
      let where = filters["name"]
        ? {
            name: filters["name"],
          }
        : {};
      let users = await db.transaction(async (transaction) => {
        return await this.User.findAndCountAll({
          where: where,
          transaction,
          include: [
            {
              model: this.Role,
              as: "roles",
              transaction,
            } as IncludeOptions,
            {
              model: this.Article,
              as: "bookmarks",
              transaction,
            } as IncludeOptions,
          ],
          distinct: true,
        });
      });

      return users;
    } catch (error) {
      loggerWinston.error(error);
      return null;
    }
  };

  userByUsername = async (username: string) => {
    try {
      let user = await db.transaction(async (transaction) => {
        return await this.User.findOne({
          where: {
            username: username,
          },
          include: [
            {
              model: Role,
              as: "roles",
              transaction,
            } as IncludeOptions,
            {
              model: this.Article,
              as: "bookmarks",
              transaction,
            } as IncludeOptions,
          ],
          transaction,
        });
      });

      return user;
    } catch (error) {
      loggerWinston.error(error);
      return null;
    }
  };

  login = async (userData: {}) => {
    try {
      let user = await this.userByUsername(userData["username"]);

      if (!user) {
        return null;
      }

      if (!bcryptjs.compareSync(userData["password"], user["password"])) {
        return null;
      }

      return user;
    } catch (error) {
      loggerWinston.error(error);
      return null;
    }
  };
  getUserById = async (id: string) => {
    try {
      let user = await db.transaction(async (transaction) => {
        return await this.User.findOne({
          where: {
            id: id,
          },
          include: [
            {
              model: Role,
              as: "roles",
              transaction,
            } as IncludeOptions,
          ],
          transaction,
        });
      });

      return user;
    } catch (error) {
      loggerWinston.error(error);
      return null;
    }
  };

  createUser = async (userData: any) => {
    try {
      let user = await db.transaction(async (transaction) => {
        return await this.User.create(userData);
      });

      userData["role"].map(async (role: any) => {
        await this.UserRole.create({
          user_id: user["id"],
          role_id: role["id"],
        });
      });

      return user;
    } catch (error) {
      loggerWinston.error(error);
      return null;
    }
  };

  updateUser = async (user: any, userData: {}) => {
    try {
      let update = await db.transaction(async (transaction) => {
        return await user.update(userData, transaction);
      });

      userData["role"].map(async (role: any) => {
        await this.UserRole.destroy({
          where: {
            user_id: user["id"],
          },
          truncate: true,
        });

        await this.UserRole.create({
          user_id: user["id"],
          role_id: role["id"],
        });
      });

      return update;
    } catch (error) {
      loggerWinston.error(error);
      return null;
    }
  };

  deleteUser = async (user: any) => {
    try {
      return await db.transaction(async (transaction) => {
        return await user.destroy();
      });
    } catch (error) {
      loggerWinston.error(error);
      return null;
    }
  };

  saveBookmark = async (userData: {}) => {
    try {
      return await db.transaction(async (transaction) => {
        return await this.Bookmark.create(userData);
      });
    } catch (error) {
      loggerWinston.error(error);
      return null;
    }
  };

  deleteBookmark = async (options: {}) => {
    try {
      return await db.transaction(async (transaction) => {
        return await this.Bookmark.destroy({
          where: {
            user_id: options["user_id"],
            article_id: options["article_id"],
          },
        });
      });
    } catch (error) {
      loggerWinston.error(error);
      return null;
    }
  };

  bookmarkById = async (options: {}) => {
    try {
      return await db.transaction(async (transaction) => {
        return await this.Bookmark.findOne({
          where: {
            user_id: options["user_id"],
            article_id: options["article_id"],
          },
        });
      });
    } catch (error) {
      loggerWinston.error(error);
      return null;
    }
  };
}

export default UserRepo;
