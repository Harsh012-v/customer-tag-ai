export type EmailTag = 
  | "Billing" 
  | "Technical Support" 
  | "Feature Request" 
  | "Account Issue" 
  | "Bug Report" 
  | "General Inquiry";

export type CustomerId = "customer_A" | "customer_B" | "customer_C";

export interface Email {
  id: string;
  subject: string;
  body: string;
  customer_id: CustomerId;
  tag: EmailTag;
  timestamp: string;
}

export const customerTagMapping: Record<CustomerId, EmailTag[]> = {
  customer_A: ["Billing", "Technical Support", "Feature Request"],
  customer_B: ["Account Issue", "Bug Report", "General Inquiry"],
  customer_C: ["Billing", "Bug Report", "Feature Request", "Technical Support"],
};

export const customerNames: Record<CustomerId, string> = {
  customer_A: "Acme Corp",
  customer_B: "Beta Industries",
  customer_C: "Gamma Tech",
};

export const emailDataset: Email[] = [
  // Customer A - Acme Corp (Billing, Technical Support, Feature Request)
  {
    id: "1",
    subject: "Payment failed for invoice #12345",
    body: "Hi, my credit card payment was declined this morning. The charge for $299.99 didn't go through. Can you help me process this payment? My billing address hasn't changed.",
    customer_id: "customer_A",
    tag: "Billing",
    timestamp: "2025-01-15T09:23:00Z"
  },
  {
    id: "2",
    subject: "Cannot connect to API endpoint",
    body: "Our production environment is experiencing 503 errors when calling /api/v2/users. This started about 30 minutes ago. Error logs show 'Connection timeout'. Need urgent assistance.",
    customer_id: "customer_A",
    tag: "Technical Support",
    timestamp: "2025-01-15T10:45:00Z"
  },
  {
    id: "3",
    subject: "Add bulk export functionality",
    body: "Would love to see a feature that allows exporting all user data in CSV format. Currently we can only export one record at a time which is very time consuming for our team.",
    customer_id: "customer_A",
    tag: "Feature Request",
    timestamp: "2025-01-14T14:20:00Z"
  },
  {
    id: "4",
    subject: "Refund request for double charge",
    body: "I was charged twice for last month's subscription - once on Jan 1st and again on Jan 5th. Please refund one of these charges. Transaction IDs: TXN-991823 and TXN-991956.",
    customer_id: "customer_A",
    tag: "Billing",
    timestamp: "2025-01-13T11:15:00Z"
  },
  {
    id: "5",
    subject: "API rate limits too restrictive",
    body: "The current 100 requests/minute limit is causing issues for our integration. Is there a way to increase this? We're on the Enterprise plan and need at least 500 requests/minute.",
    customer_id: "customer_A",
    tag: "Technical Support",
    timestamp: "2025-01-12T16:30:00Z"
  },
  {
    id: "6",
    subject: "Dark mode for dashboard",
    body: "It would be great if the admin dashboard had a dark mode option. Our team works late hours and the bright interface is hard on the eyes. This is a common request from our users.",
    customer_id: "customer_A",
    tag: "Feature Request",
    timestamp: "2025-01-11T13:45:00Z"
  },
  {
    id: "7",
    subject: "Invoice missing tax details",
    body: "The invoice for December doesn't show the tax breakdown. We need this for our accounting department. Can you resend with full tax information included?",
    customer_id: "customer_A",
    tag: "Billing",
    timestamp: "2025-01-10T10:00:00Z"
  },
  {
    id: "8",
    subject: "SSL certificate error on subdomain",
    body: "Getting SSL_CERTIFICATE_UNKNOWN errors when accessing api-staging.example.com. The main domain works fine. Can you check the certificate configuration?",
    customer_id: "customer_A",
    tag: "Technical Support",
    timestamp: "2025-01-09T15:20:00Z"
  },
  {
    id: "9",
    subject: "Integration with Salesforce",
    body: "We use Salesforce as our CRM and would love a native integration. Currently doing manual data entry which is error-prone. A two-way sync would be ideal.",
    customer_id: "customer_A",
    tag: "Feature Request",
    timestamp: "2025-01-08T12:00:00Z"
  },
  {
    id: "10",
    subject: "Upgrade to annual plan - discount question",
    body: "Currently on monthly billing at $99/mo. If I switch to annual, do I get a discount? Also, will the unused portion of this month be credited?",
    customer_id: "customer_A",
    tag: "Billing",
    timestamp: "2025-01-07T09:30:00Z"
  },
  {
    id: "11",
    subject: "Webhook delivery failures",
    body: "Our webhook endpoint at https://hooks.acme.com/events hasn't received any events since yesterday. The endpoint is up and responding with 200. Can you check your delivery logs?",
    customer_id: "customer_A",
    tag: "Technical Support",
    timestamp: "2025-01-06T14:15:00Z"
  },
  {
    id: "12",
    subject: "Custom fields in user profiles",
    body: "Need ability to add custom fields to user profiles. Our business requires tracking internal employee IDs and department codes that aren't currently supported.",
    customer_id: "customer_A",
    tag: "Feature Request",
    timestamp: "2025-01-05T11:45:00Z"
  },
  {
    id: "13",
    subject: "Billing cycle change request",
    body: "Can we change our billing date from the 1st to the 15th of each month? This would align better with our internal accounting processes.",
    customer_id: "customer_A",
    tag: "Billing",
    timestamp: "2025-01-04T10:20:00Z"
  },

  // Customer B - Beta Industries (Account Issue, Bug Report, General Inquiry)
  {
    id: "14",
    subject: "Cannot reset password",
    body: "I've tried the 'Forgot Password' link multiple times but never receive the reset email. Checked spam folder too. My email is correct: john@betaindustries.com",
    customer_id: "customer_B",
    tag: "Account Issue",
    timestamp: "2025-01-15T08:45:00Z"
  },
  {
    id: "15",
    subject: "Dashboard shows wrong data",
    body: "The analytics dashboard is displaying user counts from last week. Refreshed multiple times but still showing 1,234 users when we actually have 2,456. Browser: Chrome 120.",
    customer_id: "customer_B",
    tag: "Bug Report",
    timestamp: "2025-01-14T13:30:00Z"
  },
  {
    id: "16",
    subject: "How to add team members?",
    body: "Quick question - what's the process for adding new team members to our account? Can't find this in the documentation. Do they need separate licenses?",
    customer_id: "customer_B",
    tag: "General Inquiry",
    timestamp: "2025-01-13T16:00:00Z"
  },
  {
    id: "17",
    subject: "Email verification link expired",
    body: "Created a new account yesterday but didn't verify the email in time. Now the verification link is expired and I can't login. How do I resend the verification email?",
    customer_id: "customer_B",
    tag: "Account Issue",
    timestamp: "2025-01-12T09:15:00Z"
  },
  {
    id: "18",
    subject: "Export button not working",
    body: "Clicking the 'Export to CSV' button doesn't do anything. No download starts, no error message. Tested on both Firefox and Safari. This worked fine last month.",
    customer_id: "customer_B",
    tag: "Bug Report",
    timestamp: "2025-01-11T14:45:00Z"
  },
  {
    id: "19",
    subject: "Documentation on API authentication",
    body: "Where can I find complete documentation on API authentication methods? The getting started guide mentions OAuth but doesn't show implementation examples.",
    customer_id: "customer_B",
    tag: "General Inquiry",
    timestamp: "2025-01-10T11:30:00Z"
  },
  {
    id: "20",
    subject: "Two-factor authentication issues",
    body: "Enabled 2FA yesterday but now my authenticator app codes aren't working. Getting 'Invalid code' error. I'm locked out of my account. Tried backup codes - also invalid.",
    customer_id: "customer_B",
    tag: "Account Issue",
    timestamp: "2025-01-09T10:00:00Z"
  },
  {
    id: "21",
    subject: "Mobile app crashes on launch",
    body: "iOS app crashes immediately after opening. Just see the splash screen then it closes. iPhone 14 Pro, iOS 17.2. Deleted and reinstalled - same issue. App worked fine last week.",
    customer_id: "customer_B",
    tag: "Bug Report",
    timestamp: "2025-01-08T15:20:00Z"
  },
  {
    id: "22",
    subject: "Service status and uptime",
    body: "Is there a status page where we can check system uptime and scheduled maintenance windows? Need this for our internal monitoring.",
    customer_id: "customer_B",
    tag: "General Inquiry",
    timestamp: "2025-01-07T12:45:00Z"
  },
  {
    id: "23",
    subject: "Cannot change account email address",
    body: "Trying to update my account email from old@beta.com to new@betaindustries.com but get 'Email already in use' error. The new email is definitely not registered elsewhere.",
    customer_id: "customer_B",
    tag: "Account Issue",
    timestamp: "2025-01-06T09:30:00Z"
  },
  {
    id: "24",
    subject: "Notification emails not arriving",
    body: "Stopped receiving notification emails about 3 days ago. Checked settings - notifications are enabled. Receiving other emails fine so it's not our mail server.",
    customer_id: "customer_B",
    tag: "Bug Report",
    timestamp: "2025-01-05T14:00:00Z"
  },
  {
    id: "25",
    subject: "Training materials availability",
    body: "Do you offer training webinars or video tutorials for new users? Our team is onboarding 20 people next month and want to prepare materials.",
    customer_id: "customer_B",
    tag: "General Inquiry",
    timestamp: "2025-01-04T11:15:00Z"
  },
  {
    id: "26",
    subject: "Account locked after multiple login attempts",
    body: "My account got locked after I mistyped my password a few times. How long until it automatically unlocks? Or is there a way to unlock it manually?",
    customer_id: "customer_B",
    tag: "Account Issue",
    timestamp: "2025-01-03T10:45:00Z"
  },

  // Customer C - Gamma Tech (Billing, Bug Report, Feature Request, Technical Support)
  {
    id: "27",
    subject: "Overcharge on monthly bill",
    body: "This month's bill shows $1,499 but our plan is $999/month. The additional $500 appears to be for API calls but we're well under our quota. Please review and correct.",
    customer_id: "customer_C",
    tag: "Billing",
    timestamp: "2025-01-15T13:20:00Z"
  },
  {
    id: "28",
    subject: "Search function returns no results",
    body: "The search bar in the dashboard returns 'No results found' for everything. Even searching for items I'm currently looking at. Tried different browsers - same issue everywhere.",
    customer_id: "customer_C",
    tag: "Bug Report",
    timestamp: "2025-01-14T16:45:00Z"
  },
  {
    id: "29",
    subject: "Multi-language support",
    body: "Our company operates in 5 countries. Would be extremely valuable to have the interface available in Spanish, French, and German in addition to English.",
    customer_id: "customer_C",
    tag: "Feature Request",
    timestamp: "2025-01-13T10:30:00Z"
  },
  {
    id: "30",
    subject: "GraphQL API timeout errors",
    body: "Getting timeout errors on complex GraphQL queries. Simple queries work fine but anything with nested relations times out after 30 seconds. Error code: ECONNABORTED.",
    customer_id: "customer_C",
    tag: "Technical Support",
    timestamp: "2025-01-12T14:00:00Z"
  },
  {
    id: "31",
    subject: "Credit card declined but still charged",
    body: "Payment was declined yesterday (card expired) but I still see a pending charge for $999 on my statement. Can you verify if payment went through or not?",
    customer_id: "customer_C",
    tag: "Billing",
    timestamp: "2025-01-11T09:15:00Z"
  },
  {
    id: "32",
    subject: "Dates showing in wrong timezone",
    body: "All timestamps in the UI show EST but our team is in PST. User profile is set to Pacific timezone but dates still display incorrectly. Started after last update.",
    customer_id: "customer_C",
    tag: "Bug Report",
    timestamp: "2025-01-10T15:30:00Z"
  },
  {
    id: "33",
    subject: "Audit log export feature",
    body: "Need ability to export complete audit logs for compliance purposes. Currently can only view in UI but need downloadable reports for SOC 2 audit.",
    customer_id: "customer_C",
    tag: "Feature Request",
    timestamp: "2025-01-09T11:45:00Z"
  },
  {
    id: "34",
    subject: "CORS errors on staging environment",
    body: "Production works fine but staging.gamma.com getting CORS errors when calling your API. Access-Control-Allow-Origin header seems to be missing. Can you whitelist our staging domain?",
    customer_id: "customer_C",
    tag: "Technical Support",
    timestamp: "2025-01-08T13:00:00Z"
  },
  {
    id: "35",
    subject: "Invoice payment method update",
    body: "Need to update the credit card on file for automatic billing. Current card expires end of this month. Where do I update payment information?",
    customer_id: "customer_C",
    tag: "Billing",
    timestamp: "2025-01-07T10:20:00Z"
  },
  {
    id: "36",
    subject: "Image uploads fail silently",
    body: "Uploading profile images appears to work (shows progress bar) but images never actually save. No error message displayed. Files are under 5MB limit. PNG and JPG both affected.",
    customer_id: "customer_C",
    tag: "Bug Report",
    timestamp: "2025-01-06T14:50:00Z"
  },
  {
    id: "37",
    subject: "Role-based access control",
    body: "Need more granular permission controls. Currently just Admin/User roles. We need Editor, Viewer, and Analyst roles with different permission sets for each.",
    customer_id: "customer_C",
    tag: "Feature Request",
    timestamp: "2025-01-05T12:15:00Z"
  },
  {
    id: "38",
    subject: "Database connection pool exhausted",
    body: "Getting 'connection pool exhausted' errors during peak hours (2-4pm EST). Database queries timing out. This is impacting our production service. Need urgent help scaling.",
    customer_id: "customer_C",
    tag: "Technical Support",
    timestamp: "2025-01-04T14:30:00Z"
  },
  {
    id: "39",
    subject: "Annual subscription early renewal discount",
    body: "Our annual plan renews in March. If we renew early (now in January) do we get any discount? Also, would the new year start from renewal date or from March?",
    customer_id: "customer_C",
    tag: "Billing",
    timestamp: "2025-01-03T09:45:00Z"
  },
  {
    id: "40",
    subject: "Pagination broken on reports page",
    body: "The pagination controls on the Reports page show page 1 of 1 even though there are clearly multiple pages of data. Clicking next/previous does nothing. Only showing first 25 results.",
    customer_id: "customer_C",
    tag: "Bug Report",
    timestamp: "2025-01-02T11:00:00Z"
  },
];
