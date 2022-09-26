import { QueryInterface, DataTypes, UUIDV4 } from "sequelize";
import Interest from "../../models/interest";
import User from "../../models/user";
import User_Interest from "../../models/user_interest";

import { user } from "../../types/models/user";

import UserInterestType = user.UserInterst;

module.exports = {
  up: async (queryInterface: QueryInterface): Promise<void> => {
    await queryInterface.sequelize.transaction(async (transaction) => {
      return await queryInterface.createTable<UserInterestType>(
        User_Interest.tableName,
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
          interest_id: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
              model: Interest.tableName,
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
      return await queryInterface.dropTable(User_Interest.tableName, {
        transaction,
      });
    });
  },
};
