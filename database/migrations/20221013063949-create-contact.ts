import { QueryInterface, DataTypes, UUIDV4 } from "sequelize";
import Contact from "../../models/contact";

import { user } from "../../types/models/user";

import ContactType = user.Contact;

module.exports = {
  up: async (queryInterface: QueryInterface): Promise<void> => {
    await queryInterface.sequelize.transaction(async (transaction) => {
      return await queryInterface.createTable<ContactType>(
        Contact.tableName,
        {
          id: {
            type: DataTypes.UUID,
            defaultValue: UUIDV4,
            primaryKey: true,
            allowNull: false,
            unique: true,
          },
          name: {
            type: DataTypes.STRING(48),
            allowNull: false,
          },
          email: {
            type: DataTypes.STRING(48),
            allowNull: false,
          },
          subject: {
            type: DataTypes.STRING,
            allowNull: false,
          },
          message: {
            type: DataTypes.TEXT,
            allowNull: false,
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
      return await queryInterface.dropTable(Contact.tableName, {
        transaction,
      });
    });
  },
};
