import { FC } from 'react'
import {IoClose} from 'react-icons/io5'

import style from './SearchBar.module.scss'

type SeatchBarProps={
    visibilitySearch: boolean,
    setVisibilitySearch: (bool:boolean)=>void
}

const SearchBarView:FC<SeatchBarProps> = ({visibilitySearch, setVisibilitySearch}) =>{
    return(
        <div className={style.SearchBar + ' ' 
                        + (visibilitySearch ? style.SearchBar_active : style.SearchBar_disactive)}>
            <div className={style.SearchBar_items}>
                <input 
                    className={style.SearchBar_input}
                    placeholder={'Search'}
                    type='text'
                ></input>
                <IoClose 
                    className={style.SearchBar_close}
                    onClick={()=>setVisibilitySearch(false)}
                />
                <button className={style.SearchBar_button}>
                    <span>Search</span>
                </button>
            </div>
        </div>
    )
}

export default SearchBarView