'use client'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import React from "react";
import { useRouter } from "next/navigation";
import useChangeScheduledInterviewStatus from "@/lib/hooks/interviews/use-change-scheduled-interview-status";

export function MarkAsMissedDialog({ id, onAction }: { id: string; onAction?: () => void}) {
  const { mutate: changeStatus, isPending: isStatusChanging } = useChangeScheduledInterviewStatus()
  const isLoading = isStatusChanging
    const router = useRouter()

const actionHandler = () => {
  changeStatus({ id: id, interviewStatus: "missed" }, {
    onSuccess: () => {
      onAction?.()
      router.push("/dashboard/interviews/missed")
    },
  })
}


  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="ghost" className=" justify-start px-2">Mark as Missed</Button>
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
}
