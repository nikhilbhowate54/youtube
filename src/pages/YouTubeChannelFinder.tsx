import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Helmet } from "react-helmet";
import { Button } from "@/components/ui/button";
import ToolLayout from "@/components/ToolLayout";
import RelatedToolsSection from "@/components/RelatedToolsSection";

const YouTubeChannelFinder = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [channels, setChannels] = useState([]);

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      toast.error("Please enter a search keyword!");
      return;
    }

    const API_KEY = "AIzaSyDpDSVtbCiTP0bia6i2rGqQONXG6NkM8YY"; // Replace with your actual API key
    const apiUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&type=channel&q=${encodeURIComponent(
      searchQuery
    )}&maxResults=10&key=${API_KEY}`;

    try {
      const response = await axios.get(apiUrl);
      if (response.data.items.length > 0) {
        setChannels(response.data.items);
        toast.success("Channels fetched successfully!");
      } else {
        setChannels([]);
        toast.error("No channels found for the given search query.");
      }
    } catch (error) {
      console.error("Error fetching channels:", error);
      toast.error("Failed to fetch channel data. Please try again.");
    }
  };

  return (
    <ToolLayout
      title="YouTube Channel Finder"
      description="Easily YouTube Channel Finder. Enter and click to visit."
    >
      <div className="p-8">
        <Helmet>
          <title>YouTube Channel Finder</title>
          <meta
            name="description"
            content="Search and discover YouTube channels by keyword effortlessly."
          />
          <meta
            name="keywords"
            content="YouTube, Channel Finder, YouTube Search, Discover Channels"
          />
          <meta name="author" content="YourName" />
        </Helmet>
        <ToastContainer />

        <h1 className="text-3xl font-bold mb-6 text-center">
          {/* YouTube Channel Finder */}
        </h1>

        <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
          <input
            type="text"
            className="w-full md:w-1/2 p-3 border rounded-lg focus:outline-none"
            placeholder="Search for YouTube channels..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Button onClick={handleSearch} className="px-6 py-3">
            Search
          </Button>
        </div>

        {channels.length > 0 && (
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {channels.map((channel) => (
              <div
                key={channel.id.channelId}
                className="bg-white p-4 shadow-lg rounded-lg text-center"
              >
                <img
                  src={channel.snippet.thumbnails.high.url}
                  alt={channel.snippet.title}
                  className="w-32 h-32 mx-auto rounded-full mb-4"
                />
                <h2 className="text-xl font-semibold mb-2">
                  {channel.snippet.title}
                </h2>
                <p className="text-sm text-gray-600 mb-4">
                  {channel.snippet.description}
                </p>
                <a
                  href={`https://www.youtube.com/channel/${channel.id.channelId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  Visit Channel
                </a>
              </div>
            ))}
          </div>
        )}
      </div>
      {/* Related Tools Section */}
      <RelatedToolsSection />
    </ToolLayout>
  );
};

export default YouTubeChannelFinder;
