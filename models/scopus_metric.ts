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
      type: DataTypes.NUMBER,
      allowNull: false,
    },
    snip: {
      type: DataTypes.NUMBER,
      allowNull: false,
    },
    citeScore: {
      type: DataTypes.NUMBER,
      allowNull: false,
    },
    year: {
      type: DataTypes.NUMBER,
      allowNull: false,
    },
    trackScore: {
      type: DataTypes.NUMBER,
      allowNull: false,
    },
    trackYear: {
      type: DataTypes.NUMBER,
      allowNull: false,
    },
  },
  { timestamps: false }
);

ScopusMetric.beforeCreate(async (metric: ScopusMetric) => {
  metric["id"] = uuidv4();
});

export default ScopusMetric;
