import request from "supertest"
import {app} from "../../index"
import * as dotenv from 'dotenv'
import { Pool } from 'pg';

dotenv.config()
    const mPool = jest.mock('../../database/db');
    const testPool = new Pool({
        user: process.env.POOL_NAME,
        host: process.env.HOST,
        port: Number(process.env.DATAPORT),
        database: process.env.TEST_DATANAME
    })
  
describe('user routes',()=>{
    let user: {
        name: string;
        surname: string;
        email: string;
        password: string;
    }
    let req:request.Response
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
            activatedCode VARCHAR(6));`)
      });
      user = {name:'Mike', surname:'Dark' , email: 'qwerty@gmail.com', password: 'qwertyqwert'};
    afterEach(async () => {
        jest.clearAllMocks();
        await testPool.query('DROP TABLE person;')
    });
    
    test('POST /registration', async ()=>{
        req = await request(app).post('/api/user/registration').send(user)
        expect(req.status).toBe(201)
        expect(req.body.message).toBe('Account created')
    }),
    test('UPDATED /registration', async ()=>{
        await request(app).post('/api/user/registration').send(user)
        const response = await request(app).post('/api/user/registration').send(user)
        expect(response.status).toBe(200)
        expect(response.body.message).toBe('Account updated')
    }),
    test('PATCH /auth-code', async ()=>{
        await request(app).post('/api/user/registration').send(user)
        const person = await request(app).get('/api/user')
        const usercode = {email: 'qwerty@gmail.com', code:person.body[0].activatedcode};
        const response = await request(app).patch('/api/user/auth-code').send(usercode)
        expect(response.status).toBe(200)
    }),
    test('GET /user', async () =>{
        await request(app).post('/api/user/registration').send(user)
        const mDB = jest.fn().mockResolvedValueOnce(
            {"email": user.email,
            "name": user.name,
            "tokenactivated": false,
            "surname": user.surname,
            "isactivated": false})
        mPool.fn().mockReturnValueOnce(mDB)
        const response = await request(app).get('/api/user').expect(200)
        expect(response.body[0]).toMatchObject({
            "email": user.email,
            "name": user.name,
            "tokenactivated": false,
            "surname": user.surname,
            "isactivated": false
        })
    })
})
