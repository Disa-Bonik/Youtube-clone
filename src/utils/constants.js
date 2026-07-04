const GOOGLE_API_KEY = process.env.REACT_APP_GOOGLE_API_KEY;

export const LIVE_CHAT_COUNT = 20;

export const YOUTUBE_VIDEO_API = 
"https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=50&regionCode=IN&key=" + GOOGLE_API_KEY;

export const YOUTUBE_SEARCH_API =
  "https://corsproxy.io/?url=http://suggestqueries.google.com/complete/search?client=firefox&ds=yt&q=";

export const YOUTUBE_VIDEO_DETAILS_API = (videoId) =>
  `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2Cstatistics&id=${videoId}&key=${GOOGLE_API_KEY}`;

export const YOUTUBE_CHANNEL_API = (channelId) =>
  `https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2Cstatistics&id=${channelId}&key=${GOOGLE_API_KEY}`;