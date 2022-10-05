import { QueryInterface, DataTypes, UUIDV4 } from "sequelize";
import Interest from "../../models/interest";

import { journal } from "../../types/models/journal";

import InterestType = journal.Interest;

module.exports = {
  up: async (queryInterface: QueryInterface): Promise<void> => {
    await queryInterface.sequelize.transaction(async (transaction) => {
      return await queryInterface.createTable<InterestType>(
        Interest.tableName,
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
      return await queryInterface.dropTable(Interest.tableName, {
        transaction,
      });
    });
  },
};
