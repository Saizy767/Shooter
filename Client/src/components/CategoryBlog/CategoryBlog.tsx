import { FC } from "react";
import { IoBookmarksOutline } from "react-icons/io5";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import style from './CategoryBlog.module.scss'
import CategoryBlogRecipeContainer from "./CategoryBlogRecipe/CategoryBlogRecipeContainer";

const CategoryContentBlog:FC=()=>{
    const {liked,watched,saved} = useTypedSelector((state)=>state.EmotionRow)

    return(
        <div className={style.Content}>
                <div className={style.Content_image}>
                    <img alt={'Cocteil'}></img>
                </div>
                <div className={style.Content_description}>
                    <div className={style.Content_header}>
                        <h2 className={style.Content_label}>Name Coctail</h2>
                    </div>
                    <div className={style.Content_author}>
                        <span>Author: </span>
                        <span>Sedov Stepan</span>
                    </div>
                    <div className={style.Content_typeCocteil}>
                        <img alt={'type Cocteil'}/>
                    </div>
                    <CategoryBlogRecipeContainer/>
                    <div className={style.Emotion}>
                        <div className={style.Emotion_favorite}>
                            <button className={style.Emotion_button}>
                                <IoBookmarksOutline/>
                                <p>Add to Home Bar</p>
                            </button>
                        </div>
                        <div className={style.Emotion_result}>
                            {[saved,watched,liked].map((emotion)=>{
                                return(
                                    <div className={style.Emotion_ceil} key={emotion.id}>
                                        <div className={style.Emotion_icon}>
                                            {emotion.jsx}
                                        </div>
                                        <span className={style.Emotion_count}>{emotion.count}</span>
                                    </div>
                                )
                            })} 
                        </div>
                    </div>
                </div>
        </div>
    )
}

export default CategoryContentBlog