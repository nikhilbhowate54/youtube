import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import ToolLayout from "@/components/ToolLayout";
import RelatedToolsSection from "@/components/RelatedToolsSection";

const YouTubeViewsRatioCalculator = () => {
  const [views, setViews] = useState("");
  const [likes, setLikes] = useState("");
  const [comments, setComments] = useState("");
  const [ratio, setRatio] = useState(null);

  const calculateRatio = () => {
    const viewsNum = parseFloat(views);
    const likesNum = parseFloat(likes);
    const commentsNum = parseFloat(comments);

    if (isNaN(viewsNum) || isNaN(likesNum) || isNaN(commentsNum) || viewsNum === 0) {
      setRatio(null);
      return;
    }

    const likeRatio = ((likesNum / viewsNum) * 100).toFixed(2);
    const commentRatio = ((commentsNum / viewsNum) * 100).toFixed(2);
    setRatio({ likeRatio, commentRatio });
  };

  return (
    <ToolLayout
    title="YouTube Views Ratio Calculator"
    description="Easily YouTube Views Ratio Calculator. Enter link and click."
  >
    <div className="flex flex-col items-center p-4">
      {/* <h1 className="text-2xl font-bold mb-4">YouTube Views Ratio Calculator</h1> */}
      <Card className="w-full  p-4">
        <CardContent className="flex flex-col gap-2">
          <Input
            type="number"
            placeholder="Enter Total Views"
            value={views}
            onChange={(e) => setViews(e.target.value)}
          />
          <Input
            type="number"
            placeholder="Enter Total Likes"
            value={likes}
            onChange={(e) => setLikes(e.target.value)}
          />
          <Input
            type="number"
            placeholder="Enter Total Comments"
            value={comments}
            onChange={(e) => setComments(e.target.value)}
          />
          <Button className="mt-2 w-full" onClick={calculateRatio}>
            Calculate Ratio
          </Button>
        </CardContent>
      </Card>
      {ratio && (
        <Card className="w-full max-w-md mt-4 p-4">
          <CardContent>
            <p className="text-lg font-semibold">Like Ratio: {ratio.likeRatio}%</p>
            <p className="text-lg font-semibold">Comment Ratio: {ratio.commentRatio}%</p>
          </CardContent>
        </Card>
      )}
         {/* Related Tools Section */}
         <RelatedToolsSection/>
    </div>
    </ToolLayout>
  );
};

export default YouTubeViewsRatioCalculator;
