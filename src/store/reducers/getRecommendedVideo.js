import {createAsyncThunk}  from "@reduxjs/toolkit";
import axios from 'axios';
import {parseRecommendedData} from '../../utils/parseRecommendedData';


const API_KEY = process.env.REACT_APP_YOUTUBE_DATA_API_KEY;
const BASEURL = "https://www.googleapis.com/youtube/v3/";

export const getRecommendedVideo = createAsyncThunk(
    "youtube/App/getRecommendedVideo",
    async (videoId, { getState }) => {
      try {
       const { youtubeSlice : { currentPlaying :{channelInfo: {id:channelId}}}} = getState();

        const response = await axios.get(
          `${BASEURL}key=activities?${API_KEY}&channelId=${channelId}&part=snippet,contentDetails&maxResults=20&type=videoId${videoId}`
        );
        
        // console.log(response.data.items);
  
        const items = response.data.items;
  
        const parsedData = await parseRecommendedData(items);
  
        return {parsedData}

      } catch (error) {
        console.error("Error fetching YouTube videos:", error);
        return Promise.reject(error);
      }
    }
)