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
      message: req.__("USER_NOT_FOUND"),
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


  res.json({
    message: req.__("USER_UPDATED_SUCCESS"),
  });


// DELETE USER
export const deleteUser = async (req, res) => {
    try {
        const id = (req.params.id);

       

  res.json({
    message: req.__("USER_DELETED_SUCCESS"),
  });
});
