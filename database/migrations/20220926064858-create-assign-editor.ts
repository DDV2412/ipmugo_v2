import { QueryInterface, DataTypes, UUIDV4 } from "sequelize";
import User from "../../models/user";
import Assign_Editor from "../../models/assign_editor";

import { user } from "../../types/models/user";

import EditorInJournalType = user.EditorInJournal;
import Journal from "../../models/journal";

module.exports = {
  up: async (queryInterface: QueryInterface): Promise<void> => {
    await queryInterface.sequelize.transaction(async (transaction) => {
      return await queryInterface.createTable<EditorInJournalType>(
        Assign_Editor.tableName,
        {
          id: {
            type: DataTypes.UUID,
            defaultValue: UUIDV4,
            primaryKey: true,
            allowNull: false,
            unique: true,
          },
          editor_id: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
              model: User.tableName,
              key: "id",
            },
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
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
      return await queryInterface.dropTable(Assign_Editor.tableName, {
        transaction,
      });
    });
  },
};
