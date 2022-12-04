import { IGetUserAuthInfoRequest } from '../models/user-modules';
import { Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken'

function authenticateToken(req:IGetUserAuthInfoRequest, res:Response, next:NextFunction){
    const authHeader = req.headers.get('authorization')
    const token = authHeader && authHeader.split(' ')[1]
    if(token === null){
        return res.sendStatus(401)
    }
    
    jwt.verify(token, process.env.ACCESS_TOKEN as string, (err:any, user:string)=>{
        console.log(err)

        if(err) return res.sendStatus(403)

        req.user = user

        next()
    })
}
export default authenticateToken