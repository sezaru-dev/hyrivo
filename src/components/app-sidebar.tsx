"use client"

import * as React from "react"
import {
  AudioWaveform,
  BookOpen,
  Bot,
  Command,
  Frame,
  GalleryVerticalEnd,
  Headset,
  Map,
  PieChart,
  Settings2,
  SquareTerminal,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavUser } from "@/components/nav-user"
import { TeamSwitcher } from "@/components/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"

// This is sample data.
const data = {
  user: {
    name: "Sezaru",
    email: "sezaru@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "Hyrivo",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
  ],
  navMain: [
    {
      title: "Applications",
      url: "#",
      icon: Bot,
      items: [
        {
          title: "Job Applications",
          url: "/dashboard/job-applications",
        },
        {
          title: "Archives",
          url: "/dashboard/job-application-archives",
        },
      ],
    },
    {
      title: "Interviews",
      url: "dashboard/interviews",
      icon: Headset,
    },
    {
      title: "Calendar",
      url: "#",
      icon: BookOpen,
      items: [
        {
          title: "Sub-menu 1",
          url: "#",
        },
        {
          title: "Sub-menu 2",
          url: "#",
        },
        {
          title: "Sub-menu 3",
          url: "#",
        },
        {
          title: "Sub-menu 4",
          url: "#",
        },
      ],
    },
    {
      title: "Analytics",
      url: "#",
      icon: Settings2,
      items: [
        {
          title: "Sub-menu 1",
          url: "#",
        },
        {
          title: "Sub-menu 2",
          url: "#",
        },
        {
          title: "Sub-menu 3",
          url: "#",
        },
        {
          title: "Sub-menu 4",
          url: "#",
        },
      ],
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
