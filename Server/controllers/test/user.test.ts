import { Pool } from "pg";
import request from 'supertest';
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
        const response = await request(app)
                               .post("/api/user/registration")
                               .send(user)
                               .then((data)=>{return data.body});
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

describe('delete user', () => {
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
  it('should return of success deleting', async () => {
    const id = 1
    const response = await request(app).delete(`/api/user/${id}`).send({id})
    expect(response.body).toBe(`User ${id} deleted`)
  })
  it('should return of error deleting', async () => {
    const id = 2
    const getUser = await request(app).get(`/api/user/${id}`)
    const response = await request(app).delete(`/api/user/${id}`).send({id})
    expect(response.body).toBe(`User ${id} is not existing`)
  })
})

describe('send email for check of existing', () => {
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
  it('should return existing email', async () => {
    const response = await request(app).get(`/api/user/email/${user.email}`)
    expect(response.body).toBe(`${user.email} is existing`)
  }),
  it('should return email isnt existing', async () => {
    const email = 'qwertyu@gmail.com'
    const response = await request(app).get(`/api/user/email/${email}`)
    expect(response.body).toBe(`${email} is not existing`)
  }),
  it('should return error of invalid email', async () => {
    const email = 'qwerqwas@sadas'
    const response = await request(app).get(`/api/user/email/${email}`)
    expect(response.body).toBe(`Invalid value`)
  })
})

describe('get all users', () => {
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
  it('should return all users', async () => {
    const response = await request(app).get('/api/user')
    expect(response.body[0]).toMatchObject({
      "email": user.email,
      "name": user.name,
      "tokenactivated": false,
      "surname": user.surname,
      "isactivated": false
  })
  })
})

describe('get one user by ID' , () => {
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
  it('should find user', async () => {
    const response = await request(app).get('/api/user/1')
    expect(response.body[0]).toMatchObject({
            "email": user.email,
            "name": user.name,
            "tokenactivated": false,
            "surname": user.surname,
            "isactivated": false
        })
  }),
  it('should dont find user', async () => {
    const response = await request(app).get('/api/user/2')
    expect(response.body).toBe('This ID not exsist')
  })
  it('should return error cause ID is NaN', async () => {
    const response = await request(app).get('/api/user/asd')
    expect(response.body).toBe('Invalid value')
  })
})

describe('updating user by ID', () => {
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
  it('should update user', async () => {
    const updatedCharecters = {name:'Lucka', surname:'Host'}
    await request(app).put('/api/user/1').send(updatedCharecters)
    const response = await request(app).get('/api/user/1')
    expect(response.body[0]).toMatchObject({
            name: updatedCharecters.name,
            surname: updatedCharecters.surname,
            email: user.email,
        })
  }),
  it('should send error of extraneous parameter', async () => {
    const updatedCharecters = {name:'Lucka', email:'qwertyu@gmail.com'}
    const response = await request(app).put('/api/user/1').send(updatedCharecters)
    expect(response.body).toBe('Invalid value')
  })
  it('should send error by empty name', async () => {
    const updatedCharecters = {name:'', surname:'Host'}
    const response = await request(app).put('/api/user/1').send(updatedCharecters)
    expect(response.body).toBe('Invalid value')
  })
  it('should send error by empty surname', async () => {
    const updatedCharecters = {name:'Lucka', surname:';'}
    const response = await request(app).put('/api/user/1').send(updatedCharecters)
    expect(response.body).toBe('Invalid value')
  })
  it('should send error by invalid ID', async () => {
    const updatedCharecters = {name:'Lucka', surname:'Host'}
    const response = await request(app).put('/api/user/qwer').send(updatedCharecters)
    expect(response.body).toBe('Invalid value')
  })
  it('should send error by not existing ID', async () => {
    const updatedCharecters = {name:'Lucka', surname:'Host'}
    const response = await request(app).put('/api/user/12').send(updatedCharecters)
    expect(response.body).toBe('This ID not exsist')
  })
})

