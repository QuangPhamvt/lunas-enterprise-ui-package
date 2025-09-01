import { DialogContent } from '@/components/ui/dialog'
import { cn } from '@/lib/utils'

export const DetailDialogWrapper: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <DialogContent
      className={cn(
        'relative h-full overflow-hidden border-none p-0',
        'rounded-none md:rounded-lg',
        'max-h-svh max-w-svw',
        'md:max-h-[90svh] md:max-w-[90svw]',
        'xl:max-h-[90svh] xl:max-w-[90svw]',
        '2xl:max-h-[90svh] 2xl:max-w-7xl',
      )}
      onInteractOutside={(e) => {
        e.preventDefault()
        e.stopPropagation()
      }}
    >
      {children}
    </DialogContent>
  )
}
