import express from 'express';

import auth from './auth.js';
import users from './users.js';
import employees from './employees.js';

const router = express.Router();

// Mount all routes here
router.use('/auth', auth);
router.use('/users', users);
router.use('/employees', employees);

export default router;