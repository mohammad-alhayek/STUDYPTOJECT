import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";
import User from "./userModel.js";
import Company from "./companyModel.js";
import Department from "./departmentModel.js";

const Employee = sequelize.define(
  "Employee",
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
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
    company_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    department_id: {
      type: DataTypes.UUID,
      allowNull: false,
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

Employee.belongsTo(Company, {
  foreignKey: "company_id",
  as: "company",
});

Employee.belongsTo(Department, {
  foreignKey: "department_id",
  as: "department",
});

export default Employee;
