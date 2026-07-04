import React from 'react';
import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { MdHome, MdLiveTv, MdOndemandVideo } from 'react-icons/md';
import { SiYoutubeshorts } from 'react-icons/si';

const Sidebar = () => {
  const isMenuOpen = useSelector((store) => store.app.isMenuOpen);
  const location = useLocation();

  if (!isMenuOpen) return null;

  const isHomeActive = location.pathname === '/';

  return (
      <div className="hidden md:block w-56 flex-shrink-0 px-3 py-3 overflow-y-auto h-screen sticky top-14">

      <ul className="mb-3">
        <li>
          <Link
            to="/"
            className={`flex items-center gap-4 px-3 py-2.5 rounded-lg text-sm ${
              isHomeActive ? 'bg-gray-100 font-semibold' : 'font-medium hover:bg-gray-100'
            }`}
          >
            <MdHome className="text-xl" /> Home
          </Link>
        </li>
        <li>
          <span className="flex items-center gap-4 px-3 py-2.5 rounded-lg text-sm hover:bg-gray-100 cursor-pointer">
            <SiYoutubeshorts className="text-xl" /> Shorts
          </span>
        </li>
        <li>
        <span className="flex items-center gap-4 px-3 py-2.5 rounded-lg text-sm hover:bg-gray-100 cursor-pointer">
        <span className="text-xl text-black">▶</span>
        Subscriptions
        </span>
       </li>
        <li>
          <span className="flex items-center gap-4 px-3 py-2.5 rounded-lg text-sm hover:bg-gray-100 cursor-pointer">
            <MdLiveTv className="text-xl" /> Live
          </span>
        </li>
      </ul>

      <hr className="border-gray-200 mb-3" />

      <h2 className="text-sm font-semibold px-3 mb-1 text-gray-900">Subscriptions</h2>
      <ul className="mb-3">
        {["Music", "Sports", "Gaming", "Movies"].map((item) => (
          <li key={item}>
            <span className="flex items-center gap-4 px-3 py-2 rounded-lg text-sm hover:bg-gray-100 cursor-pointer">
              <MdOndemandVideo className="text-lg text-gray-500" /> {item}
            </span>
          </li>
        ))}
      </ul>

      <hr className="border-gray-200 mb-3" />

      <h2 className="text-sm font-semibold px-3 mb-1 text-gray-900">Watch Later</h2>
      <ul>
        {["Music", "Sports", "Gaming", "Movies"].map((item) => (
          <li key={item}>
            <span className="flex items-center gap-4 px-3 py-2 rounded-lg text-sm hover:bg-gray-100 cursor-pointer">
              <MdOndemandVideo className="text-lg text-gray-500" /> {item}
            </span>
          </li>
        ))}
      </ul>

    </div>
  );
};

export default Sidebar;