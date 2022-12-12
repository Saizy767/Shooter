import { Pool } from "pg";
import request from "supertest";
import {app} from "../../index";

describe('registration',() => {
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
          favorites JSON ARRAY,
          homebar JSON ARRAY,
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
        const repeat = await request(app)
                             .post("/api/user/registration")
                             .send(newUser)
                             .then((data)=>{return data.body})
        const responseGet = await request(app).get('/api/user')

        expect(responseGet.body[0]).toMatchObject({
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

describe('send Authorization Code', () => {
  let user:{name:string, surname: string, email: string, password:string}
  let res: request.Response
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
      favorites JSON ARRAY,
      homebar JSON ARRAY,
      isActivated boolean,
      tokenActivated boolean,
      activatedCode VARCHAR(6));`)
    user = {name:'Mike', surname:'Dark' , email: 'qwerty@gmail.com', password: 'qwertyqwert'};
    res = await request(app).post('/api/user/registration').send(user)
  })
  afterEach( async () => {
    jest.clearAllMocks();
    await testPool.query('DROP TABLE person;')
  });
  it('should return Authorization code updated', async () =>{
    const getUser = await request(app).get('/api/user/1')
    const response = await request(app)
                           .patch('/api/user/auth-code')
                           .send({email:user.email, code:getUser.body[0].activatedcode})
    expect(response.body).toBe('Authorization code updated')
  }),
  it('should return two true of isActivated and tokenActivated', async () =>{
    const getUser = await request(app).get('/api/user/1')
    const response = await request(app)
                           .patch('/api/user/auth-code')
                           .send({email:user.email, code:getUser.body[0].activatedcode})
                           .then(async () => await request(app).get('/api/user/1'))
                           .then((data) => {return data.body[0]})
    expect(response.isactivated).toBeTruthy()
    expect(response.tokenactivated).toBeTruthy()
  }),
  it('should return Authorization code error of invalid code', async () =>{
    const response = await request(app)
                           .patch('/api/user/auth-code')
                           .send({email:user.email, code:'123456'})
    expect(response.body).toBe('Authorization code error')
  }),
  it('should return two false of isActivated and tokenActivated', async () =>{
    const response = await request(app)
                           .patch('/api/user/auth-code')
                           .send({email:user.email, code:'123456'})
                           .then(async () => await request(app).get('/api/user/1'))
                           .then((data) => {return data.body[0]})
    expect(response.isactivated).toBeFalsy()
    expect(response.tokenactivated).toBeFalsy()
  }),
  it('should return Authorization code error of empty email', async () =>{
    const response = await request(app)
                           .patch('/api/user/auth-code')
                           .send({email:'', code:'123456'})
    expect(response.body).toBe('Invalid value')
  }),
  it('should return Authorization code error of empty code', async () =>{
    const response = await request(app)
                           .patch('/api/user/auth-code')
                           .send({email:user.email, code:''})
    expect(response.body).toBe('Invalid value')
  })
})

describe('send to email', () => {
  let user:{name:string, surname: string, email: string, password:string}
  let res: request.Response
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
      favorites JSON ARRAY,
      homebar JSON ARRAY,
      isActivated boolean,
      tokenActivated boolean,
      activatedCode VARCHAR(6));`)
    user = {name:'Mike', surname:'Dark' , email: 'qwerty@gmail.com', password: 'qwertyqwert'};
    res = await request(app).post('/api/user/registration').send(user)
  })
  afterEach( async () => {
    jest.clearAllMocks();
    await testPool.query('DROP TABLE person;')
  });
  it('should send code to email', async () => {
    const response = await request(app).post('/api/user/send-mail').send({email:user.email})
    expect(response.body).toBe(`Send to ${user.email}`)
  })
  it('should return error of invalid email', async () => {
    const response = await request(app).post('/api/user/send-mail').send({email:'12'})
    expect(response.body).toBe(`Invalid value`)
  })
})
