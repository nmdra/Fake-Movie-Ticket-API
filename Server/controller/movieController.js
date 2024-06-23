import Movie from '../model/movieModel.js';
import CustomError from '../utils/customError.js';

export const addMovie = async (req, res, next) => {
    const { title, imdbId, showtimes, posterImage } = req.body;

    try {
        if (req.user.role !== 'admin') throw new CustomError('Unauthorized access', 401)

        // Create a new user
        const movie = await Movie.create({ title, imdbId, showtimes, posterImage });

        if (movie) {
            return res.status(201).json({
                _id: movie._id,
                title: movie.title,
                imdbId: movie.imdbId,
                showtimes: movie.showtimes,
                posterImage: movie.posterImage
            });
        } else {
            throw new CustomError('Movie Adding failed', 500);
        }
    } catch (error) {
        return next(error);
    }

};

// Get all movies
export const getAllMovies = async (req, res, next) => {
    try {
        const movies = await Movie.find(); // Fetch all movies from the database
        res.status(200).json(movies); // Respond with the list of movies
    } catch (error) {
        next(error); // Pass any errors to the error handling middleware
    }
};

// Get a movie by IMDb ID
export const getMovieByImdbId = async (req, res, next) => {
    const { imdbId } = req.params;

    try {
        const movie = await Movie.findOne({ imdbId });

        if (!movie) {
            throw new CustomError('Movie not found', 404);
        }

        res.status(200).json(movie); // Respond with the movie object
    } catch (error) {
        next(error); // Pass any errors to the error handling middleware
    }
};
