import * as userService from "../service/userService.js";
import catchAsync from "../middlewares/catchAsync.js";

console.log("usersController loaded");

// GET ALL
export const getUsers = catchAsync(async (req, res) => {
  const users = await userService.getUsers();
  res.json(users);
});

// GET BY ID
export const getUser = catchAsync(async (req, res) => {
  const id = req.params.id;
  const user = await userService.getUserById(id);

  if (!user) {
    return res.status(404).json({
      message: req.__("USER_NOT_FOUND"),
    });
  }

  res.json(user);
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

  // user العادي يعدل حسابه فقط
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

// DELETE USER
export const deleteUser = catchAsync(async (req, res) => {
  const id = req.params.id;

  // user العادي يحذف حسابه فقط
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
