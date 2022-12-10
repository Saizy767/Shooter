import { Request, Response } from 'express';
import bd from '../database/db'
import * as jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv'
import mailService from '../service/mail-service';
import * as bscript from 'bcryptjs'
import checkService from '../service/checker-service';
import {validationResult} from 'express-validator'
import { ErrorVal } from '../models/user-modules';

dotenv.config()

class UserController{
    async registrate(req: Request,res: Response){
        const error = validationResult(req) as unknown as ErrorVal
        const {name, surname, email, password}:{name:string,
                                                surname: string,
                                                email: string,
                                                password: string} = req.body
        if(error.errors.length){
            return res.status(400).json(error.errors[0].msg)
        }
        const securePassword = bscript.hashSync(password, 6)
        const activationCode = Math.floor(Math.random() * 999999).toString()
        const checkerEmail = await checkService.checkEmail(email)
        if(checkerEmail){ // email and isActivated should be true
            await bd.query(
                `INSERT INTO person (name, surname, email,
                                    password, favorites, homebar, 
                                    isActivated,tokenActivated, activatedCode)
                VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)`,
                [name, surname, email, securePassword, [], [], false, false, activationCode])
            
            res.status(201).json({message:'Account created'})
        }
        else{
            await bd.query(
                `UPDATE person SET name=$1, surname=$2,
                                    password=$3, favorites=$4, homebar=$5, 
                                    isActivated=$6,tokenActivated=$7, activatedCode=$8 WHERE email= $9`,
                [name, surname, securePassword, [], [], false, false, activationCode, email])
            res.status(200).json({message:'Account updated'})
        }
        mailService.sendToEmail(email, activationCode, res)
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
            const error = validationResult(req) as unknown as ErrorVal
            const activationCode = Math.floor(Math.random() * 999999).toString()
            if(error.errors.length){
                return res.status(400).json(error.errors[0])
            }
            await bd.query(`UPDATE person SET activatedCode=$1 WHERE email=$2`,[activationCode, email])
            mailService.sendToEmail(email, activationCode,res)
        
    }
    async checkAuthCode(req: Request, res: Response){
        const {code, email} = req.body
        const error = validationResult(req) as unknown as ErrorVal
        const codeAuth = await bd.query(`SELECT activatedCode FROM person WHERE email=$1`,[email])
        if(error.errors.length){
            return res.status(400).json(error.errors[0].msg)
        }
        if (code === codeAuth.rows[0].activatedcode){
            await bd.query(`UPDATE person SET isActivated = $1 WHERE email = $2`,[true, email])
            res.status(200).json('Authorization code updated')
        }
        else{
            res.status(400).json('Authorization code error')
        }
        
    }
    async getEmail(req:Request, res: Response ){
        const emailParams = req.params.email
        if(checkService.checkEmail(emailParams)){
            res.status(400).json('This email existing')
        }
        else{
            res.status(200)
        }
    }
    async getUsers(req: Request,res: Response){
        const users = await bd.query(`SELECT * FROM person`)
        res.status(200).json(users && users.rows)
    }
    async deleteUser(req: Request,res: Response){
        const id = req.params.id
        const user = await bd.query('DELETE FROM person WHERE id = $1',[id])
        res.json(user.rows)
    }
    async getOneUser(req: Request,res: Response){
        const id = req.params.id
        const user = await bd.query(`SELECT * FROM person WHERE id = $1`,[id])
        res.status(200).json(user.rows)
    }
    async updateUser(req: Request,res: Response){
        const id = req.params.id
        const {name, surname} = req.body
        const updatePerson = await bd.query(
            `UPDATE person SET name = $1, surname = $2 WHERE id = $3`,[name,surname,id]
        )
        res.status(200).json(updatePerson.rows[0])
    }
    async updateHomeBar(req: Request, res: Response){
        const id = req.params.id
        const {homebar} = req.body
        const currentFavotires = await bd.query(
            'SELECT homebar FROM person WHERE id = $1',[id]
        )
        currentFavotires.rows[0].homebar.push(homebar)
        const nextFavorites = currentFavotires.rows[0].homebar
        const sendHomeBar = await bd.query(
           'UPDATE person SET homebar = $1 WHERE id = $2',[nextFavorites,id]
        )
        res.status(200).json(sendHomeBar.rows)
    }
}

export default new UserController()