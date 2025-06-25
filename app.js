import express from 'express'
import cors from 'cors'

const app = express()
app.use(cors({
    origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
    credentials: true
}))

app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended: true, limit: "16kb"}))

//import Routes
import userRoutes from './routes/user.routes.js'
// Routes declaration
app.use('/api/v1/users', userRoutes)

export {app}