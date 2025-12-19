'use client';

import { CheckIcon, ChevronDownIcon, ChevronUpIcon } from 'lucide-react';

import { cn } from '@customafk/react-toolkit/utils';

import { Select as SelectPrimitive } from 'radix-ui';

function DataGridSelect({ ...props }: React.ComponentProps<typeof SelectPrimitive.Root>) {
  return <SelectPrimitive.Root data-slot="select" {...props} />;
}

function DataGridSelectGroup({ ...props }: React.ComponentProps<typeof SelectPrimitive.Group>) {
  return <SelectPrimitive.Group data-slot="select-group" {...props} />;
}

function DataGridSelectValue({ ...props }: React.ComponentProps<typeof SelectPrimitive.Value>) {
  return <SelectPrimitive.Value data-slot="select-value" {...props} />;
}

function DataGridSelectTrigger({
  className,
  children,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Trigger> & {
  size?: 'sm' | 'default';
}) {
  return (
    <SelectPrimitive.Trigger
      data-slot="select-trigger"
      className={cn(
        'flex size-full items-start justify-between',
        'border-none outline-none',
        'gap-2 bg-transparent px-2.5 py-1.5',
        'cursor-pointer whitespace-nowrap text-sm',

        // Invalid state
        'aria-invalid:bg-danger-bg-subtle',
        'aria-invalid:placeholder:text-text-positive-weak',

        // Placeholder styles
        'data-placeholder:text-text-positive-muted',
        '*:data-[slot=select-value]:line-clamp-1',
        '*:data-[slot=select-value]:flex',
        '*:data-[slot=select-value]:items-center',
        '*:data-[slot=select-value]:gap-2',

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
    </SelectPrimitive.Trigger>
  );
}

function DataGridSelectContent({ className, children, position = 'popper', ...props }: React.ComponentProps<typeof SelectPrimitive.Content>) {
  return (
    <SelectPrimitive.Portal data-slot="select-portal">
      <SelectPrimitive.Content
        data-slot="select-content"
        className={cn(
          'relative z-50 min-w-32 overflow-y-auto overflow-x-hidden rounded shadow-dropdown duration-300',
          'bg-white',
          'w-(--radix-select-trigger-width)',
          'max-h-(--radix-select-content-available-height)',
          'origin-(--radix-select-content-transform-origin)',

          'data-[state=open]:animate-in',
          'data-[state=open]:fade-in',
          'data-[state=open]:zoom-in-95',

          'data-[state=closed]:animate-out',
          'data-[state=closed]:fade-out',
          'data-[state=closed]:zoom-out-95',

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
        style={{
          maxHeight: 'var(--radix-select-content-available-height)',
        }}
        {...props}
      >
        <DataGridSelectScrollUpButton />
        <SelectPrimitive.Viewport
          className={cn('p-1', position === 'popper' && 'h-(--radix-select-trigger-height) w-full min-w-(--radix-select-trigger-width) scroll-my-1')}
          children={children}
        />
        <DataGridSelectScrollDownButton />
      </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
  );
}

function DataGridSelectLabel({ className, ...props }: React.ComponentProps<typeof SelectPrimitive.Label>) {
  return <SelectPrimitive.Label data-slot="select-label" className={cn('px-2 py-1.5 text-text-positive-weak text-xs', className)} {...props} />;
}

function DataGridSelectItem({ className, children, ...props }: React.ComponentProps<typeof SelectPrimitive.Item>) {
  return (
    <SelectPrimitive.Item
      data-slot="select-item"
      className={cn(
        'relative flex select-none items-center border border-transparent',
        'gap-2 rounded py-2.5 pr-8 pl-2',
        'w-full',
        'cursor-pointer outline-none transition-colors',
        'font-medium text-sm text-text-positive-weak',

        'focus:border-border-weak',
        'focus:bg-linear-to-b',
        'focus:from-muted-bg-subtle',
        'focus:to-muted-muted',

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

function DataGridSelectSeparator({ className, ...props }: React.ComponentProps<typeof SelectPrimitive.Separator>) {
  return <SelectPrimitive.Separator data-slot="select-separator" className={cn('-mx-1 pointer-events-none my-1 h-px bg-border-weak', className)} {...props} />;
}

function DataGridSelectScrollUpButton({ className, ...props }: React.ComponentProps<typeof SelectPrimitive.ScrollUpButton>) {
  return (
    <SelectPrimitive.ScrollUpButton
      data-slot="select-scroll-up-button"
      className={cn('flex cursor-default items-center justify-center py-1', className)}
      {...props}
    >
      <ChevronUpIcon size={16} />
    </SelectPrimitive.ScrollUpButton>
  );
}

function DataGridSelectScrollDownButton({ className, ...props }: React.ComponentProps<typeof SelectPrimitive.ScrollDownButton>) {
  return (
    <SelectPrimitive.ScrollDownButton
      data-slot="select-scroll-down-button"
      className={cn('flex cursor-default items-center justify-center py-1', className)}
      {...props}
    >
      <ChevronDownIcon size={16} />
    </SelectPrimitive.ScrollDownButton>
  );
}

export {
  DataGridSelect,
  DataGridSelectContent,
  DataGridSelectGroup,
  DataGridSelectItem,
  DataGridSelectLabel,
  DataGridSelectScrollDownButton,
  DataGridSelectScrollUpButton,
  DataGridSelectSeparator,
  DataGridSelectTrigger,
  DataGridSelectValue,
};
