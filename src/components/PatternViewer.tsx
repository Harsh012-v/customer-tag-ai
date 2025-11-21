import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { positivePatterns, antiPatterns } from "@/data/patterns";
import { type EmailTag } from "@/data/emailDataset";
import { CheckCircle2, AlertTriangle, Shield } from "lucide-react";

const PatternViewer = () => {
  const tags = Object.keys(positivePatterns) as EmailTag[];

  return (
    <div className="space-y-6">
      {/* Positive Patterns */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5 text-success" />
            Positive Patterns
          </CardTitle>
          <CardDescription>
            Strong indicators for each tag category
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue={tags[0]} className="w-full">
            <TabsList className="grid grid-cols-3 lg:grid-cols-6">
              {tags.map((tag) => (
                <TabsTrigger key={tag} value={tag} className="text-xs">
                  {tag.split(' ')[0]}
                </TabsTrigger>
              ))}
            </TabsList>
            {tags.map((tag) => (
              <TabsContent key={tag} value={tag} className="space-y-4 mt-4">
                <div className="flex items-center gap-2 mb-4">
                  <h3 className="text-lg font-semibold text-foreground">{tag}</h3>
                  <Badge variant="outline">{positivePatterns[tag].length} patterns</Badge>
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  {positivePatterns[tag].map((pattern, idx) => (
                    <div key={idx} className="p-4 rounded-lg border bg-card space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-foreground">
                          {pattern.description}
                        </span>
                        <Badge 
                          variant={
                            pattern.confidence === "high" ? "default" : 
                            pattern.confidence === "medium" ? "secondary" : 
                            "outline"
                          }
                        >
                          {pattern.confidence}
                        </Badge>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {pattern.keywords.map((keyword) => (
                          <Badge key={keyword} variant="outline" className="text-xs">
                            {keyword}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
      </Card>

      {/* Anti-Patterns */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-warning" />
            Anti-Patterns
          </CardTitle>
          <CardDescription>
            Misleading indicators and how to avoid false positives
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {antiPatterns.map((antiPattern, idx) => (
            <div key={idx} className="p-4 rounded-lg border bg-card space-y-3">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <code className="text-sm bg-muted px-2 py-1 rounded">
                      "{antiPattern.misleadingPhrase}"
                    </code>
                    <span className="text-muted-foreground">→</span>
                    <Badge variant="destructive">{antiPattern.wrongTag}</Badge>
                  </div>
                  <p className="text-sm text-foreground mb-2">
                    <span className="font-medium">Correct context:</span> {antiPattern.correctContext}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {antiPattern.explanation}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Guardrails */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-primary" />
            Classification Guardrails
          </CardTitle>
          <CardDescription>
            Validation rules and confidence thresholds
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="p-4 rounded-lg bg-accent">
              <h4 className="font-semibold text-foreground mb-2">Confidence Threshold</h4>
              <p className="text-sm text-muted-foreground mb-3">
                Predictions below 70% confidence are flagged for manual review
              </p>
              <div className="flex items-center gap-4">
                <div className="flex-1">
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-success w-[70%]" />
                  </div>
                </div>
                <span className="text-sm font-medium">70%</span>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-accent">
              <h4 className="font-semibold text-foreground mb-2">Customer Isolation</h4>
              <p className="text-sm text-muted-foreground">
                Each prediction is validated against customer-specific tag vocabulary. 
                Tags from other customers are completely blocked, ensuring zero leakage.
              </p>
            </div>

            <div className="p-4 rounded-lg bg-accent">
              <h4 className="font-semibold text-foreground mb-2">Context Validation</h4>
              <p className="text-sm text-muted-foreground">
                Keywords are analyzed in context using surrounding words. Anti-pattern 
                rules check for misleading indicators before finalizing classification.
              </p>
            </div>

            <div className="p-4 rounded-lg bg-accent">
              <h4 className="font-semibold text-foreground mb-2">Keyword Blacklists</h4>
              <p className="text-sm text-muted-foreground mb-2">
                Certain keyword combinations are flagged for additional review:
              </p>
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline">billing + address</Badge>
                <Badge variant="outline">support (alone)</Badge>
                <Badge variant="outline">technical + casual</Badge>
                <Badge variant="outline">feature + existing</Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PatternViewer;
