import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import ToolLayout from '@/components/ToolLayout';
import RelatedToolsSection from '@/components/RelatedToolsSection';

const YTChannelBannerDownloader = () => {
  const [channelUrl, setChannelUrl] = useState('');
  const [channelBanner, setChannelBanner] = useState(null);

  const extractChannelIdFromUrl = (url) => {
    const channelIdMatch = url.match(/(?:channel\/|user\/|c\/)([\w-]+)/);
    return channelIdMatch ? channelIdMatch[1] : null;
  };

  const fetchChannelBanner = async () => {
    try {
      if (!channelUrl) {
        toast.error('Please enter a valid YouTube URL.');
        return;
      }

      const API_KEY = 'AIzaSyDpDSVtbCiTP0bia6i2rGqQONXG6NkM8YY'; // Replace with your actual API key
      let channelId = extractChannelIdFromUrl(channelUrl);

      if (!channelId && channelUrl.includes('watch?v=')) {
        // Extract channel from video URL
        const videoIdMatch = channelUrl.match(/[?&]v=([\w-]+)/);
        const videoId = videoIdMatch ? videoIdMatch[1] : null;

        if (!videoId) {
          toast.error('Unable to extract video information.');
          return;
        }

        const videoApiUrl = `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${videoId}&key=${API_KEY}`;
        const videoResponse = await axios.get(videoApiUrl);

        if (videoResponse.data.items.length > 0) {
          channelId = videoResponse.data.items[0].snippet.channelId;
        } else {
          toast.error('No video information found.');
          return;
        }
      }

      if (!channelId) {
        toast.error('Unable to extract channel information. Please ensure the URL is correct.');
        return;
      }

      const apiUrl = `https://www.googleapis.com/youtube/v3/channels?part=brandingSettings&id=${channelId}&key=${API_KEY}`;
      const response = await axios.get(apiUrl);

      if (response.data.items && response.data.items.length > 0) {
        const bannerUrl = response.data.items[0].brandingSettings.image.bannerExternalUrl;
        if (bannerUrl) {
          setChannelBanner(bannerUrl);
          toast.success('Channel banner retrieved successfully!');
        } else {
          toast.error('No banner available for this channel.');
        }
      } else {
        toast.error('No channel found for the provided URL.');
      }
    } catch (error) {
      console.error('Error fetching channel banner:', error);
      toast.error('An error occurred while fetching the channel banner.');
    }
  };

  const handleDownloadBanner = () => {
    if (!channelBanner) {
      toast.error('No banner available to download.');
      return;
    }

    fetch(channelBanner)
      .then((response) => response.blob())
      .then((blob) => {
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'channel-banner.jpg';
        document.body.appendChild(link);
        link.click();
        link.remove();
        window.URL.revokeObjectURL(url);
        toast.success('Banner downloaded successfully!');
      })
      .catch((error) => {
        console.error('Error downloading the banner:', error);
        toast.error('An error occurred while downloading the banner.');
      });
  };

  return (
    <ToolLayout
    title="YouTube Channel Banner Downloader"
    description="Easily YouTube Channel Banner Downloader. Enter and click download."
  >
    <div className="p-4">
      <ToastContainer />
      <h1 className="text-xl font-bold mb-4">YouTube Channel Banner Downloader</h1>
      <input
        type="text"
        className="w-full p-2 border rounded mb-4"
        placeholder="Enter YouTube channel or video URL..."
        value={channelUrl}
        onChange={(e) => setChannelUrl(e.target.value)}
      />
      <Button onClick={fetchChannelBanner} className="mb-4 w-full">
        Fetch Channel Banner
      </Button>

      {channelBanner && (
        <div className="text-center mt-4">
          <img src={channelBanner} alt="Channel Banner" className="w-full max-h-64 object-cover mx-auto mb-4" />
          <Button onClick={handleDownloadBanner} className="w-full">
            Download Banner
          </Button>
        </div>
      )}
    </div>
      {/* Related Tools Section */}
               <RelatedToolsSection/>
    </ToolLayout>
  );
};

export default YTChannelBannerDownloader;
