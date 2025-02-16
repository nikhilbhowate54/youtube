import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link, Youtube, Copy } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import ToolLayout from "@/components/ToolLayout";
import RelatedToolsSection from "@/components/RelatedToolsSection";

const SubscribeLink = () => {
  const [channelUrl, setChannelUrl] = useState("");
  const [subscribeLink, setSubscribeLink] = useState("");
  const { toast } = useToast();

  const generateSubscribeLink = () => {
    try {
      // Clean the input URL
      let cleanUrl = channelUrl.trim();
      if (!cleanUrl.startsWith('http')) {
        cleanUrl = 'https://' + cleanUrl;
      }

      const url = new URL(cleanUrl);
      
      // Transform the URL to subscription format
      const subscriptionUrl = `${url.origin}${url.pathname}?sub_confirmation=1`;
      setSubscribeLink(subscriptionUrl);
      
      toast({
        title: "Success!",
        description: "Subscribe link generated successfully",
        duration: 2000,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Please enter a valid YouTube channel URL",
        variant: "destructive",
        duration: 2000,
      });
    }
  };

  const copyToClipboard = () => {
    if (subscribeLink) {
      navigator.clipboard.writeText(subscribeLink);
      toast({
        title: "Copied!",
        description: "Link copied to clipboard",
        duration: 2000,
      });
    }
  };

  const openLink = () => {
    if (subscribeLink) {
      window.open(subscribeLink, '_blank');
    }
  };

  return (
    <ToolLayout
      title="YouTube Subscribe Link Generator"
      description="Easily generate YouTube subscription links. Enter your YouTube channel URL and click Generate."
    >
      <Card className="p-6 max-w-2xl mx-auto space-y-8">
        <div className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="channelUrl" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              Channel URL
            </label>
            <div className="flex space-x-2">
              <Input
                id="channelUrl"
                placeholder="www.youtube.com/@YourChannel"
                value={channelUrl}
                onChange={(e) => setChannelUrl(e.target.value)}
                className="flex-1"
              />
              <Button onClick={generateSubscribeLink} className="bg-purple-600 hover:bg-purple-700">
                <Link className="mr-2 h-4 w-4" />
                Generate
              </Button>
            </div>
          </div>

          {subscribeLink && (
            <div className="animate-in fade-in-50 space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Here is your YouTube subscription link:</h3>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium leading-none">
                    Copy Link:
                  </label>
                  <div className="flex items-center space-x-2">
                    <Input
                      value={subscribeLink}
                      readOnly
                      className="flex-1 bg-muted"
                    />
                    <Button
                      onClick={copyToClipboard}
                      variant="outline"
                      className="shrink-0"
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium leading-none">
                    Go to Link:
                  </label>
                  <div>
                    <Button
                      onClick={openLink}
                      variant="outline"
                      className="w-full justify-start text-left"
                    >
                      <Youtube className="mr-2 h-4 w-4" />
                      {subscribeLink}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </Card>
         {/* Related Tools Section */}
         <RelatedToolsSection/>
    </ToolLayout>
  );
};

export default SubscribeLink;