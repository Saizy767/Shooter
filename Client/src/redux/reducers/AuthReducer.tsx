import { AnyAction, createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit'
import { RootState } from '../rootReducer'
import { setInputValue } from './RegistrateReduce'

type AuthModule = {
    visibilityAuth: boolean,
    visibilityRegistration: boolean
    ErrorValidation: boolean,
    AnyOneFocus: boolean
    Timer: number,
    CurrentStepRegistration: number,
}

const initialState:AuthModule = {
    visibilityAuth: false,
    visibilityRegistration: false,
    ErrorValidation: true,
    AnyOneFocus: false,
    Timer: 0,
    CurrentStepRegistration: 0,
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
    async(stateRegistration:boolean, {dispatch,getState}) => {

        const selector = getState() as RootState
        const {RegistrateCode,RegistrateEmail,RegistrateName,
            RegistratePassword,RegistrateRepPassword,RegistrateSurname} = selector.Registrate
        const InputReg = [RegistrateCode,RegistrateEmail,RegistrateName,
            RegistratePassword,RegistrateRepPassword,RegistrateSurname]
        dispatch(setVisibilityAuth(!stateRegistration))
        dispatch(setVisibilityRegistration(stateRegistration))

        if (stateRegistration){
            InputReg.forEach((input)=>{
                dispatch(setInputValue({input, value: ''}))
            })
            localStorage.setItem(`registration`, JSON.stringify({email:'', isExisting: false}))
        }
        else{
            localStorage.clear()
        }
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

