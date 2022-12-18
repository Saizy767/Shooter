import { userURL, patchHomebar, patchFavorites } from './../../src/href/user.href';
import { authRegistration } from './../../src/href/auth.href';
import { Pool } from "pg";
import request from 'supertest';

import {app} from "../../index";
import { DataQuery } from "../../src/models/user-schema";

const testPool = new Pool({
  user: process.env.POOL_NAME,
  host: process.env.HOST,
  port: Number(process.env.DATAPORT),
  database: process.env.TEST_DATANAME
})



describe('delete user', () => {
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
  it('should return of success deleting', async () => {
    const id = 1
    const response = await request(app).delete(`/api${userURL}${id}`).send({id})
    expect(response.body).toBe(`User ${id} deleted`)
  })
  it('should return of error deleting', async () => {
    const id = 2
    const getUser = await request(app).get(`/api${userURL}${id}`)
    const response = await request(app).delete(`/api${userURL}${id}`).send({id})
    expect(response.body).toBe(`User ${id} is not existing`)
  })
})

describe('get all users', () => {
  let user:{name:string, surname: string, email: string, password:string}
  beforeEach( async ()=>{
    await testPool.query(DataQuery)
    user = {name:'Mike', surname:'Dark' , email: 'qwerty@gmail.com', password: 'qwertyqwert'};
    await request(app).post('/api'+ authRegistration).send(user)
  })
  afterEach( async () => {
    jest.clearAllMocks();
    await testPool.query('DROP TABLE person;')
  });
  it('should return all users', async () => {
    const response = await request(app).get('/api'+ userURL)
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
  beforeEach( async ()=>{
    await testPool.query(DataQuery)
    user = {name:'Mike', surname:'Dark' , email: 'qwerty@gmail.com', password: 'qwertyqwert'};
    await request(app).post('/api' + authRegistration).send(user)
  })
  afterEach( async () => {
    jest.clearAllMocks();
    await testPool.query('DROP TABLE person;')
  });
  it('should find user', async () => {
    const response = await request(app).get(`/api${userURL}1`)
    expect(response.body[0]).toMatchObject({
            "email": user.email,
            "name": user.name,
            "tokenactivated": false,
            "surname": user.surname,
            "isactivated": false
        })
  }),
  it('should dont find user', async () => {
    const response = await request(app).get(`/api${userURL}2`)
    expect(response.body).toBe('This ID not exsist')
  })
  it('should return error cause ID is NaN', async () => {
    const errorID = 'asd'
    const response = await request(app).get(`/api${userURL}${errorID}`)
    expect(response.body).toStrictEqual({"location": "params", "msg": "Invalid value", "param": "id", "value": errorID})
  })
})

describe('updating user by ID', () => {
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
  it('should update user', async () => {
    const updatedCharecters = {name:'Lucka', surname:'Host'}
    const id = 1
    await request(app).put(`/api${userURL}${id}`).send(updatedCharecters)
    const response = await request(app).get(`/api${userURL}1`)
    expect(response.body[0]).toMatchObject({
            name: updatedCharecters.name,
            surname: updatedCharecters.surname,
            email: user.email,
        })
  }),
  it('should send error of extraneous parameter', async () => {
    const updatedCharecters = {name:'Lucka', email:'qwertyu@gmail.com'}
    const response = await request(app).put(`/api${userURL}1`).send(updatedCharecters)
    expect(response.body).toStrictEqual({"location": "body",
                                         "msg": "Invalid value",
                                         "param": "surname"})
  })
  it('should send error by empty name', async () => {
    const updatedCharecters = {name:'', surname:'Host'}
    const response = await request(app).put(`/api${userURL}1`).send(updatedCharecters)
    expect(response.body).toStrictEqual({"location": "body",
                                         "msg": "Invalid value", 
                                         "param": "name", 
                                         "value": updatedCharecters.name})
  })
  it('should send error by empty surname', async () => {
    const updatedCharecters = {name:'Lucka', surname:''}
    const response = await request(app).put(`/api${userURL}1`).send(updatedCharecters)
    expect(response.body).toStrictEqual({"location": "body",
                                         "msg": "Invalid value", 
                                         "param": "surname", 
                                         "value": updatedCharecters.surname})
  })
  it('should send error by invalid ID', async () => {
    const updatedCharecters = {name:'Lucka', surname:'Host'}
    const errorID = 'qwer'
    const response = await request(app).put(`/api${userURL}${errorID}`).send(updatedCharecters)
    expect(response.body).toStrictEqual({"location": "params",
                                         "msg": "Invalid value", 
                                         "param": "id", 
                                         "value": errorID})
  })
  it('should send error by not existing ID', async () => {
    const updatedCharecters = {name:'Lucka', surname:'Host'}
    const response = await request(app).put(`/api${userURL}12`).send(updatedCharecters)
    expect(response.body).toBe('This ID not exsist')
  })
})

describe('adding to user homebar', () => {
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
  it('should adding 2 coctails', async () => {
    const id = 1
    await request(app).patch(`/api${patchHomebar}${id}`).send({homebar:{coctail:'Pinokolada'}})
    await request(app).patch(`/api${patchHomebar}${id}`).send({homebar:{coctail:'B52'}})
    const responseGet = await request(app).get(`/api${userURL}${id}`)
    expect(responseGet.body[0].homebar).toStrictEqual([{coctail:'Pinokolada'},{coctail:'B52'}])
  }),
  it('should adding one coctail of 2', async () => {
    const id = 1
    await request(app).patch(`/api${patchHomebar}${id}`).send({homebar:{coctail:'Pinokolada'}})
    const errorReq = await request(app).patch(`/api${patchHomebar}${id}`).send({homebar:{coctail:''}})
    const responseGet = await request(app).get(`/api${userURL}${id}`)
    expect(responseGet.body[0].homebar).toStrictEqual([{coctail:'Pinokolada'}])
    expect(errorReq.body).toStrictEqual({"location": "body", "msg": "Invalid value", "param": "homebar.coctail", "value": ''})
  }),
  it('should send error by invalid ID', async () => {
    const errorId = 'qwe'
    const response = await request(app).patch(`/api${patchHomebar}${errorId}`).send({homebar:{coctail:'Pinokolada'}})
    expect(response.body).toStrictEqual({"location": "params", "msg": "Invalid value", "param": "id", "value": errorId})
  })
})

describe('adding to user favorites', () => {
  let user:{name:string, surname: string, email: string, password:string}
  beforeEach( async ()=>{
    await testPool.query(DataQuery)
    user = {name:'Mike', surname:'Dark' , email: 'qwerty@gmail.com', password: 'qwertyqwert'};
    await request(app).post('/api'+ authRegistration).send(user)
  })
  afterEach( async () => {
    jest.clearAllMocks();
    await testPool.query('DROP TABLE IF EXISTS person;')
  });
  it('should adding 2 coctails', async () => {
    const id = 1
    await request(app).patch(`/api${patchFavorites}${id}`).send({favorites:{coctail:'Pinokolada'}})
    await request(app).patch(`/api${patchFavorites}${id}`).send({favorites:{coctail:'B52'}})
    const responseGet = await request(app).get(`/api${userURL}${id}`)
    expect(responseGet.body[0].favorites).toStrictEqual([{coctail:'Pinokolada'},{coctail:'B52'}])
  }),
  it('should adding one coctail of 2', async () => {
    const id = 1
    await request(app).patch(`/api${patchFavorites}${id}`).send({favorites:{coctail:'Pinokolada'}})
    const errorReq = await request(app).patch(`/api${patchFavorites}${id}`).send({favorites:{coctail:''}})
    const responseGet = await request(app).get(`/api${userURL}${id}`)
    expect(responseGet.body[0].favorites).toStrictEqual([{coctail:'Pinokolada'}])
    expect(errorReq.body).toStrictEqual({"location": "body",
                                         "msg": "Invalid value", 
                                         "param": "favorites.coctail", 
                                         "value": ""})
  }),
  it('should send error by invalid ID', async () => {
    const errorId ='qwe'
    const response = await request(app).patch(`/api${patchFavorites}${errorId}`).send({favorites:{coctail:'Pinokolada'}})
    expect(response.body).toStrictEqual({"location": "params",
                                         "msg": "Invalid value", 
                                         "param": "id", 
                                         "value": errorId})
  })
})
