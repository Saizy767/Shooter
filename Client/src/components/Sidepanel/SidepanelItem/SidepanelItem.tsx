import { FC, useCallback, useState } from "react";
import { GoChevronDown } from "react-icons/go";
import { SidepanelCatalogType } from "../../../state/stateSidepanel";
import SidepanelSubItem from '../SidepanelSubItem/SidepanelSubItem'

import style from './SidepanelItem.module.scss'


const SidepanelItem:FC<SidepanelCatalogType>= (ingredient) => {
    const [SubItem, setSubItem] = useState(false)

    const handleArrowClick= useCallback((id:number)=>{
        setSubItem(!SubItem)
    },[SubItem])

    return(
        <div className={style.Category} key={ingredient.id}>
                <label className={style.Category_name}>{ingredient.name}</label>
                {ingredient.items && <GoChevronDown type='button' className={style.Category_arrow}
                                                          onClick={()=>handleArrowClick(ingredient.id)}/>}
                <div className={style.items}>
                {SubItem && ingredient.items?.map((subIngredient)=>{
                    return(
                        <SidepanelSubItem {...subIngredient} key={subIngredient.id}/>
                        )
                    })}
                </div>
        </div>
    )
}

export default SidepanelItem