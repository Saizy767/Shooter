import { FC } from "react";
import HomeMenuItem from "./HomeMenuItem/HomeMenuItem";
import {IoIosArrowDown} from 'react-icons/io'
import { Link } from "react-router-dom";

import  style  from "./HomeMenuBlog.module.scss";


type PropsCategoryBlog={
    name: string
    hrefPage: string
    isOpen: boolean,
    isHovered:boolean,
    hoverRef: React.MutableRefObject<null>,
    countItems: number,
    setOpenMenu: ()=>void
}

const HomeMenuBlogView:FC<PropsCategoryBlog>=({name, hrefPage, isOpen,
                                               isHovered,hoverRef,countItems,
                                               setOpenMenu})=>{
    return(
        <div className={style.CategoryBlog}>
            <h1 className={style.CategoryBlog_title}>
                <span className={style.CategoryBlog_name}>{name}</span>
            </h1>
            <div className={style.CategoryBlog_table + ' ' 
                            + (isOpen ? style.CategoryBlog_open : style.CategoryBlog_close)}>
                {[...Array(countItems)].map((key, id)=>{
                    return (
                        <HomeMenuItem key={id}/>
                    )
                })}
            </div>
            {isOpen ?
                <div className={style.CategoryBlog_more}>
                    <div
                        className={isHovered ? '' : style.underline}
                        ref={hoverRef}
                        >
                        <Link to={hrefPage}>
                            <span className={style.CategoryBlog_more_link}>Look more</span>
                        </Link>
                    </div> 
                </div>
                : ''}
            
            <div className={style.Arrow + ' ' +(isOpen ? style.Arrow_open : '')}>
                <IoIosArrowDown className={style.Arrow_icon} onClick={()=>setOpenMenu()}/> 
            </div>
        </div>
    )
}

export default HomeMenuBlogView