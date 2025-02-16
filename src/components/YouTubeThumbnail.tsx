import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";

interface ThumbnailProps {
  url: string;
  quality: string;
  className?: string;
}

export const YouTubeThumbnail = ({ url, quality, className }: ThumbnailProps) => {
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const downloadImage = async () => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const downloadUrl = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = `youtube-thumbnail-${quality}.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(downloadUrl);
      
      toast({
        title: "Success",
        description: "Thumbnail downloaded successfully",
        duration: 2000,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to download thumbnail",
        variant: "destructive",
        duration: 2000,
      });
    }
  };

  return (
    <div className={cn("relative group", className)}>
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-background/80">
          <div className="w-6 h-6 border-2 border-primary rounded-full animate-spin border-t-transparent" />
        </div>
      )}
      <img
        src={url}
        alt={`YouTube thumbnail - ${quality}`}
        className="w-full h-auto rounded-lg shadow-sm transition-transform duration-300 group-hover:scale-[1.02]"
        onLoad={() => setLoading(false)}
        onError={() => setLoading(false)}
      />
      <button
        onClick={downloadImage}
        className="absolute bottom-4 right-4 px-4 py-2 bg-black/80 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-black/90"
      >
        Download {quality}
      </button>
    </div>
  );
};