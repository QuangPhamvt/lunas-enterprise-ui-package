'use client'
import React from 'react'
import { cva } from 'class-variance-authority'

import { cn } from '@/lib/utils'

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
      lead: 'text-muted-foreground text-xl',
      muted: 'text-muted-foreground text-sm',
    },
    default: {
      variant: 'sm',
    },
  },
})

export const Paragraph = ({ variant = 'p', className, children }: Props) => {
  return <p className={cn(paragraphVariants({ variant }), className)}>{children}</p>
}
