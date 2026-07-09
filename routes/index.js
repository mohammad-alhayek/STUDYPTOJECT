import express from "express";

import auth from "./auth.js";
import users from "./users.js";
import employees from "./employees.js";
import pages from "./pages.js";

const router = express.Router();

// API Routes
router.use("/auth", auth);
router.use("/users", users);
router.use("/employees", employees);

// Pages Routes

export default router;
