import React from 'react';

// Generates a consistent color for a given name (like YouTube's avatar colors)
const avatarColors = [
  'bg-red-500', 'bg-blue-500', 'bg-green-500', 'bg-yellow-500',
  'bg-purple-500', 'bg-pink-500', 'bg-indigo-500', 'bg-teal-500',
  'bg-orange-500', 'bg-cyan-600',
];

const getAvatarColor = (name) => {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return avatarColors[Math.abs(hash) % avatarColors.length];
};

const ChatMessage = ({ name, message }) => {
  const initial = name?.charAt(0)?.toUpperCase() || '?';
  const colorClass = getAvatarColor(name || '');

  return (
    <div className="flex items-start gap-2 px-3 py-1.5 hover:bg-gray-100 rounded-md transition-colors">
      <div
        className={`h-6 w-6 shrink-0 rounded-full flex items-center justify-center text-white text-xs font-bold ${colorClass}`}
      >
        {initial}
      </div>
      <p className="text-sm leading-5 break-words">
        <span className="font-medium text-gray-900 mr-1">{name}</span>
        <span className="text-gray-800">{message}</span>
      </p>
    </div>
  );
};

export default ChatMessage;