import React, { useState } from "react";
import axios from "axios";
import ToolLayout from "@/components/ToolLayout";
import RelatedToolsSection from "@/components/RelatedToolsSection";

const YouTubeTitleCapitalizer = () => {
  const [videoTitle, setVideoTitle] = useState("");
  const [capitalizedTitle, setCapitalizedTitle] = useState("");
  const [error, setError] = useState(null);

  const capitalizeTitle = async () => {
    setError(null);
    setCapitalizedTitle("");

    if (!videoTitle.trim()) {
      setError("Please enter a YouTube video title.");
      return;
    }

    try {
      const response = await axios.post("/api/capitalize-title", {
        title: videoTitle,
      });
      setCapitalizedTitle(response.data.capitalizedTitle);
    } catch (err) {
      setError("Failed to capitalize title. Please try again.");
    }
  };

  return (
    <ToolLayout
      title="YouTube Video  Title Capitalizer"
      description="Easily YouTube Video Title Capitalizer. Enter link and click."
    >
      <div className="flex flex-col items-center p-4">
        {/* <h1 className="text-2xl font-bold mb-4">YouTube Video Title Capitalizer</h1> */}
        <div className="w-full p-4 border rounded shadow">
          <input
            type="text"
            placeholder="Enter YouTube Video Title"
            value={videoTitle}
            onChange={(e) => setVideoTitle(e.target.value)}
            className="w-full p-2 border rounded"
          />
          <button
            className="mt-2 w-full p-2 bg-blue-500 text-white rounded"
            onClick={capitalizeTitle}
          >
            Capitalize Title
          </button>
        </div>

        {error && <p className="text-red-500 mt-2">{error}</p>}
        {capitalizedTitle && (
          <div className="mt-4 p-4 border rounded shadow text-center">
            <p className="text-lg font-semibold">Capitalized Title:</p>
            <p className="text-xl font-bold">{capitalizedTitle}</p>
          </div>
        )}
      </div>
      {/* Related Tools Section */}
      <RelatedToolsSection />
    </ToolLayout>
  );
};

export default YouTubeTitleCapitalizer;
