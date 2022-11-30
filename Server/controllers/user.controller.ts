import { Request, Response } from 'express';
import bd from '../database/db'
import * as jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv'

dotenv.config()

class UserController{
    async registrate(req: Request,res: Response){
        const {name, surname, email, password} = req.body
        const newPerson = await bd.query(
            `INSERT INTO person (name, surname, favorites, homebar, password, email, isActivated)
             VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING *`,
            [name, surname, [], [], password, email, false])
        res.json(newPerson.rows)
    }
    async login(req:Request, res: Response){
        const token = () => jwt.sign(req.body.username, process.env.TOKENJWT, { expiresIn: '1800s' })
        console.log(token)
        res.json(token)
    }
    async getLogin(req:Request, res: Response ){
        const email = req.params.email
        const findEmail = await bd.query(`select email from person where email = $1`,[email])
        res.json(findEmail.rows)
    }
    async getUsers(req: Request,res: Response){
        const users = await bd.query(`select * from person`)
        res.json(users.rows)
    }
    async deleteUser(req: Request,res: Response){
        const id = req.params.id
        const user = await bd.query('delete from person where id = $1',[id])
        res.json(user.rows)
    }
    async getOneUser(req: Request,res: Response){
        const id = req.params.id
        const user = await bd.query(`select * from person where id = $1`,[id])
        res.json(user.rows)
    }
    async updateUser(req: Request,res: Response){
        const id = req.params.id
        const {name, surname} = req.body
        const updatePerson = await bd.query(
            `UPDATE person set name = $1, surname = $2 where id = $3`,[name,surname,id]
        )
        res.json(updatePerson.rows[0])
    }
    async updateHomeBar(req: Request, res: Response){
        debugger
        const id = req.params.id
        const {homebar} = req.body
        const sendHomeBar = await bd.query(
           `UPDATE person set homebar = $1 where id = $2`,[homebar,id]
        )
        res.json(sendHomeBar.rows[0])
    }
}

export default new UserController()