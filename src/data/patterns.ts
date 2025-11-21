import { EmailTag } from "./emailDataset";

export interface Pattern {
  keywords: string[];
  description: string;
  confidence: "high" | "medium" | "low";
}

export interface AntiPattern {
  misleadingPhrase: string;
  wrongTag: EmailTag;
  correctContext: string;
  explanation: string;
}

export const positivePatterns: Record<EmailTag, Pattern[]> = {
  "Billing": [
    {
      keywords: ["payment", "failed", "charge", "declined"],
      description: "Payment processing issues",
      confidence: "high"
    },
    {
      keywords: ["refund", "double", "charged"],
      description: "Refund requests",
      confidence: "high"
    },
    {
      keywords: ["invoice", "bill", "subscription"],
      description: "Billing documents and subscription",
      confidence: "medium"
    },
    {
      keywords: ["upgrade", "downgrade", "plan"],
      description: "Plan changes",
      confidence: "medium"
    }
  ],
  "Technical Support": [
    {
      keywords: ["api", "error", "503", "500", "timeout"],
      description: "API errors and server issues",
      confidence: "high"
    },
    {
      keywords: ["ssl", "certificate", "https"],
      description: "Security and certificate issues",
      confidence: "high"
    },
    {
      keywords: ["webhook", "endpoint", "integration"],
      description: "Integration and webhook issues",
      confidence: "high"
    },
    {
      keywords: ["cors", "connection", "rate limit"],
      description: "Connection and access issues",
      confidence: "high"
    }
  ],
  "Feature Request": [
    {
      keywords: ["would love", "add", "feature"],
      description: "Direct feature requests",
      confidence: "high"
    },
    {
      keywords: ["export", "import", "bulk"],
      description: "Data management features",
      confidence: "medium"
    },
    {
      keywords: ["dark mode", "theme", "ui"],
      description: "Interface improvements",
      confidence: "medium"
    },
    {
      keywords: ["integration", "salesforce", "connect"],
      description: "Third-party integrations",
      confidence: "medium"
    }
  ],
  "Account Issue": [
    {
      keywords: ["password", "reset", "login"],
      description: "Authentication problems",
      confidence: "high"
    },
    {
      keywords: ["locked", "blocked", "access"],
      description: "Account access issues",
      confidence: "high"
    },
    {
      keywords: ["verification", "email", "expired"],
      description: "Account verification",
      confidence: "high"
    },
    {
      keywords: ["2fa", "two-factor", "authenticator"],
      description: "Two-factor authentication",
      confidence: "high"
    }
  ],
  "Bug Report": [
    {
      keywords: ["crash", "error", "not working"],
      description: "Application failures",
      confidence: "high"
    },
    {
      keywords: ["button", "doesn't", "clicking"],
      description: "UI element failures",
      confidence: "high"
    },
    {
      keywords: ["wrong", "incorrect", "showing"],
      description: "Data display issues",
      confidence: "medium"
    },
    {
      keywords: ["broken", "fails", "silently"],
      description: "Silent failures",
      confidence: "high"
    }
  ],
  "General Inquiry": [
    {
      keywords: ["how to", "where", "documentation"],
      description: "Documentation questions",
      confidence: "high"
    },
    {
      keywords: ["question", "wondering", "curious"],
      description: "General questions",
      confidence: "medium"
    },
    {
      keywords: ["training", "tutorial", "learn"],
      description: "Learning resources",
      confidence: "medium"
    },
    {
      keywords: ["status", "uptime", "maintenance"],
      description: "Service status inquiries",
      confidence: "high"
    }
  ]
};

export const antiPatterns: AntiPattern[] = [
  {
    misleadingPhrase: "billing address",
    wrongTag: "Billing",
    correctContext: "shipping or account setup context",
    explanation: "Presence of 'billing' word doesn't always mean billing issue - could be form field reference"
  },
  {
    misleadingPhrase: "technical term",
    wrongTag: "Technical Support",
    correctContext: "casual mention in non-technical context",
    explanation: "Technical jargon mentioned casually doesn't indicate technical issue - check if actually reporting problem"
  },
  {
    misleadingPhrase: "support",
    wrongTag: "Technical Support",
    correctContext: "customer support or general help",
    explanation: "'Support' alone is too ambiguous - need context about what type of support needed"
  },
  {
    misleadingPhrase: "upgrade",
    wrongTag: "Feature Request",
    correctContext: "pricing or billing discussion",
    explanation: "Upgrade in billing context means plan change, not new feature request"
  },
  {
    misleadingPhrase: "bug",
    wrongTag: "Bug Report",
    correctContext: "hypothetical or past tense discussion",
    explanation: "Mentioning bugs in general doesn't mean reporting a bug - check if active issue"
  },
  {
    misleadingPhrase: "feature",
    wrongTag: "Feature Request",
    correctContext: "asking how existing feature works",
    explanation: "Asking about existing feature usage is inquiry, not feature request"
  },
  {
    misleadingPhrase: "account number",
    wrongTag: "Account Issue",
    correctContext: "providing reference information",
    explanation: "Simply providing account number for reference doesn't indicate account problem"
  },
  {
    misleadingPhrase: "error message",
    wrongTag: "Bug Report",
    correctContext: "asking about error meaning in docs",
    explanation: "Asking about error documentation vs. actively experiencing error"
  }
];

export function getConfidenceThreshold(): number {
  return 0.7; // 70% confidence threshold
}

export function validateTagForCustomer(tag: EmailTag, customerId: string, allowedTags: EmailTag[]): boolean {
  return allowedTags.includes(tag);
}
