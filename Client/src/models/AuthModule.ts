

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
    alt?:string,
    placeholder?:string,
    type?: string
}