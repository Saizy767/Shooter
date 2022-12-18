import { Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv'
import {validationResult} from 'express-validator'

import checkService from '../service/checker-service';

import { ErrorVal } from '../models/user-modules';

import bd from '../database/db'

dotenv.config()

class UserController{
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
    async getUsers(req: Request,res: Response){
        const users = await bd.query(`SELECT * FROM person`)
        res.status(200).json(users.rows)
    }
    async deleteUser(req: Request,res: Response){
        const id = req.params.id
        const checkID = await checkService.checkID({id})
        if(checkID){
            const user = await bd.query('DELETE FROM person WHERE id = $1',[id])
            res.status(200).json(`User ${id} deleted`)
        }
        else{
            res.status(400).json(`User ${id} is not existing`)
        }
    }
    async getOneUser(req: Request,res: Response){
        const error = validationResult(req) as unknown as ErrorVal
        if(error.errors.length){
            return res.status(400).json(error.errors[0])
        }
        const id = req.params.id

        const checkID = await checkService.checkID({id})

        if(checkID){
            const user = await bd.query(`SELECT * FROM person WHERE id = $1`,[id])
            res.status(200).json(user.rows)
        }
        else{ 
            res.status(400).json('This ID not exsist')
        }
    }
    async updateUser(req: Request,res: Response){
        const error = validationResult(req) as unknown as ErrorVal
        if(error.errors.length){
            return res.status(400).json(error.errors[0])
        }
        const id = req.params.id
        const {name, surname}:{name:string, surname: string} = req.body

        const checkID = await checkService.checkID({id})

        if(checkID){
        const updatePerson = await bd.query(
            `UPDATE person SET name = $1, surname = $2 WHERE id = $3`,[name,surname,id])
        res.status(200).json(updatePerson.rows[0])
        }
        else{
            res.status(400).json('This ID not exsist')
        }
    }
    async updateHomeBar(req: Request, res: Response){
        const error = validationResult(req) as unknown as ErrorVal

        if(error.errors.length){
            return res.status(400).json(error.errors[0])
        }
        const id = req.params.id
        const {homebar} = req.body

        const checkID = await checkService.checkID({id})

        if(checkID){
            const currentHomeBar = await bd.query(
                'SELECT homebar FROM person WHERE id = $1',[id]
            )
            currentHomeBar.rows[0].homebar.push(homebar)
            const nextHomeBar = currentHomeBar.rows[0].homebar
            const sendHomeBar = await bd.query(
            'UPDATE person SET homebar = $1 WHERE id = $2',[nextHomeBar,id]
            )
            res.status(200).json(sendHomeBar.rows)
        }
        else{ 
            res.status(400).json('This ID not exsist')
        }
    }
    async updataFavorites(req: Request, res: Response){
        const error = validationResult(req) as unknown as ErrorVal

        if(error.errors.length){
            return res.status(400).json(error.errors[0])
        }
        const id = req.params.id
        const {favorites} = req.body

        const checkID = await checkService.checkID({id})
        
        if(checkID){
            const currentFavotires = await bd.query(
                'SELECT favorites FROM person WHERE id = $1',[id]
            )
            currentFavotires.rows[0].favorites.push(favorites)
            const nextFavorites = currentFavotires.rows[0].favorites
            const sendHomeBar = await bd.query(
               'UPDATE person SET favorites = $1 WHERE id = $2',[nextFavorites,id]
            )
            res.status(200).json(sendHomeBar.rows)
        }else{ 
            res.status(400).json('This ID not exsist')
        }
    }
}

export default new UserController()