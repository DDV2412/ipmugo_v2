import db from "../models";
import loggerWinston from "../helper/logger-winston";
import User from "../models/user";

class UserRepo {
  User: typeof User;
  constructor() {
    this.User = User;
  }

  allUsers = async (filters: {}) => {
    try {
      let where = filters["search"]
        ? {
            name: filters["search"],
          }
        : {};

      let users = await db.transaction(async (transaction) => {
        return await this.User.findAndCountAll({
          where: where,
          distinct: true,
          transaction,
        });
      });

      return users;
    } catch (error) {
      loggerWinston.error(error);
      return null;
    }
  };

  userByEmail = async (email: string) => {
    try {
      let user = await db.transaction(async (transaction) => {
        return await this.User.findOne({
          where: {
            email: email,
          },
          transaction,
        });
      });

      return user;
    } catch (error) {
      loggerWinston.error(error);
      return null;
    }
  };

  userById = async (id: string) => {
    try {
      let user = await db.transaction(async (transaction) => {
        return await this.User.findOne({
          where: {
            id: id,
          },
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
}

export default UserRepo;
