'use client'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import React from "react";
import useUpdateApplicationStatus from "@/lib/hooks/use-job-applications";

export function MarkAsRejectedDialog({ id, onAction }: { id: string; onAction?: () => void}) {
  const { mutate: changeApplicationStatus, isPending } = useUpdateApplicationStatus()
  const isLoading = isPending

const actionHandler = () => {
  changeApplicationStatus({ id: id, status: "rejected" }, {
    onSuccess: () => {
      onAction?.()
    },
  })
}

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="ghost" className=" justify-start px-2">Mark as Rejected</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Mark as Rejected?</AlertDialogTitle>
          <AlertDialogDescription>
            This will mark the application as <strong>Rejected</strong> and move it to your Rejected panel. 
            Make sure you’ve officially accepted the job offer before proceeding. 
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={actionHandler} disabled={isLoading} className="bg-brand-blue text-sidebar-primary-foreground hover:bg-brand-blue/80">
            {isLoading ? "Loading..." : "Yes, Mark as rejected"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
