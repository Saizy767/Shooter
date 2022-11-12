import { FC } from "react";
import Banner from "../Banners/Banner";

import style from './ContentBlog.module.scss'
import styleForBanner from '../Banners/Banner.module.scss'

const ContentBlog:FC= () =>{
    return(
        <div className={style.Content_blog}>
                <Banner content={[]} styleBanner={styleForBanner.BannerOne}/>
                <Banner content={[]} styleBanner={styleForBanner.BannerTwo}/>
                <Banner content={[]} styleBanner={styleForBanner.BannerThree}/>
                <Banner content={[]} styleBanner={styleForBanner.BannerFour}/>
            </div>
    )
}

export default ContentBlog