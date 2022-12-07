import {Router} from 'express'
import userController from '../controllers/user.controller'
import {body} from 'express-validator'

const userRoute = Router()

userRoute.post('/user/registration',
                body('email').isEmail(),
                body('name').isLength({min:2,max:15}),
                body('surname').isLength({min:2,max:15}),
                body('password').isLength({min:5}),
                userController.registrate)

userRoute.put('/user/registration/:id', userController.registratePut)

userRoute.patch('/user/auth-code', 
                body('email').isEmail(),
                body('code').isLength({max:6}),
                userController.checkAuthCode)

userRoute.post('/user/send-mail',
                body('email').isEmail(),
                userController.sendMail)
                
userRoute.post('/user/login', userController.login)
userRoute.delete('/user/:id', userController.deleteUser)
userRoute.get('/user/:email', userController.getEmail)
userRoute.get('/user', userController.getUsers)
userRoute.get('/user/:id', userController.getOneUser)
userRoute.put('/user/:id', userController.updateUser)
userRoute.put('/user/homebar/:id', userController.updateHomeBar)

export default userRoute

