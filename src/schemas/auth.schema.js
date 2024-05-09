import {z} from 'zod'

export const loginUserSchema = z.object({

    user_rut : z.string({
        required_error: "rut is required"
    }),
    

    user_uniquekey: z.string({
        required_error: "unique key is required"
    }) 

})