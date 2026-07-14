import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";
import Company from "./companyModel.js";
const Department = sequelize.define(
  "Department",
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
    company_id: {
      type: DataTypes.STRING(36),
      allowNull: false,
    },
  },
  {
    tableName: "Departments",
    timestamps: false,
    createdAt: "created_at",
    updatedAt: false,
  },
);

Department.belongsTo(Company, {
  foreignKey: "company_id",
  targetKey: "id",
  as: "company",
});

Company.hasMany(Department, {
  foreignKey: "company_id",
  sourceKey: "id",
  as: "departments",
});

export default Department;
