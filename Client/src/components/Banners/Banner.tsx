import { FC } from "react";
import {BlogContent} from '../Main/HomePage/MainHomePage'
import style from './Banner.module.scss'

type PropsBanner = {
    styleBanner: string; 
    content: BlogContent[];
}

const Banners:FC<PropsBanner> = ({content,styleBanner})=>{
    return(
        <div className={style.Banner + ' ' + styleBanner}>
        </div>
    )
}

export default Banners