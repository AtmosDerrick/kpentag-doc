"use client";

import {
  IconSearch,
  IconMessage,
  IconHeadset,
  IconClock,
  IconMail,
  IconPhone,
  IconLivePhoto,
  IconArrowRight,
  IconChevronDown,
  IconCheck,
  IconStar,
  IconSend,
  IconFileText,
  IconVideo,
  IconBook,
  IconCode,
} from "@tabler/icons-react";
import { useState } from "react";

export default function SupportPage() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [openFaq, setOpenFaq] = useState<any>(null);
  const [message, setMessage] = useState("");

  const supportCategories = [
    { id: "all", name: "All Topics", icon: IconHeadset, count: 45 },
    { id: "account", name: "Account & Billing", icon: IconFileText, count: 12 },
    {
      id: "technical",
      name: "Technical Issues",
      icon: IconLivePhoto,
      count: 18,
    },
    { id: "payments", name: "Payments", icon: IconStar, count: 8 },
    { id: "integration", name: "Integration", icon: IconCode, count: 7 },
  ];

  const faqSections = [
    {
      category: "account",
      title: "Account & Billing",
      questions: [
        {
          question: "How do I reset my password?",
          answer:
            "You can reset your password by clicking 'Forgot Password' on the login page. We'll send a reset link to your registered email address. The link expires in 1 hour for security reasons.",
          popular: true,
        },
        {
          question: "What payment methods do you accept for billing?",
          answer:
            "We accept all major credit cards (Visa, MasterCard, American Express), bank transfers, and in some regions, digital wallets. All billing transactions are secured with SSL encryption.",
          popular: false,
        },
        {
          question: "Can I change my account email address?",
          answer:
            "Yes, you can update your email in Account Settings. You'll need to verify the new email address, and we'll send confirmation emails to both old and new addresses for security.",
          popular: true,
        },
      ],
    },
    {
      category: "technical",
      title: "Technical Support",
      questions: [
        {
          question: "Why is my API call returning a 401 error?",
          answer:
            "A 401 error typically indicates invalid authentication. Check your API keys, ensure they haven't expired, and verify you're using the correct environment (test vs live).",
          popular: true,
        },
        {
          question: "How do I handle webhook failures?",
          answer:
            "Implement retry logic and monitor webhook delivery in your dashboard. We recommend setting up alerting for repeated failures and keeping your endpoint available.",
          popular: false,
        },
        {
          question: "What should I do if the payment form isn't loading?",
          answer:
            "Check your browser console for errors, ensure you're not blocking our domains, and verify your integration code. Our SDK requires a stable internet connection.",
          popular: true,
        },
      ],
    },
    {
      category: "payments",
      title: "Payments",
      questions: [
        {
          question: "How long do refunds take to process?",
          answer:
            "Refunds typically process within 5-7 business days, depending on the customer's bank. The refund status updates in real-time in your dashboard.",
          popular: true,
        },
        {
          question: "What currencies do you support?",
          answer:
            "We support 50+ currencies including USD, EUR, GBP, CAD, AUD, and JPY. You can enable additional currencies in your account settings.",
          popular: false,
        },
      ],
    },
  ];

  const supportContacts = [
    {
      icon: IconMessage,
      title: "Live Chat",
      description: "Instant help from our support team",
      availability: "Available 24/7",
      responseTime: "Typically < 2 min",
      action: "Start Chat",
      priority: "high",
    },
    {
      icon: IconMail,
      title: "Email Support",
      description: "Detailed technical assistance",
      availability: "24/7 with email tracking",
      responseTime: "Within 4 hours",
      action: "Send Email",
      priority: "medium",
    },
    {
      icon: IconPhone,
      title: "Phone Support",
      description: "Speak directly with our experts",
      availability: "Mon-Fri, 9AM-6PM EST",
      responseTime: "Immediate",
      action: "Call Now",
      priority: "high",
    },
  ];

  const allFAQs = faqSections.flatMap((section) =>
    section.questions.map((q) => ({ ...q, category: section.category }))
  );

  const filteredFAQs =
    activeCategory === "all"
      ? allFAQs
      : allFAQs.filter((faq) => faq.category === activeCategory);

  const popularFAQs = allFAQs.filter((faq) => faq.popular);

  return (
    <div className="w-[90%] mx-auto px-4 sm:px-6 lg:px-8 py-8 overflow-scroll ">
      {/* Header Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          How can we help you?
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
          Get answers to common questions, contact our support team, or explore
          our documentation. We're here to help you succeed.
        </p>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto relative">
          <div className="relative">
            <IconSearch
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={24}
            />
            <input
              type="text"
              placeholder="Search for answers, documentation, or guides..."
              className="w-full pl-12 pr-6 py-4 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-primary focus:border-transparent text-lg"
            />
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2">
          {/* Quick Help Cards */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {supportContacts.map((contact, index) => (
              <div
                key={index}
                className={`p-6 rounded-2xl border-2 transition-all duration-200 hover:shadow-lg ${
                  contact.priority === "high"
                    ? "border-primary bg-primary/5"
                    : "border-gray-200 bg-white"
                }`}
              >
                <contact.icon
                  size={32}
                  className={`mb-4 ${
                    contact.priority === "high"
                      ? "text-primary"
                      : "text-gray-600"
                  }`}
                />
                <h3 className="font-semibold text-gray-900 mb-2">
                  {contact.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  {contact.description}
                </p>
                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-sm text-gray-500">
                    <IconClock size={16} className="mr-2" />
                    {contact.availability}
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <IconHeadset size={16} className="mr-2" />
                    {contact.responseTime}
                  </div>
                </div>
                <button
                  className={`w-full py-2 px-4 rounded-lg font-medium transition-colors ${
                    contact.priority === "high"
                      ? "bg-primary text-white hover:bg-primary/90"
                      : "border border-gray-300 text-gray-700 hover:border-primary hover:text-primary"
                  }`}
                >
                  {contact.action}
                </button>
              </div>
            ))}
          </div>

          {/* Popular FAQs */}
          <section className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                Popular Questions
              </h2>
              <div className="flex items-center text-primary font-medium">
                <IconStar size={20} className="mr-2" />
                Most Helpful
              </div>
            </div>

            <div className="space-y-4">
              {popularFAQs.map((faq, index) => (
                <div
                  key={index}
                  className="bg-white border border-gray-200 rounded-xl p-6 hover:border-primary transition-colors cursor-pointer"
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                >
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-gray-900 pr-4">
                      {faq.question}
                    </h3>
                    <IconChevronDown
                      size={20}
                      className={`text-gray-400 transition-transform ${
                        openFaq === index ? "rotate-180" : ""
                      }`}
                    />
                  </div>
                  {openFaq === index && (
                    <div className="mt-4 text-gray-600 leading-relaxed">
                      {faq.answer}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* All FAQs by Category */}
          <section>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                Frequently Asked Questions
              </h2>
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-2 mb-6">
              {supportCategories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-colors ${
                    activeCategory === category.id
                      ? "bg-primary text-white border-primary"
                      : "bg-white text-gray-700 border-gray-300 hover:border-primary"
                  }`}
                >
                  <category.icon size={18} />
                  <span>{category.name}</span>
                  <span className="text-sm opacity-75">({category.count})</span>
                </button>
              ))}
            </div>

            {/* FAQ List */}
            <div className="space-y-4">
              {filteredFAQs.map((faq, index) => (
                <div
                  key={index}
                  className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md transition-all cursor-pointer"
                  onClick={() =>
                    setOpenFaq(
                      openFaq === `all-${index}` ? null : `all-${index}`
                    )
                  }
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span
                          className={`px-2 py-1 text-xs rounded-full ${
                            faq.popular
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-gray-100 text-gray-600"
                          }`}
                        >
                          {faq.popular ? "Popular" : "FAQ"}
                        </span>
                      </div>
                      <h3 className="font-semibold text-gray-900 pr-8">
                        {faq.question}
                      </h3>
                    </div>
                    <IconChevronDown
                      size={20}
                      className={`text-gray-400 mt-1 flex-shrink-0 transition-transform ${
                        openFaq === `all-${index}` ? "rotate-180" : ""
                      }`}
                    />
                  </div>
                  {openFaq === `all-${index}` && (
                    <div className="mt-4 text-gray-600 leading-relaxed border-t pt-4">
                      {faq.answer}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Sidebar - Contact Form & Resources */}
        <div className="lg:col-span-1">
          {/* Contact Form */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6 sticky top-8">
            <div className="flex items-center gap-3 mb-6">
              <IconMessage className="text-primary" size={24} />
              <h3 className="text-xl font-bold text-gray-900">
                Send us a message
              </h3>
            </div>

            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Your Email
                </label>
                <input
                  type="email"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="you@company.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Subject
                </label>
                <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent">
                  <option>Technical Issue</option>
                  <option>Billing Question</option>
                  <option>Account Help</option>
                  <option>Feature Request</option>
                  <option>Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Message
                </label>
                <textarea
                  rows={5}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                  placeholder="Describe your issue or question in detail..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
              </div>

              <button
                type="submit"
                disabled={!message.trim()}
                className="w-full bg-primary text-white py-3 px-4 rounded-lg font-semibold hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
              >
                <IconSend size={20} />
                Send Message
              </button>
            </form>

            <div className="mt-6 pt-6 border-t border-gray-200">
              <p className="text-sm text-gray-500 text-center">
                We typically respond within 2-4 hours during business hours
              </p>
            </div>
          </div>

          {/* Additional Resources */}
          <div className="mt-8 space-y-4">
            <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6">
              <h4 className="font-semibold text-gray-900 mb-3">
                Helpful Resources
              </h4>
              <div className="space-y-3">
                <a
                  href="#"
                  className="flex items-center gap-3 text-gray-600 hover:text-primary transition-colors"
                >
                  <IconBook size={18} />
                  <span>API Documentation</span>
                </a>
                <a
                  href="#"
                  className="flex items-center gap-3 text-gray-600 hover:text-primary transition-colors"
                >
                  <IconVideo size={18} />
                  <span>Integration Guides</span>
                </a>
                <a
                  href="#"
                  className="flex items-center gap-3 text-gray-600 hover:text-primary transition-colors"
                >
                  <IconFileText size={18} />
                  <span>Developer Forum</span>
                </a>
              </div>
            </div>

            {/* Support Status */}
            <div className="bg-green-50 border border-green-200 rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium text-green-800">
                  All systems operational
                </span>
              </div>
              <p className="text-sm text-green-700">
                No ongoing incidents. Our support team is available to help you.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
