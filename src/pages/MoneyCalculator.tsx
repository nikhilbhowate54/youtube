import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Calculator, DollarSign, TrendingUp } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import ToolLayout from "@/components/ToolLayout";
import RelatedToolsSection from "@/components/RelatedToolsSection";

const MoneyCalculator = () => {
  const [dailyViews, setDailyViews] = useState<number>(10000);
  const [cpm, setCpm] = useState<number>(0.25);
  const [earnings, setEarnings] = useState({
    daily: 0,
    monthly: 0,
    yearly: 0
  });
  const { toast } = useToast();

  const calculateEarnings = () => {
    const dailyEarning = (dailyViews / 1000) * cpm;
    const monthlyEarning = dailyEarning * 30;
    const yearlyEarning = monthlyEarning * 12;

    setEarnings({
      daily: Number(dailyEarning.toFixed(2)),
      monthly: Number(monthlyEarning.toFixed(2)),
      yearly: Number(yearlyEarning.toFixed(2))
    });

    toast({
      title: "Earnings Calculated!",
      description: "Your estimated earnings have been updated.",
    });
  };

  return (
    <ToolLayout
      title="YouTube Money Calculator"
      description="Calculate your potential YouTube earnings based on views and CPM. Adjust the sliders to see different scenarios."
    >
      <Card className="p-6 max-w-2xl mx-auto space-y-8">
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-lg font-medium flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              Daily Views: {dailyViews.toLocaleString()}
            </label>
            <Slider
              value={[dailyViews]}
              onValueChange={(value) => setDailyViews(value[0])}
              max={1000000}
              step={1000}
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <label className="text-lg font-medium flex items-center gap-2">
              <DollarSign className="w-5 h-5" />
              Estimated CPM: ${cpm.toFixed(2)}
            </label>
            <Slider
              value={[cpm]}
              onValueChange={(value) => setCpm(value[0])}
              max={10}
              step={0.25}
              className="w-full"
            />
          </div>

          <Button 
            onClick={calculateEarnings}
            className="w-full mt-6"
            size="lg"
          >
            <Calculator className="mr-2" />
            Calculate Earnings
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
          <Card className="p-4 text-center">
            <h3 className="text-lg font-medium mb-2">Daily Earnings</h3>
            <p className="text-2xl font-bold text-purple-600">${earnings.daily}</p>
          </Card>
          <Card className="p-4 text-center">
            <h3 className="text-lg font-medium mb-2">Monthly Earnings</h3>
            <p className="text-2xl font-bold text-purple-600">${earnings.monthly}</p>
          </Card>
          <Card className="p-4 text-center">
            <h3 className="text-lg font-medium mb-2">Yearly Earnings</h3>
            <p className="text-2xl font-bold text-purple-600">${earnings.yearly}</p>
          </Card>
        </div>
      </Card>
         {/* Related Tools Section */}
         <RelatedToolsSection/>
    </ToolLayout>
  );
};

export default MoneyCalculator;