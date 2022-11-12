import { FC } from "react";
import NavbarController from "../components/Navbar/NavbarContainer";
import SearchBarContainer from "../components/SearchBar/SearchBarContainer";

import Footer from "../components/Footer/Footer";
import { useTypedSelector } from "../hooks/useTypedSelector";
import RegistrationContainer from "../components/PopUp/Registration/RegistrationContainer";
import AuthContainer from "../components/PopUp/Auth/AuthContainer";


type UniPageType = {
    children?: React.ReactNode
}
const UniPage:FC<UniPageType>=({children})=>{
    const {visibilityAuth, visibilityRegistration} = useTypedSelector((state)=>state.Navbar)

    return(
        <>
            <NavbarController/>
            <SearchBarContainer/>
            {visibilityAuth && <AuthContainer/>}
            {visibilityRegistration && <RegistrationContainer/>}
            {children}
            <Footer/>
        </>
    )
}

export default UniPage