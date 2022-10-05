import { DataTypes, UUIDV4 } from "sequelize";
import db from "./index";
import { v4 as uuidv4 } from "uuid";

import { user } from "../types/models/user";
import ScholarProfile = user.ScholarProfile;

const ScholarProfile = db.define<ScholarProfile>(
  "scholar_profile",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: UUIDV4,
      primaryKey: true,
      allowNull: false,
      unique: true,
    },
    user_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    document_count: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    h_index: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    i10_index: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  { timestamps: false }
);

ScholarProfile.beforeCreate(async (scholar: ScholarProfile) => {
  scholar["id"] = uuidv4();
});

export default ScholarProfile;
