import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleMenu } from '../utils/appSlice';
import { YOUTUBE_SEARCH_API } from '../utils/constants';
import { cacheResults } from '../utils/searchSlice';
import { HiMenu } from 'react-icons/hi';
import { FiSearch, FiMic, FiPlus } from 'react-icons/fi';
import { IoNotificationsOutline } from 'react-icons/io5';

const Head = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);

    const searchCache = useSelector((store) => store.search);
    const dispatch = useDispatch();

    useEffect(() => {
        const timer = setTimeout(() => {
            if (searchCache[searchQuery]) {
                setSuggestions(searchCache[searchQuery]);
            } else {
                getEsarchSuggestions();
            }
        }, 200);

        return () => {
            clearTimeout(timer);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchQuery]);

    const getEsarchSuggestions = async () => {
        try {
            const data = await fetch(YOUTUBE_SEARCH_API + searchQuery);
            if (!data.ok) throw new Error("Search API failed with status " + data.status);
            const json = await data.json();
            const results = json[1] || [];
            setSuggestions(results);

            dispatch(
                cacheResults({
                    [searchQuery]: results,
                })
            );
        } catch (err) {
            console.error("Search suggestions failed:", err);
            setSuggestions([]);
        }
    };

    const toggleMenuHandler = () => {
        dispatch(toggleMenu());
    };

    return (
        <div className="flex items-center justify-between px-2 md:px-4 py-2 fixed top-0 left-0 right-0 bg-white z-10">

            {/* Left - Hamburger + Logo */}
            <div className="flex items-center gap-2 w-auto md:w-[200px]">
                <HiMenu
                    onClick={() => toggleMenuHandler()}
                    className="h-6 w-6 cursor-pointer p-0.5 rounded-full hover:bg-gray-100"
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
            <div className="hidden md:flex items-center gap-3 flex-1 max-w-[600px] relative">
                <div className="flex w-full">
                    <input
                        className="w-full px-4 py-1.5 text-sm border border-gray-300 rounded-l-full focus:outline-none focus:border-blue-500"
                        type="text"
                        placeholder="Search"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onFocus={() => setShowSuggestions(true)}
                        onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                    />
                    <button className="px-4 py-1.5 border border-l-0 border-gray-300 rounded-r-full bg-gray-100 hover:bg-gray-200">
                        <FiSearch className="h-4 w-4 text-gray-700" />
                    </button>
                </div>
                <button className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 shrink-0">
                    <FiMic className="h-4 w-4 text-gray-700" />
                </button>

                {showSuggestions && suggestions.length > 0 && (
                    <div className="absolute top-[42px] bg-white shadow-xl rounded-xl border border-gray-200 w-[600px] py-2 z-20">
                        <ul>
                            {suggestions.map((s) => (
                                <li key={s} className="flex items-center gap-3 px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer">
                                    <FiSearch className="h-4 w-4 text-gray-400" />
                                    {s}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>

            {/* Right - Create, Notifications, Avatar */}
            <div className="flex items-center justify-end gap-1 md:gap-3 w-auto md:w-[200px]">
                <button className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-gray-300 hover:bg-gray-100">
                    <FiPlus className="h-5 w-5 text-gray-800" />
                    <span className="text-sm font-medium">Create</span>
                </button>
                <button className="p-2 rounded-full hover:bg-gray-100">
                    <IoNotificationsOutline className="h-5 w-5 text-gray-800" />
                </button>
                <img
                    className="h-6 w-6 md:h-7 md:w-7 rounded-full cursor-pointer"
                    alt="user"
                    src="https://tse2.mm.bing.net/th/id/OIP.fqSvfYQB0rQ-6EG_oqvonQHaHa?pid=Api&P=0&h=180"
                />
            </div>

        </div>
    );
};

export default Head;