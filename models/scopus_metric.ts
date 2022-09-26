import { DataTypes, UUIDV4 } from "sequelize";
import db from "./index";
import { v4 as uuidv4 } from "uuid";

import { journal } from "../types/models/journal";
import ScopusMetric = journal.ScopusMetric;

const ScopusMetric = db.define<ScopusMetric>(
  "Scopus_Metric",
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
  { timestamps: false }
);

ScopusMetric.beforeCreate(async (metric: ScopusMetric) => {
  metric["id"] = uuidv4();
});

export default ScopusMetric;
