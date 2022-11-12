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
    visibilityAuth: boolean,
    visibilityRegistration: boolean
}

const initialState:NavbarModule = {
    previousIdLink: -1,
    currentIdLink: -1,
    linkObject: [
        {name:'Alcoholic', color:'#000000', href:AlcoholicHref.href, id:1},
        {name:'Non-alcoholic', color:'#995D2D', href:NonAlcoholicHref.href, id:2},
        {name:'Home Bar', color:'#000000', href:HomeBarHref.href, id:3}
        ],
    visibilityAuth: false,
    visibilityRegistration: false
    
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
        setVisibilityAuth: (state, action: PayloadAction<boolean>)=>{
            state.visibilityAuth = action.payload
        },
        setVisibilityRegistration: (state, action: PayloadAction<boolean>)=>{
            state.visibilityRegistration = action.payload
        }
    }
}
)


export const { setPreviousIdLink, setCurrentIdLink, setVisibilityAuth, setVisibilityRegistration} = navbarSlice.actions
export default navbarSlice

