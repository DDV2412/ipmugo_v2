import { QueryInterface, DataTypes, UUIDV4 } from "sequelize";
import User from "../../models/user";
import Scholar_Profile from "../../models/scholar_profile";

import { user } from "../../types/models/user";

import ScholarType = user.ScholarProfile;

module.exports = {
  up: async (queryInterface: QueryInterface): Promise<void> => {
    await queryInterface.sequelize.transaction(async (transaction) => {
      return await queryInterface.createTable<ScholarType>(
        Scholar_Profile.tableName,
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
          document_count: {
            type: DataTypes.NUMBER,
            allowNull: false,
          },
          h_index: {
            type: DataTypes.NUMBER,
            allowNull: false,
          },
          i10_index: {
            type: DataTypes.NUMBER,
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
      return await queryInterface.dropTable(Scholar_Profile.tableName, {
        transaction,
      });
    });
  },
};
