import React, { useState } from "react";
import axios from "axios";
import ToolLayout from "@/components/ToolLayout";
import RelatedToolsSection from "@/components/RelatedToolsSection";

const YouTubeChannelAgeChecker = () => {
  const [channelUrl, setChannelUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [channelAge, setChannelAge] = useState(null);
  const [error, setError] = useState(null);

  const fetchChannelAge = async () => {
    setLoading(true);
    setError(null);
    setChannelAge(null);
    
    try {
      const channelId = extractChannelId(channelUrl);
      if (!channelId) throw new Error("Invalid YouTube Channel URL");
      
      const response = await axios.get(`/api/youtube-channel-age?channelId=${channelId}`);
      setChannelAge(response.data);
    } catch (err) {
      setError("Failed to fetch channel age. Please check the URL.");
    }
    
    setLoading(false);
  };

  const extractChannelId = (url) => {
    try {
      if (url.includes("channel/")) {
        return url.split("channel/")[1].split("/")[0];
      } else if (url.includes("user/")) {
        return url.split("user/")[1].split("/")[0];
      } else {
        return null;
      }
    } catch {
      return null;
    }
  };

  return (
    <ToolLayout
    title="YouTube Channel Age Checker"
    description="Easily YouTube Channel Age Checker. Enter link and click."
  >
    <div className="flex flex-col items-center p-4">
      <h1 className="text-2xl font-bold mb-4"></h1>
      <div className="w-full  p-4 border rounded shadow">
        <input
          type="text"
          placeholder="Enter YouTube Channel URL"
          value={channelUrl}
          onChange={(e) => setChannelUrl(e.target.value)}
          className="w-full p-2 border rounded"
        />
        <button
          className="mt-2 w-full p-2 bg-blue-500 text-white rounded"
          onClick={fetchChannelAge}
          disabled={loading}
        >
          {loading ? "Checking..." : "Check Age"}
        </button>
      </div>

      {error && <p className="text-red-500 mt-2">{error}</p>}
      {channelAge && (
        <div className="mt-4 p-4 border rounded shadow text-center">
          <p className="text-lg font-semibold">Channel Created On:</p>
          <p className="text-xl font-bold">{channelAge.createdAt}</p>
          <p className="text-sm text-gray-600">({channelAge.age} years old)</p>
        </div>
      )}
    </div>
       {/* Related Tools Section */}
       <RelatedToolsSection/>
    </ToolLayout>
  );
};

export default YouTubeChannelAgeChecker;
