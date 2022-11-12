import { createSlice,PayloadAction } from "@reduxjs/toolkit"

type ScreenModule = {
    currentPosition:number,
    previousPosition: number
}

const initialState:ScreenModule = {
    currentPosition: -1,
    previousPosition: -1
}

const screenSlice = createSlice({
    name: 'screenSlice',
    initialState,
    reducers:{
        setCurrentPosition: (state, action: PayloadAction<number>)=>{
            state.currentPosition = action.payload
        },
        setPreviousPosition: (state, action: PayloadAction<number>)=>{
            state.previousPosition = action.payload
        }
    }
}
)

export const {setCurrentPosition, setPreviousPosition} = screenSlice.actions
export default screenSlice