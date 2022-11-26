import { FC } from "react";
import { useTypedDispatch } from "../../../hooks/useTypedDispatch";
import { useTypedSelector } from "../../../hooks/useTypedSelector";
import { IconPanel } from "../../../models/AuthStore";
import { ButtonPanelType } from "../../../models/AuthTypes";
import { clickToRegistration } from "../../../redux/reducers/AuthReducer";
import { setVisibilityRegistration } from "../../../redux/reducers/AuthReducer";
import Auth from "./Auth";


const AuthContainer:FC = () =>{
    const dispatch = useTypedDispatch()
    const {ErrorValidation} = useTypedSelector(state=> state.Auth)
    const {AuthorizationEmail, AuthorizationPassword} = useTypedSelector(state=> state.Registrate)

    const ButtonPanelData: ButtonPanelType[] = [
        {name: 'Registration',
        onClick: () => dispatch(clickToRegistration(true)),
        id:1
        },
        {name: 'Log in',
        onClick: () => dispatch(setVisibilityRegistration(false)),
        typeMessage: ErrorValidation ? 'Not' : 'Ok',
        id:2
        }
    ]

    return(
        <Auth InputPanelData={[AuthorizationEmail, AuthorizationPassword]} ButtonPanelData={ButtonPanelData} IconPanel={IconPanel}/>
    ) 
}

export default AuthContainer
