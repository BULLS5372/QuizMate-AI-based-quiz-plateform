import express from 'express';
import { signup, login } from '../controllers/authControllers.js';
import { getMe } from '../controllers/authControllers.js';
import protect  from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/register', signup);
router.post('/login', login);
router.get('/me', protect, getMe); // <-- This verifies the token and returns user


export default router;
