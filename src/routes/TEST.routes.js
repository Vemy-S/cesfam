import {Router} from 'express'
import {pool} from '../db.js'

const router = Router()

router.get('/info', async (req, res) =>{

   try {

    const info = await pool.query('SELECT u.user_rut, hr.medicalhour_time, hr.reservation_date, hr.reservation_id  from user u left join hour_reservation hr on u.user_rut = hr.user_rut')
    res.json(info)
   } catch (error) {
    console.log(error)
   }

    
})

export default router