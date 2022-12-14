import request from 'supertest';
import * as dotenv from 'dotenv'
import { Pool } from 'pg';

import {app} from "../../../index"
import { DataQuery } from '../../../src/models/user-schema';

dotenv.config()
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
        await testPool.query(DataQuery)
        user = {name:'Mike', surname:'Dark' , email: 'qwerty@gmail.com', password: 'qwertyqwert'};
        req = await request(app).post('/api/user/registration').send(user)
      });
    afterEach(async () => {
        jest.clearAllMocks();
        await testPool.query('DROP TABLE person;')
    });
    
    test('POST /registration', async ()=> {
        expect(req.status).toBe(201)
    }),
    test('UPDATED /registration', async ()=> {
        const response = await request(app).post('/api/user/registration').send(user)
        expect(response.status).toBe(200)
    }),
    test('PATCH /auth-code', async ()=> {
        const person = await request(app).get('/api/user')
        const usercode = {email: 'qwerty@gmail.com', code:person.body[0].activatedcode};
        const response = await request(app).patch('/api/user/auth-code').send(usercode)
        expect(response.status).toBe(200)
    }),
    test('GET /user', async () => {
        const response = await request(app).get('/api/user')
        expect(response.status).toBe(200)
    }),
    test('DELETE /user', async () => {
        const deleteUser = await request(app).delete('/api/user/1')
        const deleteErrorUser = await request(app).delete('/api/user/2')
        expect(deleteUser.status).toBe(200)
        expect(deleteErrorUser.status).toBe(400)
    }),
    test('GET /user/email/:email', async () => {
        const existingResponse = await request(app).get(`/api/user/email/${user.email}`)
        const response = await request(app).get(`/api/user/email/${user.email + 'a'}`)
        expect(existingResponse.status).toBe(400)
        expect(response.status).toBe(200)
    }),
    test('GET /user/:id', async () => {
        const response = await request(app).get('/api/user/1')
        const responseError = await request(app).get('/api/user/2')
        expect(response.status).toBe(200)
        expect(responseError.status).toBe(400)
    }),
    test('PUT /user/:id', async () => {
        const newUser = {name:'Lucka', surname:'Host'}
        const update = await request(app).put('/api/user/1').send(newUser)
        expect(update.status).toBe(200)
    }),
    test('PUT /user/homebar/:id', async () => {
        const response = await request(app).patch('/api/user/homebar/1').send({homebar:{coctail:'Pinokolada'}})
        expect(response.status).toBe(200)
    })
    test('PUT /user/favorites/:id', async () => {
        const response = await request(app).patch('/api/user/favorites/1').send({favorites:{coctail:'Pinokolada'}})
        expect(response.status).toBe(200)
    })
})
