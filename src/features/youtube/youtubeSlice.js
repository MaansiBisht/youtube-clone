import { createSlice } from "@reduxjs/toolkit";
import { getHomePageVideos } from "../../store/reducers/getHomePageVideos";
import { getSearchPageVideos } from "../../store/reducers/getSearchPageVideos";
import { getRecommendedVideo } from "../../store/reducers/getRecommendedVideo";
import { getVideoDetails } from "../../store/reducers/getVideoDetails";

const initialState = {
    videos: [], 
    currentPlaying: null,
    searchTerm: "",
    nextPageToken: null,
    searchResults: [],
    recommendedVideo:[]
}

const youtubeSlice = createSlice({
    name:"youtubeApp",
    initialState,
    reducers:{
      clearVideos:(state)=>{
        state.videos = []
        state.nextPageToken =null
      },
      changeSearchTerm:(state,action)=>{
        state.searchTerm = action.payload;
      },
      clearSearchTerm:(state) => {
        state.searchTerm = "";
      }
    },
    extraReducers: (builder) => {
        builder.addCase(getHomePageVideos.fulfilled, (state, action) => {
          if(action.payload && action.payload.parsedData) {
            state.videos = [...state.videos, ...action.payload.parsedData]; // Concatenate new videos
            state.nextPageToken = action.payload.nextPageToken; // Update nextPageToken
          }
        });
        builder.addCase(getSearchPageVideos.fulfilled, (state, action) => {
          if(action.payload && action.payload.parsedData) {
            state.videos = [...state.videos, ...action.payload.parsedData]; 
            state.nextPageToken = action.payload.nextPageToken;
          }
        });
        builder.addCase(getRecommendedVideo.fulfilled, (state, action) => {
          if(action.payload && action.payload.parsedData) {
            state.recommendedVideo = action.payload.parsedData
          }
        });
        builder.addCase(getVideoDetails.fulfilled, (state, action) => {
          if(action.payload && action.payload.parsedData) {
            state.currentPlaying = action.payload.currentPlaying;
          }
        });
      },
})
export const {clearVideos , changeSearchTerm , clearSearchTerm} = youtubeSlice.actions;
export default youtubeSlice.reducer;