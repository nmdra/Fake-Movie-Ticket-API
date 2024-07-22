import express from 'express'
import {
    registerUser,
    getUserProfile,
    authUser,
    logoutUser,
    updateUserProfile,
    getUserById,
    deleteUserById,
} from '../controller/userController.js'
import protect from '../middleware/authMiddleware.js'

const router = express.Router()

router.route('').post(registerUser)
router
    .route('/profile')
    .get(protect, getUserProfile)
    .put(protect, updateUserProfile)
router.route('/auth').post(authUser)
router.route('/logout').post(protect, logoutUser)
router.route('/update').put(protect, updateUserProfile)

router.route('/delete').delete(protect, deleteUserById)
router.route('/:id').get(protect, getUserById) // admin only

export default router
