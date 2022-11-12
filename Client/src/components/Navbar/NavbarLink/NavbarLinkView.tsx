import { FC } from "react"
import { Link } from "react-router-dom"
import { LinkType } from "../../../redux/reducers/navbarReducer"
import style from "./NavbarLink.module.scss"

type NavbarLink={
    directionUnderline: boolean,
    linkObject: LinkType[],
    checkDirectionUnderline:(obj:LinkType) => void,
}

const NavbarLinkView:FC<NavbarLink> = ({linkObject, directionUnderline, checkDirectionUnderline}) =>{
    return(
        <div className={style.NavLinks}>
                {linkObject.map((link)=>
                    <Link className={style.NavLinks_text + ' ' 
                                    + (directionUnderline ? style.underline_rigth : style.underline_left)} 
                       style={{color:link.color}}
                       to={link.href}
                       onMouseEnter={()=>checkDirectionUnderline(link)}
                       key={link.id}>{link.name}
                    </Link>
                )}
         </div>
    )
}
export default NavbarLinkView