import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { HiOutlineThumbUp, HiOutlineThumbDown, HiOutlineShare, HiOutlineDownload, HiOutlineDotsHorizontal } from 'react-icons/hi';
import { HiOutlineSparkles } from 'react-icons/hi2';
import { YOUTUBE_VIDEO_DETAILS_API, YOUTUBE_CHANNEL_API } from '../utils/constants';

// Formats numbers like YouTube: 3200 -> 3.2K, 16000 -> 16K
const formatCount = (num) => {
  const n = Number(num);
  if (!n) return "0";
  if (n >= 1000000) return (n / 1000000).toFixed(1).replace(/\.0$/, "") + "M";
  if (n >= 1000) return (n / 1000).toFixed(1).replace(/\.0$/, "") + "K";
  return n.toString();
};

const VideoInfo = () => {
  const [searchParams] = useSearchParams();
  const videoId = searchParams.get("v");

  const [video, setVideo] = useState(null);
  const [channel, setChannel] = useState(null);

  useEffect(() => {
    if (!videoId) return;
    getVideoData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [videoId]);

  const getVideoData = async () => {
    try {
      const videoRes = await fetch(YOUTUBE_VIDEO_DETAILS_API(videoId));
      const videoJson = await videoRes.json();
      const videoItem = videoJson?.items?.[0];
      setVideo(videoItem);

      const channelId = videoItem?.snippet?.channelId;
      if (channelId) {
        const channelRes = await fetch(YOUTUBE_CHANNEL_API(channelId));
        const channelJson = await channelRes.json();
        setChannel(channelJson?.items?.[0]);
      }
    } catch (err) {
      console.error("Failed to fetch video/channel data:", err);
    }
  };

  if (!video) {
    return (
      <div className="w-full mt-3 animate-pulse">
        <div className="h-5 bg-gray-200 rounded w-3/4"></div>
        <div className="h-10 bg-gray-200 rounded w-full mt-4"></div>
      </div>
    );
  }

  const title = video.snippet?.title;
  const channelTitle = video.snippet?.channelTitle;
  const channelThumbnail = channel?.snippet?.thumbnails?.default?.url;
  const subscriberCount = channel?.statistics?.subscriberCount;
  const likeCount = video.statistics?.likeCount;
  const channelInitial = channelTitle?.charAt(0)?.toUpperCase() || '?';

  return (
    <div className="w-full mt-3">
      {/* Title */}
      <h1 className="text-lg font-semibold text-black">{title}</h1>

      {/* Channel row + actions */}
      <div className="flex items-center justify-between mt-3 flex-wrap gap-3">
        {/* Channel info */}
        <div className="flex items-center gap-3">
          {channelThumbnail ? (
            <img
              src={channelThumbnail}
              alt={channelTitle}
              className="w-10 h-10 rounded-full flex-shrink-0"
            />
          ) : (
            <div className="w-10 h-10 rounded-full flex-shrink-0 flex items-center justify-center text-white text-sm font-bold bg-purple-500">
              {channelInitial}
            </div>
          )}
          <div>
            <p className="text-sm font-medium text-black">{channelTitle}</p>
            <p className="text-xs text-gray-500">
              {subscriberCount ? formatCount(subscriberCount) + " subscribers" : ""}
            </p>
          </div>
          <button className="ml-3 bg-black text-white text-sm font-medium px-4 py-2 rounded-full hover:bg-gray-800">
            Subscribe
          </button>
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-2">
          <div className="flex items-center bg-gray-100 rounded-full overflow-hidden">
            <button className="flex items-center gap-2 px-4 py-2 hover:bg-gray-200">
              <HiOutlineThumbUp className="text-lg" />
              <span className="text-sm font-medium">{formatCount(likeCount)}</span>
            </button>
            <div className="w-px h-5 bg-gray-300" />
            <button className="px-4 py-2 hover:bg-gray-200">
              <HiOutlineThumbDown className="text-lg" />
            </button>
          </div>

          <button className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-full">
            <HiOutlineShare className="text-lg" />
            <span className="text-sm font-medium">Share</span>
          </button>

          <button className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-full">
            <HiOutlineSparkles className="text-lg" />
            <span className="text-sm font-medium">Ask</span>
          </button>

          <button className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-full">
            <HiOutlineDownload className="text-lg" />
            <span className="text-sm font-medium">Download</span>
          </button>

          <button className="bg-gray-100 hover:bg-gray-200 p-2.5 rounded-full">
            <HiOutlineDotsHorizontal className="text-lg" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default VideoInfo;