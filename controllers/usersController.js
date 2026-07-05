import * as userService from '../service/userService.js';
console.log("usersController loaded");


//login

export const login = async (req, res) => {
    try {
        console.log(req.body);
        const { email, password } = req.body;

        const token = await userService.login(email, password);

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

// GET ALL
export const getUsers = async (req, res) => {
    try {
        const users = await userService.getUsers();
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// GET BY ID
export const getUser = async (req, res) => {
    try {
        const id = (req.params.id);

        if (isNaN(id)) {
            return res.status(400).json({
                message: "Invalid user ID"
            });
        }

        const user = await userService.getUserById(id);

        res.json(user);

    } catch (error) {

        if (error.message === "User not found") {
            return res.status(404).json({ message: error.message });
        }

        res.status(500).json({ message: error.message });
    }
};

// ADD USER
export const addUser = async (req, res) => {
    try {
        const user = req.body;

        const id = await userService.addUser(user);

        res.json({
            message: "User added successfully",
            id: id
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// UPDATE USER
export const updateUser = async (req, res) => {
    try {
        const id = Number(req.params.id);
        const user = req.body;

        if (isNaN(id)) {
            return res.status(400).json({
                message: "Invalid user ID"
            });
        }

        await userService.updateUser(id, user);

        res.json({
            message: "User updated successfully"
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// DELETE USER
export const deleteUser = async (req, res) => {
    try {
        const id = Number(req.params.id);

        if (isNaN(id)) {
            return res.status(400).json({
                message: "Invalid user ID"
            });
        }

        await userService.deleteUser(id);

        res.json({
            message: "User deleted successfully"
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};