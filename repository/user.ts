import db from "../models";
import loggerWinston from "../helper/logger-winston";
import User from "../models/user";
import Role from "../models/role";
import { IncludeOptions } from "sequelize";
import UserRole from "../models/user_role";
import Bookmark from "../models/bookmark";
import Article from "../models/article";
import { compareSync, hashSync } from "bcryptjs";
import AssignAuthor from "../models/assign_author";
import AssignEditor from "../models/assign_editor";
import Journal from "../models/journal";
import ScholarProfile from "../models/scholar_profile";
import ScholarStatistic from "../models/scholar_statistic";
import ScholarCOAuthor from "../models/scholar_co_author";
import RequestPagination from "../helper/requestPagination";

class UserRepo {
  User: typeof User;
  Role: typeof Role;
  UserRole: typeof UserRole;
  Bookmark: typeof Bookmark;
  Article: typeof Article;
  Journal: typeof Journal;
  AssignAuthor: typeof AssignAuthor;
  AssignEditor: typeof AssignEditor;
  ScholarProfile: typeof ScholarProfile;
  ScholarStatistic: typeof ScholarStatistic;
  ScholarCOAuthor: typeof ScholarCOAuthor;
  constructor() {
    this.User = User;
    this.Role = Role;
    this.UserRole = UserRole;
    this.Bookmark = Bookmark;
    this.Article = Article;
    this.Journal = Journal;
    this.AssignAuthor = AssignAuthor;
    this.AssignEditor = AssignEditor;
    this.ScholarProfile = ScholarProfile;
    this.ScholarStatistic = ScholarStatistic;
    this.ScholarCOAuthor = ScholarCOAuthor;
  }

  allUsers = async (
    page: number,
    size: number,
    filters: Record<string, string>
  ) => {
    try {
      const { limit, offset } = new RequestPagination(page, size);

      let users = await db.transaction(async (transaction) => {
        return await this.User.findAndCountAll({
          transaction,
          include: [
            {
              model: this.Role,
              transaction,
            } as IncludeOptions,
            {
              model: this.Article,
              as: "article_published",
              transaction,
            } as IncludeOptions,
            {
              model: this.Article,
              as: "bookmark",
              transaction,
            } as IncludeOptions,
            {
              model: this.Journal,
              transaction,
            } as IncludeOptions,
            {
              model: this.ScholarProfile,
              include: [{ model: this.ScholarStatistic }],
              transaction,
            } as IncludeOptions,
          ],
          limit: limit,
          offset: offset,
          distinct: true,
        });
      });

      return {
        total: users.count,
        currentPage: page ? +page : 0,
        countPage: Math.ceil(users.count / limit),
        users: users.rows,
      };
    } catch (error) {
      loggerWinston.error(error);
      return null;
    }
  };

  GetUsers = async () => {
    try {
      let users = await db.transaction(async (transaction) => {
        return await this.User.findAndCountAll({
          transaction,
          distinct: true,
        });
      });

      return {
        total: users.count,
        users: users.rows,
      };
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
              transaction,
            } as IncludeOptions,
            {
              model: this.Article,
              as: "article_published",
              transaction,
            } as IncludeOptions,
            {
              model: this.Article,
              as: "bookmark",
              transaction,
            } as IncludeOptions,
            {
              model: this.ScholarProfile,
              include: [
                { model: this.ScholarStatistic },
                { model: this.ScholarCOAuthor },
              ],
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

      if (!compareSync(userData["password"], user["password"])) {
        return null;
      }

      return user;
    } catch (error) {
      loggerWinston.error(error);
      return null;
    }
  };

