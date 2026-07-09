// repositories/authRepository.js
import User from "../model/userModel.js";

// CREATE USER
export const createUser = async (user) => {
  const createdUser = await User.create(user);

  return createdUser.toJSON();
};
