'use client'
import { useDropdownMenuStore } from '@/stores/features/dropdownMenuStore'
import { JobApplicationType } from '@/types'
import React from 'react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from '@/components/ui/button'
import { MoreHorizontal } from "lucide-react"
import ActionDialog from '../../modals/ActionDialog'
import RescheduleDialog from '../../modals/RescheduleDialog'
import DeleteApplicationDialog from '../../alert-dialogs/DeleteActionDialog'
import MarkAsCompletedDialog from '../../alert-dialogs/MarkAsCompletedDialog'
import MarkAsMissedDialog from '../../alert-dialogs/MarkAsMissedDialog'


type ScheduledInterviewActionsProps = {
  jobApplication: JobApplicationType
}

export const ScheduledInterviewActions = ({ jobApplication}: ScheduledInterviewActionsProps) => {
  const { openDropdownId, setOpenDropdownId } = useDropdownMenuStore()

  const isOpen = openDropdownId === jobApplication._id

  return (
    <DropdownMenu open={isOpen} onOpenChange={(open) => setOpenDropdownId(open ? jobApplication._id : null)}>
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
            data={jobApplication}
            title="Reschedule Interview"
          >
            <Button variant="ghost" className=" justify-start px-2">
              Reschedule Interview
            </Button>
          </RescheduleDialog>
        </DropdownMenuItem>
        
        <DropdownMenuItem asChild>
          <ActionDialog
            data={jobApplication}
            title={jobApplication.interviewNote? "Edit Notes" : "Add Notes"}
            form="notes"
          >
            <Button variant="ghost" className=" justify-start px-2">
              Add/Edit Note
            </Button>
          </ActionDialog>
        </DropdownMenuItem>

        <DropdownMenuItem asChild>
          <MarkAsCompletedDialog data={jobApplication} onAction={() => setOpenDropdownId(null)}/>
        </DropdownMenuItem>

        <DropdownMenuItem asChild>
          <MarkAsMissedDialog id={jobApplication._id} onAction={() => setOpenDropdownId(null)}/>
        </DropdownMenuItem>

        <DropdownMenuItem asChild>
          <DeleteApplicationDialog id={jobApplication._id}/>
        </DropdownMenuItem>

      </DropdownMenuContent>
    </DropdownMenu>
  )
}
