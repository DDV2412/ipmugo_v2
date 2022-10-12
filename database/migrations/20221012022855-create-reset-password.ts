import { QueryInterface, DataTypes, UUIDV4 } from "sequelize";
import ResetPassword from "../../models/reset_password";
import { user } from "../../types/models/user";

import ResetType = user.ResetToken;

module.exports = {
  up: async (queryInterface: QueryInterface): Promise<void> => {
    await queryInterface.sequelize.transaction(async (transaction) => {
      return await queryInterface.createTable<ResetType>(
        ResetPassword.tableName,
        {
          id: {
            type: DataTypes.UUID,
            defaultValue: UUIDV4,
            primaryKey: true,
            allowNull: false,
            unique: true,
          },
          email: {
            type: DataTypes.STRING,
            allowNull: false,
          },
          expired: {
            type: DataTypes.DATE,
            allowNull: false,
          },
          reset_token: {
            type: DataTypes.STRING,
            allowNull: false,
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
      return await queryInterface.dropTable(ResetPassword.tableName, {
        transaction,
      });
    });
  },
};
