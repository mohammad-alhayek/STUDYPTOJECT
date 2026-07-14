// routes/departments.js

import express from "express";
import * as departmentsController from "../controllers/departmentsController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js"; // Adjust based on your auth middleware name

const router = express.Router();

// Get all departments for a specific company
router.get(
  "/company/:companyId",
  authMiddleware,
  departmentsController.getDepartmentsByCompany,
);

// Get department by ID
router.get("/:id", authMiddleware, departmentsController.getDepartment);

// Create a new department
router.post("/", authMiddleware, departmentsController.createDepartment);

export default router;
