import { createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit'
import { stateInputType } from '../../models/AuthTypes';
import { RootState } from '../rootReducer';
import { GetData, PostData } from './APIReducer';
import { setAnyOneFocus, setErrorValidation,
         setNextStepRegistration, setTimer, setVisibilityRegistration } from './AuthReducer';

type RegistrateType = {
    RegistrateEmail: stateInputType,
    RegistrateName: stateInputType,
    RegistrateSurname: stateInputType,
    RegistratePassword: stateInputType,
    RegistrateRepPassword: stateInputType,
    RegistrateCode: stateInputType,
    AuthorizationEmail: stateInputType,
    AuthorizationPassword: stateInputType
}

const initialState:RegistrateType = {
    RegistrateEmail:{
        value: '',
        state: 'Success',
        description: '',
        name: 'email',
        typeInput: 'text',
        isFocus: false,
        placeholder: 'E-mail',
    },
    RegistrateName:{
        value: '',
        state: 'Success',
        description: '',
        name: 'name',
        typeInput: 'text',
        isFocus: false,
        placeholder: 'Name',
    },
    RegistrateSurname: {
        value: '',
        state: 'Success',
        description: '',
        name: 'surname',
        typeInput: 'text',
        isFocus: false,
        placeholder: 'Surname'
    },
    RegistratePassword: {
        value: '',
        state: 'Success',
        description: '',
        name: 'password',
        typeInput: 'password',
        isFocus: false,
        placeholder: 'Password'
    },
    RegistrateRepPassword:{
        value: '',
        state: 'Success',
        description: '',
        name: 'reppassword',
        typeInput: 'password',
        isFocus: false,
        placeholder: 'Repeat Password'
    },
    RegistrateCode:{
        value: '',
        state: 'Success',
        description: '',
        name: 'code',
        typeInput: 'text',
        isFocus: false,
        placeholder: 'Code'
    },
    AuthorizationEmail:{
        value: '',
        state: 'Success',
        description: '',
        name: 'Auth_email',
        typeInput: 'text',
        isFocus: false,
        placeholder: 'E-mail',
    },
    AuthorizationPassword: {
        value: '',
        state: 'Success',
        description: '',
        name: 'Auth_password',
        typeInput: 'password',
        isFocus: false,
        placeholder: 'Password',
    }
}

export const registrateSlice = createSlice({
    name: 'registrate',
    initialState,
    reducers:
    {
        setCheckForAllReg:(state, action:PayloadAction<stateInputType>)=>{
            switch(action.payload.name){
                case('email'):{
                    state.RegistrateEmail = action.payload
                    break
                }
                case('Auth_email'):{
                    state.AuthorizationEmail = action.payload
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
                case('Auth_password'):{
                    state.AuthorizationPassword = action.payload
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
    async(input: stateInputType,{dispatch, getState})=>{
        const selector = getState() as RootState
        const {RegistrateEmail} = selector.Registrate
        const {value, typeInput, placeholder, name} = input
        const tester = /^[-!#$%&'*+\\/0-9=?A-Z^_a-z`{|}~](\.?[-!#$%&'*+\\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;

        const ErrorInput = () => {
            dispatch(setCheckForAllReg({value, state: "Error",
                                         description: 'Email is invalid', name: name,
                                         isFocus:true, typeInput, placeholder}))
            return dispatch(setAnyOneFocus(true))
        }
        const SuccessInput = () => {
            (input === RegistrateEmail) && dispatch(checkExistingEmail({email: value}))
            return dispatch(setCheckForAllReg({value, state: "Success",
                                            description: '', name: 'email',
                                            isFocus:false, typeInput, placeholder}))

        }
        
        const emailParts = value.split('@');
            if(!value){
                return dispatch(checkEmpty(input))
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


            if (!tester.test(value)){
                return ErrorInput()
            };
            
            return SuccessInput()
        })

export const checkExistingEmail = createAsyncThunk(
    'registration/checkExistingEmail',
    async({email}:{email:string},{dispatch, getState})=>{
        const selector = getState() as RootState
        const {value, typeInput, placeholder, name} = selector.Registrate.RegistrateEmail
        const result = await dispatch(GetData(
            {
                url: `${process.env.REACT_APP_SERVER_HOST}/user/${email}` || '',
            }
        ))
        const ErrorInput = () =>{
            dispatch(setCheckForAllReg({value, state: "Error",
                                     description: 'Email is existing', name:  name,
                                     isFocus:true, typeInput, placeholder}))
            dispatch(setAnyOneFocus(true))
        }
        const SuccessInput = () => {
            dispatch(setCheckForAllReg({value, state: "Success",
                                     description: '', name: name,
                                     isFocus:false, typeInput, placeholder}))
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
        const {value, name, typeInput, placeholder} = input

        const ErrorInput = () => {
            dispatch(setCheckForAllReg({value, state: "Error",
                                    description:'Empty row', name,
                                    isFocus:true, typeInput, placeholder}))
            dispatch(setAnyOneFocus(true))
        }

        const SuccessInput = () =>{
            dispatch(setCheckForAllReg({value, state: "Success" ,
                                    description: '', name,
                                    isFocus:false, typeInput, placeholder}))
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
        const {value, typeInput, placeholder, name} = input

        const ErrorInput = () => {
            dispatch(setCheckForAllReg({value,state: "Error",
                                    description:`Password length less ${min}`, name,
                                    isFocus: true, typeInput, placeholder}))
            dispatch(setAnyOneFocus(true))
        }
        const SuccessInput = () => {
            dispatch(setCheckForAllReg({value,state: "Success" ,
                                    description: '', name,
                                    isFocus: false, typeInput, placeholder}))
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
        const {value, name, typeInput, placeholder} = RegistrateRepPassword

        const ErrorInput = () =>{
            dispatch(setCheckForAllReg({value, state:"Error",
                                     description:`Passwords are not the same`, name,
                                     isFocus: true, typeInput, placeholder}))
            dispatch(setAnyOneFocus(true))
        }
        const SuccessInput = () => {
            dispatch(setCheckForAllReg({value,state: "Success" ,
                                    description: '', name,
                                    isFocus:false, typeInput, placeholder}))
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
    async({args}: {args:Array<stateInputType>},{dispatch,getState})=>{
        const selector = getState() as RootState
        const {RegistratePassword, RegistrateName, RegistrateSurname,
               RegistrateEmail, AuthorizationEmail, AuthorizationPassword} = selector.Registrate
        for(let i = 0;i<= args.length; i++){
            console.log(args[i].name)
            switch (args[i].name){
                case('email'):{
                    dispatch(checkInvalidEmail(RegistrateEmail))
                    break
                }
                case('Auth_email'):{
                    dispatch(checkInvalidEmail(AuthorizationEmail))
                    break
                }
                case('password'):{
                    dispatch(checkLengthWord({input:RegistratePassword,min:5})) 
                    break
                }
                case('Auth_password'):{
                    dispatch(checkLengthWord({input:AuthorizationPassword,min:5})) 
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
        dispatch(setCheckForAllReg({...input, value}))
    }
)

export const setTypePassword = createAsyncThunk(
    'registration/setTypePassword',
    async({input,type}:{input:stateInputType,type:"text"|"password"}, {dispatch})=>{
        dispatch(setCheckForAllReg({...input, typeInput: type}))
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


export const {setCheckForAllReg} = registrateSlice.actions
export default registrateSlice

