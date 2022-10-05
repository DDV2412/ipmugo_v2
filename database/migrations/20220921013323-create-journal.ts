import { QueryInterface, DataTypes, UUIDV4 } from "sequelize";
import Journal from "../../models/journal";

import { journal } from "../../types/models/journal";

import JournalType = journal.Journal;

module.exports = {
  up: async (queryInterface: QueryInterface): Promise<void> => {
    await queryInterface.sequelize.transaction(async (transaction) => {
      return await queryInterface.createTable<JournalType>(
        Journal.tableName,
        {
          id: {
            type: DataTypes.UUID,
            defaultValue: UUIDV4,
            primaryKey: true,
            allowNull: false,
            unique: true,
          },
          name: {
            type: DataTypes.STRING,
            allowNull: false,
          },
          abbreviation: {
            type: DataTypes.STRING(12),
            allowNull: false,
            unique: true,
          },
          publisher: {
            type: DataTypes.STRING,
            allowNull: false,
          },
          thumbnail: {
            type: DataTypes.STRING,
            allowNull: false,
          },
          cover: {
            type: DataTypes.STRING,
            allowNull: false,
          },
          issn: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
          },
          e_issn: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
          },
          description: {
            type: DataTypes.TEXT,
            allowNull: false,
          },
          base_url: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
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
      return await queryInterface.dropTable(Journal.tableName, {
        transaction,
      });
    });
  },
};
