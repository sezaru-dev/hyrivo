"use client"

import * as React from "react"
import {
  CalendarClock,
  FileText,
  Handshake,
  Inbox,
  LayoutDashboard,
  XCircle,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavUser } from "@/components/nav-user"
import { NavBrand } from "@/components/nav-brand"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"

const data = {
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard/",
      icon: LayoutDashboard,
    },
    {
      title: "Applications",
      url: "/dashboard/job-applications",
      icon: FileText,
    },
    {
      title: "Interviews",
      url: "/dashboard/interviews",
      icon: CalendarClock,
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
    {
      title: "Offers",
      url: "/dashboard/offers",
      icon: Inbox,
    },
    {
      title: "Hired",
      url: "/dashboard/hired",
      icon: Handshake,
    },
    {
      title: "Rejected",
      url: "/dashboard/rejected",
      icon: XCircle,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <NavBrand />
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
