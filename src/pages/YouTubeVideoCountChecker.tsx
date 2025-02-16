import React, { useState } from "react";
import axios from "axios";
import ToolLayout from "@/components/ToolLayout";
import RelatedToolsSection from "@/components/RelatedToolsSection";

const YouTubeVideoCountChecker = () => {
  const [channelUrl, setChannelUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [videoCount, setVideoCount] = useState(null);
  const [error, setError] = useState(null);

  const fetchVideoCount = async () => {
    setLoading(true);
    setError(null);
    setVideoCount(null);

    try {
      const channelId = extractChannelId(channelUrl);
      if (!channelId) throw new Error("Invalid YouTube Channel URL");

      const response = await axios.get(
        `/api/youtube-video-count?channelId=${channelId}`
      );
      setVideoCount(response.data.videoCount);
    } catch (err) {
      setError("Failed to fetch video count. Please check the URL.");
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
      title="YouTube Video Count Checker"
      description="Easily YouTube Video Count Checker. Enter link and click."
    >
      <div className="flex flex-col items-center p-4">
        {/* <h1 className="text-2xl font-bold mb-4">YouTube Video Count Checker</h1> */}
        <div className="w-full p-4 border rounded shadow">
          <input
            type="text"
            placeholder="Enter YouTube Channel URL"
            value={channelUrl}
            onChange={(e) => setChannelUrl(e.target.value)}
            className="w-full p-2 border rounded"
          />
          <button
            className="mt-2 w-full p-2 bg-blue-500 text-white rounded"
            onClick={fetchVideoCount}
            disabled={loading}
          >
            {loading ? "Checking..." : "Check Video Count"}
          </button>
        </div>

        {error && <p className="text-red-500 mt-2">{error}</p>}
        {videoCount !== null && (
          <div className="mt-4 p-4 border rounded shadow text-center">
            <p className="text-lg font-semibold">Total Videos:</p>
            <p className="text-3xl font-bold">{videoCount}</p>
          </div>
        )}
      </div>
      {/* Related Tools Section */}
      <RelatedToolsSection />
    </ToolLayout>
  );
};

export default YouTubeVideoCountChecker;
