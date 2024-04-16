import {Router} from 'express'
import { getAppointments } from '../controllers/appointments.controllers.js'

const router = Router()

router.get('/appointments', getAppointments)






export default router