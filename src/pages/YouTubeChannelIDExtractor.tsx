import ToolLayout from "@/components/ToolLayout";
import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import RelatedToolsSection from "@/components/RelatedToolsSection";


const YouTubeChannelIDExtractor: React.FC = () => {
  const [url, setUrl] = useState("");
  const [channelId, setChannelId] = useState("");

  const extractChannelID = async () => {
    if (!url.includes("youtube.com") && !url.includes("youtu.be")) {
      toast.error("Invalid YouTube URL! Please enter a valid YouTube channel or video URL.");
      return;
    }

    try {
      const urlObj = new URL(url);
      let extractedChannelId = "";

      if (urlObj.pathname.includes("/channel/")) {
        extractedChannelId = urlObj.pathname.split("/channel/")[1];
      } else if (urlObj.pathname.includes("/user/")) {
        const username = urlObj.pathname.split("/user/")[1];
        const response = await axios.get(`https://www.googleapis.com/youtube/v3/channels?forUsername=${username}&part=id&key=AIzaSyDpDSVtbCiTP0bia6i2rGqQONXG6NkM8YY`);
        extractedChannelId = response.data.items[0]?.id || "";
      } else if (urlObj.searchParams.has("v")) {
        const videoId = urlObj.searchParams.get("v");
        const response = await axios.get(`https://www.googleapis.com/youtube/v3/videos?id=${videoId}&part=snippet&key=AIzaSyDpDSVtbCiTP0bia6i2rGqQONXG6NkM8YY`);
        extractedChannelId = response.data.items[0]?.snippet?.channelId || "";
      }

      if (!extractedChannelId) {
        toast.error("Could not extract channel ID. Try another URL.");
        return;
      }

      setChannelId(extractedChannelId);
      toast.success("Channel ID extracted successfully!");
    } catch (error) {
      toast.error("Error extracting channel ID. Please check the URL and try again.");
    }
  };
  return (
    <ToolLayout
      title="YouTube Channel ID Extractor"
      description="Easily generate YouTube Channel ID Extractor. Enter your YouTube Channel ID Extractor and click Generate."
    >
       <div className="p-6  mx-auto bg-white rounded-xl shadow-md space-y-4 text-center">
      {/* <h1 className="text-2xl font-bold text-red-600">YouTube Channel ID Extractor</h1> */}
      {/* <p className="text-gray-700">Extract the Channel ID from any YouTube channel or video URL easily.</p> */}
      <input
        type="text"
        placeholder="Enter YouTube Channel or Video URL"
        className="w-full p-3 border rounded text-center"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />
      <button
        onClick={extractChannelID}
        className="w-full bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
      >
        Extract Channel ID
      </button>
      {channelId && (
        <div className="mt-4 p-4 bg-gray-100 rounded">
          <h2 className="font-semibold">Extracted Channel ID:</h2>
          <p className="text-blue-600 font-mono break-all">{channelId}</p>
          <button
            className="mt-2 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            onClick={() => {
              navigator.clipboard.writeText(channelId);
              toast.info("Copied to clipboard!");
            }}
          >
            Copy ID
          </button>
        </div>
      )}
      <ToastContainer position="bottom-right" />
    </div>
       {/* Related Tools Section */}
       <RelatedToolsSection/>
    </ToolLayout>
  );
};

export default YouTubeChannelIDExtractor;
