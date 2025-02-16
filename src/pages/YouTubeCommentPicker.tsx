import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import axios from "axios";
import ToolLayout from "@/components/ToolLayout";
import RelatedToolsSection from "@/components/RelatedToolsSection";

const YouTubeCommentPicker = () => {
  const [videoUrl, setVideoUrl] = useState("");
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [winner, setWinner] = useState(null);

  const fetchComments = async () => {
    setLoading(true);
    try {
      const videoId = new URL(videoUrl).searchParams.get("v");
      const response = await axios.get(`/api/youtube-comments?videoId=${videoId}`);
      setComments(response.data.comments);
    } catch (error) {
      console.error("Error fetching comments", error);
    }
    setLoading(false);
  };

  const pickRandomComment = () => {
    if (comments.length === 0) return;
    const randomIndex = Math.floor(Math.random() * comments.length);
    setWinner(comments[randomIndex]);
  };

  return (
    <ToolLayout
    title="YouTube Comment Picker"
    description="Easily YouTube Comment Picker. Enter link and click."
  >
    <div className="flex flex-col items-center p-4">
      {/* <h1 className="text-2xl font-bold mb-4">YouTube Comment Picker</h1> */}
      <Card className="w-full  p-4">
        <CardContent>
          <Input
            type="text"
            placeholder="Enter YouTube Video URL"
            value={videoUrl}
            onChange={(e) => setVideoUrl(e.target.value)}
          />
          <Button className="mt-2 w-full" onClick={fetchComments} disabled={loading}>
            {loading ? <Loader2 className="animate-spin" /> : "Fetch Comments"}
          </Button>
        </CardContent>
      </Card>

      {comments.length > 0 && (
        <Card className="w-full max-w-md mt-4 p-4">
          <CardContent>
            <Button className="w-full" onClick={pickRandomComment}>
              Pick Random Comment
            </Button>
            {winner && (
              <div className="mt-4 p-2 border rounded">
                <p className="text-lg font-semibold">Winner:</p>
                <p>{winner.text}</p>
                <p className="text-sm text-gray-500">By: {winner.author}</p>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
       {/* Related Tools Section */}
       <RelatedToolsSection/>
    </ToolLayout>
  );
};

export default YouTubeCommentPicker;
