import {
  IconCheck,
  IconCreditCard,
  IconKey,
  IconRocket,
  IconSettings,
  IconShield,
  IconCode,
  IconArrowRight,
  IconClock,
  IconFileDescription,
  IconBuildingBank,
} from "@tabler/icons-react";

export default function GettingStarted() {
  const steps = [
    {
      icon: IconCreditCard,
      title: "Create Your Account",
      description:
        "Sign up for a K-Pentag merchant account with your business details",
      duration: "2 minutes",
      status: "ready",
    },
    {
      icon: IconSettings,
      title: "Configure Dashboard",
      description:
        "Set up your business profile, payment methods, and notification preferences",
      duration: "5 minutes",
      status: "ready",
    },
    {
      icon: IconKey,
      title: "Access API Keys",
      description:
        "Retrieve your test and live API credentials from the developer settings",
      duration: "1 minute",
      status: "ready",
    },
    {
      icon: IconCode,
      title: "Choose Integration",
      description:
        "Select between SDKs, hosted checkout, or direct API integration",
      duration: "15-30 minutes",
      status: "next",
    },
    {
      icon: IconShield,
      title: "Test & Go Live",
      description:
        "Verify integration with test mode and activate live payments",
      duration: "10 minutes",
      status: "upcoming",
    },
  ];

  const prerequisites = [
    {
      title: "Business Information",
      items: [
        "Business registration documents",
        "Tax identification number",
        "Business address and contact details",
      ],
    },
    {
      title: "Bank Account",
      items: [
        "Bank account details for settlements",
        "Routing number and account number",
      ],
    },
    {
      title: "Technical Requirements",
      items: [
        "Website URL (for web integrations)",
        "Server with SSL certificate",
        "Basic understanding of REST APIs",
      ],
    },
  ];

  const integrationOptions = [
    {
      title: "Hosted Checkout",
      description: "Redirect customers to our secure payment page",
      bestFor: "Quick setup, no PCI compliance needed",
      time: "10-15 min",
    },
    {
      title: "SDK Integration",
      description: "Embed payment forms directly in your application",
      bestFor: "Customizable UI, better user experience",
      time: "20-30 min",
    },
    {
      title: "REST API",
      description: "Full control over payment flow and user interface",
      bestFor: "Complete customization, advanced workflows",
      time: "30-45 min",
    },
  ];

  return (
    <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-8 ">
      {/* Header Section */}
      <div className="mb-12">
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
          <span>Documentation</span>
          <IconArrowRight size={16} />
          <span className="text-primary font-medium">Getting Started</span>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-6">
              Start Accepting Payments with K-Pentag
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Get your payment integration up and running in under 30 minutes.
              Follow this step-by-step guide to create your account, obtain API
              keys, and process your first test payment.
            </p>

            <div className="flex flex-wrap gap-4">
              <button className="bg-primary text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-all duration-200 flex items-center gap-2 shadow-lg hover:shadow-xl">
                <span>Create Free Account</span>
                <IconArrowRight size={20} />
              </button>
              <button className="border border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:border-primary hover:text-primary transition-colors">
                Download SDK
              </button>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="bg-gradient-to-br from-primary to-primary/90 rounded-2xl p-8 text-white">
            <h3 className="text-xl font-semibold mb-6">Integration Timeline</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span>Account Setup</span>
                <span className="font-semibold">7 min</span>
              </div>
              <div className="w-full bg-white/20 rounded-full h-2">
                <div className="bg-white h-2 rounded-full w-1/4"></div>
              </div>

              <div className="flex justify-between items-center">
                <span>Integration</span>
                <span className="font-semibold">15-30 min</span>
              </div>
              <div className="w-full bg-white/20 rounded-full h-2">
                <div className="bg-white h-2 rounded-full w-2/3"></div>
              </div>

              <div className="flex justify-between items-center">
                <span>Testing</span>
                <span className="font-semibold">10 min</span>
              </div>
              <div className="w-full bg-white/20 rounded-full h-2">
                <div className="bg-white h-2 rounded-full w-1/6"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Step-by-Step Guide */}
      <section className="mb-16">
        <div className="flex items-center gap-3 mb-8">
          <div className="p-2 bg-primary/10 rounded-lg">
            <IconRocket className="text-primary" size={24} />
          </div>
          <h2 className="text-3xl font-bold text-gray-900">
            5-Step Integration Guide
          </h2>
        </div>

        <div className="grid gap-6">
          {steps.map((step, index) => (
            <div
              key={index}
              className={`flex items-start gap-6 p-6 rounded-xl border-2 transition-all duration-200 ${
                step.status === "next"
                  ? "border-primary bg-primary/5 shadow-lg"
                  : step.status === "upcoming"
                  ? "border-gray-200 bg-gray-50"
                  : "border-green-200 bg-green-50"
              }`}
            >
              <div
                className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg ${
                  step.status === "next"
                    ? "bg-primary text-white"
                    : step.status === "upcoming"
                    ? "bg-gray-300 text-gray-600"
                    : "bg-green-500 text-white"
                }`}
              >
                {index + 1}
              </div>

              <div className="flex-1">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <step.icon
                      className={
                        step.status === "next"
                          ? "text-primary"
                          : step.status === "upcoming"
                          ? "text-gray-400"
                          : "text-green-500"
                      }
                      size={24}
                    />
                    <h3 className="text-xl font-semibold text-gray-900">
                      {step.title}
                    </h3>
                  </div>
                  <span className="flex items-center gap-1 text-sm text-gray-500 bg-white px-3 py-1 rounded-full border">
                    <IconClock size={16} />
                    {step.duration}
                  </span>
                </div>
                <p className="text-gray-600 mb-4">{step.description}</p>

                {step.status === "next" && (
                  <button className="bg-primary text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors">
                    Start This Step
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Prerequisites & Integration Options */}
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Prerequisites */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <IconFileDescription className="text-primary" size={24} />
            <h2 className="text-2xl font-bold text-gray-900">
              What You'll Need
            </h2>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-6">
            <p className="text-blue-800 font-medium">
              Having these items ready will make your integration process faster
              and smoother.
            </p>
          </div>

          <div className="space-y-6">
            {prerequisites.map((section, index) => (
              <div
                key={index}
                className="border border-gray-200 rounded-lg p-6"
              >
                <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <IconBuildingBank size={20} className="text-primary" />
                  {section.title}
                </h3>
                <ul className="space-y-2">
                  {section.items.map((item, itemIndex) => (
                    <li
                      key={itemIndex}
                      className="flex items-center gap-3 text-gray-600"
                    >
                      <IconCheck
                        size={16}
                        className="text-green-500 flex-shrink-0"
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Integration Options */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <IconCode className="text-primary" size={24} />
            <h2 className="text-2xl font-bold text-gray-900">
              Choose Your Integration
            </h2>
          </div>

          <div className="space-y-6">
            {integrationOptions.map((option, index) => (
              <div
                key={index}
                className="border border-gray-200 rounded-xl p-6 hover:border-primary hover:shadow-lg transition-all duration-200"
              >
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {option.title}
                  </h3>
                  <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                    {option.time}
                  </span>
                </div>
                <p className="text-gray-600 mb-4">{option.description}</p>
                <div className="text-sm text-primary font-medium">
                  Best for: {option.bestFor}
                </div>
                <button className="w-full mt-4 border border-primary text-primary py-2 rounded-lg font-medium hover:bg-primary hover:text-white transition-colors">
                  View Documentation
                </button>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Next Steps */}
      <section className="mt-16 bg-gray-50 rounded-2xl p-8 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Ready to Get Started?
        </h2>
        <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
          Join thousands of businesses already processing payments with
          K-Pentag. Create your account today and start integrating in minutes.
        </p>
        <button className="bg-primary text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors inline-flex items-center gap-2">
          Create Your K-Pentag Account
          <IconArrowRight size={20} />
        </button>
      </section>
    </div>
  );
}
