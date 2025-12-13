import express from 'express'
import cors from 'cors'
import "dotenv/config";

import connectDB from './configs/db.js'
import userRouter from './routes/userRoutes.js'
import resumeRouter from './routes/resumeRoutes.js'
import aiRouter from './routes/aiRoutes.js'

/*
|--------------------------------------------------------------------------
| App Initialization
|--------------------------------------------------------------------------
*/
const app = express()
const PORT = process.env.PORT || 3000

/*
|--------------------------------------------------------------------------
| Database Connection
|--------------------------------------------------------------------------
| Connects to MongoDB using Mongoose
*/
await connectDB()

/*
|--------------------------------------------------------------------------
| Global Middlewares
|--------------------------------------------------------------------------
*/
app.use(express.json()) // Parse JSON request bodies
app.use(cors())         // Enable CORS for all origins

/*
|--------------------------------------------------------------------------
| Health Check Route
|--------------------------------------------------------------------------
*/
app.get('/', (req, res) => {
    res.send('Server is live...')
})

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
*/
app.use('/api/users', userRouter)     // User auth & profile
app.use('/api/resumes', resumeRouter) // Resume CRUD operations
app.use('/api/ai', aiRouter)          // AI-related features

/*
|--------------------------------------------------------------------------
| Start Server
|--------------------------------------------------------------------------
*/
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})
