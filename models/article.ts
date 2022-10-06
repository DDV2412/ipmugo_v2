import { DataTypes, UUIDV4 } from "sequelize";
import db from "./index";
import { v4 as uuidv4 } from "uuid";

import { journal } from "../types/models/journal";
import Article = journal.Article;
import Author from "./author";
import Citation from "./citation";

const Article = db.define<Article>(
  "articles",
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
    identifier: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    publish_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    topic: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    abstract: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    format: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "application/pdf",
    },
    publish_year: {
      type: DataTypes.STRING(4),
      allowNull: true,
    },
    resources: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    pages: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    doi: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
    },
    publish_language: {
      type: DataTypes.STRING(6),
      allowNull: false,
      defaultValue: "eng",
    },
    file: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    article_parsing: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    keywords: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    date_modify: {
      allowNull: true,
      type: DataTypes.DATE,
    },
  },
  { timestamps: true, underscored: true }
);

Article.beforeCreate(async (article: Article) => {
  article["id"] = uuidv4();
});

Article.hasMany(Author, {
  foreignKey: "article_id",
});
Author.belongsTo(Article, {
  foreignKey: "article_id",
});

Article.hasMany(Citation, {
  foreignKey: "article_id",
});

Citation.belongsTo(Article, {
  foreignKey: "article_id",
});

export default Article;
