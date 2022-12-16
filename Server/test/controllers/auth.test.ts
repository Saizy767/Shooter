import { userURL } from '../../src/href/user.href';
import { authRegistration, authCode, authLogin, authSendToMail, authGetMail } from '../../src/href/auth.href';
import { Pool } from "pg";
import request from "supertest";
import { app } from "../../index.ts";
import { DataQuery } from "../../src/models/user-schema";

const testPool = new Pool({
    user: process.env.POOL_NAME,
    host: process.env.HOST,
    port: Number(process.env.DATAPORT),
    database: process.env.TEST_DATANAME
  })

  
describe('registration',() => {
    beforeEach( async ()=>{
      await testPool.query(DataQuery)
    })
    afterEach( async () => {
      jest.clearAllMocks();
      await testPool.query('DROP TABLE person;')
    });
  it('should response Account created and updated', async () => {
      const user = { name:'Mike', surname:'Dark' , email: 'qwerty@gmail.com', password: 'qwerty'};
      const newUser = { name:'Mikes', surname:'Ligth' , email: 'qwerty@gmail.com', password: 'qwerty123'};
      const response = await request(app)
                             .post("/api" + authRegistration)
                             .send(user)
                             .then(data => {return data.body});
      const repeat = await request(app)
                           .post("/api" + authRegistration)
                           .send(newUser)
                           .then((data)=>{return data.body})
      const responseGet = await request(app).get('/api'+ userURL)

      expect(response.message).toBe('Account created');
      expect(responseGet.body[0]).toMatchObject({
          "email": newUser.email,
          "name": newUser.name,
          "tokenactivated": false,
          "surname": newUser.surname,
          "isactivated": false
      })
      expect(repeat.message).toBe('Account updated');
  })
  it('should response name empty', async () => {
      const user = { name:'' , surname:'Dark' , email: 'qwerty@gmail.com', password: 'qwerty'};
      const response = await request(app).post("/api" + authRegistration).send(user);
      expect(response.body).toBe('Invalid value')
  })
  it('should response surname empty', async () => {
      const user = { name:'Mike' , surname:'' , email: 'qwerty@gmail.com', password: 'qwerty'};
      const response = await request(app).post("/api" + authRegistration).send(user);
      expect(response.body).toBe('Invalid value')
  })
  it('should response email empty', async () => {
      const user = { name:'Mike' , surname:'Dark' , email: '', password: 'qwerty'};
      const response = await request(app).post("/api" + authRegistration).send(user);
      expect(response.body).toBe('Invalid value')
  })
  it('should response password empty', async () => {
      const user = { name:'Mike' , surname:'Dark' , email: 'qwerty@gmail.com', password: ''};
      const response = await request(app).post("/api" + authRegistration).send(user);
      expect(response.body).toBe('Invalid value')
  })
})

describe('login user', () => {
    let user:{name:string, surname: string, email: string, password:string}
    beforeEach( async ()=>{
      await testPool.query(DataQuery)
      user = {name:'Mike', surname:'Dark' , email: 'qwerty@gmail.com', password: 'qwertyqwert'};
      await request(app).post("/api" + authRegistration).send(user)
    })
    afterEach( async () => {
      jest.clearAllMocks();
      await testPool.query('DROP TABLE person;')
    });
    it('should return access and refresh tokens', async () => {
      await request(app)
            .get(`/api${userURL}1`)
            .then(async (getUser) => await request(app)
                                    .patch('/api' + authCode)
                                    .send({email:getUser.body[0].email,
                                           code: getUser.body[0].activatedcode}))
      const response = await request(app).post('/api' + authLogin).send({email: user.email, password:user.password})
      expect(response.body.token.accessToken).toBeTruthy()
      expect(response.body.token.refreshToken).toBeTruthy()
    })
    it('should return error by not activated email', async () => {
      const response = await request(app).post('/api' + authLogin).send({email: user.email, password:user.password})
      expect(response.body).toBe('Activation email')
    })
    it('should return error by invalid email', async () => {
      const response = await request(app).post('/api' + authLogin).send({email: 'asd', password:user.password})
      expect(response.body).toBe('Invalid value')
    })
    it('should return error by invalid password', async () => {
      const response = await request(app).post('/api' + authLogin).send({email: user.email, password:'1234'})
      expect(response.body).toBe('Invalid value')
    })
})

