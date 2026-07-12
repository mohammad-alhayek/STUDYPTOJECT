import express from "express";
import path from "path";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Public pages
router.get("/login", (req, res) => {
  res.sendFile(path.join(process.cwd(), "views/auth/login.html"));
});

router.get("/register", (req, res) => {
  res.sendFile(path.join(process.cwd(), "views/auth/register.html"));
});

// Protected pages
router.get("/users", (req, res) => {
  res.sendFile(path.join(process.cwd(), "views/users/index.html"));
});

router.get("/employees", (req, res) => {
  res.sendFile(path.join(process.cwd(), "views/employees/index.html"));
});

export default router;
