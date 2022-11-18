import { AnyAction, createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit'
import { RootState } from '../rootReducer';
import { PostData } from './APIReducer';
import { setVisibilityRegistration } from './AuthReducer';

type RegistrateType = {
    RegistrateEmail: string,
    RegistrateName: string,
    RegistrateSurname: string,
    RegistratePassword: string,
    RegistrateRepPassword: string,
    CurrentStepRegistration: number,
    Timer: number
}

const initialState:RegistrateType = {
    RegistrateEmail: '',
    RegistrateName: '',
    RegistratePassword: '',
    RegistrateRepPassword: '',
    RegistrateSurname: '',
    Timer: 0,
    CurrentStepRegistration: 0
}

export const registrateSlice = createSlice({
    name: 'registrate',
    initialState,
    reducers:
    {
        setRegistrateName:(state, action:PayloadAction<string>)=>{
            state.RegistrateName = action.payload
        },
        setRegistrateSurname:(state, action:PayloadAction<string>)=>{
            state.RegistrateSurname = action.payload
        },
        setRegistratePassword:(state, action:PayloadAction<string>)=>{
            state.RegistratePassword = action.payload
        },
        setRegistrateRepPassword:(state, action:PayloadAction<string>)=>{
            state.RegistrateRepPassword = action.payload
        },
        setRegistrateEmail:(state, action:PayloadAction<string>)=>{
            state.RegistrateEmail = action.payload
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
        }
    }
})

export const clickCompleteRegistration = createAsyncThunk(
    'registrate/complete',
    async(_,{dispatch})=>{
        dispatch(setVisibilityRegistration(false))
    }
)

export const clickNextStepRegistration = createAsyncThunk(
    'registrate/nextpage',
    async(_,{dispatch, getState})=>{
        const selector = getState() as RootState
        const {RegistrateName, RegistrateSurname, RegistrateEmail,
               RegistratePassword, CurrentStepRegistration} = selector.Registrate
        const {ErrorValidation} = selector.Auth

        if(!ErrorValidation){
            switch(CurrentStepRegistration){
                case(0):{
                    dispatch(setNextStepRegistration())
                    break
                }
                case(1):{
                    dispatch(PostData(
                        {
                            url:process.env.REACT_APP_USER_REGISTRATION || '',
                            data:{RegistrateName, RegistrateSurname, RegistrateEmail, RegistratePassword}
                        }
                    ))
                    dispatch(setTimer(30))
                    dispatch(setNextStepRegistration())
                    break
                }
                default:{
                    dispatch(setNextStepRegistration())
                }
        }}
    }
)


export const {setRegistrateEmail, setRegistrateName, setRegistratePassword,
              setRegistrateRepPassword, setRegistrateSurname, setNextStepRegistration,
              setPrevStepRegistration, setTimer} = registrateSlice.actions
export default registrateSlice

