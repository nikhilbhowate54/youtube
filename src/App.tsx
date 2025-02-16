import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import TitleExtractor from "./pages/TitleExtractor";
import MoneyCalculator from "./pages/MoneyCalculator";
import SubscribeLink from "./pages/SubscribeLink";
import NotFound from "./pages/NotFound";
import React from "react";
import YoutubeTitleExtractor from "./pages/YoutubeTitleExtractor";
import YoutubeTitleGenerator from "./pages/YoutubeTitleGenerator";
import YouTubeTitleChecker from "./pages/YouTubeTitleLengthChecker";
import YouTubeHashtagGenerator from "./pages/YouTubeHashtagGenerator";
import YouTubeTagGenerator from "./pages/YouTubeTagGenerator";
import YouTubeHashtagExtractor from "./pages/YouTubeHashtagExtractor";
import YouTubeDescriptionExtractor from "./pages/YouTubeDescriptionExtractor";
import YouTubeDescriptionGenerator from "./pages/YouTubeDescriptionGenerator";
import YouTubeEmbedCodeGenerator from "./pages/YouTubeEmbedCodeGenerator";
import YouTubeChannelIDExtractor from "./pages/YouTubeChannelIDExtractor";
import YouTubeVideoStatistics from "./pages/YouTubeVideoStatistics";
import YouTubeRegionRestrictionChecker from "./pages/YouTubeRegionRestrictionChecker";
import YoutubeLogo from "./pages/YTLogoDownloader";
import { HelmetProvider } from "react-helmet-async";
import YTLogoDownloader from "./pages/YTLogoDownloader";
import YTChannelBannerDownloader from "./pages/YTChannelBannerDownloader";
import YouTubeChannelFinder from "./pages/YouTubeChannelFinder";
import TimestampGenerator from "./pages/TimestampGenerator";
import YouTubeCommentPicker from "./pages/YouTubeCommentPicker";
import YouTubeViewsRatioCalculator from "./pages/YouTubeViewsRatioCalculator";
import YouTubeChannelAgeChecker from "./pages/YouTubeChannelAgeChecker";
import YouTubeVideoCountChecker from "./pages/YouTubeVideoCountChecker";
import YouTubeTitleCapitalizer from "./pages/YouTubeTitleCapitalizer";
import ScrollToTop from "./components/ScrollToTop";

const queryClient = new QueryClient();

const App = () => (
  <React.StrictMode>
    <HelmetProvider>
      {" "}
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <TooltipProvider>
          <ScrollToTop />
            <Routes>
              <Route path="/" element={<Index />} />
              <Route
                path="/youtube-title-extractor"
                element={<TitleExtractor />}
              />
              <Route
                path="/youtube-title-extractors"
                element={<YoutubeTitleExtractor />}
              />
              <Route
                path="/youtube-money-calculator"
                element={<MoneyCalculator />}
              />
              <Route
                path="/youtube-subscribe-link"
                element={<SubscribeLink />}
              />
              <Route
                path="/youtube-title-generator"
                element={<YoutubeTitleGenerator />}
              />
              <Route path="/youtube-title-checker" element={<YouTubeTitleChecker />} />
              <Route
                path="/youtube-hashtag-generator"
                element={<YouTubeHashtagGenerator />}
              />
              <Route path="/youtube-tag-generator" element={<YouTubeTagGenerator />} />
              <Route
                path="/youtube-hashtag-extractor"
                element={<YouTubeHashtagExtractor />}
              />
              <Route
                path="/youtube-timestamp-generator"
                element={<TimestampGenerator />}
              />
              <Route
                path="/youtube-comment-picker"
                element={<YouTubeCommentPicker />}
              />
              <Route
                path="/youtube-views-ratio-calculator"
                element={<YouTubeViewsRatioCalculator />}
              />
              <Route
                path="/youtube-channel-age-checker"
                element={<YouTubeChannelAgeChecker />}
              />
              <Route
                path="/youtube-description-extractor"
                element={<YouTubeDescriptionExtractor />}
              />
              <Route
                path="/youtube-description-generator"
                element={<YouTubeDescriptionGenerator />}
              />
              <Route
                path="/youtube-embedcode-generator"
                element={<YouTubeEmbedCodeGenerator />}
              />
              <Route
                path="/youtube-channelid-extractor"
                element={<YouTubeChannelIDExtractor />}
              />
              <Route
                path="/youtube-video-statistics"
                element={<YouTubeVideoStatistics />}
              />
              <Route
                path="/region-restriction-checker"
                element={<YouTubeRegionRestrictionChecker />}
              />
              <Route path="/youtube-logo" element={<YTLogoDownloader />} />
              <Route
                path="/youtube-title-capitalizer"
                element={<YouTubeTitleCapitalizer />}
              />
              <Route
                path="/youtube-video-count-checker"
                element={<YouTubeVideoCountChecker />}
              />
              <Route
                path="/youtube-banner-downloader"
                element={<YTChannelBannerDownloader />}
              />
              <Route
                path="/channel-finder"
                element={<YouTubeChannelFinder />}
              />
              <Route path="/yt" element={<YoutubeTitleExtractor />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
            <Toaster />
            <Sonner />
          </TooltipProvider>
        </BrowserRouter>
      </QueryClientProvider>
    </HelmetProvider>
  </React.StrictMode>
);

export default App;
