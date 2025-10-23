"use client";

import {
  IconCode,
  IconKey,
  IconShield,
  IconCopy,
  IconCheck,
  IconPlayerPlay,
  IconApi,
  IconTestPipe,
  IconRocket,
  IconArrowRight,
  IconAlertCircle,
  IconSettings,
  IconBook,
  IconDownload,
  IconEye,
  IconEyeOff,
  IconRefresh,
  IconSend,
} from "@tabler/icons-react";
import { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

export default function ApiIntegrationPage() {
  type Lang = "javascript" | "python" | "curl";
  type EndpointId =
    | "create-payment"
    | "retrieve-payment"
    | "list-payments"
    | "refund-payment"
    | "create-customer"
    | "create-payment-link";

  const [activeTab, setActiveTab] = useState<"test" | "live">("test");
  const [activeEndpoint, setActiveEndpoint] =
    useState<EndpointId>("create-payment");
  const [activeLanguage, setActiveLanguage] = useState<Lang>("javascript");
  const [copiedField, setCopiedField] = useState("");
  const [showSecretKey, setShowSecretKey] = useState(false);

  type Endpoint = {
    id: EndpointId;
    name: string;
    method: string;
    path: string;
    description: string;
  };

  const endpoints: Endpoint[] = [
    {
      id: "create-payment",
      name: "Create Payment",
      method: "POST",
      path: "/v1/payments",
      description: "Process a new payment transaction",
    },
    {
      id: "retrieve-payment",
      name: "Retrieve Payment",
      method: "GET",
      path: "/v1/payments/{id}",
      description: "Get payment details by ID",
    },
    {
      id: "list-payments",
      name: "List Payments",
      method: "GET",
      path: "/v1/payments",
      description: "List all payments with pagination",
    },
    {
      id: "refund-payment",
      name: "Refund Payment",
      method: "POST",
      path: "/v1/payments/{id}/refund",
      description: "Refund a processed payment",
    },
    {
      id: "create-customer",
      name: "Create Customer",
      method: "POST",
      path: "/v1/customers",
      description: "Create a new customer record",
    },
    {
      id: "create-payment-link",
      name: "Create Payment Link",
      method: "POST",
      path: "/v1/payment-links",
      description: "Generate shareable payment links",
    },
  ];

  const languages: Lang[] = ["javascript", "python", "curl"];

  const environments = {
    test: {
      name: "Test Environment",
      baseUrl: "https://api-sandbox.kpentag.com",
      apiKey: "pk_test_51Mn4s8J8qXr7w9t2v6b...",
      secretKey: "sk_test_51Mn4s8J8qXr7w9t2v6b...",
      description: "Safe sandbox for development and testing",
    },
    live: {
      name: "Live Environment",
      baseUrl: "https://api.kpentag.com",
      apiKey: "pk_live_51Mn4s8J8qXr7w9t2v6b...",
      secretKey: "sk_live_51Mn4s8J8qXr7w9t2v6b...",
      description: "Production environment for real transactions",
    },
  };

  // Complete payload examples for all endpoints
  const payloadExamples = {
    "create-payment": {
      javascript: `// Create Payment Request
const paymentData = {
  amount: 2000, // Amount in cents
  currency: 'usd',
  description: 'Payment for Order #12345',
  payment_method: 'card_1Nf8e2J8qXr7w9t2v6b3c4d5e',
  customer: 'cus_9f8e7d6c5b4a3',
  metadata: {
    order_id: '12345',
    customer_email: 'customer@example.com'
  }
};`,
      python: `# Create Payment Request
payment_data = {
    'amount': 2000,  # Amount in cents
    'currency': 'usd',
    'description': 'Payment for Order #12345',
    'payment_method': 'card_1Nf8e2J8qXr7w9t2v6b3c4d5e',
    'customer': 'cus_9f8e7d6c5b4a3',
    'metadata': {
        'order_id': '12345',
        'customer_email': 'customer@example.com'
    }
}`,
      curl: `curl -X POST ${environments[activeTab].baseUrl}/v1/payments \\
  -H "Authorization: Bearer ${environments[activeTab].secretKey}" \\
  -H "Content-Type: application/json" \\
  -d '{
    "amount": 2000,
    "currency": "usd",
    "description": "Payment for Order #12345",
    "payment_method": "card_1Nf8e2J8qXr7w9t2v6b3c4d5e",
    "customer": "cus_9f8e7d6c5b4a3",
    "metadata": {
      "order_id": "12345",
      "customer_email": "customer@example.com"
    }
  }'`,
    },
    "retrieve-payment": {
      javascript: `// Retrieve Payment Request
const paymentId = 'pay_9f8e7d6c5b4a3';
// No request body needed for GET requests`,
      python: `# Retrieve Payment Request
payment_id = 'pay_9f8e7d6c5b4a3'
# No request body needed for GET requests`,
      curl: `curl -X GET ${environments[activeTab].baseUrl}/v1/payments/pay_9f8e7d6c5b4a3 \\
  -H "Authorization: Bearer ${environments[activeTab].secretKey}" \\
  -H "Content-Type: application/json"`,
    },
    "list-payments": {
      javascript: `// List Payments Request
const queryParams = {
  limit: 10,
  starting_after: 'pay_9f8e7d6c5b4a3',
  created: {
    gt: '2024-01-01'
  }
};`,
      python: `# List Payments Request
query_params = {
    'limit': 10,
    'starting_after': 'pay_9f8e7d6c5b4a3',
    'created[gt]': '2024-01-01'
}`,
      curl: `curl -X GET "${environments[activeTab].baseUrl}/v1/payments?limit=10&starting_after=pay_9f8e7d6c5b4a3" \\
  -H "Authorization: Bearer ${environments[activeTab].secretKey}" \\
  -H "Content-Type: application/json"`,
    },
    "refund-payment": {
      javascript: `// Refund Payment Request
const refundData = {
  amount: 1000, // Partial refund amount in cents
  reason: 'requested_by_customer',
  metadata: {
    refund_reason: 'Customer changed mind'
  }
};`,
      python: `# Refund Payment Request
refund_data = {
    'amount': 1000,  # Partial refund amount in cents
    'reason': 'requested_by_customer',
    'metadata': {
        'refund_reason': 'Customer changed mind'
    }
}`,
      curl: `curl -X POST ${environments[activeTab].baseUrl}/v1/payments/pay_9f8e7d6c5b4a3/refund \\
  -H "Authorization: Bearer ${environments[activeTab].secretKey}" \\
  -H "Content-Type: application/json" \\
  -d '{
    "amount": 1000,
    "reason": "requested_by_customer",
    "metadata": {
      "refund_reason": "Customer changed mind"
    }
  }'`,
    },
    "create-customer": {
      javascript: `// Create Customer Request
const customerData = {
  email: 'customer@example.com',
  name: 'John Doe',
  phone: '+1234567890',
  address: {
    line1: '123 Main St',
    city: 'New York',
    state: 'NY',
    postal_code: '10001',
    country: 'US'
  }
};`,
      python: `# Create Customer Request
customer_data = {
    'email': 'customer@example.com',
    'name': 'John Doe',
    'phone': '+1234567890',
    'address': {
        'line1': '123 Main St',
        'city': 'New York',
        'state': 'NY',
        'postal_code': '10001',
        'country': 'US'
    }
}`,
      curl: `curl -X POST ${environments[activeTab].baseUrl}/v1/customers \\
  -H "Authorization: Bearer ${environments[activeTab].secretKey}" \\
  -H "Content-Type: application/json" \\
  -d '{
    "email": "customer@example.com",
    "name": "John Doe",
    "phone": "+1234567890",
    "address": {
      "line1": "123 Main St",
      "city": "New York",
      "state": "NY",
      "postal_code": "10001",
      "country": "US"
    }
  }'`,
    },
    "create-payment-link": {
      javascript: `// Create Payment Link Request
const paymentLinkData = {
  amount: 2000,
  currency: 'usd',
  description: 'Payment for Order #12345',
  customer: 'cus_9f8e7d6c5b4a3',
  metadata: {
    order_id: '12345'
  },
  after_completion: {
    type: 'redirect',
    redirect: {
      url: 'https://your-store.com/thank-you'
    }
  }
};`,
      python: `# Create Payment Link Request
payment_link_data = {
    'amount': 2000,
    'currency': 'usd',
    'description': 'Payment for Order #12345',
    'customer': 'cus_9f8e7d6c5b4a3',
    'metadata': {
        'order_id': '12345'
    },
    'after_completion': {
        'type': 'redirect',
        'redirect': {
            'url': 'https://your-store.com/thank-you'
        }
    }
}`,
      curl: `curl -X POST ${environments[activeTab].baseUrl}/v1/payment-links \\
  -H "Authorization: Bearer ${environments[activeTab].secretKey}" \\
  -H "Content-Type: application/json" \\
  -d '{
    "amount": 2000,
    "currency": "usd",
    "description": "Payment for Order #12345",
    "customer": "cus_9f8e7d6c5b4a3",
    "metadata": {
      "order_id": "12345"
    },
    "after_completion": {
      "type": "redirect",
      "redirect": {
        "url": "https://your-store.com/thank-you"
      }
    }
  }'`,
    },
  };

  // Complete response examples for all endpoints
  const responseExamples = {
    "create-payment": {
      success: `{
  "id": "pay_9f8e7d6c5b4a3",
  "object": "payment",
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
}`,
      error: `{
  "error": {
    "type": "invalid_request_error",
    "code": "card_declined",
    "message": "Your card was declined.",
    "decline_code": "insufficient_funds"
  }
}`,
    },
    "retrieve-payment": {
      success: `{
  "id": "pay_9f8e7d6c5b4a3",
  "object": "payment",
  "amount": 2000,
  "currency": "usd",
  "status": "succeeded",
  "description": "Payment for Order #12345",
  "customer": "cus_9f8e7d6c5b4a3",
  "payment_method": "card_1Nf8e2J8qXr7w9t2v6b3c4d5e",
  "created_at": "2024-01-15T10:30:00Z",
  "refunds": {
    "data": [],
    "has_more": false
  }
}`,
      error: `{
  "error": {
    "type": "invalid_request_error",
    "code": "resource_missing",
    "message": "No such payment: pay_invalid_id"
  }
}`,
    },
    "list-payments": {
      success: `{
  "object": "list",
  "data": [
    {
      "id": "pay_9f8e7d6c5b4a3",
      "object": "payment",
      "amount": 2000,
      "currency": "usd",
      "status": "succeeded",
      "description": "Payment for Order #12345",
      "created_at": "2024-01-15T10:30:00Z"
    }
  ],
  "has_more": true,
  "url": "/v1/payments"
}`,
      error: `{
  "error": {
    "type": "invalid_request_error",
    "code": "parameter_invalid",
    "message": "Invalid parameter: limit"
  }
}`,
    },
    "refund-payment": {
      success: `{
  "id": "ref_7d6c5b4a3e2f1",
  "object": "refund",
  "amount": 1000,
  "currency": "usd",
  "payment": "pay_9f8e7d6c5b4a3",
  "status": "succeeded",
  "reason": "requested_by_customer",
  "created_at": "2024-01-15T11:30:00Z",
  "metadata": {
    "refund_reason": "Customer changed mind"
  }
}`,
      error: `{
  "error": {
    "type": "invalid_request_error",
    "code": "amount_too_large",
    "message": "Refund amount exceeds available balance"
  }
}`,
    },
    "create-customer": {
      success: `{
  "id": "cus_9f8e7d6c5b4a3",
  "object": "customer",
  "email": "customer@example.com",
  "name": "John Doe",
  "phone": "+1234567890",
  "address": {
    "line1": "123 Main St",
    "city": "New York",
    "state": "NY",
    "postal_code": "10001",
    "country": "US"
  },
  "created_at": "2024-01-15T10:30:00Z"
}`,
      error: `{
  "error": {
    "type": "invalid_request_error",
    "code": "email_invalid",
    "message": "Invalid email address format."
  }
}`,
    },
    "create-payment-link": {
      success: `{
  "id": "plink_5b4a3e2f1g0h",
  "object": "payment_link",
  "amount": 2000,
  "currency": "usd",
  "description": "Payment for Order #12345",
  "url": "https://pay.kpentag.com/link/plink_5b4a3e2f1g0h",
  "customer": "cus_9f8e7d6c5b4a3",
  "active": true,
  "after_completion": {
    "type": "redirect",
    "redirect": {
      "url": "https://your-store.com/thank-you"
    }
  },
  "created_at": "2024-01-15T10:30:00Z"
}`,
      error: `{
  "error": {
    "type": "invalid_request_error",
    "code": "customer_invalid",
    "message": "No such customer: cus_invalid_id"
  }
}`,
    },
  };

  const integrationSteps = [
    {
      step: 1,
      title: "Get API Keys",
      description: "Retrieve your test and live API keys from the dashboard",
      icon: IconKey,
    },
    {
      step: 2,
      title: "Choose Environment",
      description:
        "Start with test environment, then switch to live for production",
      icon: IconSettings,
    },
    {
      step: 3,
      title: "Make API Calls",
      description: "Use the API endpoints with proper authentication",
      icon: IconApi,
    },
    {
      step: 4,
      title: "Handle Responses",
      description: "Implement proper error handling and response parsing",
      icon: IconCode,
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

  const currentEndpoint = endpoints.find((ep) => ep.id === activeEndpoint);
  const currentEnv = environments[activeTab];

  // Helper function to get payload example
  const getPayloadExample = () => {
    const example = payloadExamples[activeEndpoint]?.[activeLanguage];
    return example || "// Select an endpoint to see examples";
  };

  // Helper function to get response examples
  const getResponseExample = (type: "success" | "error") => {
    const example = responseExamples[activeEndpoint]?.[type];
    return example || "{}";
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          API Integration
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Integrate K-Pentag payments into your application with our
          comprehensive API. Explore endpoints, test payloads, and implement
          with confidence.
        </p>
      </div>

      <div className="grid lg:grid-cols-4 gap-8">
        {/* Sidebar - Endpoints */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl border border-gray-200 p-6 sticky top-8">
            <h3 className="font-semibold text-gray-900 mb-4">API Endpoints</h3>
            <div className="space-y-2">
              {endpoints.map((endpoint) => (
                <button
                  key={endpoint.id}
                  onClick={() => setActiveEndpoint(endpoint.id)}
                  className={`w-full text-left p-3 rounded-lg transition-colors ${
                    activeEndpoint === endpoint.id
                      ? "bg-primary text-white"
                      : "bg-gray-50 text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-medium">{endpoint.name}</span>
                    <span
                      className={`text-xs px-2 py-1 rounded ${
                        activeEndpoint === endpoint.id
                          ? "bg-white text-primary"
                          : "bg-gray-200 text-gray-600"
                      }`}
                    >
                      {endpoint.method}
                    </span>
                  </div>
                  <p
                    className={`text-sm ${
                      activeEndpoint === endpoint.id
                        ? "text-white/90"
                        : "text-gray-500"
                    }`}
                  >
                    {endpoint.description}
                  </p>
                </button>
              ))}
            </div>

            {/* Quick Resources */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <h4 className="font-semibold text-gray-900 mb-3">Resources</h4>
              <div className="space-y-2">
                <a
                  href="#"
                  className="flex items-center gap-2 text-sm text-gray-600 hover:text-primary transition-colors"
                >
                  <IconBook size={16} />
                  API Reference
                </a>
                <a
                  href="#"
                  className="flex items-center gap-2 text-sm text-gray-600 hover:text-primary transition-colors"
                >
                  <IconDownload size={16} />
                  SDK Downloads
                </a>
                <a
                  href="#"
                  className="flex items-center gap-2 text-sm text-gray-600 hover:text-primary transition-colors"
                >
                  <IconShield size={16} />
                  Security Guide
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3 space-y-8">
          {/* Environment & API Keys */}
          <section className="bg-white rounded-2xl border border-gray-200 p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                Environment & API Keys
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

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div className="p-4 bg-gray-50 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-2">Base URL</h4>
                <div className="flex items-center gap-2">
                  <code className="flex-1 bg-white px-3 py-2 rounded border text-sm font-mono">
                    {currentEnv.baseUrl}
                  </code>
                  <button
                    onClick={() =>
                      copyToClipboard(currentEnv.baseUrl, "base-url")
                    }
                    className="p-2 text-gray-400 hover:text-gray-600"
                  >
                    {copiedField === "base-url" ? (
                      <IconCheck size={18} />
                    ) : (
                      <IconCopy size={18} />
                    )}
                  </button>
                </div>
              </div>

              <div className="p-4 bg-gray-50 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-2">
                  Publishable Key
                </h4>
                <div className="flex items-center gap-2">
                  <code className="flex-1 bg-white px-3 py-2 rounded border text-sm font-mono">
                    {currentEnv.apiKey}
                  </code>
                  <button
                    onClick={() =>
                      copyToClipboard(currentEnv.apiKey, "api-key")
                    }
                    className="p-2 text-gray-400 hover:text-gray-600"
                  >
                    {copiedField === "api-key" ? (
                      <IconCheck size={18} />
                    ) : (
                      <IconCopy size={18} />
                    )}
                  </button>
                </div>
              </div>
            </div>

            <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
              <h4 className="font-semibold text-red-900 mb-2 flex items-center gap-2">
                <IconAlertCircle size={18} />
                Secret Key
              </h4>
              <div className="flex items-center gap-2 mb-2">
                <div className="flex-1 relative">
                  <input
                    type={showSecretKey ? "text" : "password"}
                    value={currentEnv.secretKey}
                    readOnly
                    className="w-full px-3 py-2 bg-white border border-red-300 rounded text-sm font-mono"
                  />
                  <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex gap-1">
                    <button
                      onClick={() => setShowSecretKey(!showSecretKey)}
                      className="p-1 text-gray-400 hover:text-gray-600"
                    >
                      {showSecretKey ? (
                        <IconEyeOff size={16} />
                      ) : (
                        <IconEye size={16} />
                      )}
                    </button>
                    <button
                      onClick={() =>
                        copyToClipboard(currentEnv.secretKey, "secret-key")
                      }
                      className="p-1 text-gray-400 hover:text-gray-600"
                    >
                      {copiedField === "secret-key" ? (
                        <IconCheck size={16} />
                      ) : (
                        <IconCopy size={16} />
                      )}
                    </button>
                  </div>
                </div>
              </div>
              <p className="text-sm text-red-700">
                Keep this key secure! Never expose it in client-side code or
                public repositories.
              </p>
            </div>
          </section>

          {/* Integration Steps */}
          <section className="bg-white rounded-2xl border border-gray-200 p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Integration Steps
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {integrationSteps.map((step) => (
                <div key={step.step} className="text-center">
                  <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center mx-auto mb-3">
                    <step.icon size={24} />
                  </div>
                  <div className="w-6 h-6 bg-primary text-white rounded-full text-sm flex items-center justify-center mx-auto mb-2">
                    {step.step}
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">
                    {step.title}
                  </h3>
                  <p className="text-sm text-gray-600">{step.description}</p>
                </div>
              ))}
            </div>
          </section>

          {/* API Playground */}
          <section className="bg-white rounded-2xl border border-gray-200 p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                API Playground
              </h2>
              <div className="flex items-center gap-4">
                <div className="flex gap-1 bg-gray-100 rounded-lg p-1">
                  {languages.map((lang) => (
                    <button
                      key={lang}
                      onClick={() => setActiveLanguage(lang)}
                      className={`px-3 py-1 text-sm rounded-md transition-colors ${
                        activeLanguage === lang
                          ? "bg-white text-primary shadow-sm"
                          : "text-gray-600 hover:text-gray-900"
                      }`}
                    >
                      {lang.charAt(0).toUpperCase() + lang.slice(1)}
                    </button>
                  ))}
                </div>
                <button className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors">
                  <IconPlayerPlay size={18} />
                  Test in Sandbox
                </button>
              </div>
            </div>

            {/* Endpoint Info */}
            <div className="mb-6 p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-4">
                <span
                  className={`px-3 py-1 rounded text-sm font-medium ${
                    currentEndpoint?.method === "POST"
                      ? "bg-green-100 text-green-800"
                      : currentEndpoint?.method === "GET"
                      ? "bg-blue-100 text-blue-800"
                      : "bg-gray-100 text-gray-800"
                  }`}
                >
                  {currentEndpoint?.method}
                </span>
                <code className="text-sm font-mono bg-white px-3 py-1 rounded border">
                  {currentEnv.baseUrl}
                  {currentEndpoint?.path}
                </code>
                <button
                  onClick={() =>
                    copyToClipboard(
                      `${currentEnv.baseUrl}${currentEndpoint?.path}`,
                      "endpoint-url"
                    )
                  }
                  className="p-1 text-gray-400 hover:text-gray-600"
                >
                  {copiedField === "endpoint-url" ? (
                    <IconCheck size={16} />
                  ) : (
                    <IconCopy size={16} />
                  )}
                </button>
              </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
              {/* Request Payload */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <IconSend size={18} />
                  Request Payload
                </h3>
                <div className="rounded-lg overflow-hidden border border-gray-200">
                  <SyntaxHighlighter
                    language={
                      activeLanguage === "curl"
                        ? "bash"
                        : (activeLanguage as string)
                    }
                    style={vscDarkPlus}
                    customStyle={{ margin: 0, maxHeight: "400px" }}
                    showLineNumbers
                  >
                    {getPayloadExample()}
                  </SyntaxHighlighter>
                </div>
              </div>

              {/* Response Examples */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-4">
                  Response Examples
                </h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="font-medium text-gray-900">
                        Success Response
                      </span>
                    </div>
                    <div className="rounded-lg overflow-hidden border border-gray-200">
                      <SyntaxHighlighter
                        language="json"
                        style={vscDarkPlus}
                        customStyle={{ margin: 0, maxHeight: "180px" }}
                        showLineNumbers
                      >
                        {getResponseExample("success")}
                      </SyntaxHighlighter>
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                      <span className="font-medium text-gray-900">
                        Error Response
                      </span>
                    </div>
                    <div className="rounded-lg overflow-hidden border border-gray-200">
                      <SyntaxHighlighter
                        language="json"
                        style={vscDarkPlus}
                        customStyle={{ margin: 0, maxHeight: "180px" }}
                        showLineNumbers
                      >
                        {getResponseExample("error")}
                      </SyntaxHighlighter>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* SDK Integration */}
          <section className="bg-white rounded-2xl border border-gray-200 p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              SDK Integration
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="p-6 border border-gray-200 rounded-xl hover:border-primary transition-colors">
                <div className="w-12 h-12 bg-blue-500 text-white rounded-lg flex items-center justify-center mb-4">
                  <IconCode size={24} />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  JavaScript/Node.js
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  For web and server-side applications
                </p>
                <button className="w-full py-2 border border-gray-300 text-gray-700 rounded-lg hover:border-primary hover:text-primary transition-colors">
                  Install SDK
                </button>
              </div>
              <div className="p-6 border border-gray-200 rounded-xl hover:border-primary transition-colors">
                <div className="w-12 h-12 bg-green-500 text-white rounded-lg flex items-center justify-center mb-4">
                  <IconCode size={24} />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Python</h3>
                <p className="text-gray-600 text-sm mb-4">
                  For Python applications and scripts
                </p>
                <button className="w-full py-2 border border-gray-300 text-gray-700 rounded-lg hover:border-primary hover:text-primary transition-colors">
                  Install SDK
                </button>
              </div>
              <div className="p-6 border border-gray-200 rounded-xl hover:border-primary transition-colors">
                <div className="w-12 h-12 bg-purple-500 text-white rounded-lg flex items-center justify-center mb-4">
                  <IconCode size={24} />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">PHP</h3>
                <p className="text-gray-600 text-sm mb-4">
                  For PHP applications and websites
                </p>
                <button className="w-full py-2 border border-gray-300 text-gray-700 rounded-lg hover:border-primary hover:text-primary transition-colors">
                  Install SDK
                </button>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
