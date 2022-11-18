import { createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit'

type AuthModule = {
    visibilityAuth: boolean,
    visibilityRegistration: boolean
    ErrorValidation: boolean,
}

const initialState:AuthModule = {
    visibilityAuth: false,
    visibilityRegistration: false,
    ErrorValidation: false,
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers:
    {
        setVisibilityAuth: (state, action: PayloadAction<boolean>)=>{
            state.visibilityAuth = action.payload
        },
        setVisibilityRegistration: (state, action: PayloadAction<boolean>)=>{
            state.visibilityRegistration = action.payload;
        },
        setErrorValidation:(state, action:PayloadAction<boolean>)=>{
            state.ErrorValidation = action.payload;
        },
    }
})

export const clickToRegistration = createAsyncThunk(
    'auth/Registration',
    async(stateRegistration:boolean, {dispatch}) => {
        dispatch(setVisibilityAuth(!stateRegistration))
        dispatch(setVisibilityRegistration(stateRegistration))
    }
)

export const {setVisibilityAuth, setVisibilityRegistration, setErrorValidation} = authSlice.actions
export default authSlice

