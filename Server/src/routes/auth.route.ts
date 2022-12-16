import {Router} from 'express'
import {body, param} from 'express-validator'
import authController from '../controllers/auth.controller'
import { authLogin, authRegistration, authCode, authSendToMail, authGetMail } from '../href/auth.href'



const authRoute = Router()

authRoute.post(authRegistration,
                body('email').isEmail(),
                body('name').isLength({min:2,max:15}),
                body('surname').isLength({min:2,max:15}),
                body('password').isLength({min:5}),
                authController.registrate)

authRoute.post(authLogin,
                body('email').isEmail(),
                body('password').isLength({min:5,max:25}),
                authController.login)

authRoute.patch(authCode, 
                body('email').isEmail(),
                body('code').isLength({ min:1, max:6}),
                authController.sendAuthCode)

authRoute.post(authSendToMail,
                body('email').isEmail(),
                authController.sendMail)

authRoute.get(authGetMail + ':email',
                param('email').isEmail(),
                authController.getEmail)

export default authRoute
