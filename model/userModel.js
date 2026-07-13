import { DataTypes, Sequelize } from "sequelize";
import { sequelize } from "../config/db.js";

const User = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    role: {
      type: DataTypes.STRING(20),
      allowNull: false,
      defaultValue: "user",
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    is_active: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 1,
    },

    created_at: {
      type: DataTypes.DATE,
      allowNull: true,
      field: "created_at",
      defaultValue: Sequelize.literal("GETDATE()"),
    },
    last_login: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    full_name: {
      type: DataTypes.STRING(36),
      field: "full_Name",
      allowNull: true,
      defaultValue: "g",
    },
  },
  {
    tableName: "Users",
    timestamps: false,
  },
);

export default User;
