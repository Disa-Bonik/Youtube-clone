import React from 'react';

const ChatMessage = ({ name, message }) => {
  return (
    <div className="flex items-center shadow-sm p-2">
        <img
                className="h-6 rounded-full"
                alt="user"
                src="https://tse2.mm.bing.net/th/id/OIP.fqSvfYQB0rQ-6EG_oqvonQHaHa?pid=Api&P=0&h=180"
            />
            <span className="font-bold px-2">{name}</span>
            <span className="text-sm">{message}</span>    
    </div>
  );
};

export default ChatMessage;