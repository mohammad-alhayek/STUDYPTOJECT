import * as userService from "../service/userService.js";
import catchAsync from "../middlewares/catchAsync.js";

console.log("usersController loaded");

// GET ALL USERS
export const getUsers = catchAsync(async (req, res) => {
  const users = await userService.getUsers();
  res.status(200).json(users);
});

// GET USER BY ID
export const getUser = catchAsync(async (req, res) => {
  const id = req.params.id;
  const user = await userService.getUserById(id);

  // Note: No manual 404 check needed here anymore because
  // userService.getUserById already throws an AppError if not found.
  res.status(200).json(user);
});

// ADD USER
export const addUser = catchAsync(async (req, res) => {
  const user = req.body;
  const id = await userService.addUser(user);

  res.status(201).json({
    message: req.__("USER_ADDED_SUCCESS"),
    id: id,
  });
});

// UPDATE USER
export const updateUser = catchAsync(async (req, res) => {
  const id = req.params.id;

  // Regular user can only update their own account
  if (req.user.role === "user" && req.user.id !== id) {
    return res.status(403).json({
      message: "You can only update your own account",
    });
  }

  const user = req.body;
  await userService.updateUser(id, user);

  res.json({
    message: req.__("USER_UPDATED_SUCCESS"),
  });
});

// GET CURRENT LOGGED-IN USER
export const getMyUser = catchAsync(async (req, res) => {
  const user = await userService.getUserById(req.user.id);
  res.status(200).json(user);
});

// UPDATE CURRENT LOGGED-IN USER
export const updateMyUser = catchAsync(async (req, res) => {
  const id = req.user.id;
  const user = req.body;

  await userService.updateUser(id, user);

  res.json({
    message: req.__("USER_UPDATED_SUCCESS"),
  });
});

// DELETE USER
export const deleteUser = catchAsync(async (req, res) => {
  const id = req.params.id;

  // Regular user can only delete their own account
  if (req.user.role === "user" && req.user.id !== id) {
    return res.status(403).json({
      message: "You can only delete your own account",
    });
  }

  await userService.deleteUser(id);

  res.json({
    message: req.__("USER_DELETED_SUCCESS"),
  });
});
