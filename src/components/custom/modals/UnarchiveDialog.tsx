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

type UnarchiveDialogProps = {
  status: "Rejected" | "Inactive"
  onAction?: () => void
}

export function UnarchiveDialog({status, onAction}:UnarchiveDialogProps) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="ghost" className="justify-start px-2">Unarchive</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Unarchive This Item?</AlertDialogTitle>
          <AlertDialogDescription>
            {
              status === "Rejected"
                ? <>This application will be restored from the archive but will remain in the <strong>Rejected</strong> status. Remarks editing is available in the Archive section only.</>
                : <>This will unarchive the application, update its status to <strong>Applied</strong>, and assign a new follow-up date. Confirm if you’re ready to re-engage.</>
            }
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => {
                (onAction as (() => void) | undefined)?.()
                  // your actual delete logic
              }}>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={() => {
                (onAction as (() => void) | undefined)?.()
                  // your actual delete logic
              }} className='bg-brand-blue text-sidebar-primary-foreground hover:bg-brand-blue/80'>Confirm Unarchive</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
