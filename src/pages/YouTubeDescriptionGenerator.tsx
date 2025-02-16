import RelatedToolsSection from "@/components/RelatedToolsSection";
import ToolLayout from "@/components/ToolLayout";
import React, { useState } from "react";

const YouTubeDescriptionGenerator: React.FC = () => {
  const [title, setTitle] = useState("");
  const [keywords, setKeywords] = useState("");
  const [description, setDescription] = useState("");
  const [hashtags, setHashtags] = useState<string[]>([]);

  const generateDescription = () => {
    const generatedDescription = `This video, titled "${title}", explores topics like ${keywords}. Stay tuned for an engaging and informative experience. Don't forget to like, share, and subscribe!`;
    setDescription(generatedDescription);
    extractHashtags(generatedDescription);
  };

  const extractHashtags = (desc: string) => {
    const extractedHashtags = desc.match(/#\w+/g);
    setHashtags(extractedHashtags || []);
  };

  return (
    <ToolLayout
      title="YouTube Description Generator"
      description="Easily generate YouTube Description Generator. Enter your YouTube Description and click Generate."
    >
      <div className=" from-blue-400 via-teal-500 to-green-500 flex items-center justify-center p-4">
        <div className="w-full  bg-white rounded-xl shadow-2xl p-6">
          {/* <h1 className="text-3xl font-extrabold text-center text-gray-800 mb-6">YouTube Description Generator</h1> */}
          <input
            type="text"
            placeholder="Enter video title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-teal-400 mb-4"
          />
          <input
            type="text"
            placeholder="Enter keywords (comma-separated)"
            value={keywords}
            onChange={(e) => setKeywords(e.target.value)}
            className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-green-400 mb-4"
          />
          <button
            onClick={generateDescription}
            className="w-full bg-gradient-to-r from-orange-400 to-pink-500 text-white py-3 rounded-lg font-bold text-lg hover:from-orange-500 hover:to-pink-600 transition duration-300 shadow-lg"
          >
            Generate Description
          </button>

          {description && (
            <div className="mt-4 p-4 bg-gray-100 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold text-gray-800">
                Generated Description:
              </h2>
              <p className="text-gray-700 mt-2">{description}</p>
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

export default YouTubeDescriptionGenerator;
