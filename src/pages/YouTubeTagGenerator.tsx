import ToolLayout from "@/components/ToolLayout";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import RelatedToolsSection from "@/components/RelatedToolsSection";

const API_URL = "https://youtube-tags-generator.p.rapidapi.com/tags";
const API_KEY = "b7b84c4b42msh7c96258698df1dap1d5f69jsnb744ccab4793";

const YouTubeTagGenerator: React.FC = () => {
  const [keyword, setKeyword] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchTags = async () => {
    if (!keyword.trim()) return;
    setLoading(true);
    try {
      const response = await axios.get(API_URL, {
        headers: {
          "x-rapidapi-key": API_KEY,
          "x-rapidapi-host": "youtube-tags-generator.p.rapidapi.com",
        },
        params: { keyword },
      });
      setTags(response.data.tags);
    } catch (error) {
      console.error("Error fetching tags", error);
    }
    setLoading(false);
  };
  const copyTagsToClipboard = () => {
    const tagsText = tags.map((tag) => `#${tag}`).join(" ");
    navigator.clipboard.writeText(tagsText);
    toast.success("Tags copied to clipboard!");
  };
  return (
    <ToolLayout
      title="YouTube Tag Generator"
      description="Easily generate YouTube tags. Enter your YouTube tagL and click Generate."
    >
      <ToastContainer />
      <div className="flex flex-col items-center justify-center  p-4">
        <Card className="w-full  p-4 shadow-lg rounded-2xl">
          <CardContent className="flex flex-col gap-4">
            <h1 className="text-2xl font-bold text-center">
              {/* YouTube Tag Generator */}
            </h1>
            <Input
              type="text"
              placeholder="Enter keyword..."
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              className="w-full p-2 border rounded-lg"
            />
            <Button
              onClick={fetchTags}
              disabled={loading}
              className="w-full  hover:bg-blue-700"
            >
              {loading ? "Generating..." : "Generate Tags"}
            </Button>
            <div className="flex flex-wrap gap-2 mt-4">
              {tags.map((tag, index) => (
                <>
                  {" "}
                  <Badge
                    key={index}
                    className="bg-gray-200 text-gray-800 px-2 py-1 rounded-md"
                  >
                    {tag}
                  </Badge>
                </>
              ))}
            </div>
            {tags.length > 0 ? (
              <Button onClick={copyTagsToClipboard} className="mt-4 w-full">
                Copy All Tags
              </Button>
            ) : (
              ""
            )}
          </CardContent>
        </Card>
           {/* Related Tools Section */}
           <RelatedToolsSection/>
      </div>
    </ToolLayout>
  );
};

export default YouTubeTagGenerator;
