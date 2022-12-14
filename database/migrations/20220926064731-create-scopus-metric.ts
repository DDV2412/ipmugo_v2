import { QueryInterface, DataTypes, UUIDV4 } from "sequelize";
import Scopus_Metric from "../../models/scopus_metric";

import { journal } from "../../types/models/journal";

import ScopusType = journal.ScopusMetric;
import Journal from "../../models/journal";

module.exports = {
  up: async (queryInterface: QueryInterface): Promise<void> => {
    await queryInterface.sequelize.transaction(async (transaction) => {
      return await queryInterface.createTable<ScopusType>(
        Scopus_Metric.tableName,
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
          sjr: {
            type: DataTypes.FLOAT,
            allowNull: false,
          },
          snip: {
            type: DataTypes.FLOAT,
            allowNull: false,
          },
          citeScore: {
            type: DataTypes.FLOAT,
            allowNull: false,
          },
          year: {
            type: DataTypes.STRING,
            allowNull: false,
          },
          trackScore: {
            type: DataTypes.FLOAT,
            allowNull: false,
          },
          trackYear: {
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
      return await queryInterface.dropTable(Scopus_Metric.tableName, {
        transaction,
      });
    });
  },
};
