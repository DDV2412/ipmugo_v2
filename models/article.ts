import { DataTypes, UUIDV4 } from "sequelize";
import db from "./index";
import { v4 as uuidv4 } from "uuid";

import { journal } from "../types/models/journal";
import Article = journal.Article;
import Author from "./author";

const Article = db.define<Article>(
  "Article",
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
    publishDate: {
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
    year: {
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
    language: {
      type: DataTypes.STRING(6),
      allowNull: false,
      defaultValue: "eng",
    },
    file: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    articleParsing: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    keywords: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    dateModify: {
      allowNull: true,
      type: DataTypes.DATE,
    },
  },
  { timestamps: true }
);

Article.beforeCreate(async (article: Article) => {
  article["id"] = uuidv4();
});

Article.hasMany(Author, {
  as: "authors",
  foreignKey: "article_id",
});
Author.belongsTo(Article, {
  as: "authors",
  foreignKey: "article_id",
});

export default Article;
