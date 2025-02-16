import { useState } from "react";
import { motion } from "framer-motion";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent } from "@/components/ui/card";
import Navbar from "@/components/Navbar";
import RelatedToolsSection from "@/components/RelatedToolsSection";

export default function YouTubeTitleChecker() {
  const [title, setTitle] = useState<string>("");
  const maxLimit: number = 100;
  const warningLimit: number = 70;

  const getColor = (): string => {
    if (title.length <= warningLimit) return "text-green-500";
    if (title.length <= maxLimit) return "text-orange-500";
    return "text-red-500";
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-purple-500 to-indigo-600 p-6">
        <motion.h1
          className="text-white text-4xl md:text-6xl font-extrabold mb-8 drop-shadow-lg text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          YouTube Title Length Checker
        </motion.h1>
        <Card className="w-full max-w-2xl p-8 bg-white shadow-2xl rounded-3xl transform transition-all hover:scale-105">
          <CardContent>
            <textarea
              className="w-full p-4 border-2 border-gray-300 rounded-lg focus:ring-4 focus:ring-indigo-500 text-xl resize-none shadow-inner"
              rows={4}
              placeholder="Enter your YouTube title..."
              value={title}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                setTitle(e.target.value)
              }
            />
            <div className="flex justify-between items-center mt-4">
              <motion.span
                className={`font-bold text-xl ${getColor()} drop-shadow-sm`}
                animate={{ scale: [1, 1.1, 1] }}
              >
                {title.length} / {maxLimit}
              </motion.span>
            </div>
            <Progress
              value={(title.length / maxLimit) * 100}
              className={`h-4 mt-4 rounded-full ${
                title.length > maxLimit ? "bg-red-500" : "bg-indigo-500"
              }`}
            />
            <p
              className={`mt-4 text-center text-lg font-semibold ${getColor()} drop-shadow-md`}
            >
              {title.length > maxLimit
                ? "⚠️ Title is too long! Keep it under 100 characters."
                : title.length > warningLimit
                ? "⚠️ Approaching limit! Best length is 70 characters."
                : "✅ Perfect! Your title is within the ideal length."}
            </p>
          </CardContent>
        </Card>
      </div>
         {/* Related Tools Section */}
         <RelatedToolsSection/>
    </div>
  );
}
