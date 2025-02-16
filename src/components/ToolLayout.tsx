import { Card } from "@/components/ui/card";
import Footer from "./Footer";
import Navbar from "./Navbar";

interface ToolLayoutProps {
  children: React.ReactNode;
  title: string;
  description: string;
}

const ToolLayout = ({ children, title, description }: ToolLayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        <div className="min-h-screen bg-gradient-to-b from-background to-muted/50 px-4 py-8 md:py-16">
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="text-center space-y-4">
              <h1 className="text-4xl font-bold tracking-tight">
                {title}
              </h1>
              <p className="text-muted-foreground">
                {description}
              </p>
            </div>

            {children}

            <article className="prose prose-gray max-w-none mt-16 p-6 rounded-lg bg-card">
              <h2>How to Use the {title}</h2>
              <p>
                Our {title} is a simple yet powerful tool that helps you calculate potential earnings from your YouTube channel. Here's how to use it:
              </p>
              
              <ol>
                <li>
                  <strong>Adjust Daily Views</strong> - Use the slider to set your average daily views
                </li>
                <li>
                  <strong>Set CPM Rate</strong> - Adjust the CPM (Cost Per Mille) rate
                </li>
                <li>
                  <strong>Calculate</strong> - Click the Calculate button to see your estimated earnings
                </li>
                <li>
                  <strong>Review Results</strong> - View your daily, monthly, and yearly estimates
                </li>
              </ol>

              <h3>Features</h3>
              <ul>
                <li><strong>Real-time Updates</strong> - Instantly see how different view counts affect earnings</li>
                <li><strong>Multiple Time Frames</strong> - View daily, monthly, and yearly projections</li>
                <li><strong>User-Friendly Interface</strong> - Simple and intuitive design</li>
                <li><strong>Accurate Calculations</strong> - Based on industry-standard metrics</li>
              </ul>
            </article>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ToolLayout;