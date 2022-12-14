import { Pool } from 'pg';
import * as dotenv from 'dotenv'

dotenv.config()
let pool:Pool
if(process.env.NODE_ENV === 'test'){
    pool = new Pool({
        user: process.env.POOL_NAME,
        host: process.env.HOST,
        port: Number(process.env.DATAPORT),
        database: process.env.TEST_DATANAME
    })
}
else{
    pool = new Pool({
        user: process.env.POOL_NAME,
        host: process.env.HOST,
        port: Number(process.env.DATAPORT),
        database: process.env.DATANAME
    })
}

export default pool