import React, { cache, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleMenu } from '../utils/appSlice';
import { YOUTUBE_SEARCH_API } from '../utils/constants';
import { cacheResults } from '../utils/searchSlice';

const Head = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);

    const searchCache = useSelector((store) => store.search);
    const dispatch = useDispatch();

    useEffect(() => {
        const timer = setTimeout(() => {
            if(searchCache[searchQuery]) {
                setSuggestions(searchCache[searchQuery]);
            } else {
                getEsarchSuggestions()
            }

        }, 200);

        return () => {
            clearTimeout(timer);
        };
    }, [searchQuery]);

    const getEsarchSuggestions = async () => {
        const data = await fetch(YOUTUBE_SEARCH_API + searchQuery);
        const json = await data.json();
        setSuggestions(json[1]);

        // update cache
        dispatch(
            cacheResults({
            [searchQuery] : json[1],
        }));
    };


    
    const toggleMenuHandler = () => {
        dispatch (toggleMenu());
    };

return (
    <div className="flex items-center justify-between px-2 md:px-4 py-2 fixed top-0 left-0 right-0 bg-white z-10">
        
        {/* Left - Hamburger + Logo */}
        <div className="flex items-center gap-2 w-auto  md:w-[200px]">
            <img
                onClick={() => toggleMenuHandler()}
                className="h-8 w-8 cursor-pointer p-1 rounded-full hover:bg-gray-100"
                alt="menu"
                src="https://cdn2.iconfinder.com/data/icons/most-useful-icons-4/50/HAMBURGER_MENU-512.png"
            />
            <a href="/">
                <img
                    className="h-7 w-24 md:h-6 md:w-32 ml-1 pr-9"
                    alt="youtube-logo"
                    src="https://www.logo.wine/a/logo/YouTube/YouTube-Logo.wine.svg"
                />
            </a>
        </div>

        {/* Center - Search */}
        <div className="hidden md:flex flex-col items-center flex-1 max-w-[600px]">
            <div className="flex w-full">
                <input
                    className="w-full px-4 py-2 text-sm border border-gray-300 rounded-l-full focus:outline-none focus:border-blue-500"
                    type="text"
                    placeholder="Search"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onFocus={() => setShowSuggestions(true)}
                    onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                />
                <button className="px-5 py-2 border border-l-0 border-gray-300 rounded-r-full bg-gray-100 hover:bg-gray-200">
                    <img className="h-5 w-5 object-contain" alt="search" src="https://upload.wikimedia.org/wikipedia/commons/5/55/Magnifying_glass_icon.svg" />
                </button>
            </div>

            {showSuggestions && suggestions.length > 0 && (
                <div className="absolute top-[52px] bg-white shadow-xl rounded-xl border border-gray-200 w-[600px] py-2 z-20">
                    <ul>
                        {suggestions.map((s) => (
                            <li key={s} className="flex items-center gap-3 px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer">
                                <img className="h-4 w-4 opacity-40" src="https://upload.wikimedia.org/wikipedia/commons/5/55/Magnifying_glass_icon.svg" alt="" />
                                {s}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>

        {/* Right - User Avatar */}
        <div className="flex items-center justify-end w-auto  md:w-[200px]">
            <img
                className="h-6 w-6 md:h-8 md:w-8 rounded-full cursor-pointer"
                alt="user"
                src="https://tse2.mm.bing.net/th/id/OIP.fqSvfYQB0rQ-6EG_oqvonQHaHa?pid=Api&P=0&h=180"
            />
        </div>

    </div>
);
};

export default Head;