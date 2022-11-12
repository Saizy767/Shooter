import { Pool } from 'pg';
import * as dotenv from 'dotenv'

const env = dotenv.config().parsed

const pool = new Pool({
    user: env.POOL_NAME,
    host: env.HOST,
    port: Number(env.DATAPORT),
    database: env.DATANAME
})

export default pool