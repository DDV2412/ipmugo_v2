import db from "../models";
import loggerWinston from "../helper/logger-winston";
import Role from "../models/role";

class RoleRepo {
  Role: typeof Role;
  constructor() {
    this.Role = Role;
  }

  allRoles = async () => {
    try {
      let roles = await db.transaction(async (transaction) => {
        return await this.Role.findAndCountAll({
          transaction,
        });
      });

      return roles;
    } catch (error) {
      loggerWinston.error(error);
      return null;
    }
  };

  roleByName = async (name: string) => {
    try {
      let role = await db.transaction(async (transaction) => {
        return await this.Role.findOne({
          where: {
            role_name: name,
          },
          transaction,
        });
      });

      return role;
    } catch (error) {
      loggerWinston.error(error);
      return null;
    }
  };

  createRole = async (roleData: any) => {
    try {
      let role = await db.transaction(async (transaction) => {
        return await this.Role.create(roleData);
      });

      return role;
    } catch (error) {
      loggerWinston.error(error);
      return null;
    }
  };

  updateRole = async (role: any, roleData: {}) => {
    try {
      let update = await db.transaction(async (transaction) => {
        return await role.update(roleData, transaction);
      });

      return update;
    } catch (error) {
      loggerWinston.error(error);
      return null;
    }
  };

  deleteRole = async (role: any) => {
    try {
      return await db.transaction(async (transaction) => {
        return await role.destroy();
      });
    } catch (error) {
      loggerWinston.error(error);
      return null;
    }
  };
}

export default RoleRepo;
