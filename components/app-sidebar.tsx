"use client";

import * as React from "react";
import {
  AudioWaveform,
  BookOpen,
  BriefcaseMedical,
  FileUp,
  HeartPulse,
  LayoutGrid,
} from "lucide-react";

import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
import { TeamSwitcher } from "@/components/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { NAVIGATION_ITEMS } from "@/constants/app";

// Team data with improved typing
const teamData = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "Good Doctor",
      logo: HeartPulse,
      plan: "Enterprise",
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  // Transform NAVIGATION_ITEMS to include proper icon components and ensure proper typing
  const navigationWithIcons = NAVIGATION_ITEMS.map((item) => ({
    title: item.title,
    url: item.url,
    icon:
      item.icon === "LayoutGrid"
        ? LayoutGrid
        : item.icon === "BriefcaseMedical"
        ? BriefcaseMedical
        : item.icon === "BookOpen"
        ? BookOpen
        : item.icon === "AudioWaveform"
        ? AudioWaveform
        : item.icon === "FileUp"
        ? FileUp
        : undefined,
    items: item.items
      ? item.items.map((subItem) => ({
          title: subItem.title,
          url: subItem.url,
        }))
      : undefined,
  }));

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={teamData.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={navigationWithIcons} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={teamData.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
