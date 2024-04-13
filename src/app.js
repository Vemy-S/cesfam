import express from 'express'
import morgan from 'morgan'
import authRoutes from './routes/auth.routes.js'
import cookieParser from 'cookie-parser'


const app = express()

app.use(morgan('dev'))
app.use(cookieParser())
app.use(express.json())

app.use('/api', authRoutes)


export default app