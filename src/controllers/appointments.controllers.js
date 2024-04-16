import {pool} from '../db.js'

export const getAppointments = async (req, res) => {
    try {
        const appointments = await pool.query('SELECT * FROM medical_appointment WHERE appointment_status = true')
        res.json(appointments.rows)
    } catch (error) {
        console.error(error.message)
    }
}