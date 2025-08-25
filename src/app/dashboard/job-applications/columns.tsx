"use client"

import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, CircleAlert } from "lucide-react"
import { Button } from "@/components/ui/button"
import { categoryFilter } from "./data-table"
import { JobApplicationType } from "@/types"
import { format, isBefore } from "date-fns"
import { Badge } from "@/components/ui/badge"
import { AppliedActions } from "@/components/custom/data-table/action-cells/AppliedActions"
import InterviewDueTooltip from "@/components/custom/tooltips/InterviewDueTooltip"
import StatusBadge from "@/components/custom/badges/StatusBadge"
import InterviewStatusBadge from "@/components/custom/badges/InterviewStatusBadge"

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
    accessorKey: "appliedDate",
    header: ({ column }) => (
      <Button
        variant="ghost"
        className="-ml-4"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Applied Date
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    
    cell: ({ row }) => {
      const rawValue = row.getValue("appliedDate")

      if (typeof rawValue !== "string" || !rawValue) {
        return <span className="text-muted-foreground italic">No date</span>
      }

      const parsedDate = new Date(rawValue)
      const formatted = isNaN(parsedDate.getTime())
        ? "Invalid date"
        : format(parsedDate, "MMM d, yyyy") //  Jun 25, 2025

      return <span>{formatted}</span>
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="-ml-4"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Status
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => (
      <StatusBadge status={row.original.status} />
    ),
    filterFn: categoryFilter
  },
  {
  accessorKey: "interviewStatus",
  header: "Interview Status",
  cell: ({ row }) => {
    const status = row.original.interviewStatus;
    if (status === "none") return null; // show nothing if no interview
    return (
      <InterviewStatusBadge status={row.original.interviewStatus} />
    );
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
        return <span className="text-muted-foreground italic text-sm">No interview scheduled</span>
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
    accessorKey: "jobType",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="-ml-4"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Job Type
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => (
      <div className="w-32">
        <Badge variant="outline" className="px-1.5 text-muted-foreground">
          {row.original.jobType}
        </Badge>
      </div>
    ),
  },
  {
    accessorKey: "salary",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="-ml-4"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Salary
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => (
      <span>{new Intl.NumberFormat('en-PH', { style: 'currency', currency: 'PHP', maximumFractionDigits: 0 }).format(row.original.salary)}</span>

    ),
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const jobApplication = row.original
      return (
        <AppliedActions jobApplication={jobApplication}/>
      )
    },
  },
]

