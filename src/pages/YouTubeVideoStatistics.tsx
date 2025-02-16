import RelatedToolsSection from "@/components/RelatedToolsSection";
import ToolLayout from "@/components/ToolLayout";
import React, { useState } from "react";

const YouTubeVideoStatistics: React.FC = () => {
  const [url, setUrl] = useState("");
  const [stats, setStats] = useState<any>(null);
  const [hashtags, setHashtags] = useState<string[]>([]);

  const extractStatistics = () => {
    const videoIdMatch = url.match(/(?:v=|youtu\.be\/)([\w-]+)/);
    const videoId = videoIdMatch ? videoIdMatch[1] : "";

    if (videoId) {
      // Mock data for demonstration purposes
      const mockStats = {
        views: 1234567,
        likes: 89012,
        comments: 3456,
        description: `This is a sample description for video ID: ${videoId}. Contains #SampleTag1 and #SampleTag2.`,
      };
      setStats(mockStats);
      extractHashtags(mockStats.description);
    } else {
      setStats(null);
    }
  };

  const extractHashtags = (desc: string) => {
    const extractedHashtags = desc.match(/#\w+/g);
    setHashtags(extractedHashtags || []);
  };

  return (
    <ToolLayout
      title="YouTube Video Statistics"
      description="Easily generate YouTube Video Statistics. Enter your YouTube Video Statistics and click Generate."
    >
      <div className=" from-blue-400 via-green-500 to-teal-500 flex items-center justify-center p-4">
        <div className="w-full  bg-white rounded-xl shadow-2xl p-6">
          {/* <h1 className="text-3xl font-extrabold text-center text-gray-800 mb-6">YouTube Video Statistics</h1> */}
          <input
            type="text"
            placeholder="Enter YouTube video URL"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-green-400 mb-4"
          />
          <button
            onClick={extractStatistics}
            className="w-full bg-gradient-to-r from-orange-400 to-red-500 text-white py-3 rounded-lg font-bold text-lg hover:from-orange-500 hover:to-red-600 transition duration-300 shadow-lg"
          >
            Get Video Statistics
          </button>

          {stats && (
            <div className="mt-4 p-4 bg-gray-100 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold text-gray-800">
                Statistics:
              </h2>
              <p className="text-gray-700 mt-2">
                Views: {stats.views.toLocaleString()}
              </p>
              <p className="text-gray-700">
                Likes: {stats.likes.toLocaleString()}
              </p>
              <p className="text-gray-700">
                Comments: {stats.comments.toLocaleString()}
              </p>
              <p className="text-gray-700 mt-2">
                Description: {stats.description}
              </p>
            </div>
          )}

          {hashtags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-4">
              {hashtags.map((hashtag, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-teal-500 text-white rounded-full text-sm shadow-md hover:bg-teal-600 transition duration-300"
                >
                  {hashtag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
         {/* Related Tools Section */}
         <RelatedToolsSection/>
    </ToolLayout>
  );
};

export default YouTubeVideoStatistics;
