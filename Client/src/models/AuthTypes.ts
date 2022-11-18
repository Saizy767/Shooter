export type ButtonPanelType = {
    name: string,
    onClick?: ((T:any) => void) | undefined,
    id:number,
    typeMessage?: 'Ok' | 'Warning' | 'Not'
}
export type IconPanelType = {
    id: number,
    name: string,
    img: string
}
export type InputPanelType = {
    id:number,
    name?: 'password'|'coctail'|'reppassword'|'email'| string,
    alt?:string,
    placeholder?:string,
    type?: 'password' | 'text' 
}

export type ErrorValidationType = { 
    status: boolean
    description: string
}