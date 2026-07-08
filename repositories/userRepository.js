// repositories/userRepository.js
import User from "../model/userModel.js";

// GET ALL Users
export const getAllUsers = async () => {
  return await User.findAll();
};

// GET USER BY ID
export const getUserById = async (id) => {
  if (!id) {
    throw new Error("User ID is required");
  }
  return await User.findByPk(id);
};

// GET USER BY EMAIL
export const getUserByEmail = async (email) => {
  return await User.findOne({
    where: { email: email },
  });
};

// UPDATE USER
export const updateUser = async (id, user) => {
  if (!id) {
    throw new Error("User ID is required");
  }

  await User.update(user, {
    where: { id: id },
  });
  return id;
};

// DELETE USER
export const deleteUser = async (id) => {
  if (!id) {
    throw new Error("User ID is required");
  }

  await User.destroy({
    where: { id: id },
  });
};

// CREATE USER
export const createUser = async (user) => {
  const createdUser = await User.create(user);
  return {
    id: createdUser.id,
    email: createdUser.email,
  };
};
