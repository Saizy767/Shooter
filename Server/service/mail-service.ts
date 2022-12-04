import { Response } from 'express';
import nodemailer from 'nodemailer';

class MailService {
    async sendToEmail(email:string, code:string,res?:Response){
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
            to:email,
            subject:"Code Authorization",
            text:code,
            html: `
            <b>Code Authorization</b>
            <br>This is code: ${code}</br>`
        }
        transporter.sendMail(MailData , (error: Error) =>{
            error && console.log(error)
            res.status(200).send({message: `Mail send to ${email}`})
        })
    }
}

export default new MailService()