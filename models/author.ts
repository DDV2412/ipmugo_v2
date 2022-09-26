import { DataTypes, UUIDV4 } from "sequelize";
import db from "./index";
import { v4 as uuidv4 } from "uuid";

import { journal } from "../types/models/journal";
import Author = journal.Author;

const Author = db.define<Author>(
  "Author",
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
    },
    firstname: {
      type: DataTypes.STRING(48),
      allowNull: true,
    },
    lastname: {
      type: DataTypes.STRING(48),
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING(64),
      allowNull: true,
    },
    affiliation: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    orcid: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  { timestamps: false }
);

Author.beforeCreate(async (author: Author) => {
  author["id"] = uuidv4();
});

export default Author;
