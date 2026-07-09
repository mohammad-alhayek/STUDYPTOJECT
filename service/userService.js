import * as userModel from "../repositories/userRepository.js";
import AppError from "../utils/AppError.js";

// GET ALL USERS
export const getUsers = async () => {
  return await userModel.getAllUsers();
};

// GET USER BY ID
export const getUserById = async (id) => {
  if (!id) {
    throw new AppError("USER_ID_REQUIRED", 400);
  }

  const user = await userModel.getUserById(id);

  if (!user) {
    throw new AppError("USER_NOT_FOUND", 404);
  }

  return user;
};

// UPDATE USER
export const updateUser = async (id, user) => {
  if (!id) {
    throw new AppError("USER_ID_REQUIRED", 400);
  }

  if (!user.full_name) {
    throw new AppError("USER_NAME_REQUIRED", 400);
  }

  const existingUser = await userModel.getUserById(id);

  if (!existingUser) {
    throw new AppError("USER_NOT_FOUND", 404);
  }

  return await userModel.updateUser(id, user);
};

// DELETE USER
export const deleteUser = async (id) => {
  if (!id) {
    throw new AppError("USER_ID_REQUIRED", 400);
  }

  const existing = await userModel.getUserById(id);

  if (!existing) {
    throw new AppError("USER_NOT_FOUND", 404);
  }

  return await userModel.deleteUser(id);
};
