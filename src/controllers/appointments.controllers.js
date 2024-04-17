import {pool} from '../db.js'

export const getAppointments = async (req, res) => {
    try {
        const appointments = await pool.query('SELECT * FROM medical_schedule WHERE appointment_status = true')
        res.json(appointments)
    } catch (error) {
        console.error(error.message)
    }
}

export const makeReservation = async (req, res) => {
    const { appointment_id, user_rut } = req.body;
    try {
        //comprueba disponibilidad
        const cita = await pool.query('SELECT * FROM medical_schedule WHERE appointment_id = ? AND appointment_status = true', [appointment_id]);
        if (cita.rows.length === 0) {
            return res.status(404).json({ error: 'Appointment not avalaible' });
        }

        // registrar
        await pool.query('INSERT INTO appointment_reservation (appointment_id, user_rut) VALUES (?, ?)', [appointment_id, user_rut]);

        // Actualizar
        await pool.query('UPDATE medical_schedule SET appointment_status = false WHERE appointment_id = ?', [appointment_id]);
        res.json({ message: 'Appointment taken successfully' });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: 'Server internal error' });
    }
}