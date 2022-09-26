import { DataTypes, UUIDV4 } from "sequelize";
import db from "./index";
import { v4 as uuidv4 } from "uuid";

import { journal } from "../types/models/journal";
import Citation = journal.Citation;

const Citation = db.define<Citation>(
  "Citation",
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
    count: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    source: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  { timestamps: false }
);

Citation.beforeCreate(async (citation: Citation) => {
  citation["id"] = uuidv4();
});

export default Citation;
