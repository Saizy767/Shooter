import { FC } from "react";
import { SidepanelCatalogType } from "../../../state/stateSidepanel";
import style from './SidepanelSubItem.module.scss'

const SidepanelSubItem:FC<SidepanelCatalogType>=(subIngredient)=>{
    return(
        <div className={style.SubItem}>
            <input type='radio' className={style.SubItem_radio} />
            <label key={subIngredient.id}>{subIngredient.name}</label>
        </div>
    )
}

export default SidepanelSubItem