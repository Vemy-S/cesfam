import {Router} from 'express'
import {pool} from '../db.js'

const router = Router()

router.get('/ping', async (req, res)=>{
    const query = await pool.query('SELECT * FROM user')
    res.send(query)
})

export default router