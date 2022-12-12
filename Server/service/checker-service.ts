import bd from '../database/db'

class checkService{
    async checkEmail(email: string){
        const emailDB = await bd.query(`SELECT email FROM person WHERE email = $1`,[email])
        return email !== emailDB.rows[0]?.email ? true : false
    }
    async checkCode({code, email}:{code:string, email:string}){
        const codeAuth = await bd.query(`SELECT activatedcode FROM person WHERE email = $1`,[email])
        return code === codeAuth.rows[0]?.activatedcode ? true : false
    }
}

export default new checkService()