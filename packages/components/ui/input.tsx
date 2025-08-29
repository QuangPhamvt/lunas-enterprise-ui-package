'use client'
import React from 'react'

import { cn } from '@/lib/utils'

function Input({
  className,
  type,
  onChange,
  onValueChange,
  ...props
}: React.ComponentProps<'input'> & {
  onValueChange?: (value: string) => void
}) {
  const handleChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange?.(e)
      onValueChange?.(e.target.value)
    },
    [onChange, onValueChange],
  )
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        'flex h-9 w-full min-w-0',
        'border-border-weak shadow-input rounded-md border',
        'px-3 py-1',
        'bg-transparent',
        'caret-primary text-sm',
        'transition-[color,box-shadow] outline-none',
        'placeholder:text-text-positive-muted',
        'selection:bg-primary',
        'selection:text-primary-foreground',
        'file:inline-flex',
        'file:h-7',
        'file:border-0',
        'file:bg-transparent',
        'file:text-sm',
        'file:text-foreground',
        'file:font-medium',
        'disabled:pointer-events-none',
        'disabled:cursor-not-allowed',
        'disabled:opacity-50',
        'focus-visible:ring-4',
        'focus-visible:ring-primary-weak',
        'focus-visible:border-primary-strong',
        'aria-invalid:ring-danger-muted',
        'aria-invalid:border-danger',
        className,
      )}
      {...props}
      onChange={handleChange}
    />
  )
}

export { Input }
