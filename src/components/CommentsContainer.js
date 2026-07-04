import React, { useState } from 'react';
import { HiOutlineThumbUp, HiOutlineThumbDown, HiChevronDown, HiChevronUp } from 'react-icons/hi';
import { MdSort } from 'react-icons/md';

const commentsData = [
    {
        name: "Disha Bonik",
        text: "loren ipsum dolor sit amet, consectrtur adip",
        time: "2 days ago",
        likes: 245,
        replies: []
    },
    {
        name: "Disha Bonik",
        text: "loren ipsum dolor sit amet, consectrtur adip",
        time: "1 day ago",
        likes: 3200,
        replies: [
            {
                name: "Disha Bonik",
                text: "Lorem ipsum dolor sit amet, consectetur adip",
                time: "20 hours ago",
                likes: 12,
            },
            {
                name: "Disha Bonik",
                text: "Lorem ipsum dolor sit amet, consectetur adip",
                time: "18 hours ago",
                likes: 4,
            },
            {
                name: "Disha Bonik",
                text: "loren ipsum dolor sit amet, consectrtur adip",
                time: "10 hours ago",
                likes: 1,
            },
        ],
    },
    {
        name: "Disha Bonik",
        text: "loren ipsum dolor sit amet, consectrtur adip",
        time: "5 hours ago",
        likes: 16000,
        replies: [],
    },
    {
        name: "Disha Bonik",
        text: "loren ipsum dolor sit amet, consectrtur adip",
        time: "3 hours ago",
        likes: 89,
        replies: []
    },
    {
        name: "Disha Bonik",
        text: "loren ipsum dolor sit amet, consectrtur adip",
        time: "1 hour ago",
        likes: 5,
        replies: []
    },
    {
        name: "Disha Bonik",
        text: "loren ipsum dolor sit amet, consectrtur adip",
        time: "30 minutes ago",
        likes: 0,
        replies: []
    },
];

// Formats numbers like YouTube: 3200 -> 3.2K, 16000 -> 16K
const formatCount = (num) => {
    if (!num) return "";
    if (num >= 1000000) return (num / 1000000).toFixed(1).replace(/\.0$/, "") + "M";
    if (num >= 1000) return (num / 1000).toFixed(1).replace(/\.0$/, "") + "K";
    return num.toString();
};

const avatarColors = [
    'bg-red-500', 'bg-blue-500', 'bg-green-500', 'bg-yellow-500',
    'bg-purple-500', 'bg-pink-500', 'bg-indigo-500', 'bg-teal-500',
];

const getAvatarColor = (name) => {
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
        hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    return avatarColors[Math.abs(hash) % avatarColors.length];
};

const Comment = ({ data, isReply }) => {
    const { name, text, time, likes } = data;
    const initial = name?.charAt(0)?.toUpperCase() || '?';
    const colorClass = getAvatarColor(name || '');

    return (
        <div className="flex gap-3">
            <div
                className={`${isReply ? 'w-6 h-6 text-xs' : 'w-10 h-10 text-sm'} rounded-full flex-shrink-0 flex items-center justify-center text-white font-bold ${colorClass}`}
            >
                {initial}
            </div>
            <div className="flex-1">
                <p className="text-xs flex items-center gap-2">
                    <span className="font-medium text-black">@{name}</span>
                    <span className="text-gray-500 font-normal">{time}</span>
                </p>
                <p className="text-sm text-black mt-0.5">{text}</p>
                <div className="flex items-center gap-1 mt-1.5">
                    <button className="p-1.5 hover:bg-gray-100 rounded-full">
                        <HiOutlineThumbUp className="text-base text-gray-700" />
                    </button>
                    {likes > 0 && (
                        <span className="text-xs text-gray-700 mr-1">{formatCount(likes)}</span>
                    )}
                    <button className="p-1.5 hover:bg-gray-100 rounded-full">
                        <HiOutlineThumbDown className="text-base text-gray-700" />
                    </button>
                    <button className="text-xs font-medium text-gray-700 hover:bg-gray-100 px-3 py-1.5 rounded-full ml-1">
                        Reply
                    </button>
                </div>
            </div>
        </div>
    );
};

const CommentThread = ({ comment }) => {
    const [showReplies, setShowReplies] = useState(false);
    const replyCount = comment.replies?.length || 0;

    return (
        <div className="mb-6">
            <Comment data={comment} />

            {replyCount > 0 && (
                <div className="ml-[52px] mt-2">
                    <button
                        onClick={() => setShowReplies(!showReplies)}
                        className="flex items-center gap-2 text-sm font-medium text-blue-600 hover:bg-gray-100 px-2 py-1.5 rounded-full"
                    >
                        {showReplies ? <HiChevronUp /> : <HiChevronDown />}
                        {replyCount} {replyCount === 1 ? "reply" : "replies"}
                    </button>

                    {showReplies && (
                        <div className="mt-3 flex flex-col gap-4">
                            {comment.replies.map((reply, index) => (
                                <Comment key={index} data={reply} isReply />
                            ))}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

const CommentsContainer = () => {
    const [newComment, setNewComment] = useState("");
    const totalCount = commentsData.reduce(
        (sum, c) => sum + 1 + (c.replies?.length || 0),
        0
    );

    return (
        <div className="w-full mt-6">
            {/* Header: count + sort */}
            <div className="flex items-center gap-6 mb-6">
                <h1 className="text-base font-medium">{totalCount} Comments</h1>
                <button className="flex items-center gap-2 text-sm font-medium hover:bg-gray-100 px-3 py-1.5 rounded-full">
                    <MdSort className="text-lg" />
                    Sort by
                </button>
            </div>

            {/* Add a comment row */}
            <div className="flex items-center gap-3 mb-8">
                <div className="w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center text-white text-sm font-bold bg-pink-500">
                    D
                </div>
                <input
                    className="flex-1 min-w-0 border-b border-gray-300 focus:border-black outline-none text-sm py-1 bg-transparent"
                    type="text"
                    placeholder="Add a comment..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                />
            </div>

            {commentsData.map((comment, index) => (
                <CommentThread key={index} comment={comment} />
            ))}
        </div>
    );
};

export default CommentsContainer;