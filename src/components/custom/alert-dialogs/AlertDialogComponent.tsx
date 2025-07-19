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

type AlertDialogProps = {
  title?: string
  description?: string
  actionText?: string
  cancelText?: string
  onAction?: () => void
  children?: React.ReactNode
}

export const  AlertDialogComponent: React.FC<AlertDialogProps> = ({
    title =  "Are you absolutely sure?", 
    description = "This action cannot be undone. This will permanently delete and remove your data from our servers.",
    actionText = "Continue", 
    cancelText = "Cancel", 
    onAction,
    children
  }: AlertDialogProps) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        {children ? children :
        <Button variant="ghost" className=" justify-start px-2">Delete Permanently</Button>
        }
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>
            {description}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => {
                (onAction as (() => void) | undefined)?.()
                  // your actual delete logic
              }}>{cancelText}</AlertDialogCancel>

          {
            onAction ? (
              <AlertDialogAction onClick={() => {
                (onAction as (() => void) | undefined)?.()
                  // your actual delete logic
              }} className='bg-brand-blue text-sidebar-primary-foreground hover:bg-brand-blue/80'>
                {actionText}
              </AlertDialogAction>
            ) : (
              <AlertDialogAction onClick={() => {
                (onAction as (() => void) | undefined)?.()
                  // your actual delete logic
              }} className='bg-brand-blue text-sidebar-primary-foreground hover:bg-brand-blue/80'>
                {actionText}
              </AlertDialogAction>
            )
          }
          
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
