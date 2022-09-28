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

  updateRole = async (role_id: string, roleData: {}) => {
    try {
      let update = await db.transaction(async (transaction) => {
        return await this.Role.update(roleData, {
          where: {
            id: role_id,
          },
          transaction,
        });
      });

      return update;
    } catch (error) {
      loggerWinston.error(error);
      return null;
    }
  };

  deleteRole = async (role_id: string) => {
    try {
      return await db.transaction(async (transaction) => {
        return await this.Role.destroy({
          where: {
            id: role_id,
          },
          transaction,
        });
      });
    } catch (error) {
      loggerWinston.error(error);
      return null;
    }
  };
}

export default RoleRepo;
