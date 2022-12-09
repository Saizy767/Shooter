import bd from '../database/db'

class checkService{
    async checkEmail(email: string){
        const emailDB = await bd.query(`SELECT email FROM person WHERE email = $1`,[email])
        if((emailDB && emailDB.rows[0]?.email) === email){
            return false
        }
        else{
            return true
        }
    }
}

export default new checkService()