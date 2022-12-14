import {Router} from 'express'
import userController from '../controllers/user.controller'
import {body, param} from 'express-validator'

const userRoute = Router()

userRoute.post('/user/registration',
                body('email').isEmail(),
                body('name').isLength({min:2,max:15}),
                body('surname').isLength({min:2,max:15}),
                body('password').isLength({min:5}),
                userController.registrate)

userRoute.patch('/user/auth-code', 
                body('email').isEmail(),
                body('code').isLength({ min:1, max:6}),
                userController.sendAuthCode)

userRoute.post('/user/send-mail',
                body('email').isEmail(),
                userController.sendMail)

userRoute.post('/user/login',
                body('email').isEmail(),
                body('password').isLength({min:5,max:25}),
                userController.login)
userRoute.delete('/user/:id',
                 userController.deleteUser)
userRoute.get('/user/email/:email',
               param('email').isEmail(),
               userController.getEmail)
userRoute.get('/user', userController.getUsers)
userRoute.get('/user/:id',
               param('id').isNumeric(),
               userController.getOneUser)
userRoute.put('/user/:id',
               param('id').isNumeric(),
               body('name').isLength({min:2}),
               body('surname').isLength({min:2}),
               userController.updateUser)
userRoute.patch('/user/homebar/:id',
                 param('id').isNumeric(), 
                 body('homebar.coctail').isLength({min:2}),   
                 userController.updateHomeBar)
userRoute.patch('/user/favorites/:id',
                 param('id').isNumeric(), 
                 body('favorites.coctail').isLength({min:2}),  
                 userController.updataFavorites)

export default userRoute

