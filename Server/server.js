import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import connectDB from './config/db.js'
import errorMiddleware from './middleware/errorMiddleware.js'
import homeRoute from './routes/homeRoute.js'
import userRoute from './routes/userRoute.js'
import movieRoute from './routes/movieRoute.js'
import ticketRoutes from './routes/ticketRoute.js'
// import logger from './middleware/logger.js';

const PORT = process.env.PORT || 8000

// connect to MongoDB

connectDB()

const app = express()

app.use(cors())

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use(cookieParser())

app.use('/', homeRoute)
app.use('/home', homeRoute)
app.use('/api/users', userRoute)
app.use('/api/movies', movieRoute)
app.use('/api/tickets', ticketRoutes)

app.all('*', (_req, res) => {
  res.status(404).json({
    message: 'Page not found',
    documentation_url: 'https:/nmdra.github.io/restful-api',
    statusCode: 404,
  })
})

app.use(errorMiddleware)

app
  .listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
  })
  .on('error', (error) => {
    console.error(`Error starting server: ${error.message}`)
  })
