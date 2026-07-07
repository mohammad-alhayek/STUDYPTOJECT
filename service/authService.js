import * as userRepository from '../repositories/userRepository.js';
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
import { generateEmployeeId, generateUserId } from '../utils/generateEmployeeId.js';


export const login = async (email, password) => {

    const user = await userRepository.getUserByEmail(email);

    if (!user) {
        throw new Error("Invalid email");
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        throw new Error("Invalid password");
    }

    const token = jwt.sign(
        {
            id: user.id,
            email: user.email
        },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
    );

    return token;
};

export const register = async (user) => {

    // 1. check email exists
    const existingUser = await userRepository.getUserByEmail(user.email);

    if (existingUser) {
        throw new Error("Email already exists");
    }

    // 2. hash password
    const hashedPassword = await bcrypt.hash(user.password, 10);

    // 3. build new user object
    const newUser = {
        id:generateUserId(),
        email: user.email,
        password: hashedPassword,
        full_name: user.full_name,
        is_active: 1,
       // created_at: new Date(),
        last_login: null
    };
   console.log(newUser);

    // 4. save to DB
    const createdUser = await userRepository.createUser(newUser);
console.log(createdUser);

    // 5. return safe response
    return {
        id: createdUser.id,
        email: createdUser.email,
        


    };
};