import { QueryInterface, DataTypes, UUIDV4 } from "sequelize";
import Interest from "../../models/interest";
import Article from "../../models/article";
import Article_Interest from "../../models/article_interest";

import { journal } from "../../types/models/journal";

import ArticleInterestType = journal.ArticleInterest;

module.exports = {
  up: async (queryInterface: QueryInterface): Promise<void> => {
    await queryInterface.sequelize.transaction(async (transaction) => {
      return await queryInterface.createTable<ArticleInterestType>(
        Article_Interest.tableName,
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
      return await queryInterface.dropTable(Article_Interest.tableName, {
        transaction,
      });
    });
  },
};
