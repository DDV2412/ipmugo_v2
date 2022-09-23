import { QueryInterface, DataTypes, UUIDV4 } from "sequelize";
import Article from "../../models/article";
import Author from "../../models/author";

import { author } from "../../types/models/author";

import AuthorType = author.Author;

module.exports = {
  up: async (queryInterface: QueryInterface): Promise<void> => {
    await queryInterface.sequelize.transaction(async (transaction) => {
      return await queryInterface.createTable<AuthorType>(
        Author.tableName,
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
          firstname: {
            type: DataTypes.STRING,
            allowNull: false,
          },
          lastname: {
            type: DataTypes.STRING,
            allowNull: false,
          },
          email: {
            type: DataTypes.STRING,
            allowNull: true,
            unique: true,
          },
          affiliation: {
            type: DataTypes.STRING,
            allowNull: true,
          },
          orcid: {
            type: DataTypes.STRING,
            allowNull: true,
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
