import React from 'react';

const commentsData = [
    {
        name: "Disha Bonik",
        text: "loren ipsum dolor sit amet, consectrtur adip",
        replies: []
    },
    {
        name: "Disha Bonik",
        text: "loren ipsum dolor sit amet, consectrtur adip",
        replies: [{
            name: "Disha Bonik",
            text: "Lorem ipsum dolor sit amet, consectetur adip",
            replies: [{
                name: "Disha Bonik",
                text: "Lorem ipsum dolor sit amet, consectetur adip",
                replies: [{
                    name: "Disha Bonik",
                    text: "loren ipsum dolor sit amet, consectrtur adip",
                    replies: [],
                }],
            }],
        }],
    },
    {
        name: "Disha Bonik",
        text: "loren ipsum dolor sit amet, consectrtur adip",
        replies: [],
    },
    {
        name: "Disha Bonik",
        text: "loren ipsum dolor sit amet, consectrtur adip",
        replies: []
    },
    {
        name: "Disha Bonik",
        text: "loren ipsum dolor sit amet, consectrtur adip",
        replies: []
    },
    {
        name: "Disha Bonik",
        text: "loren ipsum dolor sit amet, consectrtur adip",
        replies: []
    },
];

const Comment = ({ data }) => {
    const { name, text } = data;
    return (
        <div className="flex gap-3 mb-1">
            <img
                className="w-8 h-8 rounded-full flex-shrink-0"
                alt="user"
                src="https://tse2.mm.bing.net/th/id/OIP.fqSvfYQB0rQ-6EG_oqvonQHaHa?pid=Api&P=0&h=180"
            />
            <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">@{name}</p>
                <p className="text-sm text-gray-700 mt-0.5">{text}</p>
                <div className="flex gap-2 mt-1">
                    <button className="text-xs text-gray-500 hover:bg-gray-100 px-2 py-1 rounded-full">👍</button>
                    <button className="text-xs text-gray-500 hover:bg-gray-100 px-2 py-1 rounded-full">👎</button>
                    <button className="text-xs font-medium text-gray-600 hover:bg-gray-100 px-2 py-1 rounded-full">Reply</button>
                </div>
            </div>
        </div>
    );
};

const CommentsList = ({ comments }) => {
    if (!comments || comments.length === 0) return null;
    return comments.map((comment, index) => (
        <div key={index} className="mb-4">
            <Comment data={comment} />
            {comment.replies?.length > 0 && (
                <div className="ml-6 md:ml-10 mt-2 pl-3 border-l-2 border-gray-200 overflow-hidden">
                    <CommentsList comments={comment.replies} />
                </div>
            )}
        </div>
    ));
};

const CommentsContainer = () => {
    return (
        <div className="max-w-2xl mx-auto px-4 py-6">
            <h1 className="text-base font-medium mb-6">{commentsData.length} Comments</h1>
            <CommentsList comments={commentsData} />
        </div>
    );
};

export default CommentsContainer;