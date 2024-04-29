import {createAsyncThunk}  from "@reduxjs/toolkit";
import axios from 'axios';
import {parsedData} from '../../utils/parsedData';

const API_KEY = process.env.REACT_APP_YOUTUBE_DATA_API_KEY;
const BASEURL = "https://www.googleapis.com/youtube/v3/";

export const getHomePageVideos = createAsyncThunk(
    "youtube/App/homePageVideos",
    async (isNext, { getState }) => {
      try {
        const state = getState();
        // console.log(state)
        const nextPageTokenFromState = state.youtubeSlice.nextPageToken;
        const videos = state.youtubeSlice.videos;
        const response = await axios.get(
          `${BASEURL}search?maxResults=20&q=cooking&key=${API_KEY}&part=snippet&type=video${isNext ? `&pageToken=${nextPageTokenFromState}` : ""}`
        );
        
        // console.log(response.data.items);
  
        const items = response.data.items;
  
        const parsedData1 = await parsedData(items);
  
        return {
          parsedData: [...videos, ...parsedData1],
          nextPageToken: nextPageTokenFromState,
        };
      } catch (error) {
        console.error("Error fetching YouTube videos:", error);
        return Promise.reject(error);
      }
    }
)