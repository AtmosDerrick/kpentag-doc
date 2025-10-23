import TopNav from "@/components/topnav/TopNav";
import { ActionIcon, TextInput } from "@mantine/core";
import {
  IconArrowRight,
  IconDeviceIpadHorizontalCode,
  IconHelpCircle,
  IconLogin2,
  IconSearch,
  IconStack,
  IconWebhook,
  IconWorldCog,
} from "@tabler/icons-react";
import React from "react";
import { themeColors } from "../../utils";

import logo from "@/assets/kp3_.webp";
import Image from "next/image";
import Link from "next/link";

type Props = {};

const page = (props: Props) => {
  const sections = [
    {
      title: "Getting Started",
      body: "Learn the fundamentals of integrating K-Pentag Payment Gateway — from account setup, obtaining API keys, to making your first test transaction. Perfect for new developers who want a guided start.",
      icon: IconStack,
      link: "/getting-started",
    },
    {
      title: "Quick Start",
      body: "Get up and running fast using our SDKs, plugins, and CDN integrations. This section includes ready-made examples for JavaScript, Node.js, Python, PHP, and mobile platforms.",
      icon: IconLogin2,
      link: "/quick-start",
    },
    {
      title: "API's",
      body: "Dive into K-Pentag’s RESTful APIs for creating charges, verifying payments, managing refunds, and handling webhooks. Each endpoint includes request/response samples and authentication details.",
      icon: IconWorldCog,
      link: "/api-integration",
    },
    {
      title: "Integrations",
      body: "Connect K-Pentag seamlessly with popular frameworks and platforms — such as WordPress, Shopify, React, and Django. Learn how to use our SDKs, embedded checkout, and third-party modules.",
      icon: IconWebhook,
      link: "/quick-start",
    },
    {
      title: "Developer Tools",
      body: "Access developer utilities like API testing sandbox, webhook simulator, SDK libraries, and CLI tools to help you debug, monitor, and optimize your integration.",
      icon: IconDeviceIpadHorizontalCode,
      link: "/environment",
    },
    {
      title: "Support",
      body: "Need help? Explore troubleshooting guides, FAQs, error code references, and learn how to contact our developer support team or join the K-Pentag developer community.",
      icon: IconHelpCircle,
      link: "/support",
    },
  ];

  return (
    <div>
      <TopNav />
      <div>
        <div className="w-full bg-primary h-[50vh] px-12">
          <Image src={logo} alt="" className="w-32 py-2" />

          <div className=" items-center flex justify-center text-white h-[40vh]">
            <div>
              <h2 className="text-4xl font-semibold text-center uppercase">
                Documentation
              </h2>
              <p className="text-gray-300 text-center mt-4">
                This guide will help you set up your PayLink account, obtain
                your API keys, and make your first test payment in just a few
                minutes.
              </p>
              <div className="mt-4">
                {/* <TextInput
                  radius="xl"
                  size="md"
                  placeholder="Search questions"
                  rightSectionWidth={42}
                  leftSection={<IconSearch size={18} stroke={1.5} />}
                  rightSection={
                    <ActionIcon
                      size={32}
                      radius="xl"
                      color={themeColors.primary}
                      variant="filled"
                    >
                      <IconArrowRight size={18} stroke={1.5} />
                    </ActionIcon>
                  }
                  {...props}
                /> */}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-[80%] mx-auto my-8 grid grid-cols-3 gap-6">
        {sections.map((item, index) => (
          <Link
            href={item.link}
            className="p-6 h-48 border border-gray-300 rounded-md hover:shadow-lg hover:cursor-pointer"
            key={index}
          >
            <h3 className="text-lg font-semibold mb-2">
              {item.icon && <item.icon className="inline mr-2" stroke={1.5} />}
              {item.title}
            </h3>
            <p className="text-gray-700">{item.body}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default page;
