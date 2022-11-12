import { FC } from "react"
import { stateSidepael } from "../state/stateSidepanel"
import MainCategoryPage from "../components/Main/CategoryPage/MainCategoryPage"

import UniPage from "./UniPage"

const NonAlcoholicCategoryPage:FC=()=>{
    return(
        <UniPage>
            <MainCategoryPage data={stateSidepael.non_alcohol}/>
        </UniPage>
    )
}

export default NonAlcoholicCategoryPage