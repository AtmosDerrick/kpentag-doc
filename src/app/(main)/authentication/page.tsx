"use client";

import {
  IconCode,
  IconKey,
  IconShield,
  IconCopy,
  IconCheck,
  IconEye,
  IconEyeOff,
  IconAlertCircle,
  IconPlayerPlay,
  IconApi,
  IconLink,
  IconLock,
  IconDashboard,
  IconSettings,
  IconArrowRight,
} from "@tabler/icons-react";
import { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

export default function AuthenticationPage() {
  const [activeTab, setActiveTab] = useState("api-keys");
  const [activeLanguage, setActiveLanguage] =
    useState<keyof typeof codeSnippets>("javascript");
  const [showSecretKey, setShowSecretKey] = useState(false);
  const [copiedField, setCopiedField] = useState("");

  const authenticationMethods = [
    {
      id: "api-keys",
      name: "API Keys",
      icon: IconKey,
      description: "Authenticate API requests using secret keys in headers",
      bestFor: "Server-side integrations, mobile apps",
    },
    {
      id: "payment-links",
      name: "Payment Links",
      icon: IconLink,
      description: "No authentication needed - shareable payment URLs",
      bestFor: "Quick payments, email invoices, social media",
    },
    {
      id: "sdk-tokens",
      name: "SDK Tokens",
      icon: IconShield,
      description: "Client-side tokens for secure frontend integration",
      bestFor: "Web and mobile apps, checkout pages",
    },
  ];

  const codeSnippets = {
    javascript: {
      language: "javascript",
      code: `// Using Fetch API
const processPayment = async () => {
  const response = await fetch('https://api.kpentag.com/v1/payments', {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer YOUR_SECRET_KEY',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      amount: 2000,
      currency: 'usd',
      description: 'Payment for Order #123'
    })
  });
  
  return await response.json();
};`,
    },
    python: {
      language: "python",
      code: `import requests

def create_payment():
    headers = {
        'Authorization': 'Bearer YOUR_SECRET_KEY',
        'Content-Type': 'application/json'
    }
    
    data = {
        'amount': 2000,
        'currency': 'usd',
        'description': 'Payment for Order #123'
    }
    
    response = requests.post(
        'https://api.kpentag.com/v1/payments',
        headers=headers,
        json=data
    )
    
    return response.json()`,
    },
    php: {
      language: "php",
      code: `<?php
$ch = curl_init();

curl_setopt($ch, CURLOPT_URL, "https://api.kpentag.com/v1/payments");
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
curl_setopt($ch, CURLOPT_POST, 1);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode([
    'amount' => 2000,
    'currency' => 'usd',
    'description' => 'Payment for Order #123'
]));

$headers = [
    'Authorization: Bearer YOUR_SECRET_KEY',
    'Content-Type: application/json'
];

curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
$result = curl_exec($ch);
curl_close($ch);

echo $result;
?>`,
    },
    curl: {
      language: "bash",
      code: `curl https://api.kpentag.com/v1/payments \\
  -X POST \\
  -H "Authorization: Bearer YOUR_SECRET_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "amount": 2000,
    "currency": "usd",
    "description": "Payment for Order #123"
  }'`,
    },
  };

  const securityFeatures = [
    {
      icon: IconLock,
      title: "HTTPS Encryption",
      description:
        "All API requests must be made over HTTPS. HTTP requests will be rejected.",
    },
    {
      icon: IconShield,
      title: "Key Rotation",
      description:
        "Regularly rotate your API keys. Test keys can be regenerated instantly.",
    },
    {
      icon: IconEyeOff,
      title: "Secure Storage",
      description:
        "Never commit API keys to version control. Use environment variables.",
    },
    {
      icon: IconApi,
      title: "Request Signing",
      description:
        "For extra security, sign requests with your secret key and timestamp.",
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

  const apiGenerationSteps = [
    {
      icon: IconDashboard,
      title: "Login to Your Dashboard",
      description: "Access your K-Pentag merchant account",
    },
    {
      icon: IconSettings,
      title: "Navigate to Settings",
      description: "Go to the Settings section in your dashboard",
    },
    {
      icon: IconKey,
      title: "Click on API Section",
      description: "Find and click on the API Keys tab",
    },
    {
      icon: IconApi,
      title: "Generate API Key",
      description: "Click 'Generate New Key' and configure permissions",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Authentication & Security
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Secure your integration with multiple authentication methods. Choose
          the approach that best fits your application's needs and security
          requirements.
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2">
          {/* Authentication Methods */}
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <IconKey className="text-primary" size={24} />
              <h2 className="text-2xl font-bold text-gray-900">
                Authentication Methods
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
              {authenticationMethods.map((method) => (
                <button
                  key={method.id}
                  onClick={() => setActiveTab(method.id)}
                  className={`p-6 rounded-2xl border-2 text-left transition-all duration-200 ${
                    activeTab === method.id
                      ? "border-primary bg-primary/5 shadow-lg"
                      : "border-gray-200 bg-white hover:border-primary/50"
                  }`}
                >
                  <method.icon
                    size={32}
                    className={`mb-4 ${
                      activeTab === method.id ? "text-primary" : "text-gray-400"
                    }`}
                  />
                  <h3 className="font-semibold text-gray-900 mb-2">
                    {method.name}
                  </h3>
                  <p className="text-gray-600 text-sm mb-3">
                    {method.description}
                  </p>
                  <span className="text-xs text-primary font-medium">
                    Best for: {method.bestFor}
                  </span>
                </button>
              ))}
            </div>

            {/* Tab Content */}
            {activeTab === "api-keys" && (
              <div className="bg-white rounded-2xl border border-gray-200 p-8">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-gray-900">
                    API Keys Authentication
                  </h3>
                  <div className="flex items-center gap-2 text-sm text-green-600 bg-green-50 px-3 py-1 rounded-full">
                    <IconCheck size={16} />
                    Recommended for most integrations
                  </div>
                </div>

                <p className="text-gray-600 mb-8">
                  Use your API keys to authenticate requests to K-Pentag's API.
                  Include your secret key in the Authorization header of all API
                  requests.
                </p>

                {/* API Key Generation Steps */}
                <div className="mb-8">
                  <h4 className="font-semibold text-gray-900 mb-4">
                    How to Generate Your API Keys
                  </h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    {apiGenerationSteps.map((step, index) => (
                      <div
                        key={index}
                        className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg border border-gray-200"
                      >
                        <div className="flex-shrink-0 w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center">
                          <step.icon size={20} />
                        </div>
                        <div>
                          <h5 className="font-semibold text-gray-900 mb-1">
                            {step.title}
                          </h5>
                          <p className="text-sm text-gray-600">
                            {step.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <p className="text-blue-800 text-sm">
                      <strong>Note:</strong> After generating your API keys,
                      you'll receive both publishable and secret keys. Keep your
                      secret key secure and never expose it in client-side code.
                    </p>
                  </div>
                </div>

                {/* API Keys Display */}
                <div className="space-y-6 mb-8">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Example Publishable Key
                    </label>
                    <div className="flex gap-2">
                      <div className="flex-1 relative">
                        <input
                          type="text"
                          value="pk_test_51Mn4s8J8qXr7w9t2v6b..."
                          readOnly
                          className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg font-mono text-sm"
                        />
                        <button
                          onClick={() =>
                            copyToClipboard(
                              "pk_test_51Mn4s8J8qXr7w9t2v6b...",
                              "test-key"
                            )
                          }
                          className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 text-gray-400 hover:text-gray-600"
                        >
                          {copiedField === "test-key" ? (
                            <IconCheck size={18} />
                          ) : (
                            <IconCopy size={18} />
                          )}
                        </button>
                      </div>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">
                      Use this key in your frontend applications. Safe to expose
                      in client-side code.
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Example Secret Key
                    </label>
                    <div className="flex gap-2">
                      <div className="flex-1 relative">
                        <input
                          type={showSecretKey ? "text" : "password"}
                          value="sk_test_51Mn4s8J8qXr7w9t2v6b..."
                          readOnly
                          className="w-full px-4 py-3 bg-red-50 border border-red-200 rounded-lg font-mono text-sm"
                        />
                        <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex gap-1">
                          <button
                            onClick={() => setShowSecretKey(!showSecretKey)}
                            className="p-2 text-gray-400 hover:text-gray-600"
                          >
                            {showSecretKey ? (
                              <IconEyeOff size={18} />
                            ) : (
                              <IconEye size={18} />
                            )}
                          </button>
                          <button
                            onClick={() =>
                              copyToClipboard(
                                "sk_test_51Mn4s8J8qXr7w9t2v6b...",
                                "secret-key"
                              )
                            }
                            className="p-2 text-gray-400 hover:text-gray-600"
                          >
                            {copiedField === "secret-key" ? (
                              <IconCheck size={18} />
                            ) : (
                              <IconCopy size={18} />
                            )}
                          </button>
                        </div>
                      </div>
                    </div>
                    <p className="text-sm text-red-600 mt-1 flex items-center gap-1">
                      <IconAlertCircle size={16} />
                      Keep this key secret! Never expose it in client-side code.
                    </p>
                  </div>
                </div>

                {/* Code Snippets */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-semibold text-gray-900">
                      Implementation Examples
                    </h4>
                    <div className="flex gap-1 bg-gray-100 rounded-lg p-1">
                      {Object.keys(codeSnippets).map((lang) => {
                        const key = lang as keyof typeof codeSnippets;
                        return (
                          <button
                            key={key}
                            onClick={() => setActiveLanguage(key)}
                            className={`px-3 py-1 text-sm rounded-md transition-colors ${
                              activeLanguage === key
                                ? "bg-white text-primary shadow-sm"
                                : "text-gray-600 hover:text-gray-900"
                            }`}
                          >
                            {key.charAt(0).toUpperCase() + key.slice(1)}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="rounded-lg overflow-hidden border border-gray-200">
                    <SyntaxHighlighter
                      language={codeSnippets[activeLanguage].language}
                      style={vscDarkPlus}
                      customStyle={{ margin: 0, borderRadius: "0.5rem" }}
                      showLineNumbers
                    >
                      {codeSnippets[activeLanguage].code}
                    </SyntaxHighlighter>
                  </div>

                  <button className="mt-4 flex items-center gap-2 text-primary font-medium hover:text-primary/80 transition-colors">
                    <IconPlayerPlay size={16} />
                    Test this request in our API Playground
                  </button>
                </div>
              </div>
            )}

            {activeTab === "payment-links" && (
              <div className="bg-white rounded-2xl border border-gray-200 p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-6">
                  Payment Links
                </h3>
                <p className="text-gray-600 mb-6">
                  Create shareable payment URLs without any authentication
                  headers. Perfect for one-time payments, invoices, and social
                  media payments.
                </p>

                <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
                  <h4 className="font-semibold text-blue-900 mb-2">
                    Example Payment Link
                  </h4>
                  <div className="flex items-center gap-2">
                    <code className="flex-1 bg-white px-4 py-2 rounded-lg border border-blue-200 text-blue-800 text-sm">
                      https://pay.kpentag.com/link_2x3y4z5a6b7c8d9e
                    </code>
                    <button
                      onClick={() =>
                        copyToClipboard(
                          "https://pay.kpentag.com/link_2x3y4z5a6b7c8d9e",
                          "payment-link"
                        )
                      }
                      className="p-2 text-blue-600 hover:text-blue-800"
                    >
                      {copiedField === "payment-link" ? (
                        <IconCheck size={18} />
                      ) : (
                        <IconCopy size={18} />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "sdk-tokens" && (
              <div className="bg-white rounded-2xl border border-gray-200 p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-6">
                  SDK Tokens
                </h3>
                <p className="text-gray-600 mb-6">
                  Generate short-lived tokens for client-side integrations.
                  Enhanced security with automatic expiration and scope
                  limitations.
                </p>
                {/* SDK token content would go here */}
              </div>
            )}
          </section>

          {/* Security Best Practices */}
          <section className="bg-white rounded-2xl border border-gray-200 p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Security Best Practices
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {securityFeatures.map((feature, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <feature.icon className="text-primary" size={20} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 text-sm">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1 space-y-6">
          {/* Quick Start */}
          <div className="bg-primary/5 border border-primary/20 rounded-2xl p-6">
            <h3 className="font-semibold text-gray-900 mb-4">Quick Start</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-3 text-gray-600">
                <div className="w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-xs font-bold">
                  1
                </div>
                <span>Get your API keys from dashboard</span>
              </div>
              <div className="flex items-center gap-3 text-gray-600">
                <div className="w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-xs font-bold">
                  2
                </div>
                <span>Choose authentication method</span>
              </div>
              <div className="flex items-center gap-3 text-gray-600">
                <div className="w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-xs font-bold">
                  3
                </div>
                <span>Implement with code examples</span>
              </div>
              <div className="flex items-center gap-3 text-gray-600">
                <div className="w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-xs font-bold">
                  4
                </div>
                <span>Test in sandbox environment</span>
              </div>
            </div>

            <button className="w-full mt-4 bg-primary text-white py-3 px-4 rounded-lg font-semibold hover:bg-primary/90 transition-colors flex items-center justify-center gap-2">
              Go to Dashboard
              <IconArrowRight size={18} />
            </button>
          </div>

          {/* Environment Info */}
          <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6">
            <h3 className="font-semibold text-gray-900 mb-4">Environments</h3>
            <div className="space-y-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="font-medium text-gray-900">Test Mode</span>
                </div>
                <p className="text-sm text-gray-600">
                  Use test keys with mock data. No real payments processed.
                </p>
              </div>
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="font-medium text-gray-900">Live Mode</span>
                </div>
                <p className="text-sm text-gray-600">
                  Process real payments. Requires activated account.
                </p>
              </div>
            </div>
          </div>

          {/* Support Card */}
          <div className="bg-orange-50 border border-orange-200 rounded-2xl p-6">
            <h3 className="font-semibold text-gray-900 mb-2">Need Help?</h3>
            <p className="text-sm text-gray-600 mb-4">
              Our developer support team is here to help with integration.
            </p>
            <button className="w-full bg-orange-500 text-white py-2 px-4 rounded-lg font-medium hover:bg-orange-600 transition-colors">
              Contact Support
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
