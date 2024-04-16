import {Router} from 'express'
import { getAppointments, makeReservation } from '../controllers/appointments.controllers.js'

const router = Router()

router.get('/appointments', getAppointments)
router.post('/appointments', makeReservation)





export default router