import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";
import User from "./userModel.js";

const Employee = sequelize.define(
  "Employee",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.STRING(36),
      allowNull: false,
    },
    full_name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING(20),
      allowNull: true,
    },
    department: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    salary: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
    },
    hire_date: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
    address: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    tableName: "Employees",
    timestamps: false,
    createdAt: "created_at",
    updatedAt: false,
  },
);
Employee.belongsTo(User, {
  foreignKey: "user_id",
  targetKey: "id",
});

export default Employee;
