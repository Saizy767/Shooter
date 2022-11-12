import { FC } from "react";
import { useTypedDispatch } from "../../../hooks/useTypedDispatch";
import { useTypedSelector } from "../../../hooks/useTypedSelector";
import { ButtonPanelModule } from "../../../models/AuthModule";
import { setVisibilityRegistration } from "../../../redux/reducers/navbarReducer";
import Auth from "./Auth";


const AuthContainer:FC = () =>{
    const dispatch = useTypedDispatch()
    const {InputPanelData,IconPanel} = useTypedSelector((state)=> state.Auth)

    const ButtonPanelData: ButtonPanelModule[] = [
        {name: 'Registration',
        onClick: () => dispatch(setVisibilityRegistration(true)),
        id:1
        },
        {name: 'Log in',
        onClick: () => dispatch(setVisibilityRegistration(false)),
        id:2
    }
    ]

    return(
        <Auth InputPanelData={InputPanelData} ButtonPanelData={ButtonPanelData} IconPanel={IconPanel}/>
    ) 
}

export default AuthContainer
