'use client'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import React from "react";
import { useRouter } from "next/navigation";
import useChangeScheduledInterviewStatus from "@/lib/hooks/interviews/use-change-scheduled-interview-status";

export function MarkAsCompletedDialog({ id, onAction }: { id: string; onAction?: () => void}) {
  const { mutate: changeStatus, isPending: isStatusChanging } = useChangeScheduledInterviewStatus()
  const isLoading = isStatusChanging
    const router = useRouter()

const actionHandler = () => {
  changeStatus({ id: id, interviewStatus: "completed" }, {
    onSuccess: () => {
      onAction?.()
      router.push("/dashboard/interviews/completed")
    },
  })
}


  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="ghost" className=" justify-start px-2">Mark as Completed</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Mark as Completed?</AlertDialogTitle>
          <AlertDialogDescription>This will set the interview status to <strong>Completed</strong>. 
              Make sure the interview has already taken place. You’ll still be able to add notes or feedback later from the Completed Interviews.</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={actionHandler} disabled={isLoading} className="bg-brand-blue text-sidebar-primary-foreground hover:bg-brand-blue/80">
            {isLoading ? "Loading..." : "Yes, Mark as completed"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
