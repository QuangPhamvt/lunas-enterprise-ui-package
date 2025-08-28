import { DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'

export const DetailDialogHeader = () => {
  return (
    <DialogHeader className="sr-only">
      <DialogTitle className="sr-only"></DialogTitle>
      <DialogDescription className="sr-only"></DialogDescription>
    </DialogHeader>
  )
}
