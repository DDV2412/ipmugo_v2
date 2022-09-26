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
    } catch (error) {
      loggerWinston.error(error);
      return null;
    }
  };

  userById = async (id: string) => {
    try {
    } catch (error) {
      loggerWinston.error(error);
      return null;
    }
  };

  createUser = async (userData: {}) => {
    try {
    } catch (error) {
      loggerWinston.error(error);
      return null;
    }
  };

  updateUser = async (user: {}, userData: {}) => {
    try {
    } catch (error) {
      loggerWinston.error(error);
      return null;
    }
  };

  deleteUser = async (user: {}) => {
    try {
    } catch (error) {
      loggerWinston.error(error);
      return null;
    }
  };
}

export default UserRepo;
