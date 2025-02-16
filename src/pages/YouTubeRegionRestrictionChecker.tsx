import ToolLayout from "@/components/ToolLayout";
import React, { useState } from "react";
import axios from "axios";
import RelatedToolsSection from "@/components/RelatedToolsSection";

const YouTubeRegionRestrictionChecker: React.FC = () => {
  const [videoId, setVideoId] = useState<string>("");
  const [regionCode, setRegionCode] = useState<string>("");
  const [result, setResult] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const checkRestriction = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://www.googleapis.com/youtube/v3/videos?part=contentDetails&id=${videoId}&regionCode=${regionCode}&key=AIzaSyB4erjTiyNA3XyLwFxLXzTi8UhPQ9j9l3Y`
      );
      console.log(response);

      const videoDetails = response.data.items[0].contentDetails;
      if (videoDetails.regionRestriction) {
        if (
          videoDetails.regionRestriction.blocked &&
          videoDetails.regionRestriction.blocked.includes(regionCode)
        ) {
          setResult(`This video is restricted in ${regionCode}.`);
        } else {
          setResult(`This video is available in ${regionCode}.`);
        }
      } else {
        setResult("No region restrictions found for this video.");
      }
    } catch (error) {
      setResult(
        "Error checking region restriction. Please check your input and try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <ToolLayout
      title="YouTube Region Restriction Checker"
      description="Easily generate YouTube Region Restriction Checker. Enter your YouTube Region Restriction Checker and click Generate."
    >
      <div className=" flex flex-col items-center justify-center p-4">
        {/* <h1 className="text-4xl font-bold text-red-600 mb-8">YouTube Region Restriction Checker</h1> */}
        <div className="bg-white p-8 rounded-lg shadow-lg w-full ">
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Enter YouTube Video ID"
              value={videoId}
              onChange={(e) => setVideoId(e.target.value)}
              className="w-full p-3 border border-red-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
            />
            <input
              type="text"
              placeholder="Enter Region Code (e.g., US)"
              value={regionCode}
              onChange={(e) => setRegionCode(e.target.value.toUpperCase())}
              className="w-full p-3 border border-red-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
            />
            <button
              onClick={checkRestriction}
              disabled={loading}
              className="w-full bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 transition duration-300 disabled:bg-red-400 disabled:cursor-not-allowed"
            >
              {loading ? "Checking..." : "Check Restriction"}
            </button>
          </div>
          {result && (
            <div className="mt-6 p-4 bg-gray-50 rounded-lg text-center text-gray-700">
              {result}
            </div>
          )}
        </div>
         
      </div>
        {/* Related Tools Section */}
        <RelatedToolsSection/>
    </ToolLayout>
  );
};

export default YouTubeRegionRestrictionChecker;
