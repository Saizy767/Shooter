import { FC } from "react"
import { stateSidepael } from "../state/stateSidepanel"
import MainCategoryPage from "../components/Main/CategoryPage/MainCategoryPage"

import UniPage from "./UniPage"

const AlcoholicCategoryPage:FC=()=>{
    return(
        <UniPage>
            <MainCategoryPage data = {stateSidepael.alcohol}/>
        </UniPage>  
    )
}

export default AlcoholicCategoryPage