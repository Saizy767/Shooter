import bd from '../database/db'

class checkService{
    async checkEmail(email:string){
        const emailDB = await bd.query(`SELECT email FROM person WHERE email = $1`,[email])
        return (email !== emailDB.rows[0]?.email) ? true : false
    }
    async checkCode({code, email}:{code:string, email:string}){
        const codeAuth = await bd.query(`SELECT activatedcode FROM person WHERE email = $1`,[email])
        return code === codeAuth.rows[0]?.activatedcode ? true : false
    }
    async checkID({id}:{id:string}){
        const codeAuth = await bd.query(`SELECT id FROM person WHERE id = $1`, [id])
        return Number(id) === codeAuth.rows[0]?.id ? true : false
    }
    async checkOfVerificationEmail(email:string){
        const VerificationEmail = await bd.query(`SELECT isActivated FROM person WHERE email = $1`,[email])
        return VerificationEmail.rows[0]?.isactivated as boolean
    }
}

export default new checkService()