import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

const RefreshToken = sequelize.define(
  "RefreshToken",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.STRING(36),
      allowNull: false,
    },
    token: {
      type: DataTypes.STRING(500),
      allowNull: false,
    },
    expires_at: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    tableName: "RefreshTokens",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: false,
  },
);

export default RefreshToken;
