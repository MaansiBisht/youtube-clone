import { configureStore } from "@reduxjs/toolkit";
import youtubeReducer from "../features/youtube/youtubeSlice";

const store = configureStore({
    reducer:{
        youtubeSlice:youtubeReducer,
    }
});

export default store;