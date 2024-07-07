import mongoose from 'mongoose';

// Define ticket schema
const ticketSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: [true, 'User ID is required']
        },
        movieId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Movie',
            required: [true, 'Movie ID is required'],
        },
        showtimes: {
            type: Date,
            required: [true, 'Showtime is required'],
        },
        seats: [
            {
                row: {
                    type: Number,
                    required: [true, 'Seat row is required'],
                },
                number: {
                    type: Number,
                    required: [true, 'Seat number is required'],
                },
            },
        ],
        purchaseDate: {
            type: Date,
            default: Date.now,
        },
        price: {
            type: Number,
            required: [true, 'Price is required'],
        },
        paymentStatus: {
            type: String,
            enum: ['Paid', 'Pending'],
            default: 'Pending',
        },
        isRelease: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    }
)

// Create Ticket model
const Ticket = mongoose.model('Ticket', ticketSchema)

export default Ticket