describe('send Authorization Code', () => {
  let user:{name:string, surname: string, email: string, password:string}
  beforeEach( async ()=>{
    await testPool.query(DataQuery)
    user = {name:'Mike', surname:'Dark' , email: 'qwerty@gmail.com', password: 'qwertyqwert'};
    await request(app).post('/api' + authRegistration).send(user)
  })
  afterEach( async () => {
    jest.clearAllMocks();
    await testPool.query('DROP TABLE person;')
  });
  it('should return Authorization code updated', async () =>{
    const getUser = await request(app).get(`/api${userURL}1`)
    const response = await request(app)
                           .patch('/api' + authCode)
                           .send({email:user.email, code:getUser.body[0].activatedcode})
    expect(response.body).toBe('Authorization code updated')
  }),
  it('should return two true of isActivated and tokenActivated', async () =>{
    const id = 1
    const getUser = await request(app).get(`/api${userURL}${id}`)
    const response = await request(app)
                           .patch('/api' + authCode)
                           .send({email:user.email, code:getUser.body[0].activatedcode})
                           .then(async () => await request(app).get(`/api${userURL}${id}`))
                           .then((data) => {return data.body[0]})
    expect(response.isactivated).toBeTruthy()
    expect(response.tokenactivated).toBeTruthy()
  }),
  it('should return Authorization code error of invalid code', async () =>{
    const response = await request(app)
                           .patch('/api' + authCode)
                           .send({email:user.email, code:'123456'})
    expect(response.body).toBe('Authorization code error')
  }),
  it('should return two false of isActivated and tokenActivated', async () =>{
    const id =1
    const response = await request(app)
                           .patch('/api' + authCode)
                           .send({email:user.email, code:'123456'})
                           .then(async () => await request(app).get(`/api${userURL}${id}`))
                           .then((data) => {return data.body[0]})
    expect(response.isactivated).toBeFalsy()
    expect(response.tokenactivated).toBeFalsy()
  }),
  it('should return Authorization code error of empty email', async () =>{
    const response = await request(app)
                           .patch('/api' + authCode)
                           .send({email:'', code:'123456'})
    expect(response.body).toBe('Invalid value')
  }),
  it('should return Authorization code error of empty code', async () =>{
    const response = await request(app)
                           .patch('/api' + authCode)
                           .send({email:user.email, code:''})
    expect(response.body).toBe('Invalid value')
  })
})

describe('send to email', () => {
  let user:{name:string, surname: string, email: string, password:string}
  let res: request.Response
  beforeEach( async ()=>{
    await testPool.query(DataQuery)
    user = {name:'Mike', surname:'Dark' , email: 'qwerty@gmail.com', password: 'qwertyqwert'};
    res = await request(app).post('/api' + authRegistration).send(user)
  })
  afterEach( async () => {
    jest.clearAllMocks();
    await testPool.query('DROP TABLE person;')
  });
  it('should send code to email', async () => {
    const response = await request(app).post('/api' + authSendToMail).send({email:user.email})
    expect(response.body).toBe(`Send to ${user.email}`)
  })
  it('should return error of invalid email', async () => {
    const response = await request(app).post('/api' + authSendToMail).send({email:'12'})
    expect(response.body).toBe(`Invalid value`)
  })
})

describe('send email for check of existing', () => {
  let user:{name:string, surname: string, email: string, password:string}
  beforeEach( async ()=>{
    await testPool.query(DataQuery)
    user = {name:'Mike', surname:'Dark' , email: 'qwerty@gmail.com', password: 'qwertyqwert'};
    await request(app).post('/api' + authRegistration).send(user)
  })
  afterEach( async () => {
    jest.clearAllMocks();
    await testPool.query('DROP TABLE person;')
  });
  it('should return existing email', async () => {
    const response = await request(app).get(`/api${authGetMail}${user.email}`)
    expect(response.body).toBe(`${user.email} is existing`)
  }),
  it('should return email isnt existing', async () => {
    const email = 'qwertyu@gmail.com'
    const response = await request(app).get(`/api${authGetMail}${email}`)
    expect(response.body).toBe(`${email} is not existing`)
  }),
  it('should return error of invalid email', async () => {
    const email = 'qwerqwas@sadas'
    const response = await request(app).get(`/api${authGetMail}${email}`)
    expect(response.body).toBe(`Invalid value`)
  })
})