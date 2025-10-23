"use client";

import {
  IconRocket,
  IconCode,
  IconPlug,
  IconCopy,
  IconCheck,
  IconDownload,
  IconPlayerPlay,
  IconShield,
  IconClock,
  IconSettings,
  IconArrowRight,
  IconBrandWordpress,
  IconUpload,
  IconSearch,
  IconFileText,
  IconBrandSafari,
  IconBrandMailgun,
  IconBrandShopee,
  IconBrand4chan,
} from "@tabler/icons-react";
import { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

export default function QuickStartPage() {
  const [copiedField, setCopiedField] = useState("");
  const [activeTab, setActiveTab] = useState("wordpress");

  const integrationMethods = [
    {
      id: "wordpress",
      name: "WordPress",
      icon: IconBrandWordpress,
      description: "WordPress plugin integration",
      time: "10 min",
      difficulty: "Beginner",
    },
    {
      id: "woocommerce",
      name: "WooCommerce",
      icon: IconBrandWordpress,
      description: "WooCommerce payment gateway",
      time: "15 min",
      difficulty: "Easy",
    },
    {
      id: "shopify",
      name: "Shopify",
      icon: IconBrandSafari,
      description: "Shopify app integration",
      time: "20 min",
      difficulty: "Easy",
    },
    {
      id: "magento",
      name: "Magento",
      icon: IconBrandMailgun,
      description: "Magento 2 extension",
      time: "25 min",
      difficulty: "Intermediate",
    },
    {
      id: "direct-api",
      name: "Direct API",
      icon: IconCode,
      description: "Direct API integration",
      time: "30 min",
      difficulty: "Advanced",
    },
  ];

  const pluginSteps = {
    wordpress: [
      {
        step: 1,
        title: "Download Plugin",
        description: "Download the K-Pentag plugin from WordPress.org",
        icon: IconDownload,
        code: `// Download from:
https://wordpress.org/plugins/kpentag-payment-gateway

// Or search "K-Pentag" in your WordPress admin plugins section`,
      },
      {
        step: 2,
        title: "Install & Activate",
        description: "Upload and activate the plugin in your WordPress admin",
        icon: IconUpload,
        code: `1. Go to WordPress Admin → Plugins → Add New
2. Click "Upload Plugin"
3. Choose the downloaded .zip file
4. Click "Install Now"
5. Click "Activate Plugin"`,
      },
      {
        step: 3,
        title: "Configure Settings",
        description: "Enter your API keys in plugin settings",
        icon: IconSettings,
        code: `1. Go to WordPress Admin → K-Pentag → Settings
2. Enter your Publishable Key
3. Enter your Secret Key
4. Choose Test/Live mode
5. Save changes`,
      },
      {
        step: 4,
        title: "Add Payment Shortcode",
        description: "Use shortcodes to add payment forms",
        icon: IconCode,
        code: `// Basic payment form
[kpentag_payment amount="20.00" currency="USD"]

// With custom button text
[kpentag_payment amount="50.00" 
currency="USD" button_text="Pay Now"]

// In product description or page content`,
      },
    ],
    woocommerce: [
      {
        step: 1,
        title: "Install WooCommerce Plugin",
        description: "Download and install the K-Pentag for WooCommerce plugin",
        icon: IconDownload,
        code: `Download from:
https://github.com/kpentag/woocommerce-gateway

Or use WordPress admin plugin installer`,
      },
      {
        step: 2,
        title: "Enable Payment Gateway",
        description: "Activate K-Pentag in WooCommerce settings",
        icon: IconSettings,
        code: `1. Go to WooCommerce → Settings → Payments
2. Find "K-Pentag"
3. Click "Set up"
4. Enter API keys
5. Enable the gateway`,
      },
      {
        step: 3,
        title: "Configure Gateway Settings",
        description: "Set up payment method settings",
        icon: IconShield,
        code: `Settings to configure:
- Title: "Credit Card (K-Pentag)"
- Description: "Pay with your credit card"
- Test/Live mode
- API Keys
- Payment method types`,
      },
      {
        step: 4,
        title: "Test Checkout",
        description: "Test the payment flow with test orders",
        icon: IconPlayerPlay,
        code: `1. Add a product to cart
2. Proceed to checkout
3. Select K-Pentag payment
4. Use test card: 4242 4242 4242 4242
5. Complete test order`,
      },
    ],
  };

  const directApiExamples = {
    createPayment: {
      request: `POST /v1/payments HTTP/1.1
Host: api.kpentag.com
Authorization: Bearer sk_test_your_secret_key
Content-Type: application/json

{
  "amount": 2000,
  "currency": "usd",
  "description": "Payment for Order #12345",
  "payment_method": "pm_card_visa",
  "customer": "cus_9f8e7d6c5b4a3",
  "metadata": {
    "order_id": "12345",
    "customer_email": "customer@example.com"
  },
  "return_url": "https://your-store.com/thank-you"
}`,
      response: `HTTP/1.1 200 OK
Content-Type: application/json

{
  "id": "pay_9f8e7d6c5b4a3",
  "object": "payment",
  "amount": 2000,
  "currency": "usd",
  "status": "succeeded",
  "description": "Payment for Order #12345",
  "customer": "cus_9f8e7d6c5b4a3",
  "payment_method": "pm_card_visa",
  "created_at": "2024-01-15T10:30:00Z",
  "metadata": {
    "order_id": "12345",
    "customer_email": "customer@example.com"
  }
}`,
    },
    createCustomer: {
      request: `POST /v1/customers HTTP/1.1
Host: api.kpentag.com
Authorization: Bearer sk_test_your_secret_key
Content-Type: application/json

{
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
  "metadata": {
    "signup_source": "website"
  }
}`,
      response: `HTTP/1.1 200 OK
Content-Type: application/json

{
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
  "created_at": "2024-01-15T10:30:00Z",
  "metadata": {
    "signup_source": "website"
  }
}`,
    },
  };

  const features = [
    {
      icon: IconClock,
      title: "10-Minute Setup",
      description: "Get WordPress plugin running in under 10 minutes",
    },
    {
      icon: IconShield,
      title: "Secure Payments",
      description: "PCI DSS compliant with built-in security",
    },
    {
      icon: IconPlug,
      title: "Easy Integration",
      description: "Simple plugin installation and configuration",
    },
    {
      icon: IconFileText,
      title: "Comprehensive Docs",
      description: "Detailed documentation for all platforms",
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

  const currentSteps = pluginSteps[activeTab as keyof typeof pluginSteps] || [];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <div className="flex justify-center mb-6">
          <div className="p-4 bg-primary/10 rounded-2xl">
            <IconRocket className="text-primary" size={48} />
          </div>
        </div>
        <h1 className="text-5xl font-bold text-gray-900 mb-6">
          Quick Start Guide
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
          Get started with K-Pentag payments quickly. Choose your platform and
          follow the simple integration steps to start accepting payments.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <button className="flex items-center gap-2 px-8 py-4 bg-primary text-white rounded-xl hover:bg-primary/90 transition-all duration-200 font-semibold text-lg shadow-lg hover:shadow-xl">
            <IconDownload size={20} />
            Download WordPress Plugin
            <IconArrowRight size={20} />
          </button>
          <button className="flex items-center gap-2 px-6 py-4 border border-gray-300 text-gray-700 rounded-xl hover:border-primary hover:text-primary transition-colors font-semibold">
            <IconFileText size={20} />
            View Documentation
          </button>
        </div>
      </div>

      {/* Features Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
        {features.map((feature, index) => (
          <div
            key={index}
            className="text-center p-6 bg-white rounded-2xl border border-gray-200 hover:shadow-lg transition-shadow"
          >
            <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
              <feature.icon className="text-primary" size={24} />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">
              {feature.title}
            </h3>
            <p className="text-gray-600 text-sm">{feature.description}</p>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Integration Methods */}
          <section className="bg-white rounded-2xl border border-gray-200 p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Choose Your Platform
            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
              {integrationMethods.map((method) => (
                <button
                  key={method.id}
                  onClick={() => setActiveTab(method.id)}
                  className={`p-4 rounded-xl border-2 text-left transition-all duration-200 ${
                    activeTab === method.id
                      ? "border-primary bg-primary/5 shadow-lg"
                      : "border-gray-200 bg-white hover:border-primary/50"
                  }`}
                >
                  <method.icon
                    size={32}
                    className={`mb-3 ${
                      activeTab === method.id ? "text-primary" : "text-gray-400"
                    }`}
                  />
                  <h3 className="font-semibold text-gray-900 mb-1">
                    {method.name}
                  </h3>
                  <p className="text-gray-600 text-sm mb-2">
                    {method.description}
                  </p>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-500">{method.time}</span>
                    <span
                      className={`px-2 py-1 rounded ${
                        method.difficulty === "Beginner"
                          ? "bg-green-100 text-green-800"
                          : method.difficulty === "Easy"
                          ? "bg-blue-100 text-blue-800"
                          : method.difficulty === "Intermediate"
                          ? "bg-orange-100 text-orange-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {method.difficulty}
                    </span>
                  </div>
                </button>
              ))}
            </div>

            {/* Plugin Installation Steps */}
            {activeTab !== "direct-api" && currentSteps.length > 0 && (
              <div>
                <h3 className="font-semibold text-gray-900 mb-6">
                  {integrationMethods.find((m) => m.id === activeTab)?.name}{" "}
                  Installation Guide
                </h3>
                <div className="space-y-6">
                  {currentSteps.map((step) => (
                    <div
                      key={step.step}
                      className="flex gap-6 p-6 bg-gray-50 rounded-xl border border-gray-200"
                    >
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center font-bold text-lg">
                          {step.step}
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <step.icon className="text-primary" size={24} />
                            <h3 className="text-xl font-semibold text-gray-900">
                              {step.title}
                            </h3>
                          </div>
                        </div>
                        <p className="text-gray-600 mb-4">{step.description}</p>
                        <div className="bg-gray-900 rounded-lg p-4">
                          <pre className="text-white text-sm font-mono whitespace-pre-wrap">
                            {step.code}
                          </pre>
                        </div>
                        <button
                          onClick={() =>
                            copyToClipboard(step.code, `step-${step.step}`)
                          }
                          className="mt-2 flex items-center gap-2 text-primary font-medium hover:text-primary/80 transition-colors text-sm"
                        >
                          {copiedField === `step-${step.step}` ? (
                            <IconCheck size={16} />
                          ) : (
                            <IconCopy size={16} />
                          )}
                          Copy Instructions
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Direct API Examples */}
            {activeTab === "direct-api" && (
              <div>
                <h3 className="font-semibold text-gray-900 mb-6">
                  Direct API Integration
                </h3>

                <div className="space-y-8">
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-4">
                      Create Payment Endpoint
                    </h4>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h5 className="font-medium text-gray-900 mb-2 flex items-center gap-2">
                          <IconArrowRight
                            size={16}
                            className="text-green-500"
                          />
                          Request
                        </h5>
                        <div className="rounded-lg overflow-hidden border border-gray-200">
                          <SyntaxHighlighter
                            language="http"
                            style={vscDarkPlus}
                            customStyle={{ margin: 0, maxHeight: "400px" }}
                            showLineNumbers
                          >
                            {directApiExamples.createPayment.request}
                          </SyntaxHighlighter>
                        </div>
                        <button
                          onClick={() =>
                            copyToClipboard(
                              directApiExamples.createPayment.request,
                              "payment-request"
                            )
                          }
                          className="mt-2 flex items-center gap-2 text-primary font-medium hover:text-primary/80 transition-colors text-sm"
                        >
                          {copiedField === "payment-request" ? (
                            <IconCheck size={16} />
                          ) : (
                            <IconCopy size={16} />
                          )}
                          Copy Request
                        </button>
                      </div>
                      <div>
                        <h5 className="font-medium text-gray-900 mb-2 flex items-center gap-2">
                          <IconArrowRight size={16} className="text-blue-500" />
                          Response
                        </h5>
                        <div className="rounded-lg overflow-hidden border border-gray-200">
                          <SyntaxHighlighter
                            language="json"
                            style={vscDarkPlus}
                            customStyle={{ margin: 0, maxHeight: "400px" }}
                            showLineNumbers
                          >
                            {directApiExamples.createPayment.response}
                          </SyntaxHighlighter>
                        </div>
                        <button
                          onClick={() =>
                            copyToClipboard(
                              directApiExamples.createPayment.response,
                              "payment-response"
                            )
                          }
                          className="mt-2 flex items-center gap-2 text-primary font-medium hover:text-primary/80 transition-colors text-sm"
                        >
                          {copiedField === "payment-response" ? (
                            <IconCheck size={16} />
                          ) : (
                            <IconCopy size={16} />
                          )}
                          Copy Response
                        </button>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-4">
                      Create Customer Endpoint
                    </h4>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h5 className="font-medium text-gray-900 mb-2">
                          Request
                        </h5>
                        <div className="rounded-lg overflow-hidden border border-gray-200">
                          <SyntaxHighlighter
                            language="http"
                            style={vscDarkPlus}
                            customStyle={{ margin: 0, maxHeight: "300px" }}
                            showLineNumbers
                          >
                            {directApiExamples.createCustomer.request}
                          </SyntaxHighlighter>
                        </div>
                      </div>
                      <div>
                        <h5 className="font-medium text-gray-900 mb-2">
                          Response
                        </h5>
                        <div className="rounded-lg overflow-hidden border border-gray-200">
                          <SyntaxHighlighter
                            language="json"
                            style={vscDarkPlus}
                            customStyle={{ margin: 0, maxHeight: "300px" }}
                            showLineNumbers
                          >
                            {directApiExamples.createCustomer.response}
                          </SyntaxHighlighter>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </section>

          {/* Additional Resources */}
          <section className="bg-white rounded-2xl border border-gray-200 p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Additional Resources
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="p-6 border border-gray-200 rounded-xl hover:border-primary transition-colors">
                <div className="w-12 h-12 bg-blue-500 text-white rounded-lg flex items-center justify-center mb-4">
                  <IconFileText size={24} />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  Plugin Documentation
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  Complete guide for WordPress plugin installation and
                  configuration
                </p>
                <button className="w-full py-2 border border-gray-300 text-gray-700 rounded-lg hover:border-primary hover:text-primary transition-colors">
                  View WordPress Docs
                </button>
              </div>

              <div className="p-6 border border-gray-200 rounded-xl hover:border-primary transition-colors">
                <div className="w-12 h-12 bg-green-500 text-white rounded-lg flex items-center justify-center mb-4">
                  <IconBrandSafari size={24} />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  WooCommerce Guide
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  Step-by-step WooCommerce payment gateway integration
                </p>
                <button className="w-full py-2 border border-gray-300 text-gray-700 rounded-lg hover:border-primary hover:text-primary transition-colors">
                  View WooCommerce Docs
                </button>
              </div>
            </div>
          </section>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1 space-y-6">
          {/* Quick Downloads */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6">
            <h3 className="font-semibold text-gray-900 mb-4">
              Quick Downloads
            </h3>
            <div className="space-y-3">
              <button className="w-full flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:border-primary transition-colors">
                <div className="flex items-center gap-3">
                  <IconBrandWordpress size={20} className="text-blue-600" />
                  <span className="text-gray-700">WordPress Plugin</span>
                </div>
                <IconDownload size={18} className="text-gray-400" />
              </button>
              <button className="w-full flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:border-primary transition-colors">
                <div className="flex items-center gap-3">
                  <IconBrand4chan size={20} className="text-purple-600" />
                  <span className="text-gray-700">WooCommerce Extension</span>
                </div>
                <IconDownload size={18} className="text-gray-400" />
              </button>
              <button className="w-full flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:border-primary transition-colors">
                <div className="flex items-center gap-3">
                  <IconBrandShopee size={20} className="text-green-600" />
                  <span className="text-gray-700">Shopify App</span>
                </div>
                <IconDownload size={18} className="text-gray-400" />
              </button>
            </div>
          </div>

          {/* Test Cards */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6">
            <h3 className="font-semibold text-gray-900 mb-4">Test Cards</h3>
            <div className="space-y-3 text-sm">
              <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                <div className="font-medium text-green-800 mb-1">
                  Successful Payment
                </div>
                <code className="text-green-700">4242 4242 4242 4242</code>
              </div>
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                <div className="font-medium text-red-800 mb-1">
                  Failed Payment
                </div>
                <code className="text-red-700">4000 0000 0000 0002</code>
              </div>
              <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                <div className="font-medium text-yellow-800 mb-1">
                  3D Secure
                </div>
                <code className="text-yellow-700">4000 0025 0000 3155</code>
              </div>
            </div>
          </div>

          {/* Support Card */}
          <div className="bg-primary/5 border border-primary/20 rounded-2xl p-6">
            <h3 className="font-semibold text-gray-900 mb-2">Need Help?</h3>
            <p className="text-sm text-gray-600 mb-4">
              Our support team is ready to help you get started.
            </p>
            <button className="w-full bg-primary text-white py-2 px-4 rounded-lg font-medium hover:bg-primary/90 transition-colors">
              Contact Support
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
