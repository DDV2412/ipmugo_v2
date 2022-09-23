import dotenv from "dotenv";
import { Options } from "sequelize/types";

dotenv.config();

interface ConfigTs {
  development: Options;
}

const configDB: ConfigTs = {
  development: {
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: "postgres",
    define: {
      timestamps: false,
    },
  },
};

export = configDB;
