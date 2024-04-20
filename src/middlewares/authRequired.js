import jwt from 'jsonwebtoken'


const authRequired = (req, res, next) => {
    const { token } = req.cookies

    if(!token) return res.status(401).json({"message":"No token, authorization denied"})

    jwt.verify(token, 'losgey', (err, decoded) => {
        if(err) return res.status(403).json({"message":"Invalid token"})

        //extraer informacion del token
        const usuario = decoded.user[0]  

        req.user = usuario
        
        console.log(`=>Depuracion: Informacion desde el Token RUT:${req.user.user_rut}  NAME:${req.user.user_fullname}`)

        next()
    })
}

export default authRequired


