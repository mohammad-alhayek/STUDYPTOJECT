import express from "express";
import { validate } from "../middlewares/validate.js";
import { employeeSchema } from "../validators/employeeValidator.js";
import {
  addEmployee,
  getEmployee,
  getEmployees,
  deleteEmployee,
  updateEmployee,
} from "../controllers/employeesController.js";

const router = express.Router();

// get all posts
router.get("/", getEmployees);

// get single post
router.get("/:id", getEmployee);

//add post
router.post("/", validate(employeeSchema), addEmployee);
// update
router.put("/:id", updateEmployee);

// delete
router.delete("/:id", deleteEmployee);

export default router;
