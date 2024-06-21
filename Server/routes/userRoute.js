import express from 'express';
import { registerUser, getUserProfile, authUser, logoutUser } from '../controller/userController.js';
import protect from '../middleware/authMiddleware.js';


const router = express.Router();

router.route('/register').post(registerUser);
router.route('/profile').get(protect, getUserProfile);
router.route('/auth').post(authUser);
router.route('/logout').post(protect, logoutUser);
export default router;

// POST /api/users - Register a user
// POST /api/users/auth - Authenticate a user and get token
// POST /api/users/logout - Logout user and clear cookie
// GET /api/users/profile - Get user profile
// PUT /api/users/profile - Update profile