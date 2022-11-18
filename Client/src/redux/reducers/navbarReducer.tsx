import { createSlice, PayloadAction} from '@reduxjs/toolkit'
import { AlcoholicHref, HomeBarHref, NonAlcoholicHref } from '../../href/href'

export type LinkType = {
    name: string,
    color: string,
    href:string,
    id:number,
}

type NavbarModule = {
    previousIdLink: number,
    currentIdLink: number,
    linkObject: LinkType[],
}

const initialState:NavbarModule = {
    previousIdLink: -1,
    currentIdLink: -1,
    linkObject: [
        {name:'Alcoholic', color:'#000000', href:AlcoholicHref.href, id:1},
        {name:'Non-alcoholic', color:'#995D2D', href:NonAlcoholicHref.href, id:2},
        {name:'Home Bar', color:'#000000', href:HomeBarHref.href, id:3}
        ],
    
}

export const navbarSlice = createSlice({
    name: 'navbarSlice',
    initialState,
    reducers:
    {
        setPreviousIdLink: (state, action: PayloadAction<number>) => {
            state.previousIdLink = action.payload
        },
        setCurrentIdLink: (state, action: PayloadAction<number>) =>{
            state.currentIdLink = action.payload
        },

    }
}
)


export const { setPreviousIdLink, setCurrentIdLink} = navbarSlice.actions
export default navbarSlice

