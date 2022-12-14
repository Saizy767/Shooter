export interface IGetUserAuthInfoRequest extends Request {
    user: string
}
type ErrorParam = {
    location: string,
    msg: string,
    param : string,
    value: string
}
export type ErrorVal = {
    errors: ErrorParam[]
}

export type TypeUserDTO = {
    id: string,
    email: string,
    isActivated: boolean
}