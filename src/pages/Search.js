import React, { useEffect } from 'react'
import Navbar from '../components/navbar'
import Sidebar from '../components/sidebar'
import {useAppDispatch,useAppSelector} from "../hooks/useDispatch";
import { getHomePageVideos } from '../store/reducers/getHomePageVideos';
import Spinner from "../components/spinner";
import Card from '../components/Card';
import InfiniteScroll from  'react-infinite-scroll-component';
import { useNavigate } from 'react-router-dom';
import { clearVideos } from '../features/youtube/youtubeSlice';
import { getSearchPageVideos } from '../store/reducers/getSearchPageVideos';
import SearchCard from '../components/SearchCard';
export default function Search() {

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const videos = useAppSelector((state) => state.youtubeSlice.videos)
  const searchTerm = useAppSelector((state) => state.youtubeSlice.searchTerm);

  useEffect(() => {
    dispatch(clearVideos(false));
    if(searchTerm === '') navigate('/');
    else {
      dispatch(getSearchPageVideos(false))
    }
  },[dispatch, navigate ,searchTerm])

  return (
    <div className='max-h-screen overflow-auto'>
      {console.log(videos , videos.length)}
        <div style={{height:"7.5vh"}}>
        <Navbar/>
        </div>
        <div className='flex' style={{height:"92.5vh"}}>
        <Sidebar/>
        {
          videos.length  ? (
            <div className='py-8 p1-8 flex flex-col gap-5 w-full' >
            <InfiniteScroll
             dataLength = {videos.length}
             next={() => dispatch(getSearchPageVideos(true))}
             hasMore= {videos.length<500}
             loader = {<Spinner/>}
             height ={650}
            >
              <div className='my-5'>
              {videos.map((item) => {
                 return (
                  <div className='my-5'>
                    <SearchCard data={item} key={item.videoId} />
                   </div> )
              })}
              </div>
            </InfiniteScroll>
            </div>
          ):(
            <Spinner/>
          )
        }
      </div>
    </div>
  )
}
