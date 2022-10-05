import { DataTypes, UUIDV4 } from "sequelize";
import db from "./index";
import { v4 as uuidv4 } from "uuid";

import { journal } from "../types/models/journal";
import Interest = journal.Interest;
import Journal from "./journal";
import JournalInterest from "./journal_interest";
import Article from "./article";
import ArticleInterest from "./article_interest";

const Interest = db.define<Interest>(
  "interest",
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
      unique: true,
    },
  },
  { timestamps: true, underscored: true }
);

Interest.beforeCreate(async (interest: Interest) => {
  interest["id"] = uuidv4();
});

Interest.belongsToMany(Journal, {
  through: JournalInterest.tableName,
  foreignKey: "interest_id",
  as: "journals",
});

Journal.belongsToMany(Interest, {
  through: JournalInterest.tableName,
  foreignKey: "journal_id",
  as: "interests",
});

Interest.belongsToMany(Article, {
  through: ArticleInterest.tableName,
  foreignKey: "interest_id",
  as: "articles",
});

Article.belongsToMany(Interest, {
  through: ArticleInterest.tableName,
  foreignKey: "article_id",
  as: "interests",
});

export default Interest;
