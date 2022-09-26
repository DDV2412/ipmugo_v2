import { QueryInterface, DataTypes, UUIDV4 } from "sequelize";
import Article from "../../models/article";
import Journal from "../../models/journal";

import { journal } from "../../types/models/journal";

import ArticleType = journal.Article;

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
          publishDate: {
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
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: "application/pdf",
          },
          year: {
            type: DataTypes.STRING(4),
            allowNull: true,
          },
          resources: {
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
          articleParsing: {
            type: DataTypes.STRING,
            allowNull: true,
          },
          keywords: {
            type: DataTypes.TEXT,
            allowNull: true,
          },
          dateModify: {
            allowNull: true,
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
