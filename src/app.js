import express from 'express'
import morgan from 'morgan'
import authRoutes from './routes/auth.routes.js'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import appointmentsRoutes from './routes/appointments.routes.js'
import {cronReset} from './Automate/resetTime.js'
import sendInfoRoutes from './routes/sendInfo.routes.js'

import testRoutes from './routes/TEST.routes.js'


const app = express()

cronReset();
app.use(cors())
app.use(morgan('dev'))
app.use(cookieParser())
app.use(express.json())


app.use('/api', authRoutes)
app.use('/api', appointmentsRoutes)
app.use('/api', sendInfoRoutes )

app.use('/test', testRoutes)


export default app