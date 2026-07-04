import express from 'express';
import{addEmployee,  getEmployee, getEmployees}from '../controllers/employeesController.js';

const router = express.Router();




// get all posts
router.get('/',getEmployees );

// get single post
router.get('/:id',getEmployee );


//add post
router.post('/',addEmployee);

export default router;