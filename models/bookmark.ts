import { DataTypes, UUIDV4 } from "sequelize";
import db from "./index";
import { v4 as uuidv4 } from "uuid";

import { user } from "../types/models/user";
import Bookmark = user.Bookmark;

const Bookmark = db.define<Bookmark>(
  "Bookmark",
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
    article_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
  },
  { timestamps: false }
);

Bookmark.beforeCreate(async (user: Bookmark) => {
  user["id"] = uuidv4();
});

export default Bookmark;
