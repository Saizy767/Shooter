import request from "supertest"
import { Pool } from 'pg';
import {app} from "../../index"

jest.mock('pg', () => {
    const mClient = {
      connect: jest.fn(),
      query: jest.fn(),
      end: jest.fn(),
    };
    return { Pool: jest.fn(() => mClient) };
  });

describe('user routes',()=>{
    beforeEach(() => {
        const client = new Pool();
      });
      afterEach(() => {
        jest.clearAllMocks();
      });
    test('registration', async ()=>{
        const user = { name:'Mike', surname:'Dark' , email: 'qwerty@gmail.com', password: 'qwertyqwert'};
        const req = await request(app).post('/api/user/registration').send(user)
        expect(req.status).toBe(201)
    }),
    test('registration repeat', async ()=>{
        const user = { name:'Mike', surname:'Dark' , email: 'qwerty@gmail.com', password: 'qwertyqwert'};
        const req = await request(app).put('/api/user/registration/1').send(user)
        expect(req.status).toBe(200)
    }),
    test('authorization code', async ()=>{
        const user = { name:'Mike', surname:'Dark' , email: 'qwerty@gmail.com', password: 'qwertyqwert'};
        const code = {email: 'qwerty@gmail.com', code:'123456'};
        await request(app).post('/api/user/registration').send(user)
        const req = await request(app).put('/api/user/auth-code').send(code)
        expect(req.status).toBe(200)
    })
})