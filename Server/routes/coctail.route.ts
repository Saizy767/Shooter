import {Router} from 'express'
import coctailController from '../controllers/coctail.controller'

const coctailRoute = Router()

coctailRoute.post('/coctails', coctailController.createCoctail)
coctailRoute.delete('/coctails/:id', coctailController.deleteCoctail)
coctailRoute.get('/coctails', coctailController.getCoctails)
coctailRoute.get('/coctails/:id', coctailController.getOneCoctail)
coctailRoute.put('/coctails/:id', coctailController.updateCoctail)

export default coctailRoute