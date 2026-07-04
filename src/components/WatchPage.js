import React from "react";
import { useSearchParams } from "react-router-dom";
import CommentsContainer from "./CommentsContainer";
import VideoInfo from "./VideoInfo";
import LiveChat from "./LiveChat";

const WatchPage = () => {
  const [searchParams] = useSearchParams();

  return (
    <div className="px-5 py-2">
      <div className="flex gap-6">
        {/* Left Side */}
        <div className="flex-1 min-w-0">
          <iframe
            className="w-full aspect-video rounded-xl"
            src={"https://www.youtube.com/embed/" + searchParams.get("v")}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>

          <VideoInfo />
          <CommentsContainer />
        </div>

        {/* Right Side */}
        <div className="hidden lg:block w-[400px] flex-shrink-0">
          <LiveChat />
        </div>
      </div>
    </div>
  );
};

export default WatchPage;