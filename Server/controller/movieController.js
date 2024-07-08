import Movie from '../model/movieModel.js'
import CustomError from '../utils/customError.js'

export const addMovie = async (req, res, next) => {
    const { title, imdbId, showtimes, posterImage } = req.body

    try {
        if (req.user.role !== 'admin')
            throw new CustomError('Unauthorized access', 401)

        // Create a new user
        const movie = await Movie.create({
            title,
            imdbId,
            showtimes,
            posterImage,
        })

        if (movie) {
            return res.status(201).json({
                _id: movie._id,
                title: movie.title,
                imdbId: movie.imdbId,
                showtimes: movie.showtimes,
                posterImage: movie.posterImage,
            })
        } else {
            throw new CustomError('Movie Adding failed', 500)
        }
    } catch (error) {
        return next(error)
    }
}

// Get all movies
export const getAllMovies = async (req, res, next) => {
    try {
        const limit = parseInt(req.query.limit, 10) || 10
        const skip = parseInt(req.query.skip, 10) || 0

        const movies = await Movie.find().limit(limit).skip(skip) // Fetch all movies from the database
        res.status(200).json(movies) // Respond with the list of movies
    } catch (error) {
        next(error) // Pass any errors to the error handling middleware
    }
}

// Get a movie by IMDb ID
export const getMovieByImdbId = async (req, res, next) => {
    const { imdbId } = req.params

    try {
        const movie = await Movie.findOne({ imdbId })

        if (!movie) {
            throw new CustomError('Movie not found', 404)
        }

        res.status(200).json(movie) // Respond with the movie object
    } catch (error) {
        next(error) // Pass any errors to the error handling middleware
    }
}

export const movieSearch = async (req, res, next) => {
    const title = req.query.title

    try {
        if (!title) {
            throw new CustomError('Search query is required', 400)
        }

        const movies = await Movie.find({
            title: { $regex: title, $options: 'i' },
        })

        if (!movies || movies.length === 0) {
            res.status(404).json({ message: 'No movies found' })
            return
        }

        res.status(200).json(movies)
    } catch (error) {
        next(error)
    }
}
