import { response, Response } from 'express';
import nodemailer from 'nodemailer';

class MailService {
    async sendToEmail(email:string, code:string, response: Response){
        const transporter = nodemailer.createTransport({
            port: 465,          
            host: "smtp.gmail.com",
            auth: {
                    user: process.env.EMAIL_SENDER,
                    pass:  process.env.PASSWORD_FOR_EMAIL,
                },
            secure: true,
        });
        await transporter.sendMail({
            from: process.env.EMAIL_SENDER,
            to:email,
            subject:"Code Authorization",
            text:code,
            html: 
            `<b>Code Authorization</b>
            <br>This is code: ${code}</br>`
        })
    }
}

export default new MailService()