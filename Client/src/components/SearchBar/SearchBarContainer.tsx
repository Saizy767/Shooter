import { FC, useCallback } from "react";
import { useTypedDispatch } from "../../hooks/useTypedDispatch";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { setVisibilitySearch } from "../../redux/reducers/searchReducer";
import SearchBarView from "./SearchBarView";

const SearchBarController:FC=()=>{
    const dispatch = useTypedDispatch()

    const {visibilitySearch} = useTypedSelector((state)=>state.Search)

    const setVisibleSearch=useCallback((bool:boolean)=>{
        dispatch(setVisibilitySearch(bool))
    },[dispatch])
    return(
        <SearchBarView visibilitySearch={visibilitySearch} setVisibilitySearch={setVisibleSearch}/>
    )
}

export default SearchBarController