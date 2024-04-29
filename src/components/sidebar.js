import React from 'react'
import {GoHomeFill} from "react-icons/go";
import { SiYoutubeshorts } from "react-icons/si";
import { 
    MdOutlineSubscriptions ,
    MdOutlineVideoLibrary,
    MdHistory,
    MdWatchLater
 } from "react-icons/md";
 import { PiThumbsUpDuotone } from "react-icons/pi";

export default function Sidebar() {
    const mainLinks = [
        {
            icon : <GoHomeFill className='text-xl'/>,
            name: 'Home'
        },
        {
            icon : <SiYoutubeshorts className='text-xl'/>,
            name: 'Shorts'
        },
        {
            icon : <MdOutlineSubscriptions className='text-xl' />,
            name : 'Subscription'
        }
    ];

    const otherLinks = [
        {
            icon : <MdOutlineVideoLibrary className='text-xl'/>,
            name: 'Library'
        },
        {
            icon:<MdHistory className='text-xl'/>,
            name: 'History'
        },
        {
            icon :<MdWatchLater className='text-xl'/>,
            name: 'Watch Later'
        },
        {
            icon:<PiThumbsUpDuotone className='text-xl'/>,
            name:'Liked Videos'

        }

    ]
  return (
    <div className='w-2/12 bg-[#212121] p-2 pr-5 overflow-auto pb-8 h-screen'>
        <ul className='flex flex-col border-b-2 border-gray-700'>
            {mainLinks.map(({icon, name}) => {
                return(
                    <li key={name} className={`pl-6 py-3 hover:bg-zinc-600 ${name === "Home"? "bg-slate-600" : " "} rounded-xl`}>
                        <a href='#' className='flex items-center gap-5'>
                            {icon}
                            <span className='text-sm tracking-wider'>{name}</span>
                        </a>
                    </li>
                )
            })}

        </ul>
        <ul className='flex flex-col border-b-1 border-gray-800'>
            {otherLinks.map(({icon, name}) => {
                return(
                    <li key={name} className={`pl-6 py-3 hover:bg-zinc-600 ${name === "Home"? "bg-slate-600" : " "}`}>
                        <a href='#' className='flex items-center gap-5'>
                            {icon}
                            <span className='text-sm tracking-wider'>{name}</span>
                        </a>
                    </li>
                )
            })}

        </ul>
    </div>
  )
}