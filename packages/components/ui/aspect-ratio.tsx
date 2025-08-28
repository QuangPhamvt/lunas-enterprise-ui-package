'use client'
import React from 'react'
import { AspectRatio as AspectRatioPrimitive } from 'radix-ui'

import { cn } from '@/lib/utils'

function AspectRatio({ className, ...props }: React.ComponentProps<typeof AspectRatioPrimitive.Root>) {
  return <AspectRatioPrimitive.Root data-slot="aspect-ratio" className={cn('bg-accent rounded-md', className)} {...props} />
}

export { AspectRatio }
