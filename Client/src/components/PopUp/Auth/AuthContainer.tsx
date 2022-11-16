import { FC } from "react";
import { useTypedDispatch } from "../../../hooks/useTypedDispatch";
import { useTypedSelector } from "../../../hooks/useTypedSelector";
import { ButtonPanelModule } from "../../../models/AuthModule";
import { setVisibilityAuth, setVisibilityRegistration } from "../../../redux/reducers/navbarReducer";
import Auth from "./Auth";


const AuthContainer:FC = () =>{
    const dispatch = useTypedDispatch()
    const {InputPanelData,IconPanel, ErrorValidation} = useTypedSelector((state)=> state.Auth)

    const ButtonPanelData: ButtonPanelModule[] = [
        {name: 'Registration',
        onClick: () => [dispatch(setVisibilityRegistration(true)), dispatch(setVisibilityAuth(false))],
        id:1
        },
        {name: 'Log in',
        onClick: () => [dispatch(setVisibilityRegistration(false)), ],
        typeMessage: ErrorValidation ? 'Not' : 'Ok',
        id:2
    }
    ]

    return(
        <Auth InputPanelData={InputPanelData} ButtonPanelData={ButtonPanelData} IconPanel={IconPanel}/>
    ) 
}

export default AuthContainer
