import { createSlice } from "@reduxjs/toolkit"
import { AiOutlineEye, AiOutlineLike } from "react-icons/ai"
import { IoBookmarksOutline } from "react-icons/io5"


type Emotion = {
    count: number,
    jsx: JSX.Element,
    id: number,
}
type EmotionBlog = {
    liked: Emotion,
    saved: Emotion,
    watched: Emotion,
}

const initialState: EmotionBlog = {
    liked: {count:0, jsx: <AiOutlineLike/>, id:1},
    saved: {count:0, jsx: <IoBookmarksOutline/>, id:2},
    watched: {count:0,jsx: <AiOutlineEye/>, id:3},
}

const BlogEmotionSlice = createSlice({
    name: 'blogEmotionSlice',
    initialState,
    reducers:{
    }
}
)

export default BlogEmotionSlice