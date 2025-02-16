export const getVideoId = (url: string): string | null => {
  const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
  const match = url.match(regExp);
  return match && match[7].length === 11 ? match[7] : null;
};

export const getThumbnailUrls = (videoId: string) => {
  return {
    maxres: `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`,
    high: `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`,
    medium: `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`,
    default: `https://img.youtube.com/vi/${videoId}/default.jpg`,
  };
};

export const isValidYouTubeUrl = (url: string): boolean => {
  const videoId = getVideoId(url);
  return videoId !== null;
};

export const extractYouTubeTitle = async (url: string): Promise<string> => {
  const response = await fetch(`https://www.youtube.com/oembed?url=${url}&format=json`);
  const data = await response.json();
  return data.title;
};