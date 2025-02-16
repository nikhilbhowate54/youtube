import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { YouTubeThumbnail } from "@/components/YouTubeThumbnail";
import {
  getVideoId,
  getThumbnailUrls,
  isValidYouTubeUrl,
} from "@/utils/youtube";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { NavLink } from "react-router-dom";
import {
  Tag,
  Hash,
  Type,
  FileText,
  Code,
  User,
  BarChart2,
  Globe,
  Image,
  Timer,
  Link2,
  Calculator,
  Hash as HashIcon,
  MessageSquare,
  PieChart,
  Clock,
} from "lucide-react";
import { link } from "fs";
import RelatedToolsSection from "@/components/RelatedToolsSection";

const Index = () => {
  const [url, setUrl] = useState("");
  const [thumbnails, setThumbnails] = useState<Record<string, string> | null>(
    null
  );
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!isValidYouTubeUrl(url)) {
      toast({
        title: "Invalid URL",
        description: "Please enter a valid YouTube URL",
        variant: "destructive",
        duration: 2000,
      });
      return;
    }

    const videoId = getVideoId(url);
    if (videoId) {
      setThumbnails(getThumbnailUrls(videoId));
    }
  };

  // Add structured FAQ data
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What is a YouTube Thumbnail Downloader?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "A YouTube Thumbnail Downloader is a tool that allows you to extract and download the thumbnail images from YouTube videos in various qualities, from standard definition to high definition resolutions.",
        },
      },
      {
        "@type": "Question",
        name: "How do I download a YouTube video thumbnail?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Simply copy the YouTube video URL, paste it into our input field, and click 'Get Thumbnails'. You'll then see all available thumbnail qualities which you can right-click and save to your device.",
        },
      },
      {
        "@type": "Question",
        name: "What thumbnail qualities are available?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "We provide thumbnails in multiple qualities: Maximum Resolution (HD), High Quality, Medium Quality, and Default Quality. The maximum resolution option offers the best image quality when available.",
        },
      },
      {
        "@type": "Question",
        name: "Are there any limitations to using this tool?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "This tool works with any public YouTube video. However, the availability of different thumbnail qualities depends on what YouTube provides for each video. Some videos might not have all quality options available.",
        },
      },
    ],
  };

  return (
    <div className="min-h-screen flex flex-col">
      <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>

      <Navbar />

      <main className="flex-1">
        <div className="min-h-screen bg-gradient-to-b from-background to-muted/50 px-4 py-8 md:py-16">
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="text-center space-y-4">
              <h1 className="text-4xl font-bold tracking-tight">
                YouTube Thumbnail Downloader
              </h1>
              <p className="text-muted-foreground">
                Enter a YouTube URL to download its thumbnails in different
                qualities
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex flex-col md:flex-row gap-4">
                <input
                  type="text"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="Paste YouTube URL here"
                  className="flex-1 px-4 py-3 rounded-lg border border-input bg-background shadow-sm transition-colors duration-200 placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-[#FF0000]/20"
                />
                <button
                  type="submit"
                  className="w-full md:w-auto px-6 py-3 rounded-lg bg-[#FF0000] text-white shadow-sm hover:bg-[#FF0000]/90 transition-colors duration-200"
                >
                  Get Thumbnails
                </button>
              </div>
            </form>

            {thumbnails && (
              <div className="space-y-8 animate-in fade-in-50 duration-500">
                <div className="grid gap-8">
                  <div className="space-y-2">
                    <span className="text-sm font-medium text-muted-foreground">
                      Maximum Resolution
                    </span>
                    <YouTubeThumbnail
                      url={thumbnails.maxres}
                      quality="Max Resolution"
                    />
                  </div>
                  <div className="space-y-2">
                    <span className="text-sm font-medium text-muted-foreground">
                      High Quality
                    </span>
                    <YouTubeThumbnail
                      url={thumbnails.high}
                      quality="High Quality"
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                      <span className="text-sm font-medium text-muted-foreground">
                        Medium Quality
                      </span>
                      <YouTubeThumbnail
                        url={thumbnails.medium}
                        quality="Medium Quality"
                      />
                    </div>
                    <div className="space-y-2">
                      <span className="text-sm font-medium text-muted-foreground">
                        Default Quality
                      </span>
                      <YouTubeThumbnail
                        url={thumbnails.default}
                        quality="Default Quality"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            <article className="prose prose-gray max-w-none mt-16 p-6 rounded-lg bg-card">
              <h2>How to Use the YouTube Thumbnail Downloader</h2>
              <p>
                Our YouTube Thumbnail Downloader is a simple yet powerful tool
                that allows you to download thumbnails from any YouTube video in
                various qualities. Here's how to use it:
              </p>

              <ol>
                <li>
                  <strong>Find your YouTube video</strong> - Navigate to the
                  YouTube video you want to get the thumbnail from
                </li>
                <li>
                  <strong>Copy the URL</strong> - Copy the video's URL from your
                  browser's address bar
                </li>
                <li>
                  <strong>Paste and download</strong> - Paste the URL into the
                  input field above and click "Get Thumbnails"
                </li>
                <li>
                  <strong>Choose quality</strong> - Select your preferred
                  thumbnail quality from the available options
                </li>
              </ol>

              <h3>Available Thumbnail Qualities</h3>
              <ul>
                <li>
                  <strong>Maximum Resolution (HD)</strong> - Best quality,
                  perfect for high-resolution displays
                </li>
                <li>
                  <strong>High Quality</strong> - Great for most uses
                </li>
                <li>
                  <strong>Medium Quality</strong> - Good balance of quality and
                  file size
                </li>
                <li>
                  <strong>Default Quality</strong> - Smallest file size, quick
                  to download
                </li>
              </ul>
 
              <p>
                Simply right-click on your preferred thumbnail and select "Save
                image as" to download it to your device.
              </p>
            </article>

            {/* Related Tools Section */}
            <RelatedToolsSection/>
            {/* <section className="prose prose-gray max-w-none mt-8 p-6 rounded-lg bg-card">
              <h2 className="text-2xl font-bold mb-6">Related YouTube Tools</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  {
                    name: "YouTube Tag Extractor",
                    icon: <Tag className="w-4 h-4" />,
                    link: "/title-extractor",
                  },
                  {
                    name: "YouTube Tag Generator",
                    icon: <Tag className="w-4 h-4" />,
                    link: "/tag-generator",
                  },
                  {
                    name: "YouTube Hashtag Extractor",
                    icon: <Hash className="w-4 h-4" />,
                    link: "/hashtag-extractor",
                  },
                  {
                    name: "YouTube Hashtag Generator",
                    icon: <Hash className="w-4 h-4" />,
                    link: "/hashtag-generator",
                  },
                  {
                    name: "YouTube Title Extractor",
                    icon: <Type className="w-4 h-4" />,
                    link: "/title-extractor",
                  },
                  {
                    name: "YouTube Title Generator",
                    icon: <Type className="w-4 h-4" />,
                    link: "/title-generator",
                  },
                  {
                    name: "YouTube Title Length Checker",
                    icon: <Type className="w-4 h-4" />,
                    link: "/title-checker",
                  },
                  {
                    name: "YouTube Description Extractor",
                    icon: <FileText className="w-4 h-4" />,
                    link: "/description-extractor",
                  },
                  {
                    name: "YouTube Description Generator",
                    icon: <FileText className="w-4 h-4" />,
                    link: "/description-generator",
                  },
                  {
                    name: "YouTube Embed Code Generator",
                    icon: <Code className="w-4 h-4" />,
                    link: "/embedcode-generator",
                  },
                  {
                    name: "YouTube Channel ID Extractor",
                    icon: <User className="w-4 h-4" />,
                    link: "/channelid-extractor",
                  },
                  {
                    name: "YouTube Video Statistics",
                    icon: <BarChart2 className="w-4 h-4" />,
                    link: "",
                  },
                  {
                    name: "YouTube Channel Statistics",
                    icon: <BarChart2 className="w-4 h-4" />,
                    link: "/video-statistics",
                  },
                  {
                    name: "YouTube Region Restriction Checker",
                    icon: <Globe className="w-4 h-4" />,
                    link: "/region-restriction-checker",
                  },
                  {
                    name: "YouTube Channel Logo Downloader",
                    icon: <Image className="w-4 h-4" />,
                    link: "/logo",
                  },
                  {
                    name: "YouTube Channel Banner Downloader",
                    icon: <Image className="w-4 h-4" />,
                    link: "/banner-downloader",
                  },
                  {
                    name: "YouTube Channel Finder",
                    icon: <User className="w-4 h-4" />,
                    link: "/channel-finder",
                  },
                  {
                    name: "YouTube Thumbnail Downloader",
                    icon: <Image className="w-4 h-4" />,
                    link: "/",
                  },
                  {
                    name: "YouTube Timestamp Link Generator",
                    icon: <Timer className="w-4 h-4" />,
                  },
                  {
                    name: "YouTube Subscribe Link Generator",
                    icon: <Link2 className="w-4 h-4" />,
                    link: "/subscribe-link",
                  },
                  {
                    name: "YouTube Money Calculator",
                    icon: <Calculator className="w-4 h-4" />,
                    link: "/money-calculator",
                  },
                  {
                    name: "YouTube Video Count Checker",
                    icon: <HashIcon className="w-4 h-4" />,
                  },
                  {
                    name: "Youtube Video Title Capitalizer",
                    icon: <Type className="w-4 h-4" />,
                  },
                  {
                    name: "YouTube Comment Picker",
                    icon: <MessageSquare className="w-4 h-4" />,
                  },
                  {
                    name: "YouTube Views Ratio Calculator",
                    icon: <PieChart className="w-4 h-4" />,
                  },
                  {
                    name: "YouTube Channel Age Checker",
                    icon: <Clock className="w-4 h-4" />,
                  },
                ].map((tool, index) => (
                  <NavLink
                    key={index}
                    to={tool?.link}
                    className="flex items-center gap-3 p-4 rounded-lg bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 shadow-sm border border-gray-200 dark:border-gray-700 transition-all duration-200 group no-underline"
                  >
                    <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-300 group-hover:bg-purple-200 dark:group-hover:bg-purple-800 transition-colors duration-200">
                      {tool.icon}
                    </div>
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-200 group-hover:text-gray-900 dark:group-hover:text-white">
                      {tool.name}
                    </span>
                  </NavLink>
                ))}
              </div>
            </section> */}

            {/* FAQ Section */}
            <section className="prose prose-gray max-w-none mt-8 p-6 rounded-lg bg-card">
              <h2>Frequently Asked Questions</h2>
              <div className="space-y-6">
                {faqSchema.mainEntity.map((faq, index) => (
                  <div key={index} className="space-y-2">
                    <h3 className="text-xl font-semibold">{faq.name}</h3>
                    <p
                      className="text-muted-foreground"
                      dangerouslySetInnerHTML={{
                        __html: faq.acceptedAnswer.text,
                      }}
                    ></p>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
