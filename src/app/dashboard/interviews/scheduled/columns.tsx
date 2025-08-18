"use client"

import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, CircleAlert } from "lucide-react"
import { Button } from "@/components/ui/button"
import { JobApplicationType } from "@/types"
import { format, isBefore } from "date-fns"
import InterviewDueTooltip from "@/components/custom/tooltips/InterviewDueTooltip"
import { ScheduledInterviewActions } from "@/components/custom/data-table/action-cells/ScheduledInterviewActions"

export const columns: ColumnDef<JobApplicationType>[] = [
  {
    accessorKey: "companyName",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="-ml-4"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Company
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: "jobTitle",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="-ml-4"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Job Title
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: "interviewAt",
    header: ({ column }) => (
      <Button
        variant="ghost"
        className="-ml-4"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Interview Schedule
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => {
      const rawValue = row.getValue("interviewAt")

      if (typeof rawValue !== "string" || !rawValue) {
        return <span className="text-muted-foreground italic">No interview scheduled</span>
      }

      const parsedDate = new Date(rawValue)
      if (isNaN(parsedDate.getTime())) {
        return <span className="text-destructive font-medium">Invalid date</span>
      }
      const isOverdue = isBefore(parsedDate, new Date())
      const formatted = format(parsedDate, "MMM d, yyyy 'at' h:mm a")

      return (
        <span className="relative flex items-center gap-2 whitespace-nowrap">
            {formatted}
            {
              isOverdue ?
            <InterviewDueTooltip>
              <CircleAlert size={16} className="text-red-500"/>
            </InterviewDueTooltip>  : null
            }
          </span>
      )
    },
  },
  {
    accessorKey: "interviewNote",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="-ml-4"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Notes
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const rawValue = row.getValue("interviewNote")

      if (typeof rawValue !== "string" || !rawValue) {
        return null
      }
      return <span>{rawValue}</span>
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const jobApplication = row.original
      return (
        <ScheduledInterviewActions jobApplication={jobApplication}/>
      )
    },
  },
]