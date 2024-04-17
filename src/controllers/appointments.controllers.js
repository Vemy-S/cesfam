import {pool} from '../db.js'

export const getHours = async (req, res) => {
    try {
        const hours = await pool.query('SELECT * FROM medicalhour WHERE medicalhour_id = true')
        res.json(hours)
    } catch (error) {
        console.error(error.message)
    }

}

export const hourReservation = async (req, res) => {
    const {medicalhour_id, user_rut, medicalhour_time} = req.body
    try {
        //Verificar y desactivar hora
        const status = await pool.query('SELECT medicalhour_status FROM medicalhour WHERE medicalhour_id = ?', [medicalhour_id])
        const status_time = status[0][0].medicalhour_status
        if(status_time === 0){
            return res.status(404).json({"message":"Time not available"})
        }
        const updateHour = await pool.query('UPDATE medicalhour SET medicalhour_status = false WHERE medicalhour_id = ?', [medicalhour_id])
        const takeHour = await pool.query('INSERT INTO hour_reservation (medicalhour_id, user_rut, medicalhour_time) VALUES (?,?,?)', [medicalhour_id ,user_rut, medicalhour_time])

        res.json({"message":"Reserved time succesfully"})
    } catch (error) {
        console.log(error.message)
    }
};

export const cancelReservation = async (req, res) => {
    const {medicalhour_id, user_rut} = req.body
    try {
        const status = await pool.query('SELECT medicalhour_status FROM medicalhour WHERE medicalhour_id = ?', [medicalhour_id])
        const status_time = status[0][0].medicalhour_status

        if(status_time === 1){
            return res.status(404).json({"message":"Time not reserved"})
        }

        const updateHour = await pool.query('UPDATE medicalhour SET medicalhour_status = TRUE WHERE medicalhour_id = ?', medicalhour_id)
        const cancelHour = await pool.query('DELETE FROM hour_reservation WHERE medicalhour_id = ? AND user_rut = ?', [medicalhour_id, user_rut])

        res.json({"message":"Reservation canceled"})
        
    } catch (error) {
        console.log(error.message)
    }
}




  