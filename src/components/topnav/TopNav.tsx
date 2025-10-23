"use client";

import React, { useState } from "react";
import { IconArrowRight, IconSearch } from "@tabler/icons-react";
import {
  ActionIcon,
  TextInput,
  TextInputProps,
  useMantineTheme,
} from "@mantine/core";
import { themeColors } from "../../../utils";

type Props = {};

const TopNav = (props: Props) => {
  const [active, setActive] = useState("docs");
  return (
    <div className="w-full border-b-[1px] border-b-gray-300 ">
      <div className="flex justify-between items-center  h-20 w-[95%] mx-auto">
        <div className="w-full">
          <TextInput
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
          />
        </div>
        <div className="w-full flex justify-end gap-x-6 mr-8">
          <button className="block text-lg ">
            <span
              className={active === "docs" ? "font-bold text-primary" : ""}
              onClick={() => setActive("docs")}
            >
              Docs
            </span>
          </button>
          <button className="block text-lg ">
            <span className={active === "api" ? "font-bold text-primary " : ""}>
              Api
            </span>
          </button>
          <button className="block bg-primary py-1 text-white font-medium px-3 rounded-md">
            Signup
          </button>
        </div>
      </div>
    </div>
  );
};

export default TopNav;
