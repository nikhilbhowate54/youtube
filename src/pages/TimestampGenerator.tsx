import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import ToolLayout from "@/components/ToolLayout";
import RelatedToolsSection from "@/components/RelatedToolsSection";

export default function TimestampGenerator() {
  const [videoUrl, setVideoUrl] = useState("");
  const [minutes, setMinutes] = useState("");
  const [seconds, setSeconds] = useState("");
  const [generatedLink, setGeneratedLink] = useState("");

  const generateLink = () => {
    if (!videoUrl.includes("youtube.com") && !videoUrl.includes("youtu.be")) {
      alert("Please enter a valid YouTube URL");
      return;
    }
    const time = parseInt(minutes) * 60 + parseInt(seconds);
    if (isNaN(time) || time < 0) {
      alert("Please enter a valid timestamp");
      return;
    }
    let newUrl = videoUrl;
    if (videoUrl.includes("youtu.be")) {
      newUrl = videoUrl.replace("youtu.be/", "youtube.com/watch?v=");
    }
    newUrl += `&t=${time}s`;
    setGeneratedLink(newUrl);
  };

  return (
    <ToolLayout
    title="YouTube Timestamp Link Generator"
    description="Easily YouTube Timestamp Link Generator. Enter link and click."
  >
        <div className="flex justify-center items-center   p-4">
      <Card className="w-full  shadow-lg rounded-2xl bg-white">
        <CardContent>
          <h2 className="text-xl font-semibold mb-4">YouTube Timestamp Link Generator</h2>
          <Input
            type="text"
            placeholder="Enter YouTube Video URL"
            value={videoUrl}
            onChange={(e) => setVideoUrl(e.target.value)}
            className="mb-4"
          />
          <div className="flex gap-4 mb-4">
            <Input
              type="number"
              placeholder="Minutes"
              value={minutes}
              onChange={(e) => setMinutes(e.target.value)}
            />
            <Input
              type="number"
              placeholder="Seconds"
              value={seconds}
              onChange={(e) => setSeconds(e.target.value)}
            />
          </div>
          <Button className="w-full" onClick={generateLink}>
            Generate Link
          </Button>
          {generatedLink && (
            <div className="mt-4 p-2 bg-gray-200 rounded-lg text-center">
              <a href={generatedLink} target="_blank" rel="noopener noreferrer" className="text-blue-600">
                {generatedLink}
              </a>
            </div>
          )}
        </CardContent>
      </Card>
         {/* Related Tools Section */}
         <RelatedToolsSection/>
    </div>
  </ToolLayout>

  );
}
