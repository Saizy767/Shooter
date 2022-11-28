import { Response, Request } from 'express';
import nodemailer from 'nodemailer';

class MailController {
    async sendToEmail(req: Request,res:Response){
        const {toEmail} = req.body;
        const code = '123124'

        const transporter = nodemailer.createTransport({
            port: 465,          
            host: "smtp.gmail.com",
               auth: {
                    user: process.env.EMAIL_SENDER,
                    pass:  process.env.PASSWORD_FOR_EMAIL,
                 },
            secure: true,
            });

        const MailData = {
            from: process.env.EMAIL_SENDER,
            to:toEmail,
            subject:"Code Authorization",
            text:code,
            html: `
            <b>Code Authorization</b>
            <br>This is code: ${code}</br>`
        }
        transporter.sendMail(MailData , (error: Error) =>{
            error && console.log(error)
            res.status(200).send({message: `Mail send to ${toEmail.value}`})
        })
    }
}

export default new MailController()