'use client'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import React from "react";
import { useRouter } from "next/navigation";
import { useMarkAsCompletedFlow } from "@/lib/hooks/dashboard/use-markascompleted-flow";
import { toastPromise } from "../toastPromise";
import { useQueryClient } from "@tanstack/react-query";

export function MarkAsCompletedDialog({ id, onAction }: { id: string; onAction?: () => void}) {
  const queryClient = useQueryClient()
  const { run, markAsCompleted, createTimeline, patchTimeline } = useMarkAsCompletedFlow()
  const isLoading = createTimeline.isPending || markAsCompleted.isPending || patchTimeline.isPending
  const router = useRouter()

const actionHandler = async () => {
    try {
      await toastPromise(
        async () => {
          await run(id)
          // Invalidate relevant queries after the flow completes
          queryClient.invalidateQueries({ queryKey: ["timeline"] })
          queryClient.invalidateQueries({ queryKey: ["job-applications-applied"] })
          queryClient.invalidateQueries({ queryKey: ["dashboard-job-applications-stats"] })
          queryClient.invalidateQueries({ queryKey: ["scheduled-interviews"] });
          queryClient.invalidateQueries({ queryKey: ["scheduled-interview-stats"] });
          queryClient.invalidateQueries({ queryKey: ["completed-interviews"] });
          queryClient.invalidateQueries({ queryKey: ["completed-interview-stats"] });
          queryClient.invalidateQueries({ queryKey: ["missed-interviews"] });
        },
        {
          loading: "Marking as completed...",
          success: () => {
            onAction?.()
            router.push("/dashboard/interviews/completed")
            return "Marked as completed!"
          },
          error: "Failed to mark as completed.",
        }
      )
    } catch (err) {
      console.error("Mark as completed flow failed:", err)
    }
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
