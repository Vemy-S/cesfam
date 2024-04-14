import {pool} from '../db.js'
import { createAccesToken } from '../libs/jwt.js'

export const login = async (req, res ) =>{
    const {user_rut, user_uniquekey} = req.body
    try {
       const findUser = await pool.query('SELECT * from user WHERE user_rut = ? AND user_uniquekey = ?', [user_rut, user_uniquekey])
        
        const user = findUser[0]

        console.log(`email del usuario ${user.user_email}`)
        
        if(user.length === 0 ){
            return res.status(404).json({"message":"Rut or password is invalid"})
        }

        const token = await createAccesToken({user})
        res.cookie('token', token)

       res.send(findUser)

    } catch (error) {
        console.log(error);
        res.status(500).json({ "message": "Internal Server Error" });
    }
}



export const logout = (req, res) =>{
    res.cookie('token', '', {
        expires: new Date(0)
    })
    res.sendStatus(200)
}

export const register = (req, res ) =>{
    try {
        res.send('Registrando')
    } catch (error) {
        console.log(error) // temporal
    }
}

export const profile = (req, res) =>{
    try {
        res.send('Profile')
    } catch (error) {
        console.log(error) // temporal
    }
}