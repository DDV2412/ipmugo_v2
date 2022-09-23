import { QueryInterface, DataTypes, UUIDV4 } from "sequelize";
import Article from "../../models/article";
import Journal from "../../models/journal";

import { article } from "../../types/models/article";

import ArticleType = article.Article;

module.exports = {
  up: async (queryInterface: QueryInterface): Promise<void> => {
    await queryInterface.sequelize.transaction(async (transaction) => {
      return await queryInterface.createTable<ArticleType>(
        Article.tableName,
        {
          id: {
            type: DataTypes.UUID,
            defaultValue: UUIDV4,
            primaryKey: true,
            allowNull: false,
            unique: true,
          },
          journal_id: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
              model: Journal.tableName,
              key: "id",
            },
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
          },
          identifier: {
            type: DataTypes.STRING,
            allowNull: true,
          },
          publish_date: {
            type: DataTypes.DATE,
            allowNull: false,
          },
          topic: {
            type: DataTypes.STRING,
            allowNull: false,
          },
          title: {
            type: DataTypes.STRING,
            allowNull: false,
          },
          abstract: {
            type: DataTypes.TEXT,
            allowNull: true,
          },
          format: {
            type: DataTypes.STRING(48),
            allowNull: false,
            defaultValue: "application/pdf",
          },
          year: {
            type: DataTypes.STRING(4),
            allowNull: true,
          },
          info: {
            type: DataTypes.STRING,
            allowNull: true,
          },
          pages: {
            type: DataTypes.STRING,
            allowNull: true,
          },
          doi: {
            type: DataTypes.STRING(100),
            allowNull: false,
            unique: true,
          },
          language: {
            type: DataTypes.STRING(6),
            allowNull: false,
            defaultValue: "eng",
          },
          file: {
            type: DataTypes.STRING,
            allowNull: true,
          },
          article_parsing: {
            type: DataTypes.STRING,
            allowNull: true,
          },
          keywords: {
            type: DataTypes.TEXT,
            allowNull: true,
          },
          oai_update: {
            allowNull: false,
            type: DataTypes.DATE,
          },
          createdAt: {
            allowNull: false,
            type: DataTypes.DATE,
          },
          updatedAt: {
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
      return await queryInterface.dropTable(Article.tableName, {
        transaction,
      });
    });
  },
};
