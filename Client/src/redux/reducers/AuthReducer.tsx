import { createSlice, PayloadAction} from '@reduxjs/toolkit'
import { IconPanelModule, InputPanelModule } from '../../models/AuthModule'
import VKLogo from '../../Images/VKLogo.svg'
import GoogleLogo from '../../Images/GoogleLogo.svg'
import OdnoklassnikiLogo from '../../Images/OdnaklasnikiLogo.svg'
import YandexLogo from '../../Images/YandexLogo.svg'


type AuthModule = {
    visibilityAuth: boolean,
    visibilityRegistration: boolean
    InputPanelData: InputPanelModule[],
    IconPanel: IconPanelModule[],
    FirstInputPanelData: InputPanelModule[],
    SecondInputPanelData: InputPanelModule[],
    ThirdInputPanelData: InputPanelModule[],
    ErrorValidation: boolean,
    RegistrateEmail: string,
    RegistrateName: string,
    RegistrateSurname: string,
    RegistratePassword: string,
    RegistrateRepPassword: string
}

const initialState:AuthModule = {
    visibilityAuth: false,
    visibilityRegistration: false,
    InputPanelData: [
        {
            id:1,
            alt:'email',
            placeholder:'Email',
            type: "text"
        },
        {
            id:2,
            alt: 'password',
            placeholder: 'Password',
            type: "password"
        }
    ],
    IconPanel:[
        {
            id: 1,
            name: 'VK',
            img: VKLogo
        },
        {
            id: 2,
            name: "Yandex",
            img: YandexLogo
        },
        {
            id: 3,
            name: "Google",
            img: GoogleLogo
        },
        {
            id: 4,
            name: "Odnoklassniki",
            img: OdnoklassnikiLogo
        }
    ],
    FirstInputPanelData: [
        {
            id: 1,
            type: "text",
            name: "email",
            placeholder: "E-mail"
        },
        {
            id: 2,
            type: "text",
            name: "name",
            placeholder: "Name"
        },
        {
            id: 3,
            type: "text",
            name: 'surname',
            placeholder: "Surname"
        }
    ],
    SecondInputPanelData:[
        {
            id: 1,
            type: "password",
            name: "password",
            placeholder: "Password"
        },
        {
            id: 2,
            type: "password",
            name: "reppassword",
            placeholder: "Repeat password"
        },
    ],
    ThirdInputPanelData: [
        {
            id: 1,
            name: "code",
            type: "text",
            placeholder: "Code"
        },
    ],
    ErrorValidation: false,
    RegistrateEmail: '',
    RegistrateName: '',
    RegistratePassword: '',
    RegistrateRepPassword: '',
    RegistrateSurname: ''
}

export const authSlice = createSlice({
    name: 'authSlice',
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
    }
}
)


export const {setVisibilityAuth, setVisibilityRegistration, setErrorValidation,
              setRegistrateEmail, setRegistrateName, setRegistratePassword,
              setRegistrateRepPassword, setRegistrateSurname} = authSlice.actions
export default authSlice

