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
      url: "/dashboard/interviews",
      icon: Headset,
      items: [
        {
          title: "Scheduled",
          url: "/dashboard/interviews/scheduled",
        },
        {
          title: "Completed",
          url: "/dashboard/interviews/completed",
        },
        {
          title: "Missed",
          url: "/dashboard/interviews/missed",
        },
      ],
    },
/*     {
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
    }, */
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
