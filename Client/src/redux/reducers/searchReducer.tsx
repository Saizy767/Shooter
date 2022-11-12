import { createSlice,PayloadAction } from "@reduxjs/toolkit"

type SearchModule = {
    visibilitySearch: boolean
}

const initialState:SearchModule = {
    visibilitySearch: false
}

const searchSlice = createSlice({
    name: 'searchSlice',
    initialState,
    reducers:{
        setVisibilitySearch: (state, action: PayloadAction<boolean>)=>{
            state.visibilitySearch = action.payload
        }
    }
}
)

export const {setVisibilitySearch} = searchSlice.actions
export default searchSlice