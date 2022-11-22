import { createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit'
import { stateInputType } from '../../models/AuthTypes';
import { RootState } from '../rootReducer';
import { PostData } from './APIReducer';
import { setAnyOneFocus, setErrorValidation, setNextStepRegistration, setTimer, setVisibilityRegistration } from './AuthReducer';

type RegistrateType = {
    RegistrateEmail: stateInputType,
    RegistrateName: stateInputType,
    RegistrateSurname: stateInputType,
    RegistratePassword: stateInputType,
    RegistrateRepPassword: stateInputType,
}

const initialState:RegistrateType = {
    RegistrateEmail:{
        value: '',
        state: 'Success',
        description: '',
        name: 'email',
        isFocus: false
    },
    RegistrateName:{
        value: '',
        state: 'Success',
        description: '',
        name: 'name',
        isFocus: false
    },
    RegistrateSurname: {
        value: '',
        state: 'Success',
        description: '',
        name: 'surname',
        isFocus: false
    },
    RegistratePassword: {
        value: '',
        state: 'Success',
        description: '',
        name: 'password',
        isFocus: false
    },
    RegistrateRepPassword:{
        value: '',
        state: 'Success',
        description: '',
        name: 'reppassword',
        isFocus: false
    },
}

export const registrateSlice = createSlice({
    name: 'registrate',
    initialState,
    reducers:
    {
        setRegistrateNameValue:(state, action:PayloadAction<string>)=>{
            state.RegistrateName.value = action.payload
        },
        setRegistrateSurnameValue:(state, action:PayloadAction<string>)=>{
            state.RegistrateSurname.value = action.payload
        },
        setRegistratePasswordValue:(state, action:PayloadAction<string>)=>{
            state.RegistratePassword.value = action.payload
        },
        setRegistrateRepPasswordValue:(state, action:PayloadAction<string>)=>{
            state.RegistrateRepPassword.value = action.payload
        },
        setRegistrateEmailValue:(state, action:PayloadAction<string>)=>{
            state.RegistrateEmail.value = action.payload
        },
        setCheckForAll:(state, action:PayloadAction<stateInputType>)=>{
            switch(action.payload.name){
                case('email'):{
                    state.RegistrateEmail = action.payload
                    break
                }
                case('name'):{
                    state.RegistrateName = action.payload
                    break
                }
                case('surname'):{
                    state.RegistrateSurname = action.payload
                    break
                }
                case('password'):{
                    state.RegistratePassword = action.payload
                    break
                }
                case('reppassword'):{
                    state.RegistrateRepPassword = action.payload
                    break
                }
                default:{
                    console.log('This input didnt in RegistrateReducer')
                    console.log(action.payload)
                }
            }
        }
    }
})

export const checkEmail = createAsyncThunk(
    'registration/checkEmail',
    async(_,{dispatch, getState})=>{
        const selector = getState() as RootState
        const value = selector.Registrate.RegistrateEmail.value
        if(!(/\S+@\S+\.\S+/.test(value))){
            dispatch(setCheckForAll({value, state: "Error",
                                     description: 'Email is invalid', name: 'email',
                                     isFocus:true}))
            dispatch(setAnyOneFocus(true))
        }
        else{
            dispatch(setCheckForAll({value, state: "Success",
                                     description: '',name: 'email',
                                     isFocus:false}))
        }
})

export const checkEmpty = createAsyncThunk(
    'registration/emptyInput',
    async(input:stateInputType,{dispatch})=>{
    if(input.value.length === 0){
        dispatch(setCheckForAll({value:input.value, state: "Error",
                                 description:'Empty row', name: input.name,
                                 isFocus:true}))
        dispatch(setAnyOneFocus(true))
    }
    else{
        dispatch(setCheckForAll({value: input.value, state: "Success" ,
                                 description: '', name: input.name,
                                 isFocus:false}))
    }
})

export const checkLengthWord = createAsyncThunk(
    'registration/inputLength',
    async({input,min}:{input:stateInputType, min: number},{dispatch})=>{
    if(input.value.length <= min){
        dispatch(setCheckForAll({value: input.value,state: "Error",
                                 description:`Password length less ${min}`, name:input.name,
                                 isFocus: true}))
        dispatch(setAnyOneFocus(true))
    }
    else{
        dispatch(setCheckForAll({value: input.value,state: "Success" ,
                                 description: '', name:input.name,
                                 isFocus: false}))
    }
})

export const checkRepPassword = createAsyncThunk(
    'registration/checkRepPassword',
    async(_, {dispatch, getState})=>{
        const selector = getState() as RootState
        const {RegistratePassword, RegistrateRepPassword} = selector.Registrate
        if(RegistratePassword.value !== RegistrateRepPassword.value){
            dispatch(setCheckForAll({value: RegistrateRepPassword.value, state:"Error",
                                     description:`Passwords are not the same`, name:RegistrateRepPassword.name,
                                     isFocus: true}))
            dispatch(setAnyOneFocus(true))
        }
        else{
            dispatch(setCheckForAll({value:RegistrateRepPassword.value,state: "Success" ,
                                     description: '', name: RegistrateRepPassword.name,
                                     isFocus:false}))
        }
})

export const clickNextStepRegistration = createAsyncThunk(
    'registrate/nextpage',
    async(stateButton:any,{dispatch, getState})=>{
        const selector = getState() as RootState
        const {RegistrateName, RegistrateSurname, RegistrateEmail,
               RegistratePassword} = selector.Registrate
        const {CurrentStepRegistration} = selector.Auth
        dispatch(setErrorValidation(stateButton))
        if(stateButton){
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

export const clickCompleteRegistration = createAsyncThunk(
    'registrate/complete',
    async(_,{dispatch})=>{
        dispatch(setVisibilityRegistration(false))
    }
)


export const {setRegistrateEmailValue, setRegistrateNameValue, setRegistratePasswordValue,
              setRegistrateRepPasswordValue, setRegistrateSurnameValue, setCheckForAll
             } = registrateSlice.actions
export default registrateSlice

