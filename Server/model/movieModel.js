import mongoose from 'mongoose';

// Define showtime schema
const showtimeSchema = new mongoose.Schema({
    time: {
        type: Date,
        required: true
    },
    screen: {
        type: Number,
        required: true
    }
});

// Define movie schema using showtime schema
const movieSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, "title is required"],
        },
        imdbId: {
            type: String,
            required: [true, "imdbId is required"],
            unique: [true, "imdbId must be unique"]
        },
        showtimes: [showtimeSchema], // Embedding showtime schema
        posterImage: {
            type: String,
            default: "",
            required: false
        }
    },
    {
        timestamps: true
    }
);

// Create Movie model
const Movie = mongoose.model('Movie', movieSchema);

export default Movie;

