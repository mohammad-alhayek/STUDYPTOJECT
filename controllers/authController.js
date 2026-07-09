import * as authService from "../service/authService.js";
import catchAsync from "../middlewares/catchAsync.js";

// LOGIN
export const login = catchAsync(async (req, res) => {
  const { email, password } = req.body;

  const tokens = await authService.login(email, password);

  res.json({
    message: "Login successful",
    data: tokens,
  });
});

// LOGOUT
export const logout = catchAsync(async (req, res) => {
  const { refreshToken } = req.body;

  await authService.logout(refreshToken);

  res.json({
    message: "Logout successful",
  });
});

// REGISTER
export const register = catchAsync(async (req, res) => {
  const user = req.body;

  const result = await authService.register(user);

  res.status(201).json({
    message: "User registered successfully",
    data: result,
  });
});
