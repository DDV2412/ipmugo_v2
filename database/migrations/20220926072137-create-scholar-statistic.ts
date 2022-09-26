import { QueryInterface, DataTypes, UUIDV4 } from "sequelize";
import ScholarStatistic from "../../models/scholar_statistic";
import Scholar_Profile from "../../models/scholar_profile";

import { user } from "../../types/models/user";

import ScholarStatisticType = user.ScholarStatistic;

module.exports = {
  up: async (queryInterface: QueryInterface): Promise<void> => {
    await queryInterface.sequelize.transaction(async (transaction) => {
      return await queryInterface.createTable<ScholarStatisticType>(
        ScholarStatistic.tableName,
        {
          id: {
            type: DataTypes.UUID,
            defaultValue: UUIDV4,
            primaryKey: true,
            allowNull: false,
            unique: true,
          },
          scholar_profile_id: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
              model: Scholar_Profile.tableName,
              key: "id",
            },
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
          },
          year: {
            type: DataTypes.STRING,
            allowNull: false,
          },
          count: {
            type: DataTypes.INTEGER,
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
      return await queryInterface.dropTable(ScholarStatistic.tableName, {
        transaction,
      });
    });
  },
};
