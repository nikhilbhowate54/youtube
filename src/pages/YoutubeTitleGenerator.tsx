import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2, Sparkles } from "lucide-react";
import Navbar from "@/components/Navbar";
import RelatedToolsSection from "@/components/RelatedToolsSection";

export default function YoutubeTitleGenerator() {
  const [topic, setTopic] = useState<string>("");
  const [generatedTitle, setGeneratedTitle] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const generateTitle = async () => {
    setGeneratedTitle("");
    setError("");
    setLoading(true);

    try {
      if (!topic.trim()) {
        throw new Error("Please enter a topic");
      }

      const response = await fetch("https://api.example.com/generate-title", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic }),
      });

      if (!response.ok) {
        throw new Error("Failed to generate title");
      }

      const data: { title: string } = await response.json();
      setGeneratedTitle(data.title);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-gradient-to-r from-blue-500 to-purple-600 text-white">
        <Card className="w-full max-w-lg p-6 shadow-xl bg-white text-black rounded-2xl">
          <h2 className="text-2xl font-bold mb-4 text-center flex items-center justify-center gap-2">
            <Sparkles className="text-yellow-500" /> YouTube Title Generator
          </h2>
          <Input
            placeholder="Enter video topic"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            className="mb-4"
          />
          <Button
            onClick={generateTitle}
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold"
          >
            {loading ? <Loader2 className="animate-spin" /> : "Generate Title"}
          </Button>
          <CardContent className="mt-4 text-center">
            {generatedTitle && (
              <p className="text-lg font-semibold text-green-600">
                Generated Title: {generatedTitle}
              </p>
            )}
            {error && <p className="text-red-500">Error: {error}</p>}
          </CardContent>
        </Card>
           {/* Related Tools Section */}
           <RelatedToolsSection/>
      </div>
    </div>
  );
}
