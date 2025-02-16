import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { FileText, Copy, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { isValidYouTubeUrl } from "@/utils/youtube";
import RelatedToolsSection from "@/components/RelatedToolsSection";

const TitleExtractor = () => {
  const [url, setUrl] = useState("");
  const [title, setTitle] = useState<string | null>(null);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!url.trim()) {
      toast({
        title: "Error",
        description: "Please enter a YouTube URL",
        variant: "destructive",
        duration: 2000,
      });
      return;
    }

    if (!isValidYouTubeUrl(url)) {
      toast({
        title: "Error",
        description: "Please enter a valid YouTube URL",
        variant: "destructive",
        duration: 2000,
      });
      return;
    }

    try {
      const encodedUrl = encodeURIComponent(url);
      const response = await fetch(`https://www.youtube.com/oembed?url=${encodedUrl}&format=json`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch video title');
      }
      
      const data = await response.json();
      setTitle(data.title);
      
      toast({
        title: "Success",
        description: "Title extracted successfully!",
        duration: 2000,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to extract title. Please check the URL and try again",
        variant: "destructive",
        duration: 2000,
      });
    }
  };

  const copyToClipboard = () => {
    if (title) {
      navigator.clipboard.writeText(title);
      toast({
        title: "Copied!",
        description: "Title copied to clipboard",
        duration: 2000,
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        <div className="min-h-screen bg-gradient-to-b from-background to-muted/50 px-4 py-8 md:py-16">
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="text-center space-y-4">
              <h1 className="text-4xl font-bold tracking-tight">
                YouTube Title Extractor
              </h1>
              <p className="text-muted-foreground">
                Extract the title of any YouTube video instantly. Copy and paste the video URL in the toolbox and click Extract.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex flex-col md:flex-row gap-4">
                <input
                  type="text"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="Paste YouTube URL here (e.g., https://www.youtube.com/watch?v=...)"
                  className="flex-1 px-4 py-3 rounded-lg border border-input bg-background shadow-sm transition-colors duration-200 placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-purple-500/20"
                />
                <Button
                  type="submit"
                  className="w-full md:w-auto px-6 py-3 bg-purple-600 hover:bg-purple-700"
                >
                  <Search className="w-4 h-4 mr-2" />
                  Extract Title
                </Button>
              </div>
            </form>

            {title && (
              <div className="animate-in fade-in-50 duration-500">
                <div className="p-6 rounded-lg bg-card border shadow-sm">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-full bg-purple-100 dark:bg-purple-900/20">
                        <FileText className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                      </div>
                      <div className="space-y-1">
                        <h3 className="font-medium">Extracted Title</h3>
                        <p className="text-sm text-muted-foreground break-all">
                          {title}
                        </p>
                      </div>
                    </div>
                    <Button
                      onClick={copyToClipboard}
                      variant="outline"
                      size="icon"
                      className="shrink-0"
                    >
                      <Copy className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            )}

            <article className="prose prose-gray max-w-none mt-16 p-6 rounded-lg bg-card">
              <h2>How to Use the YouTube Title Extractor</h2>
              <p>
                Our YouTube Title Extractor is a simple yet powerful tool that allows you to extract titles from any YouTube video. Here's how to use it:
              </p>
              
              <ol>
                <li>
                  <strong>Find your YouTube video</strong> - Navigate to the YouTube video you want to get the title from
                </li>
                <li>
                  <strong>Copy the URL</strong> - Copy the video's URL from your browser's address bar
                </li>
                <li>
                  <strong>Paste and extract</strong> - Paste the URL into the input field above and click "Extract Title"
                </li>
                <li>
                  <strong>Copy the title</strong> - Click the copy button to copy the extracted title to your clipboard
                </li>
              </ol>

              <h3>Features</h3>
              <ul>
                <li><strong>Instant Extraction</strong> - Get video titles in seconds</li>
                <li><strong>One-Click Copy</strong> - Easily copy extracted titles to clipboard</li>
                <li><strong>Error Handling</strong> - Clear feedback for invalid URLs</li>
                <li><strong>User-Friendly Interface</strong> - Simple and intuitive design</li>
              </ul>
            </article>
            {/* Related Tools Section */}
            <RelatedToolsSection/>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default TitleExtractor;
