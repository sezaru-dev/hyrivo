"use client"

import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, BadgeCheck, CalendarClock, Delete, FileText, Handshake, LoaderIcon, MoreHorizontal, PauseCircle, XCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from "next/link"
import { categoryFilter } from "./data-table"
import { JobApplicationType } from "@/types"
import { format } from "date-fns"
import { Badge } from "@/components/ui/badge"

const statusIconMap: Record<string, JSX.Element> = {
  Applied: <FileText className="text-gray-500 dark:text-gray-400" />,
  Interview: <CalendarClock className="text-blue-500 dark:text-blue-400" />,
  Offered: <Handshake className="text-amber-500 dark:text-amber-400" />,
  Hired: <BadgeCheck className="text-green-500 dark:text-green-400" />,
  Rejected: <XCircle className="text-red-500 dark:text-red-400" />,
  Inactive: <PauseCircle className="text-zinc-500 dark:text-zinc-400" />,
}

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

/* export type Product = {
  id: string
  productname: string
  price: number
  category: string
} */

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
        : format(parsedDate, "MMM d, yyyy") // 👉 Jun 25, 2025

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
      <Badge
        variant="outline"
        className="flex gap-1 px-1.5 text-muted-foreground [&_svg]:size-3"
      >
        {statusIconMap[row.original.status]}
        {row.original.status}
      </Badge>
    ),
    filterFn: categoryFilter
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
      const formatted = isNaN(parsedDate.getTime())
        ? "Invalid date"
        : format(parsedDate, "MMM d, yyyy 'at' h:mm a")

      return <span>{formatted}</span>
    },
  },
  {
    accessorKey: "followUp",
    header: ({ column }) => (
      <Button
        variant="ghost"
        className="-ml-4"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Follow-Up
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => {
      const rawValue = row.getValue("followUp")

      if (typeof rawValue !== "string" || !rawValue) {
        return <span className="text-muted-foreground italic">No date</span>
      }

      const parsedDate = new Date(rawValue)
      const formatted = isNaN(parsedDate.getTime())
        ? "Invalid date"
        : format(parsedDate, "MMM d, yyyy") // 👉 Jun 25, 2025

      return <span>{formatted}</span>
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
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href={`/dashboard/products/product-list/${jobApplication._id}`}>
                View
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href={`/dashboard/products/product-list/${jobApplication._id}/edit`}>
                Edit
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href={`/dashboard/products/product-list/${jobApplication._id}/edit`}>
                Mark as Inactive
              </Link>
            </DropdownMenuItem>
            {row.original.status === "Rejected" ?
              <DropdownMenuItem asChild>
                <Link href={`/dashboard/products/product-list/${jobApplication._id}/edit`}>
                  Move to Archive
                </Link>
              </DropdownMenuItem>
            : null}

            <DropdownMenuItem >
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]
