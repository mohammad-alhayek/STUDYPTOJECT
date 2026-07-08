import express from "express";
import { register, login } from "../controllers/authController.js";
import { loginLimiter } from "../middlewares/rateLimiter.js";

const router = express.Router();

router.post("/login", loginLimiter, login);
router.post("/register", register);

export default router;
