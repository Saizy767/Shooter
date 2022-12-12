import request from 'supertest';
import { Pool } from 'pg';
import checkService from '../checker-service'
import { app } from "../../index";

describe('checker service', ()=>{
    const mPool = jest.mock('../../database/db');
    const testPool = new Pool({
        user: process.env.POOL_NAME,
        host: process.env.HOST,
        port: Number(process.env.DATAPORT),
        database: process.env.TEST_DATANAME
    });
    let user:{name:string, surname: string, email: string, password:string}
    let res: request.Response

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
        user = {name:'Mike', surname:'Dark' , email: 'qwerty@gmail.com', password: 'qwertyqwert'};
        res = await request(app).post('/api/user/registration').send(user)
      });
    afterEach(async () => {
        jest.clearAllMocks();
        await testPool.query('DROP TABLE person')
    });
    it('checker-email should return true',async ()=>{
        const emailCheck = await checkService.checkEmail('qwerty1@gmail.com')
        expect(emailCheck).toBeTruthy()
    }),
    it('checker-email should return false', async () =>{
        const emailCheck = await checkService.checkEmail(user.email)
        expect(emailCheck).toBeFalsy()
    }),
    it('checker-code should return false',async ()=>{
        const emailCheck = await checkService.checkCode({email:user.email,code:'123456'})
        expect(emailCheck).toBeFalsy()
    }),
    it('checker-code should return true', async () =>{
        const getUser = await request(app).get('/api/user/1')
        const emailCheck = await checkService.checkCode({email:user.email, code:getUser.body[0].activatedcode})
        expect(emailCheck).toBeTruthy()
    }),
    it('checker-id should return true', async () => {
        const IDCheck = await checkService.checkID({id:'1'})
        expect(IDCheck).toBeTruthy()
    })
    it('checker-id should return false', async () => {
        const IDCheck = await checkService.checkID({id:'2'})
        expect(IDCheck).toBeFalsy()
    })
})
