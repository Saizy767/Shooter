import { FC, useCallback } from "react";
import { useTypedDispatch } from "../../../hooks/useTypedDispatch";
import { useTypedSelector } from "../../../hooks/useTypedSelector";
import { LinkType, setCurrentIdLink, setPreviousIdLink } from "../../../redux/reducers/navbarReducer";
import NavbarLinkView from "./NavbarLinkView";

const NavbarLinkController:FC = () =>{
    const dispatch = useTypedDispatch()
    const {linkObject, currentIdLink, previousIdLink} = useTypedSelector((state)=> state.Navbar)   

    const moveRightUnderline = currentIdLink>=previousIdLink

    const checkDirectionUnderline = useCallback((obj:LinkType)=>{
        dispatch(setCurrentIdLink(obj.id))
        dispatch(setPreviousIdLink(currentIdLink))
    },[currentIdLink, dispatch])
    
    return(
        <NavbarLinkView linkObject={linkObject}
                        checkDirectionUnderline={checkDirectionUnderline}
                        directionUnderline = {moveRightUnderline}/>
    )
}

export default NavbarLinkController