import { DataTypes, UUIDV4 } from "sequelize";
import db from "./index";
import { v4 as uuidv4 } from "uuid";

import { journal } from "../types/models/journal";
import JournalInterest = journal.JournalInterest;

const JournalInterest = db.define<JournalInterest>(
  "journal_interest",
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
    interest_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
  },
  { timestamps: false }
);

JournalInterest.beforeCreate(async (interest: JournalInterest) => {
  interest["id"] = uuidv4();
});

export default JournalInterest;
