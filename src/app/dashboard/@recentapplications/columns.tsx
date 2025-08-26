"use client"

import { ColumnDef } from "@tanstack/react-table"
import { JobApplicationType } from "@/types"
import { format } from "date-fns"
import StatusBadge from "@/components/custom/badges/StatusBadge"
import InterviewStatusBadge from "@/components/custom/badges/InterviewStatusBadge"

export const columns: ColumnDef<JobApplicationType>[] = [
  {
    accessorKey: "companyName",
    header: 'Company'
  },
  {
    accessorKey: "jobTitle",
    header: 'Job Title'
  },
  {
    accessorKey: "appliedDate",
    header: 'Date Applied',
    
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
  header: "Status",
  cell: ({ row }) => {
    const status = row.original.status;

    return (
      <StatusBadge status={status} />
    );
  },
},
{
  accessorKey: "interviewStatus",
  header: "Interview Status",
  cell: ({ row }) => {
    const interviewStatus = row.original.interviewStatus;
    if (interviewStatus === "none") return null; // show nothing if no interview
    return (
      <InterviewStatusBadge status={interviewStatus} />
    );
  },
},
  {
    accessorKey: "interviewAt",
    header: 'Interview Schedule',
    cell: ({ row }) => {
      const rawValue = row.getValue("interviewAt")

      if (typeof rawValue !== "string" || !rawValue) {
        return null
      }

      const parsedDate = new Date(rawValue)
      const formatted = isNaN(parsedDate.getTime())
        ? "Invalid date"
        : format(parsedDate, "MMM d, yyyy h:mm a")

      return <span>{formatted}</span>
    },
  },
  
]
