import { useDeleteJobApplication } from "@/lib/hooks/use-delete-job-application";
import { toastPromise } from "../toastPromise";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import React from "react";
import { Trash2 } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { useRouter } from "next/navigation";

export function DeleteApplicationDialog({ id, onAction, withTooltip }: { id: string; onAction?: () => void, withTooltip?: boolean }) {
  const { mutate: deleteApplication, isPending } = useDeleteJobApplication()
    const router = useRouter()

const deleteHandler = () => {
  deleteApplication(id, {
    onSuccess: () => {
      onAction?.()
      /* router.push("/dashboard/interviews/completed") */
    },
  })
}


  return (
    <AlertDialog>
      {withTooltip ? (
        <Tooltip>
          <TooltipTrigger asChild>
            <AlertDialogTrigger asChild>
              <Button variant="ghost">
                <Trash2 className="text-red-500" />
              </Button>
            </AlertDialogTrigger>
          </TooltipTrigger>
          <TooltipContent>
            <p>Delete Permanently</p>
          </TooltipContent>
        </Tooltip>
      ) : (
        <AlertDialogTrigger asChild>
          <Button variant="ghost"  className=" justify-start px-2">Delete Permanently</Button>
        </AlertDialogTrigger>
      )}
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. It will permanently delete this job application.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>

            <Button
              onClick={deleteHandler}
              disabled={isPending}
              className="bg-red-600 text-white hover:bg-red-700"
            >
              {isPending ? "Deleting..." : "Yes, Delete Permanently"}
            </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
