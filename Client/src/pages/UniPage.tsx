import { FC, useCallback } from "react";
import NavbarController from "../components/Navbar/NavbarContainer";
import SearchBarContainer from "../components/SearchBar/SearchBarContainer";

import Footer from "../components/Footer/Footer";
import { useTypedSelector } from "../hooks/useTypedSelector";
import RegistrationContainer from "../components/PopUp/Registration/RegistrationContainer";
import AuthContainer from "../components/PopUp/Auth/AuthContainer";
import { useTypedDispatch } from "../hooks/useTypedDispatch";
import { setVisibilityAuth, setVisibilityRegistration } from "../redux/reducers/AuthReducer";


type UniPageType = {
    children?: React.ReactNode
}
const UniPage:FC<UniPageType>=({children})=>{
    const {visibilityAuth, visibilityRegistration} = useTypedSelector((state)=>state.Auth)
    const dispatch = useTypedDispatch()
    
    const removePopUp = useCallback(() =>{
        dispatch(setVisibilityAuth(false))
        dispatch(setVisibilityRegistration(false))
        const overflowBody = Array.from(
            document.getElementsByClassName('vsc-initialized') as HTMLCollectionOf<HTMLElement>)

        overflowBody.forEach((body)=>{
            body.style.overflow = ''
        })
    },[dispatch])

    return(
        <div onClick={()=>(visibilityAuth || visibilityRegistration) && removePopUp()}>
            <NavbarController/>
            <SearchBarContainer/>
            {visibilityAuth && <AuthContainer/>}
            {visibilityRegistration && <RegistrationContainer/>}
            {children}
            <Footer/>
        </div>
    )
}

export default UniPage