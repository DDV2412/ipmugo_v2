import { QueryInterface, DataTypes, UUIDV4 } from "sequelize";
import User from "../../models/user";

import { user } from "../../types/models/user";

import UserType = user.User;

module.exports = {
  up: async (queryInterface: QueryInterface): Promise<void> => {
    await queryInterface.sequelize.transaction(async (transaction) => {
      return await queryInterface.createTable<UserType>(
        User.tableName,
        {
          id: {
            type: DataTypes.UUID,
            defaultValue: UUIDV4,
            primaryKey: true,
            allowNull: false,
            unique: true,
          },
          salutation: {
            type: DataTypes.STRING(6),
            allowNull: true,
          },
          username: {
            type: DataTypes.STRING(32),
            allowNull: false,
            unique: true,
          },
          name: {
            type: DataTypes.STRING(96),
            allowNull: false,
          },
          photoProfile: {
            type: DataTypes.STRING,
            allowNull: true,
          },
          email: {
            type: DataTypes.STRING(64),
            allowNull: false,
            unique: true,
          },
          password: {
            type: DataTypes.STRING,
            allowNull: false,
          },
          googleScholar: {
            type: DataTypes.STRING(16),
            allowNull: true,
          },
          scopusId: {
            type: DataTypes.STRING(26),
            allowNull: true,
          },
          orcid: {
            type: DataTypes.STRING(22),
            allowNull: true,
          },
          biograph: {
            type: DataTypes.TEXT,
            allowNull: true,
          },
          affiliation: {
            type: DataTypes.STRING,
            allowNull: true,
          },
          verified: {
            type: DataTypes.DATE,
            allowNull: true,
          },
          created_at: {
            allowNull: false,
            type: DataTypes.DATE,
          },
          updated_at: {
            allowNull: false,
            type: DataTypes.DATE,
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
      return await queryInterface.dropTable(User.tableName, {
        transaction,
      });
    });
  },
};
