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
    async checkID({id}:{id:string}){
        const codeAuth = await bd.query(`SELECT * FROM person WHERE id = $1`,[id])
        return Number(id) === codeAuth.rows[0]?.id ? true : false
    }
}

export default new checkService()