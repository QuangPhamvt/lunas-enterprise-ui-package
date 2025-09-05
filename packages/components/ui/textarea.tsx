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
        'border-border-weak caret-primary',
        'flex min-h-16 w-full bg-transparent px-3 py-2',
        'field-sizing-content',
        'shadow-input rounded-md border',
        'text-sm transition-[color,border,box-shadow] outline-none',
        'hover:border-border',
        'placeholder:text-text-positive-muted',
        'disabled:pointer-events-none',
        'disabled:cursor-not-allowed',
        'disabled:opacity-50',
        'focus-visible:ring-4',
        'focus-visible:ring-primary-weak',
        'focus-visible:border-primary-strong',
        'aria-invalid:ring-danger-muted',
        'aria-invalid:border-danger-strong',
        className,
      )}
      {...props}
      onChange={handleChange}
    />
  )
}

export { Textarea }
