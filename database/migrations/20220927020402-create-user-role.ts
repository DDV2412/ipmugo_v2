import { QueryInterface, DataTypes, UUIDV4 } from "sequelize";
import Role from "../../models/role";
import User from "../../models/user";
import UserRole from "../../models/user_role";

import { user } from "../../types/models/user";

import UserRoleType = user.UserRole;

module.exports = {
  up: async (queryInterface: QueryInterface): Promise<void> => {
    await queryInterface.sequelize.transaction(async (transaction) => {
      return await queryInterface.createTable<UserRoleType>(
        UserRole.tableName,
        {
          id: {
            type: DataTypes.UUID,
            defaultValue: UUIDV4,
            primaryKey: true,
            allowNull: false,
            unique: true,
          },
          user_id: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
              model: User.tableName,
              key: "id",
            },
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
          },
          role_id: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
              model: Role.tableName,
              key: "id",
            },
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
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
      return await queryInterface.dropTable(UserRole.tableName, {
        transaction,
      });
    });
  },
};
