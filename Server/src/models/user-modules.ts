import { CoctailType } from "./coctail-modules"

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

export type UserTypeDB = {
    id: string,
    email: string,
    password: string,
    name: string,
    surname: string,
    favorites: CoctailType[],
    homebar: CoctailType[],
    isactivated: boolean,
    tokenactivated: boolean,
    activationcode: string,
    img: string
}