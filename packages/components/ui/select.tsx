'use client';

import { CheckIcon, ChevronDownIcon } from 'lucide-react';

import { cn } from '@customafk/react-toolkit/utils';

import { Select as SelectPrimitive } from 'radix-ui';

function Select({ ...props }: React.ComponentProps<typeof SelectPrimitive.Root>) {
  return <SelectPrimitive.Root data-slot="select" {...props} />;
}

function SelectGroup({ ...props }: React.ComponentProps<typeof SelectPrimitive.Group>) {
  return <SelectPrimitive.Group data-slot="select-group" {...props} />;
}

function SelectValue({ ...props }: React.ComponentProps<typeof SelectPrimitive.Value>) {
  return <SelectPrimitive.Value data-slot="select-value" {...props} />;
}

function SelectTrigger({
  className,
  size = 'default',
  children,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Trigger> & {
  size?: 'sm' | 'default';
}) {
  return (
    <SelectPrimitive.Trigger
      data-slot="select-trigger"
      data-size={size}
      className={cn(
        'flex w-full items-center justify-between',
        'outline-1 outline-border -outline-offset-1',
        'gap-2 rounded bg-transparent px-3 py-2',
        'rounded shadow-input transition-all',
        'cursor-pointer whitespace-nowrap text-sm',

        // Text styles
        'focus-visible:text-text-positive-strong',
        'focus-visible:outline-primary-strong',
        'focus-visible:ring-4',
        'focus-visible:ring-primary-weak',

        // State styles
        'data-[state=open]:text-text-positive-muted',
        'data-[state=open]:outline-primary-strong',
        'data-[state=open]:ring-4',
        'data-[state=open]:ring-primary-weak',
        'disabled:cursor-not-allowed',
        'disabled:opacity-50',

        // Invalid state
        'aria-invalid:bg-danger-bg-subtle',
        'aria-invalid:outline-danger',
        'aria-invalid:ring-danger-weak',
        'aria-invalid:focus:outline-danger-strong',
        'aria-invalid:focus:ring-4',
        'aria-invalid:placeholder:text-text-positive-weak',
        'aria-invalid:data-[state=open]:outline-danger-strong',
        'aria-invalid:data-[state=open]:ring-danger-weak',

        // Placeholder styles
        'data-placeholder:text-text-positive-muted',
        '*:data-[slot=select-value]:line-clamp-1',
        '*:data-[slot=select-value]:flex',
        '*:data-[slot=select-value]:items-center',
        '*:data-[slot=select-value]:gap-2',

        // Readonly state
        'aria-readonly:bg-muted-muted',
        'aria-readonly:cursor-default',
        'aria-readonly:focus:outline-none',
        'aria-readonly:ring-0',
        'aria-readonly:pointer-events-none',

        // Icon styles
        '[&_svg]:shrink-0',
        '[&_svg]:pointer-events-none',
        "[&_svg:not([class*='size-'])]:size-4",
        "[&_svg:not([class*='text-'])]:text-muted-foreground",
        className
      )}
      {...props}
    >
      {children}
      <SelectPrimitive.Icon asChild>
        <ChevronDownIcon size={16} opacity={50} />
      </SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
  );
}

function SelectContent({ className, children, position = 'popper', ...props }: React.ComponentProps<typeof SelectPrimitive.Content>) {
  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Content
        data-slot="select-content"
        className={cn(
          'relative z-50 max-h-80 min-w-32 overflow-y-auto overflow-x-hidden rounded shadow-dropdown duration-300',
          'bg-white',
          'w-(--radix-select-trigger-width)',
          'origin-(--radix-select-content-transform-origin)',

          'data-[state=open]:animate-in',
          'data-[state=open]:fade-in',

          'data-[state=closed]:animate-out',
          'data-[state=closed]:fade-out',

          'data-[side=bottom]:slide-in-from-top-8',
          'data-[side=left]:slide-in-from-right-8',
          'data-[side=right]:slide-in-from-left-8',
          'data-[side=top]:slide-in-from-bottom-8',

          position === 'popper' && 'data-[side=bottom]:translate-y-1',
          position === 'popper' && 'data-[side=left]:-translate-x-1',
          position === 'popper' && 'data-[side=right]:translate-x-1',
          position === 'popper' && 'data-[side=top]:-translate-y-1',
          className
        )}
        position={position}
        {...props}
      >
        <SelectPrimitive.Viewport
          className={cn(
            'p-1',
            position === 'popper' && 'w-full scroll-my-1',
            position === 'popper' && 'h-(--radix-select-trigger-height)',
            position === 'popper' && 'min-w-(--radix-select-trigger-width)'
          )}
        >
          {children}
        </SelectPrimitive.Viewport>
      </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
  );
}

function SelectLabel({ className, ...props }: React.ComponentProps<typeof SelectPrimitive.Label>) {
  return <SelectPrimitive.Label data-slot="select-label" className={cn('px-2 py-1.5 text-text-positive-weak text-xs', className)} {...props} />;
}

function SelectItem({ className, children, ...props }: React.ComponentProps<typeof SelectPrimitive.Item>) {
  return (
    <SelectPrimitive.Item
      data-slot="select-item"
      className={cn(
        'relative flex select-none items-center',
        'gap-2 rounded py-2.5 pr-8 pl-2',
        'w-full',
        'cursor-pointer outline-none transition-colors',
        'font-medium text-sm text-text-positive-weak',

        'focus:shadow-xs',
        'focus:bg-muted-muted',

        'data-disabled:opacity-50',
        'data-disabled:pointer-events-none',

        '[&_svg]:pointer-events-none',
        '[&_svg]:shrink-0',
        "[&_svg:not([class*='size-'])]:size-4",
        "[&_svg:not([class*='text-'])]:text-text-positive-weak",

        '*:[span]:last:flex',
        '*:[span]:last:items-center',
        '*:[span]:last:gap-2',
        className
      )}
      {...props}
    >
      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
      <span className="absolute right-2 flex size-3.5 items-center justify-center">
        <SelectPrimitive.ItemIndicator>
          <CheckIcon size={16} />
        </SelectPrimitive.ItemIndicator>
      </span>
    </SelectPrimitive.Item>
  );
}

function SelectSeparator({ className, ...props }: React.ComponentProps<typeof SelectPrimitive.Separator>) {
  return <SelectPrimitive.Separator data-slot="select-separator" className={cn('-mx-1 pointer-events-none my-1 h-px bg-border-weak', className)} {...props} />;
}

export { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectSeparator, SelectTrigger, SelectValue };
