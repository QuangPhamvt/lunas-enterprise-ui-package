'use client'
import React from 'react'
import { cn } from '@customafk/react-toolkit/utils'

import { AspectRatio as AspectRatioPrimitive } from 'radix-ui'

function AspectRatio({ className, ...props }: React.ComponentProps<typeof AspectRatioPrimitive.Root>) {
  return <AspectRatioPrimitive.Root data-slot="aspect-ratio" className={cn('bg-secondary-muted rounded-md', className)} {...props} />
}

export { AspectRatio }
