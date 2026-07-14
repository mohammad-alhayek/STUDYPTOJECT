import express from "express";

import auth from "./auth.js";
import users from "./users.js";
import employees from "./employees.js";
import companies from "./companies.js"; // Import companies routes
import departments from "./departments.js"; // Import departments routes

const router = express.Router();

// Mount all routes here
router.use("/auth", auth);
router.use("/users", users);
router.use("/employees", employees);
router.use("/companies", companies); // Mount companies routes
router.use("/departments", departments); // Mount departments routes

// Pages Routes

export default router;
