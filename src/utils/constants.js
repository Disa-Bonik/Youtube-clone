const GOOGLE_API_KEY = "AIzaSyAcW7zWxv1yj6GzRtP15eLFeMWpbMIyQj8";

export const LIVE_CHAT_COUNT = 20;

export const YOUTUBE_VIDEO_API = 
"https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=50&regionCode=IN&key=" + GOOGLE_API_KEY;

export const YOUTUBE_SEARCH_API =
  "https://corsproxy.io/?url=http://suggestqueries.google.com/complete/search?client=firefox&ds=yt&q=";