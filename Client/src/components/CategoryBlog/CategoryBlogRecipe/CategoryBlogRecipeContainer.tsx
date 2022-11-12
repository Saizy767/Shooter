import { FC, useCallback, useState } from "react";
import CategoryBlogRecipeView from './CategoryBlogRecipeView'

const CategoryBlogRecipe:FC = () =>{
    const [countShots,setCountShots]=useState<number>(1)
    const [isOpenBlock, setOpenBlock] = useState<boolean>(false)
    
    const handleOpenRecipe = useCallback(() =>{
        setCountShots(countShots)
        setOpenBlock(!isOpenBlock)
    },[isOpenBlock, countShots])

    const handleIncrement = useCallback(()=>{
        countShots < 6 && setCountShots(countShots+1)
    },[countShots])

    const handleDecrement = useCallback(()=>{
        countShots > 1 &&setCountShots(countShots-1)
    },[countShots])

    return(<CategoryBlogRecipeView countShots={countShots} 
                                   handleOpenRecipe={handleOpenRecipe} 
                                   isOpenBlock={isOpenBlock}
                                   handleIncrement={handleIncrement}
                                   handleDecrement={handleDecrement}
                                   />)
}

export default CategoryBlogRecipe