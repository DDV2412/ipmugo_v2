import { QueryInterface, DataTypes, UUIDV4 } from "sequelize";
import Interest from "../../models/interest";
import Journal from "../../models/journal";
import Journal_Interest from "../../models/journal_interest";

import { journal } from "../../types/models/journal";

import JournalInterestType = journal.JournalInterest;

module.exports = {
  up: async (queryInterface: QueryInterface): Promise<void> => {
    await queryInterface.sequelize.transaction(async (transaction) => {
      return await queryInterface.createTable<JournalInterestType>(
        Journal_Interest.tableName,
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
      return await queryInterface.dropTable(Journal_Interest.tableName, {
        transaction,
      });
    });
  },
};
