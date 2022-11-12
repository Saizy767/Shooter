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
            placeholder: "E-mail"
        },
        {
            id: 2,
            type: "text",
            placeholder: "Name"
        },
        {
            id: 3,
            type: "text",
            placeholder: "Surname"
        }
    ],
    SecondInputPanelData:[
        {
            id: 1,
            type: "password",
            placeholder: "Password"
        },
        {
            id: 2,
            type: "password",
            placeholder: "Repeat password"
        },
    ],
    ThirdInputPanelData: [
        {
            id: 1,
            type: "text",
            placeholder: "Code"
        },
    ]
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
            state.visibilityRegistration = !action.payload;
        }
    }
}
)


export const {setVisibilityAuth, setVisibilityRegistration} = authSlice.actions
export default authSlice

