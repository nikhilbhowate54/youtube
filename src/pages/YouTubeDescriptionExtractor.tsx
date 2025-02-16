import ToolLayout from "@/components/ToolLayout";
import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import RelatedToolsSection from "@/components/RelatedToolsSection";

const YouTubeDescriptionExtractor: React.FC = () => {
  const [videoUrl, setVideoUrl] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const extractVideoId = (url) => {
    const regex =
      /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/)([\w-]{11})/;
    const match = url.match(regex);
    return match ? match[1] : null;
  };

  const fetchDescription = async () => {
    const videoId = extractVideoId(videoUrl);
    if (!videoId) {
      toast.error("Invalid YouTube URL");
      return;
    }

    setLoading(true);
    try {
      const API_KEY = "AIzaSyDpDSVtbCiTP0bia6i2rGqQONXG6NkM8YY"; // Replace with your actual API key
      const response = await axios.get(
        `https://www.googleapis.com/youtube/v3/videos?id=${videoId}&part=snippet&key=${API_KEY}`
      );
      const videoData = response.data.items[0]?.snippet;
      if (videoData) {
        setTitle(videoData.title);
        setDescription(videoData.description);
      } else {
        toast.error("Video not found or API limit exceeded");
      }
    } catch (error) {
      toast.error("Failed to fetch video description");
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard");
  };

  return (
    <ToolLayout
      title="YouTube Description Extractor"
      description="Easily generate YouTube description extractor. Enter your YouTube description and click Extractor."
    >
      <div className="p-6  mx-auto bg-white shadow-lg rounded-xl text-center">
        {/* <h2 className="text-2xl font-semibold mb-4">YouTube Description Extractor</h2> */}
        <input
          type="text"
          placeholder="Enter YouTube Video URL"
          className="border p-2 w-full rounded-lg"
          value={videoUrl}
          onChange={(e) => setVideoUrl(e.target.value)}
        />
        <button
          onClick={fetchDescription}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
          disabled={loading}
        >
          {loading ? "Fetching..." : "Extract Description"}
        </button>
        {title && (
          <div className="mt-4 p-4 border rounded-lg text-left bg-gray-100">
            <h3 className="font-semibold">Title:</h3>
            <p className="mt-2">{title}</p>
            <button
              onClick={() => copyToClipboard(title)}
              className="mt-2 bg-gray-300 px-2 py-1 rounded"
            >
              Copy Title
            </button>
          </div>
        )}
        {description && (
          <div className="mt-4 p-4 border rounded-lg text-left bg-gray-100">
            <h3 className="font-semibold">Description:</h3>
            <p className="mt-2 whitespace-pre-wrap">{description}</p>
            <button
              onClick={() => copyToClipboard(description)}
              className="mt-2 bg-gray-300 px-2 py-1 rounded"
            >
              Copy Description
            </button>
          </div>
        )}
        <ToastContainer position="top-right" autoClose={3000} />
      </div>
         {/* Related Tools Section */}
         <RelatedToolsSection/>
    </ToolLayout>
  );
};

export default YouTubeDescriptionExtractor;
