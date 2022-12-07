import { Response } from 'express';

class checkService{
    async checkEmail(emailDB: string, emailParams: string, res?:Response){
        if(emailDB === emailParams){
            res.status(400).json({message:'Email is existing',
                                   email: emailDB
            })
        }
        else{
            res.status(200).json({message:'Email not existing', email:''})
        }
    }
}

export default new checkService()