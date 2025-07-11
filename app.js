import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'

const app = express()
app.use(cors({
    origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
    credentials: true
}))

app.use(express.json())
app.use(express.urlencoded({extended: true, limit: "16kb"}))
app.use(cookieParser())

//home
app.get('/', (req,res) => {
    res.json({message: "hello"})
})

//import Routes
import userRoutes from './routes/user.routes.js'
import passRoutes from './routes/pass.routes.js'
// Routes declaration
app.use('/api/v1/users', userRoutes)
app.use('/api/v1/passes', passRoutes)

export {app}