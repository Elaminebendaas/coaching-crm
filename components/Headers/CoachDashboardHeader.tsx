"use client";

import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "../ui/sidebar";

const getPageTitle = (path: string) => {
  if (path === "/coach") {
    return "Dashboard";
  } else if (path.includes("/coach/presets")) {
    return "Homework Presets";
  } else if (path.includes("/coach/marketing")) {
    return "Promotions";
  } else {
    return "Page Not Found";
  }
};

export default function CoachDashboardHeader() {
  const pathname = usePathname(); // Get the current pathname from the router
  const title = getPageTitle(pathname);

  if (pathname === "/coach") {
    return (
      <div
        data-testid="DashboardHeader"
        className="h-[68px] w-full dark:bg-[#151718] dark:text-white border-[1px] border-[#DFE3E6] dark:border-[#313538] px-4 rounded-t-lg bg-[#ffffff] flex items-center justify-between"
      >
        <div data-testid="Header" className="flex items-center h-full">
          <SidebarTrigger />
          <h1 className="text-[#11181C] dark:text-white font-medium text-sm">
            {title}
          </h1>
        </div>

        <div className="flex items-center gap-[12px] h-[36px]">
          <Button>Hello</Button>
        </div>
      </div>
    );
  } else if (pathname === "/coach/presets") {
    return (
      <div
        data-testid="DashboardHeader"
        className="h-[68px] w-full dark:bg-[#151718] dark:text-white border-[1px] border-[#DFE3E6] dark:border-[#313538] px-4 rounded-t-lg bg-[#ffffff] flex items-center justify-between"
      >
        <div data-testid="Header" className="flex items-center h-full">
          <SidebarTrigger />
          <h1 className="text-[#11181C] dark:text-white font-medium text-sm">
            {title}
          </h1>
        </div>

        <div className="flex items-center gap-[12px] h-[36px]">
          <Button>Hello</Button>
        </div>
      </div>
    );
  } else if (pathname === "/coach/marketing") {
    return (
      <div
        data-testid="DashboardHeader"
        className="h-[68px] w-full dark:bg-[#151718] dark:text-white border-[1px] border-[#DFE3E6] dark:border-[#313538] px-4 rounded-t-lg bg-[#ffffff] flex items-center justify-between"
      >
        <div data-testid="Header" className="flex items-center h-full">
          <SidebarTrigger />
          <h1 className="text-[#11181C] dark:text-white font-medium text-sm">{title}</h1>
        </div>

        <div className="flex items-center gap-[12px] h-[36px]">
          <Button>Hello</Button>
        </div>
      </div>
    );
  }
}
