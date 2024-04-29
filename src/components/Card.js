import React from 'react'
import { Link } from 'react-router-dom'

function Card({data}) {
  return (
    <div className='w-64 h-60 flex gap-3 flex-col'>
        <div className='relative'>
            <span className='absolute bottom-3 right-3 text-sm bg-gray-900 py-2 px-0.5 z-10'>
                {data.videoDuration}
            </span>
            <Link to = {`/watch/${data.videoId}`}>
                <img src={data.videoThumbnail} alt="Thumbnail" className='h-44 w-72'/>
            </Link>    
            <div className='flex gap-2'>
                <div className='min-w-fit'>
                    <a href='#'><img src={data.channelInfo.image}  alt="channel img"  className='h-9 w-9 rounded-full'/>
                    </a>
                </div>
                <div className=''>
                    <h3>
                        <a href='#' className='line-clamp-2'>{data.videotitle}</a>
                    </h3>
                    <div className='text-sm text-gray-400'>
                        <div>
                            <a href="#" className='hover:text-white'>{data.channelInfo.name}</a>
                        </div>
                        <div>
                            <span className="after:contents-['*'] after:mx-1">
                                {data.videoViews} views
                            </span>
                            <span>
                                {data.videoAge}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>
  )
}
export default Card;