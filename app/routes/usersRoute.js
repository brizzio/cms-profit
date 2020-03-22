import express from 'express';

import { createUser, siginUser } from '../controllers/usersController';
import verifyAuth from '../middlewares/verifyAuth';

const router = express.Router();

// buses Routes

router.post('/user', verifyAuth, createUser);
router.get('/user', verifyAuth, siginUser);
export default router;