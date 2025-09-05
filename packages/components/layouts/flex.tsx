'use client'
import React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@customafk/react-toolkit/utils'

const flexVariants = cva(['relative flex', 'text-sm'], {
  variants: {
    vertical: {
      true: 'flex-col',
      false: 'flex-row',
    },
    width: {
      full: 'w-full',
      auto: 'w-auto',
      fit: 'w-fit',
      screen: 'w-screen',
      min: 'w-min',
      max: 'w-max',
      null: '',
    },
    wrap: {
      true: 'flex-wrap',
      false: 'flex-nowrap',
    },
    margin: {
      sm: 'm-2',
      md: 'm-4',
      lg: 'm-6',
      xl: 'm-8',
      none: 'm-0',
    },
    padding: {
      sm: 'p-2',
      md: 'p-4',
      lg: 'p-6',
      xl: 'p-8',
      none: 'p-0',
    },
    gap: {
      xs: 'gap-1',
      sm: 'gap-2',
      md: 'gap-4',
      lg: 'gap-6',
      xl: 'gap-8',
      none: 'gap-0',
    },
    justify: {
      start: 'justify-start',
      center: 'justify-center',
      end: 'justify-end',
      between: 'justify-between',
      around: 'justify-around',
      evenly: 'justify-evenly',
      stretch: 'justify-stretch',
    },
    align: {
      start: 'items-start',
      center: 'items-center',
      end: 'items-end',
      baseline: 'items-baseline',
      stretch: 'items-stretch',
    },
  },
  defaultVariants: {
    vertical: false,
    wrap: true,
    width: 'fit',
    margin: 'none',
    padding: 'sm',
    gap: 'xs',
    justify: 'start',
    align: 'center',
  },
})

type Props = {
  className?: string
} & VariantProps<typeof flexVariants>
export const Flex = ({ vertical, wrap, width, margin, padding, gap, justify, align, className, children }: React.PropsWithChildren<Props>) => {
  return (
    <div
      className={cn(
        flexVariants({
          vertical,
          width,
          wrap,
          margin,
          padding,
          gap,
          justify,
          align,
          className,
        }),
      )}
    >
      {children}
    </div>
  )
}
