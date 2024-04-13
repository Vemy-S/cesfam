import jwt from 'jsonwebtoken'

export const createAccesToken = (payload) => {

    return new Promise((resolve, reject)=>{
        
        jwt.sign(
            payload,
            'losgey',
            {expiresIn:'1d'},
            (err, token)=>{
                if(err) reject(err)
                resolve(token)
            }
        )
    })

}