'use client'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import React from "react";
import useUpdateApplicationStatus from "@/lib/hooks/use-job-applications";

type ThisComponentProps= {
  id: string;
  onAction?: () => void;
}

const MarkAsOfferedDialog = React.forwardRef<HTMLButtonElement, ThisComponentProps>(
  ({ id, onAction }, ref) => {

    const { mutate: changeApplicationStatus, isPending } = useUpdateApplicationStatus()
    const isLoading = isPending
    
    const actionHandler = () => {
    changeApplicationStatus({ id: id, status: "offered" }, {
      onSuccess: () => {
        onAction?.()
      },
    })
    }
    
    return (
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button ref={ref} variant="ghost" className=" justify-start px-2">Mark as Offered</Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Mark as Offered?</AlertDialogTitle>
            <AlertDialogDescription>
              This will mark the application as <strong>Offered</strong> and move it to your Offers panel. 
              Make sure an official job offer has been received before proceeding. 
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={actionHandler} disabled={isLoading} className="bg-brand-blue text-sidebar-primary-foreground hover:bg-brand-blue/80">
              {isLoading ? "Loading..." : "Yes, Mark as offered"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    )
  })

MarkAsOfferedDialog.displayName = "MarkAsOfferedDialog"
export default MarkAsOfferedDialog
