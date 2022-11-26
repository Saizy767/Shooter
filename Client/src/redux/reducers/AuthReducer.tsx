import { AnyAction, createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit'
import { stateInputType } from '../../models/AuthTypes'

type AuthModule = {
    visibilityAuth: boolean,
    visibilityRegistration: boolean
    ErrorValidation: boolean,
    AnyOneFocus: boolean
    Timer: number,
    CurrentStepRegistration: number,
    AuthorizationEmail: stateInputType,
    AuthorizationPassword: stateInputType
}

const initialState:AuthModule = {
    visibilityAuth: false,
    visibilityRegistration: false,
    ErrorValidation: true,
    AnyOneFocus: false,
    Timer: 0,
    CurrentStepRegistration: 0,

    AuthorizationEmail:{
        value: '',
        state: 'Success',
        description: '',
        name: 'email',
        type: 'text',
        isFocus: false,
        placeholder: 'E-mail'
    },
    AuthorizationPassword: {
        value: '',
        state: 'Success',
        description: '',
        name: 'password',
        type: 'password',
        isFocus: false,
        placeholder: 'Password'
    }
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
        setNextStepRegistration:(state, action:AnyAction)=>{
            state.CurrentStepRegistration = state.CurrentStepRegistration === 2 ?
                                            state.CurrentStepRegistration : 
                                            state.CurrentStepRegistration + 1
        },
        setPrevStepRegistration:(state, action:AnyAction)=>{
            state.CurrentStepRegistration = state.CurrentStepRegistration === 0 ? 
                                            state.CurrentStepRegistration : 
                                            state.CurrentStepRegistration - 1
        },
        setTimer:(state, action:PayloadAction<number>)=>{
            state.Timer= action.payload
        },
        setAnyOneFocus:(state, action:PayloadAction<boolean>)=>{
            state.AnyOneFocus = action.payload
        }
    }
})

export const clickToRegistration = createAsyncThunk(
    'auth/Registration',
    async(stateRegistration:boolean, {dispatch}) => {
        dispatch(setVisibilityAuth(!stateRegistration))
        dispatch(setVisibilityRegistration(stateRegistration))
    }
)

export const clickToBack = createAsyncThunk(
    'auth/Back',
    async(_,{dispatch})=>{
        dispatch(setPrevStepRegistration())
        dispatch(setAnyOneFocus(false))
    }
)

export const {setVisibilityAuth, setVisibilityRegistration, setErrorValidation,
              setNextStepRegistration, setPrevStepRegistration, setTimer,
              setAnyOneFocus} = authSlice.actions
export default authSlice

