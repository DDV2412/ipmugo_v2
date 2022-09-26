import { DataTypes, UUIDV4 } from "sequelize";
import db from "./index";
import { v4 as uuidv4 } from "uuid";

import { user } from "../types/models/user";
import User = user.User;

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

export default User;