describe('adding to user homebar', () => {
  let user:{name:string, surname: string, email: string, password:string}
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
    await request(app).post('/api/user/registration').send(user)
  })
  afterEach( async () => {
    jest.clearAllMocks();
    await testPool.query('DROP TABLE person;')
  });
  it('should adding 2 coctails', async () => {
    await request(app).patch('/api/user/homebar/1').send({homebar:{coctail:'Pinokolada'}})
    await request(app).patch('/api/user/homebar/1').send({homebar:{coctail:'B52'}})
    const responseGet = await request(app).get('/api/user/1')
    expect(responseGet.body[0].homebar).toStrictEqual([{coctail:'Pinokolada'},{coctail:'B52'}])
  }),
  it('should adding one coctail of 2', async () => {
    await request(app).patch('/api/user/homebar/1').send({homebar:{coctail:'Pinokolada'}})
    const errorReq = await request(app).patch('/api/user/homebar/1').send({homebar:{coctail:''}})
    const responseGet = await request(app).get('/api/user/1')
    expect(responseGet.body[0].homebar).toStrictEqual([{coctail:'Pinokolada'}])
    expect(errorReq.body).toBe('Invalid value')
  }),
  it('should send error by invalid ID', async () => {
    const response = await request(app).patch('/api/user/homebar/qwe').send({homebar:{coctail:'Pinokolada'}})
    expect(response.body).toBe('Invalid value')
  })
})

describe('adding to user favorites', () => {
  let user:{name:string, surname: string, email: string, password:string}
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
    await request(app).post('/api/user/registration').send(user)
  })
  afterEach( async () => {
    jest.clearAllMocks();
    await testPool.query('DROP TABLE person;')
  });
  it('should adding 2 coctails', async () => {
    await request(app).patch('/api/user/favorites/1').send({favorites:{coctail:'Pinokolada'}})
    await request(app).patch('/api/user/favorites/1').send({favorites:{coctail:'B52'}})
    const responseGet = await request(app).get('/api/user/1')
    expect(responseGet.body[0].favorites).toStrictEqual([{coctail:'Pinokolada'},{coctail:'B52'}])
  }),
  it('should adding one coctail of 2', async () => {
    await request(app).patch('/api/user/favorites/1').send({favorites:{coctail:'Pinokolada'}})
    const errorReq = await request(app).patch('/api/user/favorites/1').send({favorites:{coctail:''}})
    const responseGet = await request(app).get('/api/user/1')
    expect(responseGet.body[0].favorites).toStrictEqual([{coctail:'Pinokolada'}])
    expect(errorReq.body).toBe('Invalid value')
  }),
  it('should send error by invalid ID', async () => {
    const response = await request(app).patch('/api/user/favorites/qwe').send({favorites:{coctail:'Pinokolada'}})
    expect(response.body).toBe('Invalid value')
  })
})

describe('login user', () => {
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
  it('should return access and refresh tokens', async () => {
    await request(app)
          .get('/api/user/1')
          .then(async (getUser) => await request(app)
                                  .patch('/api/user/auth-code')
                                  .send({email:getUser.body[0].email,
                                         code: getUser.body[0].activatedcode}))
    const response = await request(app).post('/api/user/login').send({email: user.email, password:user.password})
    expect(response.body.token.accessToken).toBeTruthy()
    expect(response.body.token.refreshToken).toBeTruthy()
  })
  it('should return error by not activated email', async () => {
    const response = await request(app).post('/api/user/login').send({email: user.email, password:user.password})
    expect(response.body).toBe('Activation email')
  })
  it('should return error by invalid email', async () => {
    const response = await request(app).post('/api/user/login').send({email: 'asd', password:user.password})
    expect(response.body).toBe('Invalid value')
  })
  it('should return error by invalid password', async () => {
    const response = await request(app).post('/api/user/login').send({email: user.email, password:'1234'})
    expect(response.body).toBe('Invalid value')
  })
})