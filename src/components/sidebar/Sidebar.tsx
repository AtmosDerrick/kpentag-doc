"use client";

import { useState, useEffect } from "react";
import {
  IconCashBanknote,
  IconCodeAsterisk,
  IconCompass,
  IconHelpCircle,
  IconHome,
  IconLogin2,
  IconLogout,
  IconStack,
  IconSwitchHorizontal,
  IconTransactionDollar,
  IconMenu2,
  IconX,
} from "@tabler/icons-react";
import { Code, Group, Drawer, AppShell, Burger } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { MantineLogo } from "@mantinex/mantine-logo";
import classes from "./sidebar.module.css";
import { usePathname } from "next/navigation";

import logo from "@/assets/logo2.png";
import Image from "next/image";

const data = [
  { link: "/getting-started", label: "Getting Started", icon: IconStack },
  { link: "/quick-start", label: "Quick Start", icon: IconLogin2 },
  { link: "/support", label: "Support", icon: IconHelpCircle },
  { link: "/authentication", label: "Authentication", icon: IconCodeAsterisk },
  { link: "/environment", label: "Environment", icon: IconCodeAsterisk },
  {
    link: "/api-integration",
    label: "API Integration",
    icon: IconCodeAsterisk,
  },
  { link: "/webhook", label: "Webhooks", icon: IconCodeAsterisk },
  { link: "/settlements", label: "Settlements", icon: IconCodeAsterisk },
  { link: "/refunds", label: "Refunds", icon: IconCodeAsterisk },
  { link: "/chargebacks", label: "Chargebacks", icon: IconCodeAsterisk },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [active, setActive] = useState("");
  const [opened, { toggle, close }] = useDisclosure(false);

  // Set active link based on current route
  useEffect(() => {
    const currentLink = data.find(
      (item) => pathname === item.link || pathname.startsWith(item.link + "/")
    );
    if (currentLink) {
      setActive(currentLink.label);
    }
  }, [pathname]);

  const links = data.map((item) => (
    <a
      className={`${classes.link}${
        item.label === "Support" ||
        item.label === "Transfers" ||
        item.label === "Webhooks"
          ? " border-b-[1px] border-b-gray-300 mb-6 pb-4"
          : ""
      }`}
      data-active={item.label === active || undefined}
      href={item.link}
      key={item.label}
      onClick={(event) => {
        setActive(item.label);
        close(); // Close drawer on mobile when link is clicked
      }}
    >
      <item.icon className={classes.linkIcon} stroke={1.5} />
      <span>{item.label}</span>
    </a>
  ));

  const sidebarContent = (
    <>
      <div className={classes.navbarMain}>
        <Group className={classes.header} justify="space-between">
          <Image src={logo} alt="K-Pentag Logo" className="w-32" />
        </Group>
        {links}
      </div>

      {/* <div className={classes.footer}>
        <a
          href="#"
          className={classes.link}
          onClick={(event) => event.preventDefault()}
        >
          <IconSwitchHorizontal className={classes.linkIcon} stroke={1.5} />
          <span>Change account</span>
        </a>

        <a
          href="#"
          className={classes.link}
          onClick={(event) => event.preventDefault()}
        >
          <IconLogout className={classes.linkIcon} stroke={1.5} />
          <span>Logout</span>
        </a>
      </div> */}
    </>
  );

  return (
    <>
      {/* Mobile Burger Menu */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <Burger
          opened={opened}
          onClick={toggle}
          size="sm"
          className="bg-white p-2 rounded-md shadow-lg"
        />
      </div>

      {/* Mobile Drawer */}
      <Drawer
        opened={opened}
        onClose={close}
        title={
          <Group>
            <Image src={logo} alt="K-Pentag Logo" className="w-28" />
          </Group>
        }
        padding="md"
        size="sm"
        zIndex={10000}
        className="lg:hidden"
      >
        {sidebarContent}
      </Drawer>

      {/* Desktop Sidebar */}
      <nav className={`${classes.navbar} hidden lg:block`}>
        {sidebarContent}
      </nav>
    </>
  );
}
