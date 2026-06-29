import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  const isMenuOpen = useSelector((store) => store.app.isMenuOpen);
  
  
  if(!isMenuOpen) return null;


return (
    <div className="w-48 px-2 py-1 overflow-y-auto h-screen sticky top-14">

        <ul className="mb-2">
            <li><Link to="/" className="flex px-3 py-1.5 rounded-lg text-xs font-medium hover:bg-gray-100">Home</Link></li>
            <li><span className="flex px-3 py-1.5 rounded-lg text-xs hover:bg-gray-100 cursor-pointer">Shorts</span></li>
            <li><span className="flex px-3 py-1.5 rounded-lg text-xs hover:bg-gray-100 cursor-pointer">Videos</span></li>
            <li><span className="flex px-3 py-1.5 rounded-lg text-xs hover:bg-gray-100 cursor-pointer">Live</span></li>
        </ul>

        <hr className="border-gray-200 mb-2" />

        <h2 className="text-xs font-semibold px-3 mb-1 text-gray-500 uppercase tracking-wide">Subscriptions</h2>
        <ul className="mb-2">
            {["Music", "Sports", "Gaming", "Movies"].map((item) => (
                <li key={item}>
                    <span className="flex px-3 py-1.5 rounded-lg text-xs hover:bg-gray-100 cursor-pointer">{item}</span>
                </li>
            ))}
        </ul>

        <hr className="border-gray-200 mb-2" />

        <h2 className="text-xs font-semibold px-3 mb-1 text-gray-500 uppercase tracking-wide">Watch Later</h2>
        <ul>
            {["Music", "Sports", "Gaming", "Movies"].map((item) => (
                <li key={item}>
                    <span className="flex px-3 py-1.5 rounded-lg text-xs hover:bg-gray-100 cursor-pointer">{item}</span>
                </li>
            ))}
        </ul>

    </div>
);
};

export default Sidebar;