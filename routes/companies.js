// routes/companies.js

import express from "express";

import * as companiesController from "../controllers/companiesController.js";

import { authMiddleware } from "../middlewares/authMiddleware.js";

import { authorize } from "../middlewares/roleMiddleware.js";

const router = express.Router();

// GET ALL COMPANIES
// Admin only
router.get(
  "/",
  authMiddleware,
  authorize("admin"),
  companiesController.getCompanies,
);

// GET COMPANY BY ID
// Admin only
router.get(
  "/:id",
  authMiddleware,
  authorize("admin"),
  companiesController.getCompany,
);

// CREATE COMPANY
// Admin only
router.post(
  "/",
  authMiddleware,
  authorize("admin"),
  companiesController.createCompany,
);

// UPDATE COMPANY
// Admin only
router.put(
  "/:id",
  authMiddleware,
  authorize("admin"),
  companiesController.updateCompany,
);

// DELETE COMPANY
// Admin only
router.delete(
  "/:id",
  authMiddleware,
  authorize("admin"),
  companiesController.deleteCompany,
);

export default router;
