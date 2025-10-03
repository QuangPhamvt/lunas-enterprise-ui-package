import { cn } from '@customafk/react-toolkit/utils'

import { DialogContent } from '@/components/ui/dialog'

export const DetailDialogWrapper: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <DialogContent
      className={cn(
        'relative h-full overflow-hidden border-none p-0',
        'rounded-none md:rounded-lg',
        'max-h-dvh max-w-svw',
        'md:max-h-[90dvh] md:max-w-[90svw]',
        'xl:max-h-[90dvh] xl:max-w-[90svw]',
        '2xl:max-h-[90dvh] 2xl:max-w-7xl',
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
