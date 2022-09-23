import { DataTypes, UUIDV4 } from "sequelize";
import db from "./index";
import { v4 as uuidv4 } from "uuid";

import { journal } from "../types/models/journal";
import ArticleInterest = journal.ArticleInterest;

const ArticleInterest = db.define<ArticleInterest>(
  "Article_Interest",
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
    interest_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
  },
  { timestamps: false }
);

ArticleInterest.beforeCreate(async (author: ArticleInterest) => {
  author["id"] = uuidv4();
});

export default ArticleInterest;
