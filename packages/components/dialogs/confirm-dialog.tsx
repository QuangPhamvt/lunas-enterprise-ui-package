import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '../ui/alert-dialog'

type Props = {
  open?: boolean
  isLoading?: boolean
  title: string
  description: string
  onOpenChange?: (open: boolean) => void
  onConfirm?: () => void
}

export const ConfirmDialog: React.FC<React.PropsWithChildren<Props>> = ({ open, isLoading = false, title, description, onOpenChange, onConfirm }) => {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader className="gap-0">
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction className="min-h-9 w-24" onClick={onConfirm}>
            {!isLoading ? (
              'Confirm'
            ) : (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="loader-spinner text-muted-foreground" />
              </div>
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
