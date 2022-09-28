import { QueryInterface, DataTypes, UUIDV4 } from "sequelize";
import Role from "../../models/role";

import { user } from "../../types/models/user";

import RoleType = user.Role;

module.exports = {
  up: async (queryInterface: QueryInterface): Promise<void> => {
    await queryInterface.sequelize.transaction(async (transaction) => {
      return await queryInterface.createTable<RoleType>(
        Role.tableName,
        {
          id: {
            type: DataTypes.UUID,
            defaultValue: UUIDV4,
            primaryKey: true,
            allowNull: false,
            unique: true,
          },
          role_name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
          },
        },
        {
          charset: "utf8mb4",
          collate: "utf8mb4_general_ci",
          transaction,
        }
      );
    });
  },

  down: async (queryInterface: QueryInterface): Promise<void> => {
    await queryInterface.sequelize.transaction(async (transaction) => {
      return await queryInterface.dropTable(Role.tableName, {
        transaction,
      });
    });
  },
};
