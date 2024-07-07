import express from 'express';
import {
    createTicket,
    getAllTickets,
    getTicketById,
    updateTicket,
    deleteTicket,
    getTicketsByUserId
} from '../controller/ticketController.js';  // Adjust the path to your ticketController as necessary
import protect from '../middleware/authMiddleware.js';

const router = express.Router();

// Define routes

router.route('/').post(protect, createTicket).get(protect, getAllTickets);
router.route('/user').get(protect, getTicketsByUserId)
router.route('/:id').get(protect, getTicketById).put(protect, updateTicket).delete(protect, deleteTicket);


export default router;
