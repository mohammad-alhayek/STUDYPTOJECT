import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";
import User from "./userModel.js";

const Company = sequelize.define(
  "Company",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    registration_number: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
    },
    address: {
      type: DataTypes.STRING(500),
      allowNull: false,
    },
    services: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    user_id: {
      type: DataTypes.STRING(36),
      allowNull: false,
    },
  },
  {
    tableName: "Companies",
    timestamps: false,
    createdAt: "created_at",
    updatedAt: false,
  },
);

Company.belongsTo(User, {
  foreignKey: "user_id",
  targetKey: "id",
  as: "owner",
});

export default Company;
