import { FC } from "react";
import { useTypedSelector } from "../../../hooks/useTypedSelector";
import HomeMenuBlogContainer from "../../HomeMenuBlog/HomeMenuBlogContainer";
import ContentBlog from "../../HomeContentBlog/ContentBlog";

import style from './MainHomePage.module.scss'

export type BlogContent = {
    img: string;
    href: string;
    id: number;
    position: number;
}

const Main:FC=()=>{
    const {blogsObject} =  useTypedSelector((state)=>state.HomeMenuBlog)

    return (
            <main className={style.Main}>
                <ContentBlog/>
                {blogsObject.map((blog)=>{
                    return(
                        <HomeMenuBlogContainer blog={blog} key={blog.id}/>
                    )
                })}
            </main>
    )
}

export default Main