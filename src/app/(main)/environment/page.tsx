"use client";

import {
  IconTestPipe,
  IconRocket,
  IconToggleLeft,
  IconToggleRight,
  IconCheck,
  IconAlertCircle,
  IconCopy,
  IconRefresh,
  IconShield,
  IconDatabase,
  IconCloud,
  IconSettings,
  IconArrowRight,
  IconPlayerPlay,
  IconCode,
  IconKey,
  IconLock,
} from "@tabler/icons-react";
import { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

export default function EnvironmentPage() {
  const [activeEnvironment, setActiveEnvironment] = useState<"test" | "live">(
    "test"
  );
  const [copiedField, setCopiedField] = useState("");
  const [webhookUrl, setWebhookUrl] = useState(
    "https://api.your-app.com/webhooks/kpentag"
  );

  const environments = {
    test: {
      name: "Test Environment",
      status: "active",
      description: "Safe sandbox for development and testing",
      icon: IconTestPipe,
      color: "emerald",
      baseUrl: "https://api-sandbox.kpentag.com",
      features: [
        "Mock payment processing",
        "Test card numbers available",
        "No real money transactions",
        "Instant API key generation",
        "Unlimited test requests",
      ],
      configuration: {
        webhooks: true,
        logging: "verbose",
        timeout: "30s",
        retries: 3,
      },
    },
    live: {
      name: "Live Environment",
      status: "inactive",
      description: "Production environment for real transactions",
      icon: IconRocket,
      color: "blue",
      baseUrl: "https://api.kpentag.com",
      features: [
        "Real payment processing",
        "Actual fund transfers",
        "Production-grade security",
        "SLA-backed uptime",
        "Priority support",
      ],
      configuration: {
        webhooks: true,
        logging: "essential",
        timeout: "15s",
        retries: 2,
      },
    },
  };

  const testCards = [
    {
      number: "4242 4242 4242 4242",
      type: "Visa",
      status: "Successful",
      description: "Generic successful payment",
      cvc: "123",
      expiry: "12/28",
    },
    {
      number: "4000 0000 0000 0002",
      type: "Visa",
      status: "Failed",
      description: "Generic declined payment",
      cvc: "123",
      expiry: "12/28",
    },
    {
      number: "5555 5555 5555 4444",
      type: "Mastercard",
      status: "Successful",
      description: "Successful payment",
      cvc: "123",
      expiry: "12/28",
    },
    {
      number: "2223 0000 0000 0006",
      type: "Mastercard",
      status: "3D Secure",
      description: "Requires authentication",
      cvc: "123",
      expiry: "12/28",
    },
  ];

  const environmentConfigs = {
    javascript: `// Environment Configuration
const KPentag = require('kpentag');

// Test Environment
const testClient = new KPentag({
  apiKey: 'pk_test_your_test_key',
  environment: 'sandbox'
});

// Live Environment
const liveClient = new KPentag({
  apiKey: 'pk_live_your_live_key',
  environment: 'production'
});`,

    python: `# Environment Configuration
import kpentag

# Test Environment
test_client = kpentag.Client(
    api_key='pk_test_your_test_key',
    environment='sandbox'
)

# Live Environment
live_client = kpentag.Client(
    api_key='pk_live_your_live_key',
    environment='production'
)`,

    php: `<?php
// Environment Configuration
require_once('kpentag/init.php');

// Test Environment
\\KPentag\\KPentag::setApiKey('pk_test_your_test_key');
\\KPentag\\KPentag::setEnvironment('sandbox');

// Live Environment
\\KPentag\\KPentag::setApiKey('pk_live_your_live_key');
\\KPentag\\KPentag::setEnvironment('production');
?>`,
  };

  const [activeLanguage, setActiveLanguage] = useState<
    "javascript" | "python" | "php"
  >("javascript");

  const copyToClipboard = async (text: string, fieldName: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedField(fieldName);
      setTimeout(() => setCopiedField(""), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  const currentEnv = environments[activeEnvironment];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Environment Configuration
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Configure and manage your test and live environments. Test safely in
          sandbox before going live with real transactions.
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Environment Toggle */}
          <section className="bg-white rounded-2xl border border-gray-200 p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                Environment Switch
              </h2>
              <div
                className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium ${
                  activeEnvironment === "test"
                    ? "bg-emerald-100 text-emerald-800"
                    : "bg-blue-100 text-blue-800"
                }`}
              >
                <div
                  className={`w-2 h-2 rounded-full mr-2 ${
                    activeEnvironment === "test"
                      ? "bg-emerald-500"
                      : "bg-blue-500"
                  }`}
                ></div>
                {currentEnv.status.toUpperCase()}
              </div>
            </div>

            <div className="flex items-center justify-between p-6 bg-gray-50 rounded-xl mb-6">
              <div className="flex items-center gap-4">
                <div
                  className={`p-3 rounded-lg ${
                    activeEnvironment === "test"
                      ? "bg-emerald-500"
                      : "bg-blue-500"
                  }`}
                >
                  <currentEnv.icon size={24} className="text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">
                    {currentEnv.name}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {currentEnv.description}
                  </p>
                </div>
              </div>

              <button
                onClick={() =>
                  setActiveEnvironment(
                    activeEnvironment === "test" ? "live" : "test"
                  )
                }
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  activeEnvironment === "test"
                    ? "bg-emerald-500"
                    : "bg-blue-500"
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    activeEnvironment === "test"
                      ? "translate-x-6"
                      : "translate-x-1"
                  }`}
                />
              </button>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
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
                  API Key Prefix
                </h4>
                <div className="flex items-center gap-2">
                  <code className="flex-1 bg-white px-3 py-2 rounded border text-sm font-mono">
                    {activeEnvironment === "test" ? "pk_test_" : "pk_live_"}
                  </code>
                  <button
                    onClick={() =>
                      copyToClipboard(
                        activeEnvironment === "test" ? "pk_test_" : "pk_live_",
                        "key-prefix"
                      )
                    }
                    className="p-2 text-gray-400 hover:text-gray-600"
                  >
                    {copiedField === "key-prefix" ? (
                      <IconCheck size={18} />
                    ) : (
                      <IconCopy size={18} />
                    )}
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* Environment Features */}
          <section className="bg-white rounded-2xl border border-gray-200 p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              {currentEnv.name} Features
            </h2>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              {currentEnv.features.map((feature, index) => (
                <div key={index} className="flex items-start gap-3">
                  <IconCheck
                    size={20}
                    className="text-emerald-500 mt-0.5 flex-shrink-0"
                  />
                  <span className="text-gray-700">{feature}</span>
                </div>
              ))}
            </div>

            {/* Configuration Settings */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Configuration
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-sm text-gray-600 mb-1">Webhooks</div>
                  <div
                    className={`text-lg font-semibold ${
                      currentEnv.configuration.webhooks
                        ? "text-emerald-600"
                        : "text-gray-400"
                    }`}
                  >
                    {currentEnv.configuration.webhooks ? "Enabled" : "Disabled"}
                  </div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-sm text-gray-600 mb-1">Logging</div>
                  <div className="text-lg font-semibold text-gray-900">
                    {currentEnv.configuration.logging}
                  </div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-sm text-gray-600 mb-1">Timeout</div>
                  <div className="text-lg font-semibold text-gray-900">
                    {currentEnv.configuration.timeout}
                  </div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-sm text-gray-600 mb-1">Retries</div>
                  <div className="text-lg font-semibold text-gray-900">
                    {currentEnv.configuration.retries}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Test Environment Specific Content */}
          {activeEnvironment === "test" && (
            <section className="bg-white rounded-2xl border border-gray-200 p-8">
              <div className="flex items-center gap-3 mb-6">
                <IconTestPipe className="text-emerald-500" size={24} />
                <h2 className="text-2xl font-bold text-gray-900">Test Cards</h2>
              </div>

              <p className="text-gray-600 mb-6">
                Use these test card numbers to simulate different payment
                scenarios in the sandbox environment.
              </p>

              <div className="grid gap-4">
                {testCards.map((card, index) => (
                  <div
                    key={index}
                    className="p-4 border border-gray-200 rounded-lg hover:border-emerald-300 transition-colors"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-3 h-3 rounded-full ${
                            card.status === "Successful"
                              ? "bg-emerald-500"
                              : card.status === "Failed"
                              ? "bg-red-500"
                              : "bg-yellow-500"
                          }`}
                        ></div>
                        <span className="font-semibold text-gray-900">
                          {card.type}
                        </span>
                        <span
                          className={`text-sm px-2 py-1 rounded-full ${
                            card.status === "Successful"
                              ? "bg-emerald-100 text-emerald-800"
                              : card.status === "Failed"
                              ? "bg-red-100 text-red-800"
                              : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {card.status}
                        </span>
                      </div>
                      <button
                        onClick={() =>
                          copyToClipboard(
                            card.number.replace(/\s/g, ""),
                            `card-${index}`
                          )
                        }
                        className="p-1 text-gray-400 hover:text-gray-600"
                      >
                        {copiedField === `card-${index}` ? (
                          <IconCheck size={16} />
                        ) : (
                          <IconCopy size={16} />
                        )}
                      </button>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <div className="text-gray-600 mb-1">Card Number</div>
                        <code className="bg-gray-100 px-2 py-1 rounded font-mono">
                          {card.number}
                        </code>
                      </div>
                      <div>
                        <div className="text-gray-600 mb-1">Description</div>
                        <div className="text-gray-900">{card.description}</div>
                      </div>
                      <div>
                        <div className="text-gray-600 mb-1">CVC</div>
                        <code className="bg-gray-100 px-2 py-1 rounded font-mono">
                          {card.cvc}
                        </code>
                      </div>
                      <div>
                        <div className="text-gray-600 mb-1">Expiry</div>
                        <code className="bg-gray-100 px-2 py-1 rounded font-mono">
                          {card.expiry}
                        </code>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Configuration Examples */}
          <section className="bg-white rounded-2xl border border-gray-200 p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                Configuration Examples
              </h2>
              <div className="flex gap-1 bg-gray-100 rounded-lg p-1">
                {(["javascript", "python", "php"] as const).map((lang) => (
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
            </div>

            <div className="rounded-lg overflow-hidden border border-gray-200">
              <SyntaxHighlighter
                language={activeLanguage}
                style={vscDarkPlus}
                customStyle={{ margin: 0, borderRadius: "0.5rem" }}
                showLineNumbers
              >
                {environmentConfigs[activeLanguage]}
              </SyntaxHighlighter>
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
                <span className="text-gray-700">Generate Test API Key</span>
                <IconKey size={18} className="text-gray-400" />
              </button>
              <button className="w-full flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:border-primary transition-colors">
                <span className="text-gray-700">View API Logs</span>
                <IconDatabase size={18} className="text-gray-400" />
              </button>
              <button className="w-full flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:border-primary transition-colors">
                <span className="text-gray-700">Test Webhooks</span>
                <IconCloud size={18} className="text-gray-400" />
              </button>
              <button className="w-full flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:border-primary transition-colors">
                <span className="text-gray-700">Environment Settings</span>
                <IconSettings size={18} className="text-gray-400" />
              </button>
            </div>
          </div>

          {/* Webhook Configuration */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6">
            <h3 className="font-semibold text-gray-900 mb-4">
              Webhook Configuration
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Webhook URL
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={webhookUrl}
                    onChange={(e) => setWebhookUrl(e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm"
                    placeholder="https://your-app.com/webhooks"
                  />
                  <button className="px-3 py-2 bg-primary text-white rounded-lg text-sm hover:bg-primary/90 transition-colors">
                    Save
                  </button>
                </div>
              </div>
              <button className="w-full flex items-center justify-center gap-2 py-2 border border-gray-300 text-gray-700 rounded-lg hover:border-primary hover:text-primary transition-colors">
                <IconPlayerPlay size={16} />
                Send Test Webhook
              </button>
            </div>
          </div>

          {/* Environment Status */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6">
            <h3 className="font-semibold text-gray-900 mb-4">
              Environment Status
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Test Environment</span>
                <div className="flex items-center gap-2 text-emerald-600">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                  <span className="text-sm font-medium">Operational</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Live Environment</span>
                <div className="flex items-center gap-2 text-emerald-600">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                  <span className="text-sm font-medium">Operational</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">API Response Time</span>
                <span className="text-sm font-medium text-gray-900">
                  ~120ms
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Uptime</span>
                <span className="text-sm font-medium text-gray-900">
                  99.99%
                </span>
              </div>
            </div>
          </div>

          {/* Go Live Checklist */}
          {activeEnvironment === "test" && (
            <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6">
              <h3 className="font-semibold text-gray-900 mb-4">
                Ready to Go Live?
              </h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-3 text-gray-600">
                  <IconCheck
                    size={16}
                    className="text-emerald-500 flex-shrink-0"
                  />
                  <span>Test all payment scenarios</span>
                </div>
                <div className="flex items-center gap-3 text-gray-600">
                  <IconCheck
                    size={16}
                    className="text-emerald-500 flex-shrink-0"
                  />
                  <span>Configure webhooks</span>
                </div>
                <div className="flex items-center gap-3 text-gray-600">
                  <IconCheck
                    size={16}
                    className="text-emerald-500 flex-shrink-0"
                  />
                  <span>Update to live API keys</span>
                </div>
                <div className="flex items-center gap-3 text-gray-600">
                  <IconCheck
                    size={16}
                    className="text-emerald-500 flex-shrink-0"
                  />
                  <span>Enable security features</span>
                </div>
              </div>
              <button className="w-full mt-4 bg-blue-500 text-white py-2 px-4 rounded-lg font-medium hover:bg-blue-600 transition-colors flex items-center justify-center gap-2">
                Switch to Live
                <IconArrowRight size={16} />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
