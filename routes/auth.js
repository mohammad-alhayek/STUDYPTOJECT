import express from "express";
import { logout, register, login } from "../controllers/authController.js";
import { loginLimiter } from "../middlewares/rateLimiter.js";
import { validate } from "../middlewares/validate.js";
import { registerSchema } from "../validators/authValidator.js";
const router = express.Router();

router.post("/login", loginLimiter, login);
router.post("/register", validate(registerSchema), register);
router.post("/logout", logout);

export default router;
