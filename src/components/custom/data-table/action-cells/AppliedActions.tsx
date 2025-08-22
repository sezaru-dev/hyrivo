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
import { DeleteApplicationDialog } from '../../alert-dialogs/DeleteActionDialog'
import InterviewScheduledDialog from '../../modals/InterviewScheduledDialog'

type AppliedActionsProps = {
  jobApplication: JobApplicationType
}

export const AppliedActions = ({ jobApplication}: AppliedActionsProps) => {
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
          <Button variant="ghost" className=" justify-start px-2">
            Edit
          </Button>
        </DropdownMenuItem>

        <DropdownMenuItem asChild>
          <InterviewScheduledDialog id={jobApplication._id} />
        </DropdownMenuItem>
        
        <DropdownMenuItem asChild>
          <DeleteApplicationDialog id={jobApplication._id}/>
        </DropdownMenuItem>

      </DropdownMenuContent>
    </DropdownMenu>
  )
}
