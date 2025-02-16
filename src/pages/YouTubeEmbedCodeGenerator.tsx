import ToolLayout from "@/components/ToolLayout";
import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import RelatedToolsSection from "@/components/RelatedToolsSection";

const YouTubeEmbedCodeGenerator: React.FC = () => {
  const [url, setUrl] = useState("");
  const [width, setWidth] = useState(560);
  const [height, setHeight] = useState(315);
  const [autoplay, setAutoplay] = useState(false);
  const [controls, setControls] = useState(true);
  const [generatedCode, setGeneratedCode] = useState("");

  const generateEmbedCode = () => {
    if (!url.includes("youtube.com") && !url.includes("youtu.be")) {
      toast.error("Invalid YouTube URL!");
      return;
    }

    let videoId;
    const urlObj = new URL(url);

    if (urlObj.hostname.includes("youtube.com")) {
      videoId = new URLSearchParams(urlObj.search).get("v");
    } else if (urlObj.hostname.includes("youtu.be")) {
      videoId = urlObj.pathname.substring(1);
    }

    if (!videoId) {
      toast.error("Could not extract video ID");
      return;
    }

    const embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=${
      autoplay ? 1 : 0
    }&controls=${controls ? 1 : 0}`;
    const embedCode = `<iframe width="${width}" height="${height}" src="${embedUrl}" frameborder="0" allowfullscreen></iframe>`;
    setGeneratedCode(embedCode);
    toast.success("Embed code generated successfully!");
  };
  return (
    <ToolLayout
      title="YouTube Embed Code Generator"
      description="Easily generate YouTube Embed Code Generator. Enter your YouTube Embed Code and click Generate."
    >
      <div className="p-6  mx-auto bg-white rounded-xl shadow-md space-y-4">
        {/* <h1 className="text-xl font-bold">YouTube Embed Code Generator</h1> */}
        <input
          type="text"
          placeholder="Enter YouTube URL"
          className="w-full p-2 border rounded"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <div className="flex gap-2">
          <input
            type="number"
            placeholder="Width"
            className="p-2 border rounded w-1/2"
            value={width}
            onChange={(e) => setWidth(Number(e.target.value))}
          />
          <input
            type="number"
            placeholder="Height"
            className="p-2 border rounded w-1/2"
            value={height}
            onChange={(e) => setHeight(Number(e.target.value))}
          />
        </div>
        <div className="flex gap-4">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={autoplay}
              onChange={() => setAutoplay(!autoplay)}
            />
            <span className="ml-2">Autoplay</span>
          </label>
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={controls}
              onChange={() => setControls(!controls)}
            />
            <span className="ml-2">Show Controls</span>
          </label>
        </div>
        <button
          onClick={generateEmbedCode}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Generate Code
        </button>
        {generatedCode && (
          <div>
            <h2 className="font-semibold">Embed Code:</h2>
            <textarea
              className="w-full p-2 border rounded"
              rows={3}
              value={generatedCode}
              readOnly
            />
            <button
              className="mt-2 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
              onClick={() => {
                navigator.clipboard.writeText(generatedCode);
                toast.info("Copied to clipboard!");
              }}
            >
              Copy Code
            </button>
          </div>
        )}
        <ToastContainer position="bottom-right" />
           {/* Related Tools Section */}
           <RelatedToolsSection/>
      </div>
    </ToolLayout>
  );
};

export default YouTubeEmbedCodeGenerator;
