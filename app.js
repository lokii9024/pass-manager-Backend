import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'

const app = express()
app.use(cors({
    origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
    credentials: true
}))

app.use(express.json())
app.use(express.urlencoded({extended: true, limit: "16kb"}))
app.use(cookieParser())

//import Routes
import userRoutes from './routes/user.routes.js'
import passRoutes from './routes/pass.routes.js'
// Routes declaration
app.use('/api/v1/users', userRoutes)
app.use('/api/v1/passes', passRoutes)

export {app}