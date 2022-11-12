import { FC } from 'react'
import SidepanelItem from './SidepanelItem/SidepanelItem';

import style from './Sidepanel.module.scss'
import { SidepanelCatalogType} from '../../state/stateSidepanel'

type SidepanelProps = {
    Data : SidepanelCatalogType[]
}

const Sidepanel:FC<SidepanelProps> = ({Data}) => {
    return(
        <aside className={style.Catalog}>
            <h1 className={style.Catalog_title}>Ingredients</h1>
                {Data.map((ingredient)=>{
                    return(
                        <SidepanelItem {...ingredient} key={ingredient.id}/>
                    )
                })}
            <button className={style.Catalog_ClearButton}>
                <span>
                    Clear filters
                </span>
            </button>
        </aside>
    )
}

export default Sidepanel