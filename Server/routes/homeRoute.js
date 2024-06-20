import express from 'express';
import { homePage } from '../controller/homeController.js'
const router = express.Router()

router.get('/', homePage);

export default router;