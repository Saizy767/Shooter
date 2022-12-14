import * as jwt from 'jsonwebtoken'
import { TypeUserDTO } from '../models/user-modules'
import * as dotenv from 'dotenv'

dotenv.config()

class TokenService {
    async generateTokens(payload:TypeUserDTO){
        const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN,
            { expiresIn: process.env.ACCESS_TOKEN_LIFE })
        const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN,
            {expiresIn: process.env.REFRESH_TOKEN_LIFE})
        return {
            accessToken,
            refreshToken
        }
    }
}

export default new TokenService()