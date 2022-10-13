import { DataTypes, UUIDV4 } from "sequelize";
import db from "./index";
import { v4 as uuidv4 } from "uuid";

import { user } from "../types/models/user";
import Contact = user.Contact;

const Contact = db.define<Contact>(
  "contact",
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
    subject: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    message: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  { timestamps: true, underscored: true }
);

Contact.beforeCreate(async (contact: Contact) => {
  contact["id"] = uuidv4();
});

export default Contact;
