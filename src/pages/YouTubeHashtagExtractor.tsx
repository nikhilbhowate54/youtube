import ToolLayout from "@/components/ToolLayout";
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Input } from "@/components/ui/input";
import RelatedToolsSection from "@/components/RelatedToolsSection";

const API_KEY = "AIzaSyDpDSVtbCiTP0bia6i2rGqQONXG6NkM8YY"; // Replace with your YouTube Data API key

const YouTubeHashtagExtractor: React.FC = () => {
  const [videoURL, setVideoURL] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const getVideoId = (url: string) => {
    const regex =
      /(?:\?v=|\/embed\/|\/1\/|\/v\/|youtu\.be\/|\/shorts\/)([\w-]{11})/;
    const match = url.match(regex);
    return match ? match[1] : null;
  };

  const extractTags = async () => {
    setLoading(true);
    setError("");
    setTags([]);

    const videoId = getVideoId(videoURL);
    if (!videoId) {
      setError("Invalid YouTube URL.");
      toast.error("Invalid YouTube URL.");
      setLoading(false);
      return;
    }

    try {
      const { data } = await axios.get(
        `https://www.googleapis.com/youtube/v3/videos?id=${videoId}&part=snippet&key=${API_KEY}`
      );

      if (data.items.length > 0) {
        const videoTags = data.items[0].snippet.tags || [];
        setTags(videoTags);
        toast.success("Tags extracted successfully!");
      } else {
        setError("Video not found.");
        toast.error("Video not found.");
      }
    } catch (err: any) {
      setError("Failed to fetch video data.");
      toast.error("Failed to fetch video data.");
    } finally {
      setLoading(false);
    }
  };

  const copyTagsToClipboard = () => {
    const tagsText = tags.map((tag) => `#${tag}`).join(" ");
    navigator.clipboard.writeText(tagsText);
    toast.success("Tags copied to clipboard!");
  };
  return (
    <ToolLayout
      title="YouTube Hashtag Extractor"
      description="Easily Extract YouTube tags. Enter and click Generate."
    >
      <ToastContainer></ToastContainer>
      <div className=" mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4 text-center">
          {/* YouTube Tag Extractor */}
        </h1>
        <Card>
          <CardContent className="p-4">
            <Input
              type="text"
              placeholder="Enter YouTube Video URL"
              value={videoURL}
              onChange={(e) => setVideoURL(e.target.value)}
              className="mb-4"
            />
            <Button onClick={extractTags} disabled={loading} className="w-full">
              {loading ? "Extracting..." : "Extract Tags"}
            </Button>
            {error && <p className="text-red-500 mt-2 text-center">{error}</p>}
            {tags.length > 0 && (
              <div className="mt-4">
                <h2 className="text-xl font-semibold">Extracted Tags:</h2>
                <div className="flex flex-wrap gap-2 mt-2">
                  {tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-blue-200 text-blue-800 rounded-full text-sm cursor-pointer select-text"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
                <Button onClick={copyTagsToClipboard} className="mt-4 w-full">
                  Copy All Tags
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
           {/* Related Tools Section */}
           <RelatedToolsSection/>
      </div>
    </ToolLayout>
  );
};

export default YouTubeHashtagExtractor;
