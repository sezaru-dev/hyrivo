'use client'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import React from "react";
import useChangeScheduledInterviewStatus from "@/lib/hooks/interviews/use-change-scheduled-interview-status";

type ThisComponentProps= {
  id: string;
  onAction?: () => void;
}

const MarkAsMissedDialog = React.forwardRef<HTMLButtonElement, ThisComponentProps>(
  ({ id, onAction }, ref) => {

  const { mutate: changeStatus, isPending: isStatusChanging } = useChangeScheduledInterviewStatus()
  const isLoading = isStatusChanging
  
  const actionHandler = () => {
    changeStatus({ id: id, interviewStatus: "missed" }, {
      onSuccess: () => {
        onAction?.()
      },
    })
  }
  
  
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button ref={ref} variant="ghost" className=" justify-start px-2">Mark as Missed</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Mark as Missed?</AlertDialogTitle>
          <AlertDialogDescription>
            This will update the interview status to <strong>Missed</strong>. 
            You can still reschedule the interview later to reset its status to <strong>Scheduled</strong>.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={actionHandler} disabled={isLoading} className="bg-brand-blue text-sidebar-primary-foreground hover:bg-brand-blue/80">
            {isLoading ? "Loading..." : "Yes, Mark as missed"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
  })

  MarkAsMissedDialog.displayName = "MarkAsMissedDialog"
  export default MarkAsMissedDialog