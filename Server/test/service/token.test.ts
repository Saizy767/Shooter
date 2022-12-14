import { TypeUserDTO } from "../../src/models/user-modules"
import tokenService from "../token-service"

describe('token service', () => {
    it('should return access and refresh token', async () => {
        const userDTO = {id:'2', email: 'location@gmail.com', isActivated: true} as TypeUserDTO
        const req = await tokenService.generateTokens({...userDTO}) as unknown as {accessToken:string, refreshToken:string}
        expect(req.accessToken).toBeTruthy()
        expect(req.refreshToken).toBeTruthy()
    })
})