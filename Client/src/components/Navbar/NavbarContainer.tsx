import { FC, useCallback, useEffect, useState} from "react";
import { useTypedDispatch } from "../../hooks/useTypedDispatch";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { setVisibilityAuth } from "../../redux/reducers/AuthReducer";
import { setCurrentPosition, setPreviousPosition } from "../../redux/reducers/screenReducer";
import { setVisibilitySearch } from "../../redux/reducers/searchReducer";
import NavbarView from './NavbarView'

const NavbarController:FC=()=>{
    const [visibilityNavbar, setVisibilityNavbar] = useState<boolean>(true)

    const dispatch = useTypedDispatch()

    const {currentPosition, previousPosition} = useTypedSelector((state)=>state.Screen)

    const setSearch = useCallback((bool: boolean)=>{
        dispatch(setVisibilitySearch(bool))
    },[dispatch])

    const clickAuth = useCallback((bool:boolean)=>{
        const overflowBody = Array.from(
            document.getElementsByClassName('vsc-initialized') as HTMLCollectionOf<HTMLElement>)

        overflowBody.forEach((body)=>{
            body.style.overflow = 'hidden'
        })
        dispatch(setVisibilityAuth(bool))
    
    },[dispatch])

    const handleScrool = useCallback(()=>{
        dispatch(setCurrentPosition(window.scrollY))
        if((currentPosition > previousPosition) && (currentPosition > 100)){
            setVisibilityNavbar(false)
        }
        else{
            setVisibilityNavbar(true)
        }
        dispatch(setPreviousPosition(currentPosition))
    },[dispatch,currentPosition,previousPosition])

    useEffect(()=>{
        window.addEventListener('scroll', handleScrool)
        return () => window.removeEventListener("scroll", handleScrool); 
    },[handleScrool])

    return(
        <NavbarView setSearch={setSearch}
                    visibilityNavbar={visibilityNavbar}
                    clickAuth={clickAuth}
                    />
    )
}

export default NavbarController
