import { Response } from 'express';

class checkService{
    async checkEmail(emailDB: string, emailParams: string, res?:Response){
        if(emailDB === emailParams){
            res.status(400).json({ error:'Email is existing',
                                   email: emailDB
            })
        }
        else{
            res.status(200).json({success:'Email not existing', email:''})
        }
    }
}

export default new checkService()