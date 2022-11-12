import Logo from '../../Images/Log.svg'
import style from "./Navbar.module.scss"
import {HiLockClosed} from 'react-icons/hi'
import {GoSearch} from 'react-icons/go'
import NavbarLinkController from './NavbarLink/NavbarLinkContainer'
import { Link } from 'react-router-dom'
import { HomeHref } from '../../href/href'
import { FC } from 'react'

type NavbarProps = {
    setSearch:(bool: boolean) => void,
    clickAuth:(bool: boolean) => void,
    visibilityNavbar: boolean
}
const NavbarView:FC<NavbarProps> = ({ setSearch, visibilityNavbar, clickAuth}) =>{
    return(
        <nav className={visibilityNavbar ? style.Navbar_out : style.Navbar_in}>
            <div className={style.Navbar_items}>
                <Link to={HomeHref.href}>
                    <img src={Logo} alt='logo' className={style.Navbar_logo}></img>
                </Link>
                <NavbarLinkController/>
                <HiLockClosed className={style.Navbar_user} 
                              onClick={()=>clickAuth(true)}/> 
                <GoSearch className={style.Navbar_search} 
                          onClick={()=>setSearch(true)}/>
            </div>
        </nav>
    )
}

export default NavbarView