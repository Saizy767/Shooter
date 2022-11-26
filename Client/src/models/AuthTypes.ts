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
    type?: 'password' | 'text',
    elem?: stateInputType
}
export type stepsType = {
    firstStep: number,
    secondStep: number,
    thirdStep: number
}
export type stateInputType = {
    value: string,
    typeInput: 'text' | 'password',
    state: "Error" | "Success",
    description: string,
    name: string,
    isFocus: boolean,
    placeholder:string,
}