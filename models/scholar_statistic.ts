import { DataTypes, UUIDV4 } from "sequelize";
import db from "./index";
import { v4 as uuidv4 } from "uuid";

import { user } from "../types/models/user";
import ScholarStatistic = user.ScholarStatistic;

const ScholarStatistic = db.define<ScholarStatistic>(
  "scholar_statistic",
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
    year: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    count: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  { timestamps: false }
);

ScholarStatistic.beforeCreate(async (statis: ScholarStatistic) => {
  statis["id"] = uuidv4();
});

export default ScholarStatistic;
