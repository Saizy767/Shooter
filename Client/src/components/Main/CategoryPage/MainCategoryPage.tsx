import { FC } from "react";
import { SidepanelCatalogType } from "../../../state/stateSidepanel";
import CategoryContentBlog from "../../CategoryBlog/CategoryBlog";
import Sidepanel from "../../Sidepanel/Sidepanel";

import style from './MainCategoryPage.module.scss'

type MainProps = {
    data: SidepanelCatalogType[]
}
const MainCategoryPage:FC<MainProps> = ({data}) => {
    return(
        <main className={style.Main}> 
            <Sidepanel Data={data}/>
            <div className={style.Main_Content}>
                {[...Array(14)].map((key, id)=>{
                    return(
                        <CategoryContentBlog key={id} />
                    )
                })}
            </div>
        </main>
    )
}

export default MainCategoryPage