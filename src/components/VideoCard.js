import React from 'react';

const VideoCard = ({ info }) => {
    
    const { snippet, statistics } = info;
    const { channelTitle, title, thumbnails } = snippet;
  return (
    <div className="cursor-pointer w-full mb-4 group">
        <div className="relative overflow-hidden rounded-xl">
            <img
                className="w-full aspect-video object-cover transition-transform duration-200 group-hover:scale-[1.02]"
                alt="thumbnail"
                src={thumbnails.medium.url}
            />
        </div>
        <div className="mt-2 px-1 flex gap-2">
            <div className="flex-shrink-0 w-9 h-9 rounded-full bg-gray-300 flex items-center justify-center text-white text-sm font-medium">
                {channelTitle?.charAt(0).toUpperCase()}
            </div>
            <div>
                <p className="font-medium text-sm leading-snug line-clamp-2 min-h-[2.5rem]">{title}</p>
                <p className="text-sm text-gray-500 mt-1">{channelTitle}</p>
                <p className="text-sm text-gray-500">{statistics.viewCount} views</p>
            </div>
        </div>
    </div>
  );
};

export default VideoCard;