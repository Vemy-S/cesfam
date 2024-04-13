import jwt from 'jsonwebtoken'


const authRequired = (req, res, next) => {
    const { token } = req.cookies

    if(!token) return res.status(401).json({"message":"No token, authorization denied"})

    jwt.verify(token, 'losgey', (err, decoded) => {
        if(err) return res.status(403).json({"message":"Invalid token"})

        req.user = decoded

        console.log(decoded)

        next()
    })
}

export default authRequired