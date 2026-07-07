
import express from 'express';
import{addUser,getUser, getUsers,deleteUser,updateUser}from '../controllers/usersController.js';
import { loginLimiter } from '../middlewares/rateLimiter.js';
const router = express.Router();




// get all posts
router.get('/',getUsers );

// get single post
router.get('/:id',getUser );


//add post
router.post('/',addUser);
// update
router.put('/:id', updateUser);

// delete
router.delete('/:id', deleteUser);

export default router;