  register = async (userData: Record<string, string>) => {
    try {
      userData["password"] = hashSync(userData["password"], 12);

      let user = await db.transaction(async (transaction) => {
        return await this.User.create({
          username: userData["username"],
          name: userData["name"],
          email: userData["email"],
          password: userData["password"],
        });
      });

      let role = await db.transaction(async (transaction) => {
        return await this.Role.findOne({
          where: {
            role_name: "reader",
          },
        });
      });

      if (role != null) {
        await this.UserRole.create({
          user_id: user["id"],
          role_id: role["id"],
        });
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

  updateUser = async (user_id: string, userData: Record<string, any>) => {
    try {
      let update = await db.transaction(async (transaction) => {
        return await this.User.update(userData, {
          where: {
            id: user_id,
          },
          transaction,
        });
      });

      userData["role"].map(async (role: any) => {
        await this.UserRole.destroy({
          where: {
            user_id: user_id,
          },
          truncate: true,
        });

        await this.UserRole.create({
          user_id: user_id,
          role_id: role["id"],
        });
      });

      return update;
    } catch (error) {
      loggerWinston.error(error);
      return null;
    }
  };

  deleteUser = async (user_id: string) => {
    try {
      return await db.transaction(async (transaction) => {
        return await this.User.destroy({
          where: {
            id: user_id,
          },
          transaction,
        });
      });
    } catch (error) {
      loggerWinston.error(error);
      return null;
    }
  };

  saveBookmark = async (userData: Record<string, any>) => {
    try {
      return await db.transaction(async (transaction) => {
        return await this.Bookmark.create(userData);
      });
    } catch (error) {
      loggerWinston.error(error);
      return null;
    }
  };

  deleteBookmark = async (options: Record<string, any>) => {
    try {
      return await db.transaction(async (transaction) => {
        return await this.Bookmark.destroy({
          where: {
            user_id: options["user_id"],
            article_id: options["article_id"],
          },
          transaction,
        });
      });
    } catch (error) {
      loggerWinston.error(error);
      return null;
    }
  };

  assignAuthor = async (userData: Record<string, any>) => {
    try {
      const user = await this.getUserById(userData["author_id"]);

      const role = await this.Role.findOne({
        where: {
          role_name: "author",
        },
      });

      if (user && role) {
        await this.UserRole.create({
          user_id: user["id"],
          role_id: role["id"],
        });
      }

      return await db.transaction(async (transaction) => {
        return await this.AssignAuthor.create(userData);
      });
    } catch (error) {
      loggerWinston.error(error);
      return null;
    }
  };

  deleteAuthor = async (options: Record<string, any>) => {
    try {
      return await db.transaction(async (transaction) => {
        return await this.AssignAuthor.destroy({
          where: {
            author_id: options["author_id"],
            article_id: options["article_id"],
          },
          transaction,
        });
      });
    } catch (error) {
      loggerWinston.error(error);
      return null;
    }
  };

  assignEditor = async (userData: Record<string, any>) => {
    try {
      const user = await this.getUserById(userData["editor_id"]);

      const role = await this.Role.findOne({
        where: {
          role_name: "editor",
        },
      });

      if (user && role) {
        await this.UserRole.create({
          user_id: user["id"],
          role_id: role["id"],
        });
      }

      return await db.transaction(async (transaction) => {
        return await this.AssignEditor.create(userData);
      });
    } catch (error) {
      loggerWinston.error(error);
      return null;
    }
  };

  deleteEditor = async (options: Record<string, any>) => {
    try {
      return await db.transaction(async (transaction) => {
        return await this.AssignEditor.destroy({
          where: {
            editor_id: options["editor_id"],
            journal_id: options["journal_id"],
          },
          transaction,
        });
      });
    } catch (error) {
      loggerWinston.error(error);
      return null;
    }
  };

  synchronizeScholar = async (options: Record<string, any>) => {
    try {
      return await db.transaction(async (transaction) => {
        const profile = await this.ScholarProfile.findOne({
          where: {
            user_id: options["user_id"],
          },
        });

        if (!profile) {
          const profile = await this.ScholarProfile.create({
            user_id: options["user_id"],
            document_count: options["scholar"]["statistic"]["total"],
            h_index: options["scholar"]["statistic"]["h_index"],
            i10_index: options["scholar"]["statistic"]["i10_index"],
          });

          options["scholar"]["citedBy"].map(async (data: any) => {
            const cited = await this.ScholarStatistic.findOne({
              where: {
                scholar_profile_id: profile["id"],
              },
            });
            if (!cited) {
              await this.ScholarStatistic.create({
                scholar_profile_id: profile["id"],
                year: data["year"],
                count: data["data"],
              });
            } else {
              await this.ScholarStatistic.update(
                {
                  year: data["year"],
                  count: data["data"],
                },
                {
                  where: {
                    scholar_profile_id: profile["id"],
                  },
                }
              );
            }
          });

          options["scholar"]["coAuthors"].map(async (data: any) => {
            const coAuthor = await this.ScholarCOAuthor.findOne({
              where: {
                scholar_profile_id: profile["id"],
              },
            });

            if (!coAuthor) {
              await this.ScholarCOAuthor.create({
                scholar_profile_id: profile["id"],
                name: data["name"],
                affiliation: data["aff"],
              });
            } else {
              await this.ScholarCOAuthor.update(
                {
                  name: data["name"],
                  affiliation: data["aff"],
                },
                {
                  where: {
                    scholar_profile_id: profile["id"],
                  },
                }
              );
            }
          });

          return profile;
        } else {
          const update = await this.ScholarProfile.update(
            {
              document_count: options["scholar"]["statistic"]["total"],
              h_index: options["scholar"]["statistic"]["h_index"],
              i10_index: options["scholar"]["statistic"]["i10_index"],
            },
            {
              where: {
                id: profile["id"],
              },
            }
          );

          options["scholar"]["citedBy"].map(async (data: any) => {
            const cited = await this.ScholarStatistic.findOne({
              where: {
                scholar_profile_id: update["id"],
              },
            });
            if (!cited) {
              await this.ScholarStatistic.create({
                scholar_profile_id: update["id"],
                year: data["year"],
                count: data["data"],
              });
            } else {
              await this.ScholarStatistic.update(
                {
                  year: data["year"],
                  count: data["data"],
                },
                {
                  where: {
                    scholar_profile_id: update["id"],
                  },
                }
              );
            }
          });

          options["scholar"]["coAuthors"].map(async (data: any) => {
            const coAuthor = await this.ScholarCOAuthor.findOne({
              where: {
                scholar_profile_id: update["id"],
              },
            });

            if (!coAuthor) {
              await this.ScholarCOAuthor.create({
                scholar_profile_id: update["id"],
                name: data["name"],
                affiliation: data["aff"],
              });
            } else {
              await this.ScholarCOAuthor.update(
                {
                  name: data["name"],
                  affiliation: data["aff"],
                },
                {
                  where: {
                    scholar_profile_id: update["id"],
                  },
                }
              );
            }
          });

          return update;
        }
      });
    } catch (error) {
      loggerWinston.error(error);
      return null;
    }
  };
}

export default UserRepo;
