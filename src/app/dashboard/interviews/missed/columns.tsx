"use client"

import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { JobApplicationType } from "@/types"
import { format } from "date-fns"
import { MissedInterviewActions } from "@/components/custom/data-table/action-cells/MissedInterviewActions"
import InterviewMethodBadge from "@/components/custom/badges/InterviewMethodBadge"

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
      const formatted = format(parsedDate, "MMM d, yyyy h:mm a")

      return (
        <span className="whitespace-nowrap">
          {formatted}
        </span>
      )
      
    },
  },
    {
    accessorKey: "interviewMethod",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="-ml-4"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Method
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => (
      <InterviewMethodBadge status={row.original.interviewMethod} />
    ),
  },
  {
    accessorKey: "interviewNote",
    header: "Notes",
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
        <MissedInterviewActions jobApplication={jobApplication}/>
      )
    },
  },
]
