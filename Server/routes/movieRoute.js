import express from 'express';
import {
    addMovie,
    getAllMovies,
    getMovieByImdbId
} from '../controller/movieController.js';
import protect from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/add').post(protect, addMovie); // admin only
router.route('/').get(protect,getAllMovies); 
router.route('/:imdbId').get(protect, getMovieByImdbId); 

export default router;