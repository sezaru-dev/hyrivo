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
import RescheduleDialog from "@/components/custom/modals/RescheduleDialog"

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
/*       const formatted = isNaN(parsedDate.getTime())
        ? "Invalid date"
        : format(parsedDate, "MMM d, yyyy 'at' h:mm a") */

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
    accessorKey: "notes",
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
      const rawValue = row.getValue("notes")

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
                <RescheduleDialog
                  data={row.original.notes}
                  title="Reschedule Interview"
                >
                  <Button variant="ghost" className=" justify-start px-2">
                    Reschedule Interview
                  </Button>
                </RescheduleDialog>
              </DropdownMenuItem>

              <DropdownMenuItem asChild>
                <ActionDialog
                  data={row.original.notes}
                  title={row.original.notes? "Edit Notes" : "Add Notes"}
                >
                  <Button variant="ghost" className=" justify-start px-2">
                    Add/Edit Note
                  </Button>
                </ActionDialog>
              </DropdownMenuItem>

            <DropdownMenuItem asChild>
              <AlertDialogComponent onAction={() => setOpenDropdownId(null)}
                actionText="Yes, Mark as Completed"
                description={<>
                  This will set the interview status to <strong>Completed</strong>. 
                  Make sure the interview has already taken place. You’ll still be able to add notes or feedback later from the Completed Interviews.
                </>}  
              >
                <Button variant="ghost" className=" justify-start px-2">Mark as Completed</Button>
              </AlertDialogComponent>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <AlertDialogComponent onAction={() => setOpenDropdownId(null)}
                actionText="Yes, Mark as Missed"
                description={
                <>This will update the interview status to <strong>Missed</strong>. 
                  You can still reschedule the interview later to reset its status to <strong>Scheduled</strong>.
                </>  
                }  
              >
                <Button variant="ghost" className=" justify-start px-2">Mark as Missed</Button>
              </AlertDialogComponent>
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
