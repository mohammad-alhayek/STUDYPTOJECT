// routes/companies.js

import express from "express";
import * as companiesController from "../controllers/companiesController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js"; // Adjust based on your auth middleware name

const router = express.Router();

// Get all companies
router.get("/", authMiddleware, companiesController.getCompanies);

// Get company by ID
router.get("/:id", authMiddleware, companiesController.getCompany);

// Create a new company
router.post("/", authMiddleware, companiesController.createCompany);

export default router;
