import React from 'react'
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

const RelatedToolsSection = () => {
  return (
    <div>     {/* Related Tools Section */}
    <section className="prose prose-gray max-w-none mt-8 p-6 rounded-lg bg-card">
      <h2 className="text-2xl font-bold mb-6">Related YouTube Tools</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[
          {
            name: "YouTube Tag Extractor",
            icon: <Tag className="w-4 h-4" />,
            link: "/youtube-title-extractor",
          },
          {
            name: "YouTube Tag Generator",
            icon: <Tag className="w-4 h-4" />,
            link: "/youtube-tag-generator",
          },
          {
            name: "YouTube Hashtag Extractor",
            icon: <Hash className="w-4 h-4" />,
            link: "/youtube-hashtag-extractor",
          },
          {
            name: "YouTube Hashtag Generator",
            icon: <Hash className="w-4 h-4" />,
            link: "/youtube-hashtag-generator",
          },
          {
            name: "YouTube Title Extractor",
            icon: <Type className="w-4 h-4" />,
            link: "/youtube-title-extractor",
          },
          {
            name: "YouTube Title Generator",
            icon: <Type className="w-4 h-4" />,
            link: "/youtube-title-generator",
          },
          {
            name: "YouTube Title Length Checker",
            icon: <Type className="w-4 h-4" />,
            link: "/youtube-title-checker",
          },
          {
            name: "YouTube Description Extractor",
            icon: <FileText className="w-4 h-4" />,
            link: "/youtube-description-extractor",
          },
          {
            name: "YouTube Description Generator",
            icon: <FileText className="w-4 h-4" />,
            link: "/youtube-description-generator",
          },
          {
            name: "YouTube Embed Code Generator",
            icon: <Code className="w-4 h-4" />,
            link: "/youtube-embedcode-generator",
          },
          {
            name: "YouTube Channel ID Extractor",
            icon: <User className="w-4 h-4" />,
            link: "/youtube-channelid-extractor",
          },
          {
            name: "YouTube Video Statistics",
            icon: <BarChart2 className="w-4 h-4" />,
            link: "/youtube-video-statistics",
          },
          {
            name: "YouTube Channel Statistics",
            icon: <BarChart2 className="w-4 h-4" />,
            link: "/youtube-video-statistics",
          },
          {
            name: "YouTube Region Restriction Checker",
            icon: <Globe className="w-4 h-4" />,
            link: "/region-restriction-checker",
          },
          {
            name: "YouTube Channel Logo Downloader",
            icon: <Image className="w-4 h-4" />,
            link: "/youtube-logo",
          },
          {
            name: "YouTube Channel Banner Downloader",
            icon: <Image className="w-4 h-4" />,
            link: "/youtube-banner-downloader",
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
            link:"/youtube-timestamp-generator"
          },
          {
            name: "YouTube Subscribe Link Generator",
            icon: <Link2 className="w-4 h-4" />,
            link: "/youtube-subscribe-link",
          },
          {
            name: "YouTube Money Calculator",
            icon: <Calculator className="w-4 h-4" />,
            link: "/youtube-money-calculator",
          },
          {
            name: "YouTube Video Count Checker",
            icon: <HashIcon className="w-4 h-4" />,
            link:"/youtube-video-count-checker"
          },
          {
            name: "Youtube Video Title Capitalizer",
            icon: <Type className="w-4 h-4" />,
            link:"/youtube-title-capitalizer"
          },
          {
            name: "YouTube Comment Picker",
            icon: <MessageSquare className="w-4 h-4" />,
            link:"/youtube-comment-picker",
          },
          {
            name: "YouTube Views Ratio Calculator",
            icon: <PieChart className="w-4 h-4" />,
            link:"/youtube-views-ratio-calculator",
          },
          {
            name: "YouTube Channel Age Checker",
            icon: <Clock className="w-4 h-4" />,
            link:"/youtube-channel-age-checker"
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
    </section></div>
  )
}

export default RelatedToolsSection