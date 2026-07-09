import * as userRepository from "../repositories/userRepository.js";
import * as refreshTokenRepository from "../repositories/refreshTokenRepository.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import AppError from "../utils/AppError.js";

export const login = async (email, password) => {
  const user = await userRepository.getUserByEmail(email);

  if (!user) {
    throw new AppError("INVALID_EMAIL", 401);
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new AppError("INVALID_PASSWORD", 401);
  }

  const accessToken = jwt.sign(
    { id: user.id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: "15m" },
  );

  const refreshToken = jwt.sign(
    { id: user.id },
    process.env.JWT_REFRESH_SECRET,
    { expiresIn: "7d" },
  );

  await refreshTokenRepository.createRefreshToken({
    user_id: user.id,
    token: refreshToken,
    expires_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
  });

  return { accessToken, refreshToken };
};

export const logout = async (refreshToken) => {
  if (!refreshToken) {
    throw new AppError("REFRESH_TOKEN_REQUIRED", 400);
  }

  await refreshTokenRepository.deleteRefreshToken(refreshToken);
  return true;
};

export const register = async (user) => {
  const existingUser = await userRepository.getUserByEmail(user.email);

  if (existingUser) {
    throw new AppError("EMAIL_EXISTS", 409);
  }

  const hashedPassword = await bcrypt.hash(user.password, 10);

  const newUser = {
    email: user.email,
    password: hashedPassword,
    full_name: user.full_name,
    is_active: 1,
    last_login: null,
  };

  const createdUser = await userRepository.createUser(newUser);

  return {
    id: createdUser.id,
    email: createdUser.email,
  };
};
