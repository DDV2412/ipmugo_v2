import { DataTypes, UUIDV4 } from "sequelize";
import db from "./index";
import { v4 as uuidv4 } from "uuid";

import { user } from "../types/models/user";
import ScholarStatistic from "./scholar_statistic";
import ScholarCOAuthor from "./scholar_co_author";
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

ScholarProfile.hasMany(ScholarStatistic, {
  foreignKey: "scholar_profile_id",
});

ScholarStatistic.belongsTo(ScholarProfile, {
  foreignKey: "scholar_profile_id",
});

ScholarProfile.hasMany(ScholarCOAuthor, {
  foreignKey: "scholar_profile_id",
});

ScholarCOAuthor.belongsTo(ScholarProfile, {
  foreignKey: "scholar_profile_id",
});

export default ScholarProfile;
