import axios from 'axios';
import {parsedVideoDuration} from "./parsedVideoDuration";
import {convertRawtoString } from "./convertRawtoString";
import {timeSince} from './timeSince';
const API_KEY = process.env.REACT_APP_YOUTUBE_DATA_API_KEY;
const BASEURL = "https://www.googleapis.com/youtube/v3/";
export const parseRecommendedData= async(items) => {
    console.log("Parsing Data",items);
    try {
        const videoIds = [];
        const channelIds = [];

        items.forEach(item => {
            channelIds.push(item.snippet.channelId);
            videoIds.push(item.id.videoId);
        }); 
        const {
            data: {items:channelsData},
        } =  await axios.get(`${BASEURL}channels?part=snippet,contentDetails&id=${channelIds.join(",")}&key=${API_KEY}`);
    
        const parsedChannelData = [];
        channelsData.forEach((channel) => parsedChannelData.push({
            id:channel.id,
            image:channel.snippet.thumbnails.default.url,

        }));

        const {
            data:{items:videosData},
        } = await axios.get(`${BASEURL}videos?part=contentDetails,statistics&id=${videoIds.join(",")}&key=${API_KEY}`)

        // console.log(items)
        const parsedData = [];
        items.forEach((item,index) => {
            const {image:channelImage} = parsedChannelData.find((data) =>data.id === item.snippet.channelId);
            if(channelImage){
                parsedData.push({
                    videoId : item.id.videoId,
                    videoTitle : item.snippet.title,
                    videoDescription : item.snippet.description,
                    videoThumbnail : item.snippet.thumbnails.medium.url,
                    videoLink : `https://www.youtube.com/watch?v=${item.id.videoData}`,
                    videoDuration : parsedVideoDuration(
                        videosData[index].contentDetails.duration
                    ),
                    videoViews:convertRawtoString(
                        videosData[index].statistics.viewCount
                    ),
                    videoAge: timeSince(new Date(item.snippet.publishedAt)),
                    channelInfo : {
                        id:item.snippet.channelId,
                        image:channelImage,
                        name:item.snippet.channelTitle
                    }
                })
            }
        })
    return parsedData;
    }catch(e) {
        console.log(e);
    }
}

