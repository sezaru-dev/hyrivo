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
import RescheduleDialog from '../../modals/RescheduleDialog'
import ActionDialog from '../../modals/ActionDialog'
import { MarkAsCompletedDialog } from '../../alert-dialogs/MarkAsCompletedDialog'
import { MarkAsMissedDialog } from '../../alert-dialogs/MarkAsMissedDialog'
import { MarkAsOfferedDialog } from '../../alert-dialogs/MarkAsOfferedDialog'
import { MarkAsRejectedDialog } from '../../alert-dialogs/MarkAsRejectedDialog'
import { MarkAsHiredDialog } from '../../alert-dialogs/MarkAsHiredDialog'
import Link from 'next/link'

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

        {
          jobApplication.status === 'applied' && (
            <>
              <DropdownMenuItem asChild>
                <Link href={`/dashboard/job-applications/${jobApplication._id}`} className="justify-start px-2 h-9">
                  View Details
                </Link>
              </DropdownMenuItem>
              
              <DropdownMenuItem asChild>
                <InterviewScheduledDialog id={jobApplication._id} />
              </DropdownMenuItem>

              <DropdownMenuItem asChild>
                <DeleteApplicationDialog id={jobApplication._id}/>
              </DropdownMenuItem>
            </>
          )
        }
                {
          jobApplication.status === 'interview' && 
          jobApplication.interviewStatus === 'scheduled' && (
            <>
              <DropdownMenuItem asChild>
                <Link href={`/dashboard/job-applications/${jobApplication._id}`} className="justify-start px-2 h-9">
                  View Details
                </Link>
              </DropdownMenuItem>

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
                <MarkAsCompletedDialog id={jobApplication._id} onAction={() => setOpenDropdownId(null)}/>
              </DropdownMenuItem>

              <DropdownMenuItem asChild>
                <MarkAsMissedDialog id={jobApplication._id} onAction={() => setOpenDropdownId(null)}/>
              </DropdownMenuItem>
            </>
          )
        }

        {
          jobApplication.status === 'interview' && 
          jobApplication.interviewStatus === 'completed' && (
            <>
            <DropdownMenuItem asChild>
              <Link href={`/dashboard/job-applications/${jobApplication._id}`} className="justify-start px-2 h-9">
                View Details
              </Link>
            </DropdownMenuItem>

            <DropdownMenuItem asChild>
              <ActionDialog
                data={jobApplication}
                title={jobApplication.interviewRemarks? "Edit Remarks" : "Add Remarks"}
                form="remarks"
              >
                <Button variant="ghost" className=" justify-start px-2">
                  Add/Edit Remarks
                </Button>
              </ActionDialog>
            </DropdownMenuItem>

            <DropdownMenuItem asChild>
              <MarkAsOfferedDialog id={jobApplication._id} onAction={() => setOpenDropdownId(null)}/>
            </DropdownMenuItem>

            <DropdownMenuItem asChild>
              <MarkAsRejectedDialog id={jobApplication._id} onAction={() => setOpenDropdownId(null)}/>
            </DropdownMenuItem>
            </>
          )
        }

        {
          jobApplication.status === 'interview' && 
          jobApplication.interviewStatus === 'missed' && (
            <>
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
                <DeleteApplicationDialog id={jobApplication._id}/>
              </DropdownMenuItem>
            </>
          )
        }

        {
          jobApplication.status === 'offered' && 
          jobApplication.interviewStatus === 'completed' && (
            <>            
              <DropdownMenuItem asChild>
                <Link href={`/dashboard/job-applications/${jobApplication._id}`} className="justify-start px-2 h-9">
                  View Details
                </Link>
              </DropdownMenuItem>

              <DropdownMenuItem asChild>
                <MarkAsHiredDialog id={jobApplication._id} onAction={() => setOpenDropdownId(null)}/>
              </DropdownMenuItem>

              <DropdownMenuItem asChild>
                <DeleteApplicationDialog id={jobApplication._id}/>
              </DropdownMenuItem>
            </>
          )
        }

        {
          ["rejected", "hired"].includes(jobApplication.status) && (
            <DropdownMenuItem asChild>
              <DeleteApplicationDialog id={jobApplication._id}/>
            </DropdownMenuItem>
          )
        }
        
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
