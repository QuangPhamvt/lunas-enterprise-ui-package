'use client'
import { cn } from '@customafk/react-toolkit/utils'

import { cva } from 'class-variance-authority'

type Props = {
  variant?: 'p' | 'muted' | 'lead' | 'sm' | 'lg'
  className?: string
  children?: React.ReactNode
}

const paragraphVariants = cva('', {
  variants: {
    variant: {
      p: 'leading-7 [&:not(:first-child)]:mt-6',
      sm: 'text-sm leading-none font-normal',
      lg: 'text-lg font-semibold',
      lead: 'text-text-positive-strong text-xl',
      muted: 'text-text-positive-muted text-sm',
    },
    default: {
      variant: 'sm',
    },
  },
})

export const Paragraph = ({ variant = 'p', className, children }: Props) => {
  return <p className={cn('text-text-positive', paragraphVariants({ variant }), className)}>{children}</p>
}
