'use client'
import React from 'react'
import { Checkbox as CheckboxPrimitive } from 'radix-ui'
import { CheckIcon } from 'lucide-react'

import { cn } from '@/lib/utils'

function Checkbox({ className, ...props }: React.ComponentProps<typeof CheckboxPrimitive.Root>) {
  return (
    <CheckboxPrimitive.Root
      data-slot="checkbox"
      className={cn(
        'peer border-input',
        'size-4 shrink-0 rounded-md border shadow-xs transition-shadow outline-none',
        'dark:bg-input/30',
        'data-[state=checked]:bg-primary',
        'data-[state=checked]:text-primary-foreground',
        'data-[state=checked]:border-primary',
        'dark:data-[state=checked]:bg-primary',
        'focus-visible:border-ring',
        'focus-visible:ring-ring/50',
        'focus-visible:ring-[3px]',
        'aria-invalid:ring-destructive/20',
        'aria-invalid:border-destructive',
        'dark:aria-invalid:ring-destructive/40',
        'disabled:cursor-not-allowed disabled:opacity-50',
        className,
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator data-slot="checkbox-indicator" className="flex items-center justify-center text-current transition-none">
        <CheckIcon className="size-3.5" />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  )
}

export { Checkbox }
