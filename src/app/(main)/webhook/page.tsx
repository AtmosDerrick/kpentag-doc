"use client";

import {
  IconWebhook,
  IconPlayerPlay,
  IconCopy,
  IconCheck,
  IconAlertCircle,
  IconShield,
  IconClock,
  IconRefresh,
  IconEye,
  IconEyeOff,
  IconSettings,
  IconTestPipe,
  IconRocket,
  IconSend,
  IconKey,
  IconList,
  IconFilter,
  IconSearch,
  IconTrash,
  IconDashboard,
  IconArrowRight,
} from "@tabler/icons-react";
import { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

export default function WebhooksPage() {
  const [activeTab, setActiveTab] = useState<"test" | "live">("test");
  const [copiedField, setCopiedField] = useState("");
  const [showSecret, setShowSecret] = useState(false);
  const [selectedEvents, setSelectedEvents] = useState<string[]>([]);

  const environments = {
    test: {
      name: "Test Environment",
      baseUrl: "https://api-sandbox.kpentag.com",
      description: "Receive test webhooks for development",
    },
    live: {
      name: "Live Environment",
      baseUrl: "https://api.kpentag.com",
      description: "Receive production webhooks for real transactions",
    },
  };

  const webhookSetupSteps = [
    {
      icon: IconDashboard,
      title: "Login to Dashboard",
      description: "Access your K-Pentag merchant account",
    },
    {
      icon: IconSettings,
      title: "Navigate to Settings",
      description: "Go to the Settings section in your dashboard",
    },
    {
      icon: IconWebhook,
      title: "Click on Webhooks",
      description: "Find and click on the Webhooks tab",
    },
    {
      icon: IconSend,
      title: "Configure Webhook",
      description: "Add your endpoint URL and select events",
    },
  ];

  const webhookEvents = [
    {
      category: "Payment Events",
      events: [
        {
          id: "payment.succeeded",
          name: "Payment Succeeded",
          description: "A payment was successfully completed",
          enabled: true,
        },
        {
          id: "payment.failed",
          name: "Payment Failed",
          description: "A payment attempt failed",
          enabled: true,
        },
        {
          id: "payment.refunded",
          name: "Payment Refunded",
          description: "A payment was refunded",
          enabled: false,
        },
        {
          id: "payment.disputed",
          name: "Payment Disputed",
          description: "A payment was disputed by customer",
          enabled: false,
        },
      ],
    },
    {
      category: "Subscription Events",
      events: [
        {
          id: "subscription.created",
          name: "Subscription Created",
          description: "A new subscription was created",
          enabled: true,
        },
        {
          id: "subscription.updated",
          name: "Subscription Updated",
          description: "A subscription was updated",
          enabled: false,
        },
        {
          id: "subscription.cancelled",
          name: "Subscription Cancelled",
          description: "A subscription was cancelled",
          enabled: false,
        },
      ],
    },
    {
      category: "Customer Events",
      events: [
        {
          id: "customer.created",
          name: "Customer Created",
          description: "A new customer was created",
          enabled: true,
        },
        {
          id: "customer.updated",
          name: "Customer Updated",
          description: "Customer details were updated",
          enabled: false,
        },
      ],
    },
  ];

  const recentWebhooks = [
    {
      id: "wh_1a2b3c4d5e6f",
      event: "payment.succeeded",
      status: "delivered",
      statusCode: 200,
      timestamp: "2024-01-15T10:30:00Z",
      payload: {
        id: "pay_9f8e7d6c5b4a3",
        amount: 2000,
        currency: "usd",
      },
    },
    {
      id: "wh_2b3c4d5e6f7g",
      event: "payment.failed",
      status: "delivered",
      statusCode: 200,
      timestamp: "2024-01-15T10:25:00Z",
      payload: {
        id: "pay_8e7d6c5b4a3e2",
        amount: 1500,
        currency: "usd",
      },
    },
    {
      id: "wh_3c4d5e6f7g8h",
      event: "customer.created",
      status: "failed",
      statusCode: 500,
      timestamp: "2024-01-15T10:20:00Z",
      payload: {
        id: "cus_9f8e7d6c5b4a3",
        email: "customer@example.com",
      },
    },
  ];

  const webhookExamples = {
    "payment.succeeded": `{
  "id": "evt_1a2b3c4d5e6f7g8h",
  "type": "payment.succeeded",
  "created": "2024-01-15T10:30:00Z",
  "data": {
    "object": {
      "id": "pay_9f8e7d6c5b4a3",
      "amount": 2000,
      "currency": "usd",
      "status": "succeeded",
      "description": "Payment for Order #12345",
      "customer": "cus_9f8e7d6c5b4a3",
      "payment_method": "card_1Nf8e2J8qXr7w9t2v6b3c4d5e",
      "created_at": "2024-01-15T10:30:00Z",
      "metadata": {
        "order_id": "12345",
        "customer_email": "customer@example.com"
      }
    }
  }
}`,
    "payment.failed": `{
  "id": "evt_2b3c4d5e6f7g8h9i",
  "type": "payment.failed",
  "created": "2024-01-15T10:25:00Z",
  "data": {
    "object": {
      "id": "pay_8e7d6c5b4a3e2f1",
      "amount": 1500,
      "currency": "usd",
      "status": "failed",
      "description": "Payment for Order #12346",
      "failure_code": "card_declined",
      "failure_message": "Your card was declined.",
      "created_at": "2024-01-15T10:25:00Z"
    }
  }
}`,
    "customer.created": `{
  "id": "evt_3c4d5e6f7g8h9i0j",
  "type": "customer.created",
  "created": "2024-01-15T10:20:00Z",
  "data": {
    "object": {
      "id": "cus_9f8e7d6c5b4a3e2",
      "email": "customer@example.com",
      "name": "John Doe",
      "phone": "+1234567890",
      "created_at": "2024-01-15T10:20:00Z",
      "metadata": {
        "signup_source": "website"
      }
    }
  }
}`,
  };

  const securityFeatures = [
    {
      icon: IconShield,
      title: "Signature Verification",
      description:
        "Verify webhook signatures using your webhook secret to ensure authenticity",
    },
    {
      icon: IconClock,
      title: "Timestamp Validation",
      description: "Check webhook timestamps to prevent replay attacks",
    },
    {
      icon: IconKey,
      title: "Secret Rotation",
      description: "Regularly rotate your webhook secret for enhanced security",
    },
    {
      icon: IconWebhook,
      title: "Retry Logic",
      description:
        "Automatic retries with exponential backoff for failed deliveries",
    },
  ];

  const copyToClipboard = async (text: string, fieldName: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedField(fieldName);
      setTimeout(() => setCopiedField(""), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  const toggleEventSelection = (eventId: string) => {
    setSelectedEvents((prev) =>
      prev.includes(eventId)
        ? prev.filter((id) => id !== eventId)
        : [...prev, eventId]
    );
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "delivered":
        return "text-emerald-600 bg-emerald-100";
      case "failed":
        return "text-red-600 bg-red-100";
      case "pending":
        return "text-yellow-600 bg-yellow-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  const getStatusCodeColor = (code: number) => {
    if (code >= 200 && code < 300) return "text-emerald-600";
    if (code >= 400 && code < 500) return "text-red-600";
    if (code >= 500) return "text-orange-600";
    return "text-gray-600";
  };

  const currentEnv = environments[activeTab];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Webhooks</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Receive real-time notifications for events in your K-Pentag account.
          Configure webhook endpoints to automate your workflow.
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Webhook Setup Instructions */}
          <section className="bg-white rounded-2xl border border-gray-200 p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                Setup Webhooks
              </h2>
              <div className="flex gap-2">
                <button
                  onClick={() => setActiveTab("test")}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                    activeTab === "test"
                      ? "bg-emerald-500 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  <IconTestPipe size={18} />
                  Test
                </button>
                <button
                  onClick={() => setActiveTab("live")}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                    activeTab === "live"
                      ? "bg-blue-500 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  <IconRocket size={18} />
                  Live
                </button>
              </div>
            </div>

            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                How to Generate Webhooks
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                {webhookSetupSteps.map((step, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg border border-gray-200"
                  >
                    <div className="flex-shrink-0 w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center">
                      <step.icon size={20} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">
                        {step.title}
                      </h4>
                      <p className="text-sm text-gray-600">
                        {step.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-blue-800 text-sm">
                  <strong>Note:</strong> After setting up your webhook in the
                  dashboard, you'll receive a webhook secret. Use this secret to
                  verify webhook signatures and ensure the authenticity of
                  incoming requests.
                </p>
              </div>
            </div>

            <div className="flex justify-center">
              <button className="flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors font-semibold">
                Go to Dashboard to Setup Webhooks
                <IconArrowRight size={18} />
              </button>
            </div>
          </section>

          {/* Event Subscriptions */}
          <section className="bg-white rounded-2xl border border-gray-200 p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                Available Events
              </h2>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <IconFilter size={16} />
                <span>Select events in dashboard</span>
              </div>
            </div>

            <div className="space-y-6">
              {webhookEvents.map((category) => (
                <div
                  key={category.category}
                  className="border border-gray-200 rounded-lg"
                >
                  <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                    <h3 className="font-semibold text-gray-900">
                      {category.category}
                    </h3>
                  </div>
                  <div className="divide-y divide-gray-200">
                    {category.events.map((event) => (
                      <div key={event.id} className="px-6 py-4">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-1">
                              <h4 className="font-medium text-gray-900">
                                {event.name}
                              </h4>
                              <span
                                className={`text-xs px-2 py-1 rounded ${
                                  event.enabled
                                    ? "bg-emerald-100 text-emerald-800"
                                    : "bg-gray-100 text-gray-600"
                                }`}
                              >
                                {event.enabled ? "Popular" : "Available"}
                              </span>
                            </div>
                            <p className="text-sm text-gray-600">
                              {event.description}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Webhook Examples */}
          <section className="bg-white rounded-2xl border border-gray-200 p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Webhook Examples & Implementation
            </h2>

            <div className="space-y-8">
              <div>
                <h3 className="font-semibold text-gray-900 mb-4">
                  Payment Succeeded Event
                </h3>
                <div className="rounded-lg overflow-hidden border border-gray-200">
                  <SyntaxHighlighter
                    language="json"
                    style={vscDarkPlus}
                    customStyle={{ margin: 0, maxHeight: "400px" }}
                    showLineNumbers
                  >
                    {webhookExamples["payment.succeeded"]}
                  </SyntaxHighlighter>
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-4">
                  Signature Verification (Node.js)
                </h3>
                <div className="rounded-lg overflow-hidden border border-gray-200">
                  <SyntaxHighlighter
                    language="javascript"
                    style={vscDarkPlus}
                    customStyle={{ margin: 0, maxHeight: "300px" }}
                    showLineNumbers
                  >
                    {`// Verify webhook signature
const crypto = require('crypto');

function verifyWebhookSignature(payload, signature, secret) {
  const expectedSignature = crypto
    .createHmac('sha256', secret)
    .update(payload, 'utf8')
    .digest('hex');
    
  return crypto.timingSafeEqual(
    Buffer.from(signature),
    Buffer.from(expectedSignature)
  );
}

// Usage example
app.post('/webhooks/kpentag', (req, res) => {
  const signature = req.headers['kpentag-signature'];
  const payload = JSON.stringify(req.body);
  
  if (!verifyWebhookSignature(payload, signature, process.env.WEBHOOK_SECRET)) {
    return res.status(401).send('Invalid signature');
  }
  
  // Process the webhook
  const event = req.body;
  switch (event.type) {
    case 'payment.succeeded':
      handlePaymentSucceeded(event.data.object);
      break;
    case 'payment.failed':
      handlePaymentFailed(event.data.object);
      break;
  }
  
  res.status(200).send('Webhook processed');
});`}
                  </SyntaxHighlighter>
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-4">
                  Python Implementation
                </h3>
                <div className="rounded-lg overflow-hidden border border-gray-200">
                  <SyntaxHighlighter
                    language="python"
                    style={vscDarkPlus}
                    customStyle={{ margin: 0, maxHeight: "300px" }}
                    showLineNumbers
                  >
                    {`import hashlib
import hmac
from flask import Flask, request, jsonify

app = Flask(__name__)

def verify_webhook_signature(payload, signature, secret):
    expected_signature = hmac.new(
        secret.encode('utf-8'),
        payload.encode('utf-8'),
        hashlib.sha256
    ).hexdigest()
    return hmac.compare_digest(signature, expected_signature)

@app.route('/webhooks/kpentag', methods=['POST'])
def handle_webhook():
    signature = request.headers.get('Kpentag-Signature')
    payload = request.get_data(as_text=True)
    
    if not verify_webhook_signature(payload, signature, os.getenv('WEBHOOK_SECRET')):
        return jsonify({'error': 'Invalid signature'}), 401
    
    event = request.json
    event_type = event.get('type')
    
    if event_type == 'payment.succeeded':
        handle_payment_succeeded(event['data']['object'])
    elif event_type == 'payment.failed':
        handle_payment_failed(event['data']['object'])
    
    return jsonify({'status': 'success'}), 200`}
                  </SyntaxHighlighter>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1 space-y-6">
          {/* Quick Actions */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6">
            <h3 className="font-semibold text-gray-900 mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <button className="w-full flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:border-primary transition-colors">
                <span className="text-gray-700">View Dashboard</span>
                <IconDashboard size={18} className="text-gray-400" />
              </button>
              <button className="w-full flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:border-primary transition-colors">
                <span className="text-gray-700">API Reference</span>
                <IconList size={18} className="text-gray-400" />
              </button>
              <button className="w-full flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:border-primary transition-colors">
                <span className="text-gray-700">Test Webhooks</span>
                <IconPlayerPlay size={18} className="text-gray-400" />
              </button>
            </div>
          </div>

          {/* Recent Webhooks */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-900">Recent Webhooks</h3>
              <IconSearch size={18} className="text-gray-400" />
            </div>

            <div className="space-y-4">
              {recentWebhooks.map((webhook) => (
                <div
                  key={webhook.id}
                  className="p-3 border border-gray-200 rounded-lg"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-900">
                      {webhook.event}
                    </span>
                    <span
                      className={`text-xs px-2 py-1 rounded ${getStatusColor(
                        webhook.status
                      )}`}
                    >
                      {webhook.status}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <span>
                      {new Date(webhook.timestamp).toLocaleTimeString()}
                    </span>
                    <span className={getStatusCodeColor(webhook.statusCode)}>
                      {webhook.statusCode}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <button className="w-full mt-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:border-primary hover:text-primary transition-colors">
              View Webhook Logs
            </button>
          </div>

          {/* Security Features */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6">
            <h3 className="font-semibold text-gray-900 mb-4">
              Security Features
            </h3>
            <div className="space-y-4">
              {securityFeatures.map((feature, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <feature.icon className="text-primary" size={16} />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 text-sm">
                      {feature.title}
                    </h4>
                    <p className="text-xs text-gray-600 mt-1">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Webhook Status */}
          <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-emerald-800">
                Webhooks Ready
              </span>
            </div>
            <p className="text-sm text-emerald-700 mb-4">
              Configure webhooks in your dashboard to start receiving real-time
              events.
            </p>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-emerald-600">Supported Events</span>
                <span className="font-medium text-emerald-800">12+ types</span>
              </div>
              <div className="flex justify-between">
                <span className="text-emerald-600">Retry Policy</span>
                <span className="font-medium text-emerald-800">3 attempts</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
