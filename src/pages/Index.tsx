import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Mail, TrendingUp, Shield, Zap } from "lucide-react";
import EmailClassifier from "@/components/EmailClassifier";
import MetricsDashboard from "@/components/MetricsDashboard";
import PatternViewer from "@/components/PatternViewer";

const Index = () => {
  const [activeTab, setActiveTab] = useState("classifier");

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="h-10 w-10 rounded-lg bg-primary flex items-center justify-center">
              <Mail className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground">Email Tagging System</h1>
              <p className="text-sm text-muted-foreground">Customer-Specific AI Classification Platform</p>
            </div>
          </div>
          
          {/* Feature highlights */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            <div className="flex items-center gap-3 p-3 rounded-lg bg-accent/50">
              <Shield className="h-5 w-5 text-primary" />
              <div className="text-sm">
                <div className="font-semibold text-foreground">Customer Isolation</div>
                <div className="text-muted-foreground">Zero tag leakage</div>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-lg bg-accent/50">
              <Zap className="h-5 w-5 text-primary" />
              <div className="text-sm">
                <div className="font-semibold text-foreground">LLM-Powered</div>
                <div className="text-muted-foreground">Real-time classification</div>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-lg bg-accent/50">
              <TrendingUp className="h-5 w-5 text-primary" />
              <div className="text-sm">
                <div className="font-semibold text-foreground">Pattern Recognition</div>
                <div className="text-muted-foreground">Anti-pattern guardrails</div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 lg:w-[600px]">
            <TabsTrigger value="classifier">Email Classifier</TabsTrigger>
            <TabsTrigger value="metrics">Metrics & Analysis</TabsTrigger>
            <TabsTrigger value="patterns">Patterns & Rules</TabsTrigger>
          </TabsList>

          <TabsContent value="classifier" className="space-y-6">
            <EmailClassifier />
          </TabsContent>

          <TabsContent value="metrics" className="space-y-6">
            <MetricsDashboard />
          </TabsContent>

          <TabsContent value="patterns" className="space-y-6">
            <PatternViewer />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Index;
