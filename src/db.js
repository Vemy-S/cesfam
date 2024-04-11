import {createPool} from 'mysql2/promise'


export const pool = createPool({
    host: 'localhost',
    user:'root',
    password: 'solution3214',
    port: 3306,
    database:'cesfamdb'
})

