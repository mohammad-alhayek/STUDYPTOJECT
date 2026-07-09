import * as authService from "../service/authService.js";
import catchAsync from "../middlewares/catchAsync.js";

console.log("authController loaded");

// LOGIN
export const login = catchAsync(async (req, res) => {
  const { email, password } = req.body;

  const token = await authService.login(email, password);

  res.json({
    message: req.__("LOGIN_SUCCESS"),
    data: token,
  });
});

// REGISTER
export const register = catchAsync(async (req, res) => {
  const user = req.body;

  const result = await authService.register(user);

  res.status(201).json({
    message: req.__("REGISTERED_SUCCESSFULLY"),
    data: result,
  });
});
// LOGOUT
export const logout = catchAsync(async (req, res) => {
  res.json({
    message: req.__("LOGOUT_SUCCESS"),
  });
});
