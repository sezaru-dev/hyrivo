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
import EditRemarksModal from "@/components/custom/modals/EditRemarksModal"
import { AlertDialogComponent } from "@/components/custom/alert-dialogs/AlertDialogComponent"
import { useDropdownMenuStore } from "@/stores/features/dropdownMenuStore"
import { UnarchiveDialog } from "@/components/custom/modals/UnarchiveDialog"

const statusIconMap: Record<string, JSX.Element> = {
  Applied: <FileText className="text-gray-500 dark:text-gray-400" />,
  Interview: <CalendarClock className="text-blue-500 dark:text-blue-400" />,
  Offered: <Handshake className="text-amber-500 dark:text-amber-400" />,
  Hired: <BadgeCheck className="text-green-500 dark:text-green-400" />,
  Rejected: <XCircle className="text-red-500 dark:text-red-400" />,
  Inactive: <PauseCircle className="text-zinc-500 dark:text-zinc-400" />,
}

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
        className="flex gap-1 px-1.5 text-muted-foreground [&_svg]:size-3 max-w-min"
      >
        {statusIconMap[row.original.status]}
        {row.original.status}
      </Badge>
    ),
    filterFn: categoryFilter
  },
  {
    accessorKey: "remarks",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="-ml-4"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Remarks
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const jobApplication = row.original
      const { openDropdownId, setOpenDropdownId } = useDropdownMenuStore()
      const isOpen = openDropdownId === jobApplication._id
 
      return (
        <DropdownMenu open={isOpen} onOpenChange={(open) => {
          setOpenDropdownId(open ? jobApplication._id : null)
        }}>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="grid">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />

            {row.original.status === "Rejected" ?
              <DropdownMenuItem asChild>
                <EditRemarksModal hasRemark={row.original.remarks}/>
              </DropdownMenuItem>
            : null}
            <DropdownMenuItem asChild>
              {(row.original.status === "Rejected" || row.original.status === "Inactive") && (
                <DropdownMenuItem asChild>
                  <UnarchiveDialog status={row.original.status} />
                </DropdownMenuItem>
              )}
            </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <AlertDialogComponent onAction={() => setOpenDropdownId(null)}/>
              </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]
