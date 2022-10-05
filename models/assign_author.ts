import { DataTypes, UUIDV4 } from "sequelize";
import db from "./index";
import { v4 as uuidv4 } from "uuid";

import { user } from "../types/models/user";
import AssignAuthor = user.AuthorATArticle;

const AssignAuthor = db.define<AssignAuthor>(
  "assign_author",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: UUIDV4,
      primaryKey: true,
      allowNull: false,
      unique: true,
    },
    author_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    article_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
  },
  { timestamps: false }
);

AssignAuthor.beforeCreate(async (author: AssignAuthor) => {
  author["id"] = uuidv4();
});

export default AssignAuthor;
