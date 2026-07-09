import express from "express";
import path from "path";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/login", (req, res) => {
  res.sendFile(path.join(process.cwd(), "views/auth/login"));
});

router.get("/register", (req, res) => {
  res.sendFile(path.join(process.cwd(), "views/auth/register.html"));
});

// Protected pages
router.get("/users", authMiddleware, (req, res) => {
  res.sendFile(path.join(process.cwd(), "views/users/index"));
});

router.get("/employees", authMiddleware, (req, res) => {
  res.sendFile(path.join(process.cwd(), "views/employees/index"));
});

export default router;
