import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import ToolLayout from "@/components/ToolLayout";
import RelatedToolsSection from "@/components/RelatedToolsSection";

const YTLogoDownloader = () => {
  const [channelUrl, setChannelUrl] = useState("");
  const [channelLogo, setChannelLogo] = useState(null);

  const extractVideoId = (url) => {
    const videoIdMatch = url.match(/[?&]v=([\w-]+)/);
    return videoIdMatch ? videoIdMatch[1] : null;
  };

  const fetchChannelLogo = async () => {
    try {
      if (!channelUrl) {
        toast.error("Please enter a valid YouTube URL.");
        return;
      }

      let channelId;
      const API_KEY = "AIzaSyDpDSVtbCiTP0bia6i2rGqQONXG6NkM8YY"; // Replace with your actual API key

      if (channelUrl.includes("watch?v=")) {
        // Handle video URL
        const videoId = extractVideoId(channelUrl);
        if (!videoId) {
          toast.error("Unable to extract video information.");
          return;
        }

        const videoApiUrl = `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${videoId}&key=${API_KEY}`;
        const videoResponse = await axios.get(videoApiUrl);

        if (videoResponse.data.items.length > 0) {
          channelId = videoResponse.data.items[0].snippet.channelId;
        } else {
          toast.error("No video information found.");
          return;
        }
      } else {
        // Handle channel URLs
        const channelIdMatch = channelUrl.match(
          /(?:channel\/|user\/|c\/)([\w-]+)/
        );
        channelId = channelIdMatch ? channelIdMatch[1] : null;
      }

      if (!channelId) {
        toast.error(
          "Unable to extract channel information. Please ensure the URL is correct."
        );
        return;
      }

      const apiUrl = `https://www.googleapis.com/youtube/v3/channels?part=snippet&id=${channelId}&key=${API_KEY}`;
      const response = await axios.get(apiUrl);

      if (response.data.items && response.data.items.length > 0) {
        const logoUrl = response.data.items[0].snippet.thumbnails.high.url;
        setChannelLogo(logoUrl);
        toast.success("Channel logo retrieved successfully!");
      } else {
        toast.error("No channel found for the provided URL.");
      }
    } catch (error) {
      console.error("Error fetching channel logo:", error);
      toast.error("An error occurred while fetching the channel logo.");
    }
  };

  const handleDownloadLogo = async () => {
    if (!channelLogo) {
      toast.error("No logo available to download.");
      return;
    }

    try {
      const response = await fetch(channelLogo);
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = "channel-logo.jpg";
      link.click();
      URL.revokeObjectURL(url);
      toast.success("Logo downloaded successfully!");
    } catch (error) {
      console.error("Error downloading logo:", error);
      toast.error("Failed to download logo.");
    }
  };

  return (
    <ToolLayout
      title="YouTube Channel Logo Downloader"
      description="Easily YouTube Channel Logo Downloader. Enter and click download."
    >
      <div className="p-4">
        <ToastContainer />
        {/* <h1 className="text-xl font-bold mb-4">YouTube Channel Logo Downloader</h1> */}
        <input
          type="text"
          className="w-full p-2 border rounded mb-4"
          placeholder="Enter YouTube channel or video URL..."
          value={channelUrl}
          onChange={(e) => setChannelUrl(e.target.value)}
        />
        <Button onClick={fetchChannelLogo} className="mb-4 w-full">
          Fetch Channel Logo
        </Button>

        {channelLogo && (
          <div className="text-center mt-4">
            <img
              src={channelLogo}
              alt="Channel Logo"
              className="w-48 h-48 mx-auto mb-4"
            />
            <Button onClick={handleDownloadLogo} className="w-full">
              Download Logo
            </Button>
          </div>
        )}
      </div>
      {/* Related Tools Section */}
      <RelatedToolsSection />
    </ToolLayout>
  );
};

export default YTLogoDownloader;
