import express from "express";
import { logout, register, login } from "../controllers/authController.js";
import { loginLimiter } from "../middlewares/rateLimiter.js";

const router = express.Router();

router.post("/login", loginLimiter, login);
router.post("/register", register);
router.post("/logout", logout);

export default router;
