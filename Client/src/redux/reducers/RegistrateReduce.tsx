import { createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit'
import { stateInputType } from '../../models/AuthTypes';
import { RootState } from '../rootReducer';
import { GetData, PostData } from './APIReducer';
import { setAnyOneFocus, setErrorValidation, setNextStepRegistration, setTimer, setVisibilityRegistration } from './AuthReducer';

type RegistrateType = {
    RegistrateEmail: stateInputType,
    RegistrateName: stateInputType,
    RegistrateSurname: stateInputType,
    RegistratePassword: stateInputType,
    RegistrateRepPassword: stateInputType,
    RegistrateCode: stateInputType
}

const initialState:RegistrateType = {
    RegistrateEmail:{
        value: '',
        state: 'Success',
        description: '',
        name: 'email',
        type: 'text',
        isFocus: false,
        placeholder: 'E-mail'
    },
    RegistrateName:{
        value: '',
        state: 'Success',
        description: '',
        name: 'name',
        type: 'text',
        isFocus: false,
        placeholder: 'Name'
    },
    RegistrateSurname: {
        value: '',
        state: 'Success',
        description: '',
        name: 'surname',
        type: 'text',
        isFocus: false,
        placeholder: 'Surname'
    },
    RegistratePassword: {
        value: '',
        state: 'Success',
        description: '',
        name: 'password',
        type: 'password',
        isFocus: false,
        placeholder: 'Password'
    },
    RegistrateRepPassword:{
        value: '',
        state: 'Success',
        description: '',
        name: 'reppassword',
        type: 'password',
        isFocus: false,
        placeholder: 'Repeat Password'
    },
    RegistrateCode:{
        value: '',
        state: 'Success',
        description: '',
        name: 'code',
        type: 'text',
        isFocus: false,
        placeholder: 'Code'
    }
}

export const registrateSlice = createSlice({
    name: 'registrate',
    initialState,
    reducers:
    {
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

export const checkInvalidEmail = createAsyncThunk(
    'registration/checkInvalidEmail',
    async(_,{dispatch, getState})=>{
        const selector = getState() as RootState
        const {RegistrateEmail} = selector.Registrate
        const {value, type, placeholder} = RegistrateEmail
        const tester = /^[-!#$%&'*+\\/0-9=?A-Z^_a-z`{|}~](\.?[-!#$%&'*+\\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;

        const ErrorInput = () => {
            dispatch(setCheckForAll({value, state: "Error",
                                         description: 'Email is invalid', name: 'email',
                                         isFocus:true, type, placeholder}))
            dispatch(setAnyOneFocus(true))
        }
        const SuccessInput = () => {
            dispatch(setCheckForAll({value, state: "Success",
                                            description: '', name: 'email',
                                            isFocus:false, type, placeholder}))
            dispatch(checkExistingEmail({email: value}))
        }


            const emailParts = value.split('@');
            if(!value){
                return dispatch(checkEmpty(RegistrateEmail))
            }

            if(emailParts.length !== 2) {
                return ErrorInput()
            }

            const account = emailParts[0];
            const address = emailParts[1];

            if(account.length > 64){
                return ErrorInput()
            }

            else if(address.length > 255){
                return ErrorInput()
            }

            const domainParts = address.split('.');
            if (domainParts.some(function (part) {
                return part.length > 63;
            }))
            return ErrorInput()


            if (!tester.test(RegistrateEmail.value)){
                return ErrorInput()
            };

            return SuccessInput()
        })

export const checkExistingEmail = createAsyncThunk(
    'registration/checkExistingEmail',
    async({email}:{email:string},{dispatch, getState})=>{
        const selector = getState() as RootState
        const {value, type, placeholder} = selector.Registrate.RegistrateEmail
        const result = await dispatch(GetData(
            {
                url: `${process.env.REACT_APP_SERVER_HOST}/user/${email}` || '',
            }
        ))
        const ErrorInput = () =>{
            dispatch(setCheckForAll({value, state: "Error",
                                     description: 'Email is existing', name: 'email',
                                     isFocus:true, type, placeholder}))
            dispatch(setAnyOneFocus(true))
        }
        const SuccessInput = () => {
            dispatch(setCheckForAll({value, state: "Success",
                                     description: '', name: 'email',
                                     isFocus:false, type, placeholder}))
        }
        if(result.payload[0].email === email){
            return ErrorInput()
        }
        else{
            return SuccessInput()
        }
    }
)

export const checkEmpty = createAsyncThunk(
    'registration/emptyInput',
    async(input:stateInputType,{dispatch})=>{
        const {value, name, type, placeholder} = input

        const ErrorInput = () => {
            dispatch(setCheckForAll({value, state: "Error",
                                    description:'Empty row', name,
                                    isFocus:true, type, placeholder}))
            dispatch(setAnyOneFocus(true))
        }

        const SuccessInput = () =>{
            dispatch(setCheckForAll({value, state: "Success" ,
                                    description: '', name,
                                    isFocus:false, type, placeholder}))
        }

        if(input.value.length === 0){
            return ErrorInput()
        }
        else{
            return SuccessInput()
        }
})

export const checkLengthWord = createAsyncThunk(
    'registration/inputLength',
    async({input,min}:{input:stateInputType, min: number},{dispatch})=>{
        const {value, type, placeholder, name} = input

        const ErrorInput = () => {
            dispatch(setCheckForAll({value,state: "Error",
                                    description:`Password length less ${min}`, name,
                                    isFocus: true, type, placeholder}))
            dispatch(setAnyOneFocus(true))
        }
        const SuccessInput = () => {
            dispatch(setCheckForAll({value,state: "Success" ,
                                    description: '', name,
                                    isFocus: false, type, placeholder}))
        }

        if(!input.value){
            return dispatch(checkEmpty(input))
        }
        else if(input.value.length <= min){
            return ErrorInput()
        }
        else{
            return SuccessInput()
        }
})

export const checkRepPassword = createAsyncThunk(
    'registration/checkRepPassword',
    async(_, {dispatch, getState})=>{
        const selector = getState() as RootState
        const {RegistratePassword, RegistrateRepPassword} = selector.Registrate
        const {value, name, type, placeholder} = RegistrateRepPassword

        const ErrorInput = () =>{
            dispatch(setCheckForAll({value, state:"Error",
                                     description:`Passwords are not the same`, name,
                                     isFocus: true, type, placeholder}))
            dispatch(setAnyOneFocus(true))
        }
        const SuccessInput = () => {
            dispatch(setCheckForAll({value,state: "Success" ,
                                    description: '', name,
                                    isFocus:false, type, placeholder}))
        }

        if(RegistratePassword.value !== RegistrateRepPassword.value){
            return ErrorInput()
        }
        else{
            return SuccessInput()
        }
})

export const checkInputRule = createAsyncThunk(
    'registration/checkInputRule',
    async({...args}: {args:Array<stateInputType>},{dispatch,getState})=>{
        const selector = getState() as RootState
        const {RegistratePassword, RegistrateName, RegistrateSurname} = selector.Registrate
        for(let i = 0;i<= args.args.length; i++){
            switch (args.args[i].name){
                case('email'):{
                    dispatch(checkInvalidEmail())
                    break
                }
                case('password'):{
                    dispatch(checkLengthWord({input:RegistratePassword,min:5})) 
                    break
                }
                case('reppassword'):{
                    dispatch(checkRepPassword())
                    break
                }
                case('name'):{
                    dispatch(checkLengthWord({input:RegistrateName,min:2}))
                    break
                }
                case('surname'):{
                    dispatch(checkLengthWord({input:RegistrateSurname,min:2}))
                    break
                }
            }

        }
    }
)

export const setInputValue = createAsyncThunk(
    'registration/inputValue',
    async({input, value}:{input:stateInputType, value:string}, {dispatch})=>{
        dispatch(setCheckForAll({...input, value}))
    }
)

export const setTypePassword = createAsyncThunk(
    'registration/setTypePassword',
    async({input,type}:{input:stateInputType,type:"text"|"password"}, {dispatch})=>{
        dispatch(setCheckForAll({...input, type}))
    }
)

export const clickNextStepRegistration = createAsyncThunk(
    'registrate/nextpage',
    async({stateButton}:{stateButton:boolean},{dispatch, getState})=>{
        const selector = getState() as RootState
        const {RegistrateName, RegistrateSurname, RegistrateEmail,
               RegistratePassword, RegistrateRepPassword} = selector.Registrate
        const {CurrentStepRegistration} = selector.Auth
        dispatch(setErrorValidation(stateButton))
            switch(CurrentStepRegistration){
                case(0):{
                    dispatch(checkInputRule({args:[RegistrateEmail, RegistrateName, RegistrateSurname]}))
                    stateButton && dispatch(setNextStepRegistration())
                    break
                }
                case(1):{
                    dispatch(checkInputRule({args:[RegistratePassword, RegistrateRepPassword]}))
                    if(stateButton){
                        dispatch(PostData(
                            {
                                url:`${process.env.REACT_APP_SERVER_HOST}/user/registration` || '',
                                data:{RegistrateName, RegistrateSurname, RegistrateEmail, RegistratePassword}
                            }
                        ))
                        dispatch(setNextStepRegistration())
                        dispatch(setTimer(30))
                    }
                    break
                }
                default:{
                    stateButton && dispatch(setNextStepRegistration())
                }
        }}
)

export const clickCompleteRegistration = createAsyncThunk(
    'registrate/complete',
    async(_,{dispatch})=>{
        dispatch(setVisibilityRegistration(false))
    }
)


export const {setCheckForAll} = registrateSlice.actions
export default registrateSlice

