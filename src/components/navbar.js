import React from 'react'
import { RxHamburgerMenu } from "react-icons/rx";
import { FaYoutube } from "react-icons/fa6";
import { IoSearchOutline } from "react-icons/io5";
import { FaMicrophone } from "react-icons/fa";
import { RiVideoAddLine } from "react-icons/ri";
import { BsBell } from "react-icons/bs";
import { useLocation, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../hooks/useDispatch';
import { changeSearchTerm, clearVideos } from '../features/youtube/youtubeSlice';
import { getSearchPageVideos } from '../store/reducers/getSearchPageVideos';

export default function Navbar() {
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const searchTerm = useAppSelector((state) => state.youtubeSlice.searchTerm);

    const handleSearch = () => {
        if (location.pathname !== "/search") navigate("/search");
        else {
            dispatch(clearVideos);
            dispatch(getSearchPageVideos(false));
        }
    }
    // const changeSearchTerm = () => {
    //     if (location.pathname !== "/search") navigate("/search");
    //     else {
    //         dispatch(clearVideos);
    //         dispatch(getSearchPageVideos(false));
    //     }
    // }

    return (
        <div className='flex justify-between px-14 h-14 items-center bg-[#212121] opacity-95 sticky'>
            <div className='flex gap-8 items-center text-2xl'>
                <div>
                    <RxHamburgerMenu />
                </div>
                <div className='flex gap-2 items-center justify-center'><FaYoutube className='text-3xl text-red-500' />
                    <span className='text-2xl font-bold'>Youtube</span>
                </div>
            </div>
            <div className='flex items-center justify-center gap-5'>
                <form onSubmit={(e) => {
                    e.preventDefault();
                    handleSearch();
                }}>
                    <div className='flex bg-zinc-900 items-center px-4 pr-2 rounded-3xl'>
                        <div className='flex items-center justify-center pr-5 gap-5'>
                            <input type="text" placeholder='Search' className='w-96 bg-zinc-900 focus:outline-none border-none' value={searchTerm} onChange={e => dispatch(changeSearchTerm(e.target.value))} />

                        </div>
                        <button className='h-10 w-16 flex items-center justify-center bg-zinc-800 rounded-r-3xl'>
                            <IoSearchOutline className='text-xl' />
                        </button>
                    </div>
                </form>
                <div className='text-xl p-3 bg-zinc-800 rounded-full'>
                    <FaMicrophone />
                </div>
            </div>
            <div className='flex gap-8 items-center text-xl'>
                <RiVideoAddLine />
                <div className='relative'>
                    <BsBell />
                    <span className='absolute bottom-2 left-2 bg-red-600 rounded-full px-1'>9+</span>
                </div>
                <img src="https://t4.ftcdn.net/jpg/03/75/38/73/360_F_375387396_wSJM4Zm0kIRoG7Ej8rmkXot9gN69H4u4.jpg" alt="profile logo" className='w-9 h-9 rounded-full'></img>
            </div>
        </div>
    )
}
