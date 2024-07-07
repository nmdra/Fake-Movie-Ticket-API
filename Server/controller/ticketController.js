import Ticket from '../model/ticketModel.js';  // Adjust the path to your Ticket model as necessary
import CustomError from '../utils/customError.js';
import Movie from '../model/movieModel.js';  // Adjust the path to your Movie model as necessary
import mongoose from 'mongoose';

// Create a new ticket
export const createTicket = async (req, res, next) => {

    let movieId = req.query.movieId;

    const { showtimes, seats, price, paymentStatus } = req.body;

    try {

        const movie = await Movie.findById(movieId);
        if (!movie) {
            throw new CustomError('Movie not found', 404);
        }

        // Create the ticket
        const ticket = await Ticket.create({
            userId: req.user._id,  // Assuming req.user._id contains the authenticated user's ID
            movieId,
            showtimes,
            seats,
            price,
            paymentStatus,
            // purchaseDate: new Date()
        });

        // const populatedTicket = await Ticket.findById(ticket._id)
        //     .populate({
        //         path: 'userId',
        //         select: 'email'  // Select only the email field from the User collection
        //     })
        //     .populate('movieId')  // Populate all fields from the Movie collection
        //     .exec();

        // console.log('Populated Ticket:', populatedTicket);

        // Respond with the created ticket details
        return res.status(201).json({
            _id: ticket._id,
            userId: ticket.userId,
            movieId: ticket.movieId,
            showtimes: ticket.showtimes,
            seats: ticket.seats,
            price: ticket.price,
            paymentStatus: ticket.paymentStatus,
            purchaseDate: ticket.purchaseDate,
            isRelease: ticket.isRelease
        });

    } catch (error) {
        // Handle any errors that occur
        return next(error);
    }
};

// Get all tickets
export const getAllTickets = async (req, res) => {
    try {
        const tickets = await Ticket.find().populate({
            path: 'userId',
            select: 'email'  // Select only the email field from the User collection
        }).populate({
            path: 'movieId',
            select: 'title'  // Select only the title field from the Movie collection
        }).exec();
        res.status(200).json(tickets);
    } catch (error) {
        throw new CustomError(error.message, 400)
    }
};

export const getTicketsByUserId = async (req, res, next) => {
    
    const userId = req.query.userId;
   
    if (!mongoose.Types.ObjectId.isValid(userId)) {
        return next(new CustomError('Invalid user ID', 400));
    } 
    try {
        // Find tickets by user ID
        const tickets = await Ticket.find({ userId }).populate('movieId');
        console.log(tickets);


        if (!tickets || tickets.length === 0) {
            throw new CustomError('No tickets found for this user', 404);
        }

        // Respond with the found tickets
        return res.status(200).json(tickets);
    } catch (error) {
        // Handle any errors that occur
        return next(error);
    }
};

// Get a ticket by ID
export const getTicketById = async (req, res) => {
    try {
        const ticket = await Ticket.findById(req.params.id).populate('userId movieId');
        if (!ticket) {
            return res.status(404).json({ message: 'Ticket not found' });
        }
        res.status(200).json(ticket);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update a ticket by ID
export const updateTicket = async (req, res) => {
    try {
        const updatedTicket = await Ticket.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });
        if (!updatedTicket) {
            return res.status(404).json({ message: 'Ticket not found' });
        }
        res.status(200).json(updatedTicket);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete a ticket by ID
export const deleteTicket = async (req, res) => {
    try {
        const deletedTicket = await Ticket.findByIdAndDelete(req.params.id);
        if (!deletedTicket) {
            return res.status(404).json({ message: 'Ticket not found' });
        }
        res.status(200).json({ message: 'Ticket deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
