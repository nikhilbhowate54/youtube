import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import RelatedToolsSection from "@/components/RelatedToolsSection";

export default function YoutubeTitleExtractor() {
  const [url, setUrl] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const extractTitle = async () => {
    setTitle("");
    setError("");
    setLoading(true);
    
    try {
      const videoId = url.split("v=")[1]?.split("&")[0];
      if (!videoId) {
        throw new Error("Invalid YouTube URL");
      }

      const response = await fetch(
        `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${videoId}&format=json`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch video title");
      }

      const data: { title: string } = await response.json();
      setTitle(data.title);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };
 
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-100">
      <Card className="w-full max-w-md p-6 shadow-lg bg-white rounded-2xl">
        <h2 className="text-xl font-bold mb-4 text-center">YouTube Title Extractor</h2>
        <Input
          placeholder="Enter YouTube URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="mb-4"
        />
        <Button onClick={extractTitle} disabled={loading} className="w-full">
          {loading ? <Loader2 className="animate-spin" /> : "Extract Title"}
        </Button>
        <CardContent className="mt-4">
          {title && <p className="text-lg font-semibold text-green-600">Title: {title}</p>}
          {error && <p className="text-red-500">Error: {error}</p>}
        </CardContent>
      </Card>
         {/* Related Tools Section */}
         <RelatedToolsSection/>
    </div>
  );
}
