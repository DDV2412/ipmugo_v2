import { DataTypes, UUIDV4 } from "sequelize";
import db from "./index";
import { v4 as uuidv4 } from "uuid";

import { user } from "../types/models/user";
import UserInterst = user.UserInterst;

const UserInterst = db.define<UserInterst>(
  "User_Interst",
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
    interest_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
  },
  { timestamps: false }
);

UserInterst.beforeCreate(async (user: UserInterst) => {
  user["id"] = uuidv4();
});

export default UserInterst;
