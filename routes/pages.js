import express from "express";
import path from "path";

const router = express.Router();

// =====================
// Public pages
// =====================

router.get("/login", (req, res) => {
  res.sendFile(path.join(process.cwd(), "views/auth/login.html"));
});

router.get("/register", (req, res) => {
  res.sendFile(path.join(process.cwd(), "views/auth/register.html"));
});

// =====================
// Protected pages
// =====================

router.get("/users", (req, res) => {
  res.sendFile(path.join(process.cwd(), "views/users/index.html"));
});

router.get("/employees", (req, res) => {
  res.sendFile(path.join(process.cwd(), "views/employees/index.html"));
});

// Companies Page

router.get("/companies", (req, res) => {
  console.log(process.cwd());

  res.sendFile(path.join(process.cwd(), "views", "companies", "index.html"));
});

router.get("/departments", (req, res) => {
  res.sendFile(path.join(process.cwd(), "views/departments/index.html"));
});

export default router;
