import {Router} from 'express'
import {pool} from '../db.js'
import {login, register, profile} from '../controllers/auth.controllers.js'

const router = Router()

router.get('/testconnect', async (req, res)=>{
    const query = await pool.query('SELECT * FROM user')
    res.send(query)
})

router.post('/login', login)
router.get('/profile', profile )

export default router