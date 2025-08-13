"use client"

import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, CircleAlert,  MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { JobApplicationType } from "@/types"
import { format, isBefore } from "date-fns"
import { AlertDialogComponent } from "@/components/custom/alert-dialogs/AlertDialogComponent"
import { useDropdownMenuStore } from "@/stores/features/dropdownMenuStore"
import InterviewDueTooltip from "@/components/custom/tooltips/InterviewDueTooltip"
import ActionDialog from "@/components/custom/modals/ActionDialog"

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
      
      const formatted = format(parsedDate, "MMM d, yyyy 'at' h:mm a")

      return (
        <span className="relative flex items-center gap-2 whitespace-nowrap">
          {formatted}
        </span>
      )
    },
  },
  {
    accessorKey: "interviewRemarks",
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
    cell: ({ row }) => {
      const rawValue = row.getValue("interviewRemarks")

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

              <DropdownMenuItem asChild>
                <ActionDialog
                  data={row.original.interviewNote}
                  title={row.original.interviewNote? "Edit Notes" : "Add Notes"}
                >
                  <Button variant="ghost" className=" justify-start px-2">
                    Add/Edit Remarks
                  </Button>
                </ActionDialog>
              </DropdownMenuItem>

            <DropdownMenuItem asChild>
              <AlertDialogComponent id={jobApplication._id} actionType="permanentDelete" onAction={() => setOpenDropdownId(null)}/>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]
