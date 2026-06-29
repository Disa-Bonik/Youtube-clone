import React from 'react';

const VideoCard = ({ info }) => {
    
    const { snippet, statistics } = info;
    const { channelTitle, title, thumbnails } = snippet;
  return (
    <div className="cursor-pointer w-full mb-4">
    <img className="rounded-xl w-full aspect-video" alt="thumbnail" src={thumbnails.medium.url} />
        <div className="mt-2 px-1">
            <p className="font-medium text-sm leading-snug line-clamp-2">{title}</p>
            <p className="text-sm text-gray-500 mt-1">{channelTitle}</p>
            <p className="text-sm text-gray-500">{statistics.viewCount} views</p>
        </div>
    </div>
  );
};

export default VideoCard;