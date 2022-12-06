import { Request, Response } from 'express';
import bd from '../database/db'
import * as jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv'
import mailService from '../service/mail-service';
import * as bscript from 'bcryptjs'
import checkService from '../service/checker-service';

dotenv.config()

class UserController{
    async registrate(req: Request,res: Response){
        try{
            const {name, surname, email, password}:{name:string,
                                                    surname: string,
                                                    email: string,
                                                    password: string} = req.body
            if(!name.length){
                return res.status(400).json('Name empty')
            }
            if(!surname.length){
                return res.status(400).json('Surname empty')
            }
            if(!email.length){
                return res.status(400).json('Email empty')
            }
            if(!password.length){
                return res.status(400).json('Password empty')
            }
            const securePassword = bscript.hashSync(password, 6)
            const activationCode = Math.floor(Math.random() * 999999).toString()
            const id = await bd.query(
                `INSERT INTO person (name, surname, email,
                                    password, favorites, homebar, 
                                    isActivated,tokenActivated, activatedCode)
                VALUES ($1,$2,$3,$4,$5,$6,$7,$8) RETURNING id`,
                [name, surname, email, securePassword, [], [], false, false, activationCode])
            res.status(200).json({message:'Account created', id})
            mailService.sendToEmail(email, activationCode)
        }
        catch(err){
            throw Error
        }
    }
    async registratePut(req: Request,res: Response){
        try{
            const id = req.params.id
            const {name, surname, email, password}:{name:string,
                                                    surname: string,
                                                    email: string,
                                                    password: string,
                                                    id:number} = req.body
            if(!name.length){
                return res.status(400).json('Name empty')
            }
            if(!surname.length){
                return res.status(400).json('Surname empty')
            }
            if(!email.length){
                return res.status(400).json('Email empty')
            }
            if(!password.length){
                return res.status(400).json('Password empty')
            }
            const securePassword = bscript.hashSync(password, 6)
            const activationCode = Math.floor(Math.random() * 999999).toString()
            await bd.query(
                `UPDATE person SET (name, surname, email,
                                    password, favorites, homebar, 
                                    isActivated,tokenActivated, activatedCode) WHERE id= $9
                VALUES ($1,$2,$3,$4,$5,$6,$7,$8)`,
                [name, surname, email, securePassword, [], [], false, false, activationCode, id])
            res.status(200).json('Registration updated')
            mailService.sendToEmail(email, activationCode)
        }
        catch(err){
            throw Error
        }
    }
    async login(req:Request, res: Response){
        const {email , password} = req.body
        const tokenList:any = {}
        const user = {
            email,
            password
        }
        const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN,
                                { expiresIn: process.env.ACCESS_TOKEN_LIFE })
        const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN,
                                {expiresIn: process.env.REFRESH_TOKEN_LIFE})
        const response = {
            "status": "Logged in",
            "accessToken": accessToken,
            "refreshToken": refreshToken
        }                                   // send to postgres status, accessToken and refreshToken
        tokenList[refreshToken] = response// send refreshToken to client
        res.status(200).json(response)
    }
    async getToken(req: Request, res: Response){
        
        const postData:{refreshToken:string, email:string, name: string} = req.body
        const tokenList:any = {}
        if((postData.refreshToken) && (postData.refreshToken in tokenList)){
            const user = {
                "email": postData.email,
                "name": postData.name
            }
            const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN,{ expiresIn: process.env.ACCESS_TOKEN_LIFE})
            const response = {
                "accessToken": accessToken
            }

            tokenList[postData.refreshToken].accessToken = accessToken
            res.status(200).json(response);}
        else{
            res.status(404).send('Invalid request')
         }
    }
    async sendMail(req: Request, res: Response){
        const {email} = req.body
        const activationCode = Math.floor(Math.random() * 999999).toString()

        await bd.query(`UPDATE person SET activatedCode=$1 WHERE email=$2`,[activationCode, email])

        mailService.sendToEmail(email, activationCode)
    }
    async checkAuthCode(req: Request, res: Response){
        try{
            const {code, email} = req.body
            const codeAuth = await bd.query(`SELECT activatedCode FROM person WHERE email=$1`,[email])
            if (code === codeAuth.rows[0].activatedcode){
                await bd.query(`UPDATE person SET isActivated = $1 WHERE email = $2`,[true, email])
                res.status(200).json('Correct')
            }
        }catch(err){
            res.status(400).json('Error')
        }
        res.status(400).json('Error')
    }
    async getEmail(req:Request, res: Response ){
        const emailParams = req.params.email
        const emailDB = await bd.query(`SELECT email FROM person WHERE email = $1`,[emailParams])
        checkService.checkEmail(emailDB.rows[0],emailParams)
    }
    async getUsers(req: Request,res: Response){
        const users = await bd.query(`SELECT * FROM person`)
        res.json(users.rows)
    }
    async deleteUser(req: Request,res: Response){
        const id = req.params.id
        const user = await bd.query('DELETE FROM person WHERE id = $1',[id])
        res.json(user.rows)
    }
    async getOneUser(req: Request,res: Response){
        const id = req.params.id
        const user = await bd.query(`SELECT * FROM person WHERE id = $1`,[id])
        res.json(user.rows)
    }
    async updateUser(req: Request,res: Response){
        const id = req.params.id
        const {name, surname} = req.body
        const updatePerson = await bd.query(
            `UPDATE person SET name = $1, surname = $2 WHERE id = $3`,[name,surname,id]
        )
        res.json(updatePerson.rows[0])
    }
    async updateHomeBar(req: Request, res: Response){
        debugger
        const id = req.params.id
        const {homebar} = req.body
        const sendHomeBar = await bd.query(
           `UPDATE person SET homebar = $1 WHERE id = $2`,[homebar,id]
        )
        res.json(sendHomeBar.rows[0])
    }
}

export default new UserController()