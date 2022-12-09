import request from "supertest"
import { Pool } from 'pg';
import checkService from '../checker-service'
import { app } from "../../index";

describe('checker email', ()=>{
    const mPool = jest.mock('../../database/db');
    const testPool = new Pool({
        user: process.env.POOL_NAME,
        host: process.env.HOST,
        port: Number(process.env.DATAPORT),
        database: process.env.TEST_DATANAME
    });
    beforeEach(async () => {
        await testPool.query(`CREATE TABLE person (
            id SERIAL PRIMARY KEY,
            email VARCHAR (75) UNIQUE,
            password VARCHAR(255),
            name VARCHAR(255),
            surname VARCHAR(255),
            favorites json,
            homebar json,
            isActivated boolean,
            tokenActivated boolean,
            activatedCode VARCHAR(6))`)
        mPool.fn().mockRejectedValueOnce
      });
    afterEach(async () => {
        jest.clearAllMocks();
        await testPool.query('DROP TABLE person')
    });
    it('should return true',async ()=>{
        const emailCheck = await checkService.checkEmail('qwerty@gmail.com')
        expect(emailCheck).toBe(true)
    }),
    it('should return false', async () =>{
        const user = {name:'Mike', surname:'Dark' , email: 'qwerty@gmail.com', password: 'qwertyqwert'};
        await request(app).post('/api/user/registration').send(user)
        const emailCheck = await checkService.checkEmail(user.email)
        expect(emailCheck).toBe(false)
    })
})