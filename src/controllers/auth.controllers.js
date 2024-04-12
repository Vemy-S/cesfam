import {pool} from '../db.js'

export const login = (req, res ) =>{
    try {
        res.send('Logeando')
    } catch (error) {
        console.log(error) // temporal
    }
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