import { DataTypes, UUIDV4 } from "sequelize";
import db from "./index";
import { v4 as uuidv4 } from "uuid";

import { journal } from "../types/models/journal";
import Journal = journal.Journal;
import Article from "./article";
import ScopusMetric from "./scopus_metric";

const Journal = db.define<Journal>(
  "Journal",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: UUIDV4,
      primaryKey: true,
      allowNull: false,
      unique: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    abbreviation: {
      type: DataTypes.STRING(12),
      allowNull: false,
      unique: true,
    },
    publisher: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    thumbnail: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    cover: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    issn: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    e_issn: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    base_url: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  },
  { timestamps: true }
);

Journal.beforeCreate(async (journal: Journal) => {
  journal["id"] = uuidv4();
});

Article.belongsTo(Journal, { foreignKey: "journal_id", as: "journal" });
Journal.hasMany(Article, { foreignKey: "journal_id", as: "articles" });
Journal.hasOne(ScopusMetric, {
  foreignKey: "journal_id",
  as: "scopus_metric",
});

ScopusMetric.belongsTo(Journal, {
  foreignKey: "journal_id",
  as: "journal",
});

export default Journal;
