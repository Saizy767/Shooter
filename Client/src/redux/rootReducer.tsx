import { combineReducers } from "redux";
import { configureStore } from '@reduxjs/toolkit';

import navbarSlice from "./reducers/navbarReducer";
import screenSlice from "./reducers/screenReducer";
import searchSlice from "./reducers/searchReducer";
import homeMenuBlogSlice from './reducers/homeMenuBlogReducer'
import BlogEmotionSlice from "./reducers/EmotionRowReducer";
import authSlice from "./reducers/AuthReducer";
import registrateSlice from "./reducers/RegistrateReduce";


const rootReducer = combineReducers({
    Navbar: navbarSlice.reducer,
    Screen: screenSlice.reducer,
    Search: searchSlice.reducer,
    HomeMenuBlog:homeMenuBlogSlice.reducer,
    EmotionRow:BlogEmotionSlice.reducer,
    Auth: authSlice.reducer,
    Registrate: registrateSlice.reducer
})

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware({
            serializableCheck: false,
        }),
    })
}

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']

export default rootReducer