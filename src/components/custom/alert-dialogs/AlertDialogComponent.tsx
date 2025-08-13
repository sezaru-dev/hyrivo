import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import useChangeScheduledInterviewStatus from "@/lib/hooks/interviews/use-change-scheduled-interview-status"
import { useDeleteJobApplication } from "@/lib/hooks/use-delete-job-application"
import { toastPromise } from "../toastPromise"


type AlertDialogProps = {
  id: string 
  title?: string
  description?: string | React.ReactNode
  actionText?: string
  cancelText?: string
  onAction?: () => void
  actionType: 'markAsCompleted' | 'markAsMissed' | 'permanentDelete'
  children?: React.ReactNode
}

export const AlertDialogComponent: React.FC<AlertDialogProps> = ({
  id,
  title = "Are you absolutely sure?", 
  description = "This action cannot be undone. This will permanently delete and remove your data from our servers.",
  actionText = "Continue", 
  cancelText = "Cancel", 
  onAction,
  actionType,
  children
}) => {
  const { mutate: deleteApplication, isPending } = useDeleteJobApplication()
  const { mutate: changeStatus, isPending: isStatusChanging } = useChangeScheduledInterviewStatus()

  const isLoading = isPending || isStatusChanging

  const handleAction = () => {
  switch (actionType) {
    case "markAsCompleted":
      toastPromise(
        () =>
          new Promise((resolve, reject) => {
            changeStatus(
              { id, interviewStatus: "completed" },
              {
                onSuccess: (data) => {
                  onAction?.()
                  resolve(data)
                },
                onError: reject,
              }
            )
          }),
        {
          loading: "Marking as completed...",
          success: "Interview marked as completed",
          error: "Failed to mark as completed",
        }
      )
      break

    case "markAsMissed":
      toastPromise(
        () =>
          new Promise((resolve, reject) => {
            changeStatus(
              { id, interviewStatus: "missed" },
              {
                onSuccess: (data) => {
                  onAction?.()
                  resolve(data)
                },
                onError: reject,
              }
            )
          }),
        {
          loading: "Marking as missed...",
          success: "Interview marked as missed",
          error: "Failed to mark as missed",
        }
      )
      break

    case "permanentDelete":
      toastPromise(
        () =>
          new Promise((resolve, reject) => {
            deleteApplication(id, {
              onSuccess: (data) => {
                onAction?.()
                resolve(data)
              },
              onError: reject,
            })
          }),
        {
          loading: "Deleting application...",
          success: "Application deleted permanently",
          error: "Failed to delete application",
        }
      )
      break
  }
}

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        {children ? children : (
          <Button variant="ghost" className="justify-start px-2">
            Delete Permanently
          </Button>
        )}
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={onAction}>{cancelText}</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleAction}
            disabled={isLoading}
            className="bg-brand-blue text-sidebar-primary-foreground hover:bg-brand-blue/80"
          >
            {isLoading ? "Processing..." : actionText}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
