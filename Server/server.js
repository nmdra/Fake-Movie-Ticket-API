import express from 'express';
import connectDB from './config/db.js';
import errorMiddleware from './middleware/errorMiddleware.js';
import homeRoute from './routes/homeRoute.js';
import goalRoute from './routes/goalRoute.js';
import userRoute from './routes/userRoute.js';
import cookieParser from 'cookie-parser';

// import logger from './middleware/logger.js';

const PORT = process.env.PORT || 8000;

// connect to MongoDB

connectDB();

const app = express();

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use(cookieParser());

app.use('/', homeRoute)
app.use('/home', homeRoute)
app.use('/api/goals', goalRoute)
app.use('/api/users', userRoute)
app.all('*', (req, res) => {
  res.status(404).send('<h1>404! Page not found</h1>');
});

app.use(errorMiddleware);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
}).on('error', (error) => {
    console.error(`Error starting server: ${error.message}`);
});

