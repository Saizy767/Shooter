import MailController from '../controllers/mail.controller'
import {Router} from 'express'

const mailRoute = Router()

mailRoute.post('/user/text-mail', MailController.sendToEmail)

export default mailRoute