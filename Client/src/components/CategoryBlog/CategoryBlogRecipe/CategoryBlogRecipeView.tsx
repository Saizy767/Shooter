import { FC} from "react";
import { GoChevronDown } from "react-icons/go";
import style from './CategoryBlogRecipe.module.scss'

type RecipeBlogProps = {
    handleOpenRecipe: () => void,
    handleIncrement: () => void,
    handleDecrement: () => void,
    countShots: number,
    isOpenBlock: boolean
}
const CategoryBlogRecipeView:FC<RecipeBlogProps> = ({handleOpenRecipe, countShots, isOpenBlock,
                                                     handleIncrement,handleDecrement}) =>{
        return(
        <div className={style.Recipe}>
            <div className={style.Recipe_main}>
                <span>3 resipe</span> 
                <GoChevronDown className={style.Recipe_arrow} onClick={handleOpenRecipe}/>
            </div>
            {isOpenBlock && 
                <div className={style.Recipe_block}>
                    <div className={style.Recipe_header}>
                        <div className={style.Recipe_countBlock}>
                            <button className={style.Recipe_button} onClick={handleDecrement}>-</button>
                                <span className={style.Recipe_counter}>{countShots}</span>
                            <button className={style.Recipe_button} onClick={handleIncrement}>+</button>
                        </div>
                    </div>
                    <div className={style.Recipe_body}>
                        {[...Array(5)].map((_,id)=>{
                            return(
                                <div key={id} className={style.Recipe_row}>
                                    <span className={style.Recipe_ingredient}>Recipe</span>
                                    <span className={style.Recipe_line}/>
                                    <span className={style.Recipe_gramm}>400gr</span>
                                </div>
                            )
                        })}
                    </div>
                </div>
            }   
        </div>
    )
}

export default CategoryBlogRecipeView