'use client'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import React from "react";
import { useRouter } from "next/navigation";
import useUpdateApplicationStatus from "@/lib/hooks/use-job-applications";

export function MarkAsHiredDialog({ id, onAction }: { id: string; onAction?: () => void}) {
  const { mutate: changeApplicationStatus, isPending } = useUpdateApplicationStatus()
  const isLoading = isPending
    const router = useRouter()

const actionHandler = () => {
  changeApplicationStatus({ id: id, status: "hired" }, {
    onSuccess: () => {
      onAction?.()
      router.push("/dashboard/hired")
    },
  })
}

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="ghost" className=" justify-start px-2">Mark as Hired</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Mark as Hired?</AlertDialogTitle>
          <AlertDialogDescription>
            This will mark the application as <strong>Hired</strong> and move it to your Accepted Offers panel. 
            Make sure you’ve officially accepted the job offer before proceeding. 
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={actionHandler} disabled={isLoading} className="bg-brand-blue text-sidebar-primary-foreground hover:bg-brand-blue/80">
            {isLoading ? "Loading..." : "Yes, Mark as hired"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
