import express from "express";

import { validate } from "../middlewares/validate.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { authorize } from "../middlewares/roleMiddleware.js";

import { employeeSchema } from "../validators/employeeValidator.js";

import {
  addEmployee,
  getEmployee,
  getEmployees,
  deleteEmployee,
  updateEmployee,
} from "../controllers/employeesController.js";

const router = express.Router();

// GET ALL EMPLOYEES
// أي مستخدم مسجل دخول يستطيع يشوف
router.get("/", authMiddleware, getEmployees);

// GET ONE EMPLOYEE
router.get("/:id", authMiddleware, getEmployee);

// ADD EMPLOYEE
// فقط admin
router.post(
  "/",
  authMiddleware,
  authorize("admin"),
  validate(employeeSchema),
  addEmployee,
);

// UPDATE EMPLOYEE
// فقط admin
router.put(
  "/:id",
  authMiddleware,
  authorize("admin"),
  validate(employeeSchema),
  updateEmployee,
);

// DELETE EMPLOYEE
// فقط admin
router.delete("/:id", authMiddleware, authorize("admin"), deleteEmployee);

export default router;
