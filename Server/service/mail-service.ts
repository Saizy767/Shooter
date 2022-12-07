import { Response } from 'express';
import nodemailer from 'nodemailer';

class MailService {
    async sendToEmail(email:string, code:string,res?:Response){
        try{
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
            transporter.sendMail(MailData, () => {
                res.status(200).json(`Code send to ${email}`)
        })
        }catch(err){
            res.status(500).json('Mail sender error')
            throw Error
        }
    }
}

export default new MailService()