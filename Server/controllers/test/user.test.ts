import request from "supertest";
import { Pool } from 'pg';
import {app} from "../../index";

jest.mock('pg', () => {
    const mClient = {
      connect: jest.fn(),
      query: jest.fn(),
      end: jest.fn(),
    };
    return { Pool: jest.fn(() => mClient) };
  });

describe('registration',()=>{
    beforeEach(() => {
        const client = new Pool();
      });
      afterEach(() => {
        jest.clearAllMocks();
      });
    test('It should response Account created', async () => {
        const user = { name:'Mike', surname:'Dark' , email: 'qwerty@gmail.com', password: 'qwerty'};
        const response = await request(app).post("/api/user/registration").send(user);
        expect(response.body.message).toBe('Account created')
    })
    test('It should response name empty', async () => {
        const user = { name:'' , surname:'Dark' , email: 'qwerty@gmail.com', password: 'qwerty'};
        const response = await request(app).post("/api/user/registration").send(user);
        expect(response.body).toBe('Name empty')
    })
    test('It should response surname empty', async () => {
        const user = { name:'Mike' , surname:'' , email: 'qwerty@gmail.com', password: 'qwerty'};
        const response = await request(app).post("/api/user/registration").send(user);
        expect(response.body).toBe('Surname empty')
    })
    test('It should response email empty', async () => {
        const user = { name:'Mike' , surname:'Dark' , email: '', password: 'qwerty'};
        const response = await request(app).post("/api/user/registration").send(user);
        expect(response.body).toBe('Email empty')
    })
    test('It should response password empty', async () => {
        const user = { name:'Mike' , surname:'Dark' , email: 'qwerty@gmail.com', password: ''};
        const response = await request(app).post("/api/user/registration").send(user);
        expect(response.body).toBe('Password empty')
    })
})

