import React, { useEffect, useState } from 'react';
import ChatMessage from './ChatMessage';
import { useDispatch, useSelector } from 'react-redux';
import { addMessage } from '../utils/chatSlice';
import { generateRandomName, makeRandomMessage } from '../utils/helper';
import { MdOutlineEmojiEmotions } from 'react-icons/md';
import { HiOutlineDotsVertical } from 'react-icons/hi';

const LiveChat = () => {
    const [liveMessage, setLiveMessage] = useState("");

    const dispatch = useDispatch();

    const chatMessages = useSelector((store) => store.chat.messages);

    useEffect(() => {
        // API Polling

        const i =setInterval(() => {
            dispatch(addMessage({
                name: generateRandomName(),
                message: makeRandomMessage(20),
            })
        );
        }, 2000);

        return () => clearInterval(i);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


  return (
    <div className="w-full h-[506px] ml-2 border border-gray-300 rounded-xl overflow-hidden flex flex-col bg-white">
        {/* Header */}
        <div className="flex items-center justify-between px-3 py-2.5 border-b border-gray-200 shrink-0">
            <span className="font-semibold text-base">Live chat</span>
            <HiOutlineDotsVertical className="text-xl cursor-pointer text-gray-700" />
        </div>

        {/* Messages */}
        <div className="w-full flex-1 py-2 overflow-y-auto flex flex-col-reverse">
            <div>
            {
                chatMessages.map((c, i) => (
                    <ChatMessage key={i} name={c.name} message={c.message} />
                ))
            }
            </div>
        </div>

        {/* Input */}
        <form
            className="w-full flex items-center gap-2 px-3 py-2 border-t border-gray-200 shrink-0"
            onSubmit={(e) => {
                e.preventDefault();
                if (!liveMessage.trim()) return;
                dispatch (
                    addMessage({
                        name: "Disha Bonik",
                        message: liveMessage,
                    })
                );
                setLiveMessage("");
            }}
        >
            <MdOutlineEmojiEmotions className="text-xl text-gray-600 shrink-0" />
            <input
                className="flex-1 min-w-0 border-b border-gray-300 focus:border-black outline-none text-sm py-1 bg-transparent"
                type="text"
                placeholder="Say something..."
                value={liveMessage}
                onChange={(e) => {
                    setLiveMessage(e.target.value);
                }}
            />
            <button
                type="submit"
                disabled={!liveMessage.trim()}
                className={`text-sm font-medium px-1 shrink-0 ${
                    liveMessage.trim() ? 'text-blue-600' : 'text-gray-300'
                }`}
            >
                Send
            </button>
        </form>
    </div>
  );
};

export default LiveChat;