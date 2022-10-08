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
import ScholarProfile from "./scholar_profile";

const User = db.define<User>(
  "user",
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
    photo_profile: {
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
    google_scholar: {
      type: DataTypes.STRING(16),
      allowNull: true,
    },
    scopus_id: {
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
  { timestamps: true, underscored: true }
);

User.beforeCreate(async (user: User) => {
  user["id"] = uuidv4();
});

User.belongsToMany(Role, {
  through: UserRole.tableName,
  foreignKey: "user_id",
});
Role.belongsToMany(User, {
  through: UserRole.tableName,
  foreignKey: "role_id",
});

User.belongsToMany(Article, {
  through: Bookmark.tableName,
  foreignKey: "user_id",
  as: "bookmark",
});
Article.belongsToMany(User, {
  through: Bookmark.tableName,
  foreignKey: "article_id",
  as: "saved_bookmark",
});

User.belongsToMany(Article, {
  through: AssignAuthor.tableName,
  foreignKey: "author_id",
  as: "article_published",
});
Article.belongsToMany(User, {
  through: AssignAuthor.tableName,
  foreignKey: "article_id",
  as: "assign_author",
});

User.belongsToMany(Journal, {
  through: AssignEditor.tableName,
  foreignKey: "editor_id",
});
Journal.belongsToMany(User, {
  through: AssignEditor.tableName,
  foreignKey: "journal_id",
  as: "editorial",
});

User.belongsToMany(Interest, {
  through: UserInterst.tableName,
  foreignKey: "user_id",
});
Interest.belongsToMany(User, {
  through: UserInterst.tableName,
  foreignKey: "interest_id",
});

User.hasOne(ScholarProfile, {
  foreignKey: "user_id",
});

ScholarProfile.belongsTo(User, {
  foreignKey: "user_id",
});

export default User;
