"use client"

import { ColumnDef } from "@tanstack/react-table"
import { JobApplicationType } from "@/types"
import { format } from "date-fns"
import { Badge } from "@/components/ui/badge"
import { capitalize } from "@/utils/capitalize"

const statusColorMap: Record<string, string> = {
  applied: "text-gray-500 dark:text-gray-400",
  interview: "text-blue-500 dark:text-blue-400",
  offered: "text-amber-500 dark:text-amber-400",
  hired: "text-green-500 dark:text-green-400",
  rejected: "text-red-500 dark:text-red-400",
};

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
    const colorClass = statusColorMap[status] || "text-muted-foreground";

    return (
      <Badge
        variant="outline"
        className={`flex gap-1 px-1.5 max-w-fit ${colorClass} [&_svg]:size-3`}
      >
        {capitalize(status)}
      </Badge>
    );
  },
},
{
  accessorKey: "interviewStatus",
  header: "Interview Status",
  cell: ({ row }) => {
    const status = row.original.interviewStatus;
    if (status === "none") return null; // show nothing if no interview
    return (
      <Badge
        variant="outline"
        className="flex gap-1 px-1.5 text-muted-foreground [&_svg]:size-3 max-w-fit"
      >
        {capitalize(status)}
      </Badge>
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
        : format(parsedDate, "MMM d, yyyy 'at' h:mm a")

      return <span>{formatted}</span>
    },
  },
  
]
