//import * as userModel from '../model/userModel.js';
import * as userModel from "../repositories/userRepository.js";
import {
  generateEmployeeId,
  generateUserId,
} from "../utils/generateEmployeeId.js";

// GET ALL Users
export const getUsers = async () => {
  return await userModel.getAllUsers();
};

// GET USER BY ID
export const getUserById = async (id) => {
  if (!id) {
    throw new AppError("USER_ID_REQUIRED", 400);
  }

  if (!id) {
    throw new Error("User ID is required");
  }

  if (!user) {
    throw new AppError("USER_NOT_FOUND", 404);
  }

  if (!user) {
    throw new Error("User not found");
  }

  return user;
};

// ADD USER
export const addUser = async (user) => {
  const id = generateUserId();

  const newUser = {
    id,
    ...user,
  };

  return await userModel.addUser(newUser);
};
// UPDATE USER
export const updateUser = async (id, user) => {
  if (!id) {
    throw new AppError("USER_ID_REQUIRED", 400);
  }

  if (!user.full_name) {
    throw new AppError("USER_NAME_REQUIRED", 400);
  }

  if (!user.full_name) {
    throw new Error("User name is required");
  }

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

  if (!id) {
    throw new Error("User ID is required");
  }

  if (!existing) {
    throw new AppError("USER_NOT_FOUND", 404);
  }

  if (!existing) {
    throw new Error("User not found");
  }

  return await userModel.deleteUser(id);
};
