import express from 'express';
import homeRoute from './routes/homeRoute.js';
import goalRoute from './routes/goalRoute.js';
import errorMiddleware from './middleware/errorMiddleware.js';
import connectDB from './config/db.js';
// import logger from './middleware/logger.js';

const PORT = process.env.PORT || 8000;

// connect to MongoDB

connectDB();

const app = express();

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/', homeRoute)
app.use('/home', homeRoute)

app.use('/api/goals', goalRoute)

app.use(errorMiddleware);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
}).on('error', (error) => {
    console.error(`Error starting server: ${error.message}`);
});

