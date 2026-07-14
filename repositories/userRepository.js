import User from "../model/userModel.js";

// Get all users
export const getAllUsers = async () => {
  return await User.findAll();
};

// Get user by ID
export const getUserById = async (id) => {
  if (!id) {
    throw new Error("User ID is required");
  }
  return await User.findByPk(id);
};

// Get user by email
export const getUserByEmail = async (email) => {
  return await User.findOne({
    where: { email: email },
  });
};

// Update user
export const updateUser = async (id, user) => {
  if (!id) {
    throw new Error("User ID is required");
  }
  await User.update(user, {
    where: { id: id },
  });
  return id;
};

// Delete user
export const deleteUser = async (id) => {
  if (!id) {
    throw new Error("User ID is required");
  }
  await User.destroy({
    where: { id: id },
  });
};

// Create user
export const createUser = async (user) => {
  const createdUser = await User.create(user);
  return {
    id: createdUser.id,
    email: createdUser.email,
  };
};
