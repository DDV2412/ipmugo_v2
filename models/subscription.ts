import { DataTypes, UUIDV4 } from "sequelize";
import db from "./index";
import { v4 as uuidv4 } from "uuid";

import { user } from "../types/models/user";
import Subscription = user.Subscription;

const Subscription = db.define<Subscription>(
  "subscription",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: UUIDV4,
      primaryKey: true,
      allowNull: false,
      unique: true,
    },
    name: {
      type: DataTypes.STRING(48),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(48),
      allowNull: false,
    },
    country: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  { timestamps: true, underscored: true }
);

Subscription.beforeCreate(async (subscription: Subscription) => {
  subscription["id"] = uuidv4();
});

export default Subscription;
