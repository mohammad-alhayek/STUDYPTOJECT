import * as authService from '../service/authService.js';

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const token = await authService.login(email, password);

        res.json({
            message: "Login successful",
            token
        });

    } catch (error) {
        res.status(401).json({
            message: error.message
        });
    }
};
export const register = async (req, res) => {
    try {
        const user = req.body;

        const result = await authService.register(user);

        res.status(201).json({
            message: "User registered successfully",
            data: result
        });

    } catch (error) {
        console.log(error);
        console.log(error.original);

        res.status(400).json({
            message: error.message
        });
    }
};