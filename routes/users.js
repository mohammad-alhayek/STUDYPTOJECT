import express from "express";

import {
  getUser,
  getUsers,
  deleteUser,
  updateUser,
  getMyUser,
  updateMyUser,
} from "../controllers/usersController.js";

import { authMiddleware } from "../middlewares/authMiddleware.js";
import { authorize } from "../middlewares/roleMiddleware.js";

const router = express.Router();

// GET ALL USERS
router.get("/", authMiddleware, getUsers);

//my user
router.get("/me", authMiddleware, getMyUser);
router.put("/me", authMiddleware, updateMyUser);

// GET SINGLE USER
router.get("/:id", authMiddleware, authorize("admin"), getUser);

// UPDATE USER
router.put("/:id", authMiddleware, authorize("admin", "user"), updateUser);

//delete
router.delete("/:id", authMiddleware, authorize("admin", "user"), deleteUser);

export default router;
