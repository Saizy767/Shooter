import { Pool } from "pg";
import request from "supertest";
import {app} from "../../index";

describe('registration',()=>{
      /*let mPool = jest.mock('pg', async () => {
        const mClient = {
          connect: jest.fn(),
          query: jest.fn(),
          end: jest.fn(),
        };
        return { Pool: jest.fn(() => mClient) };
      });*/
      //const mPool = jest.mock('../../database/db');
      const testPool = new Pool({
        user: process.env.POOL_NAME,
        host: process.env.HOST,
        port: Number(process.env.DATAPORT),
        database: process.env.TEST_DATANAME
      })
      beforeEach( async ()=>{
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
      })
      afterEach( async () => {
        jest.clearAllMocks();
        await testPool.query('DROP TABLE person;')
      });
    it('should response Account created', async () => {
        const user = { name:'Mike', surname:'Dark' , email: 'qwerty@gmail.com', password: 'qwerty'};
        const newUser = { name:'Mikes', surname:'Ligth' , email: 'qwerty@gmail.com', password: 'qwerty123'};
        const response = await request(app).post("/api/user/registration").send(user).then((data)=>{return data.body});
        const repeat = await request(app).post("/api/user/registration").send(newUser).then((data)=>{return data.body});
        const responseget = await request(app).get('/api/user').expect(200)

        expect(responseget.body[0]).toMatchObject({
            "email": newUser.email,
            "name": newUser.name,
            "tokenactivated": false,
            "surname": newUser.surname,
            "isactivated": false
        })
        expect(response.message).toBe('Account created');
        expect(repeat.message).toBe('Account updated');
    })
    it('should response name empty', async () => {
        const user = { name:'' , surname:'Dark' , email: 'qwerty@gmail.com', password: 'qwerty'};
        const response = await request(app).post("/api/user/registration").send(user);
        expect(response.body).toBe('Invalid value')
    })
    it('should response surname empty', async () => {
        const user = { name:'Mike' , surname:'' , email: 'qwerty@gmail.com', password: 'qwerty'};
        const response = await request(app).post("/api/user/registration").send(user);
        expect(response.body).toBe('Invalid value')
    })
    it('should response email empty', async () => {
        const user = { name:'Mike' , surname:'Dark' , email: '', password: 'qwerty'};
        const response = await request(app).post("/api/user/registration").send(user);
        expect(response.body).toBe('Invalid value')
    })
    it('should response password empty', async () => {
        const user = { name:'Mike' , surname:'Dark' , email: 'qwerty@gmail.com', password: ''};
        const response = await request(app).post("/api/user/registration").send(user);
        expect(response.body).toBe('Invalid value')
    })
})

