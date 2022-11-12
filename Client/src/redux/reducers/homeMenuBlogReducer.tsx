import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { AlcoholicHref, NonAlcoholicHref } from "../../href/href"

export type HomeMenuBlogType = {
    name: string,
    href: string,
    id: number,
}

type HomeMenuBlogModule = {
    blogsObject: HomeMenuBlogType[],
    countItems: number,
}

const initialState:HomeMenuBlogModule = {
    blogsObject : [
        {name:'Alchgolic drinks',
        href: AlcoholicHref.href,
        id:1
        },
        {name:'Non-Alchgolic drinks',
        href:NonAlcoholicHref.href,
        id:2,
        },
        {name:'Coffee',
        href:NonAlcoholicHref.href,
        id:3,
        },
        {name:'Milkshakes', 
        href: NonAlcoholicHref.href,
        id:4
        }
    ],
    countItems: 0,
}

const homeMenuBlogSlice = createSlice({
    name: 'homeMenuBlog',
    initialState,
    reducers:{
        setCountItems: (state,action:PayloadAction<number>) =>{
            state.countItems = action.payload
        }
    }
}
)

export const {setCountItems} = homeMenuBlogSlice.actions
export default homeMenuBlogSlice