import { DataTypes, UUIDV4 } from "sequelize";
import db from "./index";
import { v4 as uuidv4 } from "uuid";

import { user } from "../types/models/user";
import ScholarCOAuthor = user.ScholarCOAuthor;

const ScholarCOAuthor = db.define<ScholarCOAuthor>(
  "Scholar_Co_Author",
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
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    affiliation: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  { timestamps: false }
);

ScholarCOAuthor.beforeCreate(async (coAuthor: ScholarCOAuthor) => {
  coAuthor["id"] = uuidv4();
});

export default ScholarCOAuthor;
