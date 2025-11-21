import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Loader2, Mail, CheckCircle2, AlertCircle } from "lucide-react";
import { customerTagMapping, customerNames, type CustomerId, type EmailTag, emailDataset } from "@/data/emailDataset";
import { toast } from "sonner";

const EmailClassifier = () => {
  const [selectedCustomer, setSelectedCustomer] = useState<CustomerId>("customer_A");
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [isClassifying, setIsClassifying] = useState(false);
  const [result, setResult] = useState<{
    tag: EmailTag;
    confidence: number;
    reasoning: string;
  } | null>(null);

  const availableTags = customerTagMapping[selectedCustomer];

  const loadSampleEmail = () => {
    const customerEmails = emailDataset.filter(email => email.customer_id === selectedCustomer);
    const randomEmail = customerEmails[Math.floor(Math.random() * customerEmails.length)];
    setSubject(randomEmail.subject);
    setBody(randomEmail.body);
    setResult(null);
  };

  const classifyEmail = async () => {
    if (!subject.trim() || !body.trim()) {
      toast.error("Please enter both subject and body");
      return;
    }

    setIsClassifying(true);
    setResult(null);

    // Simulate LLM classification (in production, this would call Lovable AI)
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Simple pattern matching for demo purposes
    const lowerBody = body.toLowerCase();
    const lowerSubject = subject.toLowerCase();
    const combined = lowerBody + " " + lowerSubject;

    let predictedTag: EmailTag = availableTags[0];
    let confidence = 0.5;
    let reasoning = "";

    // Pattern matching logic
    if (availableTags.includes("Billing")) {
      if (combined.includes("payment") || combined.includes("invoice") || combined.includes("refund") || combined.includes("charge")) {
        predictedTag = "Billing";
        confidence = 0.92;
        reasoning = "Strong billing keywords detected: payment/invoice/refund patterns";
      }
    }
    
    if (availableTags.includes("Technical Support")) {
      if (combined.includes("api") || combined.includes("error") || combined.includes("503") || combined.includes("ssl") || combined.includes("timeout")) {
        predictedTag = "Technical Support";
        confidence = 0.89;
        reasoning = "Technical error indicators: API/server/integration issues";
      }
    }
    
    if (availableTags.includes("Feature Request")) {
      if (combined.includes("would love") || combined.includes("feature") || combined.includes("add") || combined.includes("export")) {
        predictedTag = "Feature Request";
        confidence = 0.85;
        reasoning = "Feature request language detected: enhancement suggestions";
      }
    }
    
    if (availableTags.includes("Account Issue")) {
      if (combined.includes("password") || combined.includes("login") || combined.includes("locked") || combined.includes("verification")) {
        predictedTag = "Account Issue";
        confidence = 0.91;
        reasoning = "Account access patterns: authentication/verification problems";
      }
    }
    
    if (availableTags.includes("Bug Report")) {
      if (combined.includes("crash") || combined.includes("not working") || combined.includes("broken") || combined.includes("bug")) {
        predictedTag = "Bug Report";
        confidence = 0.88;
        reasoning = "Bug indicators: application failures and errors";
      }
    }
    
    if (availableTags.includes("General Inquiry")) {
      if (combined.includes("how to") || combined.includes("question") || combined.includes("documentation") || combined.includes("where")) {
        predictedTag = "General Inquiry";
        confidence = 0.83;
        reasoning = "Informational request: documentation and process questions";
      }
    }

    setResult({ tag: predictedTag, confidence, reasoning });
    setIsClassifying(false);
    toast.success("Email classified successfully");
  };

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      {/* Input Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Mail className="h-5 w-5 text-primary" />
            Email Input
          </CardTitle>
          <CardDescription>
            Enter email details for classification
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="customer">Customer</Label>
            <Select value={selectedCustomer} onValueChange={(value) => setSelectedCustomer(value as CustomerId)}>
              <SelectTrigger id="customer">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {(Object.keys(customerNames) as CustomerId[]).map((id) => (
                  <SelectItem key={id} value={id}>
                    {customerNames[id]}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <div className="flex flex-wrap gap-1 mt-2">
              <span className="text-xs text-muted-foreground">Available tags:</span>
              {availableTags.map((tag) => (
                <Badge key={tag} variant="outline" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="subject">Subject</Label>
            <Input
              id="subject"
              placeholder="Email subject line"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="body">Body</Label>
            <Textarea
              id="body"
              placeholder="Email body content"
              value={body}
              onChange={(e) => setBody(e.target.value)}
              rows={8}
            />
          </div>

          <div className="flex gap-2">
            <Button onClick={classifyEmail} disabled={isClassifying} className="flex-1">
              {isClassifying ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Classifying...
                </>
              ) : (
                "Classify Email"
              )}
            </Button>
            <Button onClick={loadSampleEmail} variant="outline">
              Load Sample
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Results Card */}
      <Card>
        <CardHeader>
          <CardTitle>Classification Result</CardTitle>
          <CardDescription>
            LLM-based tag prediction with confidence score
          </CardDescription>
        </CardHeader>
        <CardContent>
          {!result ? (
            <div className="flex flex-col items-center justify-center py-12 text-center text-muted-foreground">
              <Mail className="h-12 w-12 mb-4 opacity-20" />
              <p>Enter an email and click "Classify Email" to see results</p>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Predicted Tag */}
              <div className="space-y-2">
                <Label>Predicted Tag</Label>
                <div className="flex items-center gap-2">
                  <Badge className="text-lg py-2 px-4" variant={result.confidence > 0.7 ? "default" : "secondary"}>
                    {result.tag}
                  </Badge>
                  {result.confidence > 0.7 ? (
                    <CheckCircle2 className="h-5 w-5 text-success" />
                  ) : (
                    <AlertCircle className="h-5 w-5 text-warning" />
                  )}
                </div>
              </div>

              {/* Confidence Score */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label>Confidence Score</Label>
                  <span className="text-sm font-semibold">
                    {(result.confidence * 100).toFixed(1)}%
                  </span>
                </div>
                <div className="h-3 bg-muted rounded-full overflow-hidden">
                  <div
                    className={`h-full transition-all ${
                      result.confidence > 0.7 ? "bg-success" : "bg-warning"
                    }`}
                    style={{ width: `${result.confidence * 100}%` }}
                  />
                </div>
                <p className="text-xs text-muted-foreground">
                  {result.confidence > 0.7 ? "High confidence" : "Low confidence - review recommended"}
                </p>
              </div>

              {/* Reasoning */}
              <div className="space-y-2">
                <Label>Reasoning</Label>
                <div className="p-4 bg-accent rounded-lg">
                  <p className="text-sm text-foreground">{result.reasoning}</p>
                </div>
              </div>

              {/* Customer Isolation Verification */}
              <div className="space-y-2">
                <Label>Customer Isolation Check</Label>
                <div className="p-4 bg-success/10 border border-success/20 rounded-lg flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-success mt-0.5" />
                  <div className="text-sm">
                    <p className="font-medium text-success">Verified</p>
                    <p className="text-muted-foreground">
                      Tag "{result.tag}" is valid for {customerNames[selectedCustomer]}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default EmailClassifier;
