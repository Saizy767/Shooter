import {Router} from 'express'
import {body, param} from 'express-validator'

import userController from '../controllers/user.controller'
import { userURL, patchHomebar, patchFavorites } from '../href/user.href'

const userRoute = Router()
userRoute.delete(userURL +':id',
                 userController.deleteUser)

userRoute.get(userURL, userController.getUsers)

userRoute.get(userURL + ':id',
               param('id').isNumeric(),
               userController.getOneUser)

userRoute.put(userURL + ':id',
               param('id').isNumeric(),
               body('name').isLength({min:2}),
               body('surname').isLength({min:2}),
               userController.updateUser)

userRoute.patch(patchHomebar + ':id',
                 param('id').isNumeric(), 
                 body('homebar.coctail').isLength({min:2}),   
                 userController.updateHomeBar)
                 
userRoute.patch(patchFavorites + ':id',
                 param('id').isNumeric(), 
                 body('favorites.coctail').isLength({min:2}),  
                 userController.updataFavorites)

export default userRoute

