import { QueryInterface, DataTypes, UUIDV4 } from "sequelize";
import ScholarCOAuthor from "../../models/scholar_co_author";
import Scholar_Profile from "../../models/scholar_profile";

import { user } from "../../types/models/user";

import ScholarCOAuthorType = user.ScholarCOAuthor;

module.exports = {
  up: async (queryInterface: QueryInterface): Promise<void> => {
    await queryInterface.sequelize.transaction(async (transaction) => {
      return await queryInterface.createTable<ScholarCOAuthorType>(
        ScholarCOAuthor.tableName,
        {
          id: {
            type: DataTypes.UUID,
            defaultValue: UUIDV4,
            primaryKey: true,
            allowNull: false,
            unique: true,
          },
          scholar_profile_id: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
              model: Scholar_Profile.tableName,
              key: "id",
            },
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
          },
          name: {
            type: DataTypes.STRING,
            allowNull: false,
          },
          affiliation: {
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
      return await queryInterface.dropTable(ScholarCOAuthor.tableName, {
        transaction,
      });
    });
  },
};
