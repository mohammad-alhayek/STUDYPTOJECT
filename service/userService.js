import * as userModel from '../model/userModel.js';
import { generateUserId } from '../utils/generateEmployeeId.js';
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';

//login
export const login = async (email, password) => {

    
    const user = await userModel.getUserByEmail(email);

    if (!user) {
        throw new Error("Invalid email ");
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        throw new Error("Invalid  password");
    }

    // 3. نعمل JWT Token
    const token = jwt.sign(
        {
            id: user.id,
            email: user.email
        },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
    );

    // 4. نرجع التوكن
    return token;
};


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

// ADD USER
export const addUser = async (user) => {

    
    const id = generateUserId();

    const newUser = {
        id,
        ...user
    };

    return await userModel.addUser(newUser);
};
// UPDATE USER
export const updateUser = async (id, user) => {

    // 🧠 هنا مكان الـ business logic (لاحقاً)
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