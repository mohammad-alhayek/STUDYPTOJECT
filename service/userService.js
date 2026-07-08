import * as userModel from "../repositories/userRepository.js";

// GET ALL Users
export const getUsers = async () => {
  return await userModel.getAllUsers();
};

// GET USER BY ID
export const getUserById = async (id) => {
  if (!id) {
    throw new Error("User ID is required");
  }

  const user = await userModel.getUserById(id);

  if (!user) {
    throw new Error("User not found");
  }

  return user;
};

// UPDATE USER
export const updateUser = async (id, user) => {
  if (!id) {
    throw new Error("User ID is required");
  }

  if (!user.full_name) {
    throw new Error("User name is required");
  }

  return await userModel.updateUser(id, user);
};
// DELETE USER
export const deleteUser = async (id) => {
  if (!id) {
    throw new Error("User ID is required");
  }

  const existing = await userModel.getUserById(id);

  if (!existing) {
    throw new Error("User not found");
  }

  return await userModel.deleteUser(id);
};
