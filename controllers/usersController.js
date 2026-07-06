import * as userService from '../service/userService.js';
console.log("usersController loaded");



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
       

        const user = await userService.getUserById(id);

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        res.json(user);

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
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
        const id = (req.params.id);
        const user = req.body;


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
        const id = (req.params.id);

       

        await userService.deleteUser(id);

        res.json({
            message: "User deleted successfully"
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};