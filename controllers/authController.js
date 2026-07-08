import * as authService from "../service/authService.js";

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const tokens = await authService.login(email, password);

    res.json({
      message: "Login successful",
      data: tokens,
    });
  } catch (error) {
    res.status(401).json({
      message: error.message,
    });
  }
};
//logout

export const logout = async (req, res) => {
  try {
    const { refreshToken } = req.body;

    await authService.logout(refreshToken);

    res.json({
      message: "Logout successful",
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

// REGISTER
export const register = async (req, res) => {
  try {
    const user = req.body;

    const result = await authService.register(user);

    res.status(201).json({
      message: "User registered successfully",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};
