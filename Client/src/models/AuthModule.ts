export type ButtonPanelModule = {
    name: string,
    onClick?: ((T:any) => void) | undefined,
    id:number,
    typeMessage?: 'Ok' | 'Warning' | 'Not'
}
export type IconPanelModule = {
    id: number,
    name: string,
    img: string
}
export type InputPanelModule = {
    id:number,
    name?: string,
    alt?:string,
    placeholder?:string,
    type?: 'password' | 'email' | 'coctail' | 'other'
}

export type ErrorValidationType = { 
    status: boolean
    description: string
}