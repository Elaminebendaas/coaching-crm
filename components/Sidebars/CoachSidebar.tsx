"use client";

import { Calendar, Home, Inbox, FileText, Settings } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import { usePathname } from "next/navigation";

// Menu items.
const items = [
  {
    title: "Home",
    url: "/coach",
    icon: Home,
  },
  {
    title: "Homework Pre-sets",
    url: "/coach/presets",
    icon: FileText,
  },
  {
    title: "Marketing",
    url: "/coach/marketing",
    icon: Inbox,
  },
  {
    title: "Calendar",
    url: "/calendar",
    icon: Calendar,
  },
  {
    title: "Settings",
    url: "/settings",
    icon: Settings,
  },
];

export function CoachSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar
      className="bg-[#F8F9FA] dark:bg-[#1A1D1E] p-[16px] w-[240px] border-none"
      collapsible="icon"
    >
      <SidebarContent>
        <SidebarHeader>Coaching CRM</SidebarHeader>
        <SidebarSeparator/>
        <SidebarGroup className="p-0">
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    className="h-[38px] "
                    isActive={item.url === pathname}
                    asChild
                  >
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
