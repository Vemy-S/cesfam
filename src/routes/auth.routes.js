import {Router} from 'express'
import {pool} from '../db.js'
import {loginuser, register, profile, logout, } from '../controllers/auth.controllers.js'
import authRequired from '../middlewares/authRequired.js'

const router = Router()

router.get('/testconnect', async (req, res)=>{
    const query = await pool.query('SELECT * FROM user')
    res.send(query)
})

router.post('/loginuser', loginuser)
router.post('/logout', logout)
router.get('/profile', authRequired , profile )


export default router