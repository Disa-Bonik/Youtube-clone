import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { closeMenu } from '../utils/appSlice';
import { useSearchParams } from 'react-router-dom';
import CommentsContainer from './CommentsContainer';
import LiveChat from './LiveChat';

const WatchPage = () => {
    const [searchParams ] = useSearchParams();
    console.log(searchParams.get("v"));
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(closeMenu());
    }, []);
return (
    <div className="flex flex-col w-full overflow-hidden">
        <div className="px-2 md:px-5 flex flex-col md:flex-row w-full">
            <div className="w-full">
                <iframe
                    className="w-full aspect-video"
                    src={"https://www.youtube.com/embed/" + searchParams.get("v")}
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen>
                </iframe>
            </div>
            <div className="hidden md:block md:w-96">
                <LiveChat />
            </div>
        </div>
        <CommentsContainer />
    </div>
);
};

export default WatchPage;