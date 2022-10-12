import { DataTypes, UUIDV4 } from "sequelize";
import db from "./index";
import { v4 as uuidv4 } from "uuid";

import { user } from "../types/models/user";
import ResetPassword = user.ResetToken;

const ResetPassword = db.define<ResetPassword>(
  "reset_password",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: UUIDV4,
      primaryKey: true,
      allowNull: false,
      unique: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    expired: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    reset_token: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  { timestamps: false }
);

ResetPassword.beforeCreate(async (reset: ResetPassword) => {
  reset["id"] = uuidv4();
});

export default ResetPassword;
