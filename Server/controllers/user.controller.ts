import { CoctailType, ingredientType } from '../models/user-modules';
import { Request, Response } from 'express';
import bd from '../database/db'

class UserController{
    async registrateUser(req: Request,res: Response){
        const {RegistrateName, RegistrateSurname, RegistrateEmail, RegistratePassword} = req.body
        const favorites:CoctailType[] = []
        const homebar:ingredientType[] = []
        const isActivated:boolean = false
        const newPerson = await bd.query(
            `INSERT INTO person (name, surname, favorites, homebar, password, email, isActivated)
             VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING *`,
            [RegistrateName, RegistrateSurname, favorites, homebar, RegistratePassword, RegistrateEmail, isActivated])
        res.json(newPerson.rows)
    }
    async getUsers(req: Request,res: Response){
        const users = await bd.query(`select * from person`)
        res.json(users.rows)
    }
    async deleteUser(req: Request,res: Response){
        const id = req.params.id
        const user = await bd.query('delete from person where id = $1',[id])
        res.json(user.rows[0])
    }
    async getOneUser(req: Request,res: Response){
        const id = req.params.id
        const user = await bd.query(`select * from person where id = $1`,[id])
        res.json(user.rows[0])
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