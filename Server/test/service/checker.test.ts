import { userURL } from './../../src/href/user.href';
import { authRegistration } from './../../src/href/auth.href';
import request from 'supertest';
import { Pool } from 'pg';

import checkService from '../../src/service/checker-service'
import { app } from "../../index";
import { DataQuery } from '../../src/models/user-schema';
    
const testPool = new Pool({
    user: process.env.POOL_NAME,
    host: process.env.HOST,
    port: Number(process.env.DATAPORT),
    database: process.env.TEST_DATANAME
});

describe('checker service', ()=>{
    let user:{name:string, surname: string, email: string, password:string}
    beforeEach(async () => {
        await testPool.query(DataQuery)
        user = {name:'Mike', surname:'Dark' , email: 'qwerty@gmail.com', password: 'qwertyqwert'};
        await request(app).post('/api/'+ authRegistration).send(user)
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
        const getUser = await request(app).get('/api/' + userURL + '1')
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
