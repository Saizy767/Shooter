import {Router} from 'express'
import userController from '../controllers/user.controller'

const userRoute = Router()

userRoute.post('/user', userController.createUser)
userRoute.delete('/user/:id', userController.deleteUser)
userRoute.get('/user', userController.getUsers)
userRoute.get('/user/:id', userController.getOneUser)
userRoute.put('/user/:id', userController.updateUser)
userRoute.put('/user/homebar/:id', userController.updateHomeBar)

export default userRoute