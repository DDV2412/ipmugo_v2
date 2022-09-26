import { DataTypes, UUIDV4 } from "sequelize";
import db from "./index";
import { v4 as uuidv4 } from "uuid";

import { user } from "../types/models/user";
import AssignEditor = user.EditorInJournal;

const AssignEditor = db.define<AssignEditor>(
  "Assign_Editor",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: UUIDV4,
      primaryKey: true,
      allowNull: false,
      unique: true,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    journalId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
  },
  { timestamps: false }
);

AssignEditor.beforeCreate(async (editor: AssignEditor) => {
  editor["id"] = uuidv4();
});

export default AssignEditor;
