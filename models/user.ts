import { DataTypes, UUIDV4 } from "sequelize";
import db from "./index";
import { v4 as uuidv4 } from "uuid";

import { user } from "../types/models/user";
import User = user.User;
import Role from "./role";
import UserRole from "./user_role";
import Article from "./article";
import Bookmark from "./bookmark";
import AssignAuthor from "./assign_author";
import Journal from "./journal";
import AssignEditor from "./assign_editor";
import Interest from "./interest";
import UserInterst from "./user_interest";

const User = db.define<User>(
  "User",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: UUIDV4,
      primaryKey: true,
      allowNull: false,
      unique: true,
    },
    salutation: {
      type: DataTypes.STRING(6),
      allowNull: true,
    },
    username: {
      type: DataTypes.STRING(32),
      allowNull: false,
      unique: true,
    },
    name: {
      type: DataTypes.STRING(96),
      allowNull: false,
    },
    photoProfile: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING(64),
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    googleScholar: {
      type: DataTypes.STRING(16),
      allowNull: true,
    },
    scopusId: {
      type: DataTypes.STRING(26),
      allowNull: true,
    },
    orcid: {
      type: DataTypes.STRING(22),
      allowNull: true,
    },
    biograph: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    affiliation: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    verified: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  { timestamps: true }
);

User.beforeCreate(async (user: User) => {
  user["id"] = uuidv4();
});

User.belongsToMany(Role, {
  through: UserRole.tableName,
  foreignKey: "user_id",
  as: "roles",
});
Role.belongsToMany(User, {
  through: UserRole.tableName,
  foreignKey: "role_id",
  as: "users",
});

User.belongsToMany(Article, {
  through: Bookmark.tableName,
  foreignKey: "user_id",
  as: "bookmarks",
});
Article.belongsToMany(User, {
  through: Bookmark.tableName,
  foreignKey: "article_id",
  as: "bookmarks",
});

User.belongsToMany(Article, {
  through: AssignAuthor.tableName,
  foreignKey: "author_id",
  as: "article_publish",
});
Article.belongsToMany(User, {
  through: AssignAuthor.tableName,
  foreignKey: "article_id",
  as: "assign_authors",
});

User.belongsToMany(Journal, {
  through: AssignEditor.tableName,
  foreignKey: "editor_id",
  as: "journals",
});
Journal.belongsToMany(User, {
  through: AssignEditor.tableName,
  foreignKey: "journal_id",
  as: "editorials",
});

User.belongsToMany(Interest, {
  through: UserInterst.tableName,
  foreignKey: "user_id",
  as: "interests",
});
Interest.belongsToMany(User, {
  through: UserInterst.tableName,
  foreignKey: "interest_id",
  as: "users",
});

export default User;
