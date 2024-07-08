import express from 'express'
import apicache from 'apicache'
import {
    addMovie,
    getAllMovies,
    getMovieByImdbId,
    movieSearch,
} from '../controller/movieController.js'
import protect from '../middleware/authMiddleware.js'

const router = express.Router()
const cache = apicache.middleware

router.route('/add').post(protect, addMovie) // admin only
router.route('/').get(protect, cache('5 minutes'), getAllMovies)
router.route('/search').get(protect, cache('5 minutes'), movieSearch) // search by title
router.route('/:imdbId').get(protect, cache('5 minutes'), getMovieByImdbId)

export default router
