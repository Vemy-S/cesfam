import {createPool} from 'mysql2/promise'


export const pool = createPool({
    host: '127.0.0.1',
    user:'root',
    password: 'solution3214',
    port: 3306,
    database: 'cesfamdb'
})



