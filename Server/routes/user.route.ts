import {Router} from 'express'
import userController from '../controllers/user.controller'

const userRoute = Router()

userRoute.post('/user/registration', userController.registrate)
userRoute.put('/user/registration/:id', userController.registratePut)
userRoute.patch('/user/auth-code', userController.checkAuthCode)
userRoute.post('/user/send-mail', userController.sendMail)
userRoute.post('user/login', userController.login)
userRoute.delete('/user/:id', userController.deleteUser)
userRoute.get('/user/:email', userController.getEmail)
userRoute.get('/user', userController.getUsers)
userRoute.get('/user/:id', userController.getOneUser)
userRoute.put('/user/:id', userController.updateUser)
userRoute.put('/user/homebar/:id', userController.updateHomeBar)

export default userRoute