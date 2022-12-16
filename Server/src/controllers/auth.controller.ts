import { Request, Response } from 'express';
import * as dotenv from 'dotenv'
import * as bscript from 'bcryptjs'
import {validationResult} from 'express-validator'

import mailService from '../service/mail-service';
import checkService from '../service/checker-service';
import tokenService from '../service/token-service';

import { ErrorVal, UserTypeDB } from '../models/user-modules';

import UserDTO from '../dtos/userDTO';
import bd from '../database/db'

dotenv.config()

class AuthController{
    async registrate(req: Request,res: Response){
        const error = validationResult(req) as unknown as ErrorVal
        if(error.errors.length){
            return res.status(400).json(error.errors[0].msg)
        }
        const {name, surname, email, password}:{name:string,
            surname: string,
            email: string,
            password: string} = req.body
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
        if (process.env.NODE_ENV !== 'test') {
            await mailService.sendToEmail(email, activationCode)
        }
    }
    async login(req:Request, res: Response){
        const error = validationResult(req) as unknown as ErrorVal
        if(error.errors.length){
            return res.status(400).json(error.errors[0].msg)
        }
        const {email , password}:{email:string, password:string} = req.body
        const user: UserTypeDB = await (await bd.query(`SELECT * FROM person WHERE email = $1`,[email])).rows[0]
        const sendUser = {
            name: user.name,
            img: user.img
        }
        const comparePasswords = await bscript.compare(password, user.password)
        const userDTO = new UserDTO({
            id: user.id,
            email: user.email,
            isActivated: user.isactivated
        })
        if(!comparePasswords || !user ){
            return res.status(401).json('Authorization error')
        }
        if(!(user.isactivated)){
            return res.status(401).json('Activation email')
        }
        const token = await tokenService.generateTokens({...userDTO})

        res.cookie('refreshToken', token.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
        res.status(200).json({token, sendUser})                             
    }
    async sendAuthCode(req: Request, res: Response){
        const error = validationResult(req) as unknown as ErrorVal
        if(error.errors.length){
            return res.status(400).json(error.errors[0].msg)
        }
        const {code, email}:{code:string, email:string} = req.body
        const CompareCode = await checkService.checkCode({email, code})
        if (CompareCode){
            await bd.query(`UPDATE person SET isActivated = $1, tokenActivated = $2 WHERE email = $3`,[true, true, email])
            res.status(200).json('Authorization code updated')
        }
        else{
            res.status(400).json('Authorization code error')
        }
    }
    async sendMail(req: Request, res: Response){
        const error = validationResult(req) as unknown as ErrorVal
        if(error.errors.length){
            return res.status(400).json(error.errors[0].msg)
        }
        const {email} = req.body
        const activationCode = Math.floor(Math.random() * 999999).toString()
        await bd.query(`UPDATE person SET activatedCode=$1 WHERE email=$2`,[activationCode, email])
        if (process.env.NODE_ENV !== 'test') {
            await mailService.sendToEmail(email, activationCode)
        }
        res.status(200).json(`Send to ${email}`)
    }
    async getEmail(req:Request, res: Response ){
        const error = validationResult(req) as unknown as ErrorVal
        if(error.errors.length){
            return res.status(400).json(error.errors[0].msg)
        }
        const email = req.params.email
        const checkEmail = await checkService.checkEmail(email)
        if(!checkEmail){
            res.status(400).json(`${email} is existing`)
        }
        else{
            res.status(200).json(`${email} is not existing`)
        }
    }
}

export default new AuthController()