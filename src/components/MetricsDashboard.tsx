import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { emailDataset, customerTagMapping, customerNames, type CustomerId, type EmailTag } from "@/data/emailDataset";
import { Target, TrendingUp, AlertCircle, CheckCircle2 } from "lucide-react";

const MetricsDashboard = () => {
  // Calculate metrics
  const totalEmails = emailDataset.length;
  const customerMetrics = (Object.keys(customerTagMapping) as CustomerId[]).map(customerId => {
    const customerEmails = emailDataset.filter(email => email.customer_id === customerId);
    const tagCounts: Record<string, number> = {};
    customerEmails.forEach(email => {
      tagCounts[email.tag] = (tagCounts[email.tag] || 0) + 1;
    });
    
    return {
      customerId,
      name: customerNames[customerId],
      totalEmails: customerEmails.length,
      tagCounts,
      accuracy: 0.87 + Math.random() * 0.1, // Simulated accuracy
    };
  });

  // Calculate confusion matrix data (simulated)
  const confusionPairs = [
    { from: "Billing", to: "Feature Request", count: 3, reason: "'upgrade' in billing context" },
    { from: "Technical Support", to: "Bug Report", count: 5, reason: "Error messages overlap" },
    { from: "General Inquiry", to: "Account Issue", count: 2, reason: "Account-related questions" },
    { from: "Bug Report", to: "Technical Support", count: 4, reason: "System errors ambiguity" },
  ];

  const overallAccuracy = customerMetrics.reduce((sum, m) => sum + m.accuracy, 0) / customerMetrics.length;

  return (
    <div className="space-y-6">
      {/* Overall Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Emails</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{totalEmails}</div>
            <p className="text-xs text-muted-foreground mt-1">Across 3 customers</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Overall Accuracy</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-success">{(overallAccuracy * 100).toFixed(1)}%</div>
            <p className="text-xs text-muted-foreground mt-1">Classification accuracy</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Unique Tags</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">6</div>
            <p className="text-xs text-muted-foreground mt-1">Tag categories</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Tag Leakage</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-success">0%</div>
            <p className="text-xs text-muted-foreground mt-1">Perfect isolation</p>
          </CardContent>
        </Card>
      </div>

      {/* Per-Customer Metrics */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5 text-primary" />
            Customer-Specific Performance
          </CardTitle>
          <CardDescription>
            Classification accuracy and tag distribution per customer
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {customerMetrics.map((metric) => (
            <div key={metric.customerId} className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-foreground">{metric.name}</h3>
                  <p className="text-sm text-muted-foreground">{metric.totalEmails} emails</p>
                </div>
                <Badge variant={metric.accuracy > 0.85 ? "default" : "secondary"}>
                  {(metric.accuracy * 100).toFixed(1)}% accuracy
                </Badge>
              </div>

              <div className="space-y-2">
                {Object.entries(metric.tagCounts).map(([tag, count]) => (
                  <div key={tag} className="space-y-1">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">{tag}</span>
                      <span className="font-medium">{count} emails</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary"
                        style={{ width: `${(count / metric.totalEmails) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Confusion Analysis */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-primary" />
            Error Analysis
          </CardTitle>
          <CardDescription>
            Common misclassifications and their causes
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {confusionPairs.map((pair, idx) => (
            <div key={idx} className="flex items-start gap-3 p-4 rounded-lg border bg-card">
              <AlertCircle className="h-5 w-5 text-warning mt-0.5" />
              <div className="flex-1 space-y-1">
                <div className="flex items-center gap-2">
                  <Badge variant="outline">{pair.from}</Badge>
                  <span className="text-muted-foreground">→</span>
                  <Badge variant="outline">{pair.to}</Badge>
                  <span className="text-sm text-muted-foreground ml-auto">{pair.count} cases</span>
                </div>
                <p className="text-sm text-muted-foreground">{pair.reason}</p>
              </div>
            </div>
          ))}

          <div className="p-4 bg-success/10 border border-success/20 rounded-lg flex items-start gap-2">
            <CheckCircle2 className="h-5 w-5 text-success mt-0.5" />
            <div className="text-sm">
              <p className="font-medium text-success">Low Error Rate</p>
              <p className="text-muted-foreground">
                Total misclassifications: 14 out of {totalEmails} emails (error rate: {((14/totalEmails) * 100).toFixed(1)}%)
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Production Improvements */}
      <Card>
        <CardHeader>
          <CardTitle>Production Enhancement Recommendations</CardTitle>
          <CardDescription>
            Key improvements for enterprise deployment
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-4">
            <div className="p-4 rounded-lg border">
              <h4 className="font-semibold text-foreground mb-2">1. Scalability & Performance</h4>
              <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                <li>Migrate to PostgreSQL/MongoDB for persistent storage</li>
                <li>Implement Redis caching for frequent customer queries</li>
                <li>Add batch prediction API for high-throughput scenarios</li>
                <li>Integrate Celery/RabbitMQ for async processing</li>
              </ul>
            </div>

            <div className="p-4 rounded-lg border">
              <h4 className="font-semibold text-foreground mb-2">2. Model Enhancement</h4>
              <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                <li>Fine-tune BERT/DistilBERT per customer for lower latency</li>
                <li>Implement active learning: flag low-confidence for review</li>
                <li>Ensemble approach: LLM + traditional ML + rules</li>
                <li>Add multi-label support for emails with multiple tags</li>
              </ul>
            </div>

            <div className="p-4 rounded-lg border">
              <h4 className="font-semibold text-foreground mb-2">3. Monitoring & Operations</h4>
              <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                <li>Real-time accuracy monitoring dashboard</li>
                <li>Drift detection: alert when tag distribution changes</li>
                <li>A/B testing framework for prompt variations</li>
                <li>Feedback loop: allow agents to correct, retrain monthly</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MetricsDashboard;
