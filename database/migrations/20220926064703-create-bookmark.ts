import { QueryInterface, DataTypes, UUIDV4 } from "sequelize";
import User from "../../models/user";
import Bookmark from "../../models/bookmark";

import { user } from "../../types/models/user";

import BookmarkType = user.Bookmark;
import Article from "../../models/article";

module.exports = {
  up: async (queryInterface: QueryInterface): Promise<void> => {
    await queryInterface.sequelize.transaction(async (transaction) => {
      return await queryInterface.createTable<BookmarkType>(
        Bookmark.tableName,
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
      return await queryInterface.dropTable(Bookmark.tableName, {
        transaction,
      });
    });
  },
};
