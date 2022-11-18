import { IconPanelType, InputPanelType } from './AuthTypes'
import VKLogo from '../assets/images/VKLogo.svg'
import GoogleLogo from '../assets/images/GoogleLogo.svg'
import OdnoklassnikiLogo from '../assets/images/OdnaklasnikiLogo.svg'
import YandexLogo from '../assets/images/YandexLogo.svg'



export const InputPanelData:InputPanelType[] = [
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
]
export const IconPanel: IconPanelType[] =[
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
]
export const FirstInputPanelData:InputPanelType[] = [
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
]
export const SecondInputPanelData:InputPanelType[] =[
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
]
export const ThirdInputPanelData:InputPanelType[] = [
    {
        id: 1,
        name: "code",
        type: "text",
        placeholder: "Code"
    },
]