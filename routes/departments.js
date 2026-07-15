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

// GET ALL DEPARTMENTS
router.get("/", authMiddleware, departmentsController.getDepartments);

// GET DEPARTMENTS BY COMPANY
router.get(
  "/company/:companyId",
  authMiddleware,
  departmentsController.getDepartmentsByCompany,
);

// GET DEPARTMENT BY ID
router.get("/:id", authMiddleware, departmentsController.getDepartment);

// CREATE DEPARTMENT
router.post("/", authMiddleware, departmentsController.createDepartment);

// UPDATE DEPARTMENT
router.put("/:id", authMiddleware, departmentsController.updateDepartment);

// DELETE DEPARTMENT
router.delete("/:id", authMiddleware, departmentsController.deleteDepartment);

export default router;
