import { FC, useCallback, useEffect, useRef, useState } from "react";
import useHover from "../../hooks/useHover";
import { useTypedDispatch } from "../../hooks/useTypedDispatch";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { HomeMenuBlogType, setCountItems } from "../../redux/reducers/homeMenuBlogReducer";
import HomeMenuBlogView from './HomeMenuBlogView'


type HomeMenuBlogProps = {
    blog: HomeMenuBlogType,
}

const HomeMenuBlogController:FC<HomeMenuBlogProps>=({blog})=>{
    const [isOpen, setOpenMenu] = useState<boolean>(false)

    const dispatch = useTypedDispatch()

    const {countItems} = useTypedSelector((state)=>state.HomeMenuBlog)
    
    const hoverRef = useRef(null)
    const isHovered = useHover(hoverRef)

    const openMenu= useCallback(()=>{
        setOpenMenu(!isOpen)
    },[isOpen])

    useEffect(()=>{
        function checkArray(){
            if(window.innerWidth < 859){
                dispatch(setCountItems(8))
            }
            else if(window.innerWidth < 1293){
                dispatch(setCountItems(12))
            }
            else{
                dispatch(setCountItems(16))
            }
        }
        window.addEventListener("resize", checkArray)
        checkArray()
        return () => window.removeEventListener("resize", checkArray);
    },[dispatch])

    return(
        <HomeMenuBlogView name={blog.name}
                          hrefPage={blog.href}
                          isOpen={isOpen}
                          isHovered={isHovered}
                          hoverRef={hoverRef}
                          countItems={countItems}
                          setOpenMenu={openMenu}/>
    )
}

export default HomeMenuBlogController