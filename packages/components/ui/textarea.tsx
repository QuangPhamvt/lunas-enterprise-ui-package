'use client'
import React from 'react'

import { cn } from '@/lib/utils'

function Textarea({
  className,
  onChange,
  onValueChange,
  ...props
}: React.ComponentProps<'textarea'> & {
  onValueChange?: (value: string) => void
}) {
  const handleChange = React.useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      onChange?.(e)
      onValueChange?.(e.target.value)
    },
    [onChange, onValueChange],
  )
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        'border-input caret-primary',
        'flex',
        'field-sizing-content',
        'min-h-16 w-full rounded-md border bg-transparent px-3 py-2 text-sm shadow-xs transition outline-none',
        'placeholder:text-muted-foreground',
        'focus-visible:border-ring',
        'focus-visible:ring-ring',
        'focus-visible:ring-4',
        'aria-invalid:ring-destructive/20',
        'aria-invalid:border-destructive',
        'dark:aria-invalid:ring-destructive/40',
        'dark:bg-input/30',
        'disabled:cursor-not-allowed',
        'disabled:opacity-50',
        className,
      )}
      {...props}
      onChange={handleChange}
    />
  )
}

export { Textarea }
