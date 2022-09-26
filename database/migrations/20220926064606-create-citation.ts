import { QueryInterface, DataTypes, UUIDV4 } from "sequelize";
import Article from "../../models/article";
import Citation from "../../models/citation";

import { journal } from "../../types/models/journal";

import CitationType = journal.Citation;

module.exports = {
  up: async (queryInterface: QueryInterface): Promise<void> => {
    await queryInterface.sequelize.transaction(async (transaction) => {
      return await queryInterface.createTable<CitationType>(
        Citation.tableName,
        {
          id: {
            type: DataTypes.UUID,
            defaultValue: UUIDV4,
            primaryKey: true,
            allowNull: false,
            unique: true,
          },
          article_id: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
              model: Article.tableName,
              key: "id",
            },
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
          },
          count: {
            type: DataTypes.INTEGER,
            allowNull: false,
          },
          source: {
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
      return await queryInterface.dropTable(Citation.tableName, {
        transaction,
      });
    });
  },
};
