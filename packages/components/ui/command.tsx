'use client'
import { Command as CommandPrimitive } from 'cmdk'
import { SearchIcon } from 'lucide-react'

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { cn } from '@/lib/utils'

function Command({ className, ...props }: React.ComponentProps<typeof CommandPrimitive>) {
  return (
    <CommandPrimitive
      data-slot="command"
      className={cn('bg-popover text-text-positive border-border-weak flex size-full flex-col overflow-hidden rounded-md', className)}
      {...props}
    />
  )
}

function CommandDialog({
  title = 'Command Palette',
  description = 'Search for a command to run...',
  children,
  className,
  showCloseButton = true,
  ...props
}: React.ComponentProps<typeof Dialog> & {
  title?: string
  description?: string
  className?: string
  showCloseButton?: boolean
}) {
  return (
    <Dialog {...props}>
      <DialogHeader className="sr-only">
        <DialogTitle>{title}</DialogTitle>
        <DialogDescription>{description}</DialogDescription>
      </DialogHeader>
      <DialogContent className={cn('overflow-hidden p-0', className)} showCloseButton={showCloseButton}>
        <Command
          className={cn(
            '[&_[cmdk-group-heading]]:text-text-positive-muted',
            '**:data-[slot=command-input-wrapper]:h-12',
            '[&_[cmdk-group-heading]]:px-2',
            '[&_[cmdk-group-heading]]:font-medium',
            '[&_[cmdk-group]]:px-2',
            '[&_[cmdk-group]:not([hidden])_~[cmdk-group]]:pt-0',
            '[&_[cmdk-input-wrapper]_svg]:size-5',
            '[&_[cmdk-input]]:h-12',
            '[&_[cmdk-item]]:px-2',
            '[&_[cmdk-item]]:py-3',
            '[&_[cmdk-item]_svg]:size-5',
          )}
        >
          {children}
        </Command>
      </DialogContent>
    </Dialog>
  )
}

function CommandInput({ className, ...props }: React.ComponentProps<typeof CommandPrimitive.Input>) {
  return (
    <div data-slot="command-input-wrapper" className="border-border-weak flex h-9 items-center gap-2 border-b px-3">
      <SearchIcon className="size-4 shrink-0 opacity-50" />
      <CommandPrimitive.Input
        data-slot="command-input"
        className={cn(
          'flex h-10 w-full rounded-md bg-transparent py-3 text-sm outline-hidden',
          'placeholder:text-text-positive-muted',
          'disabled:cursor-not-allowed',
          'disabled:opacity-50',
          className,
        )}
        {...props}
      />
    </div>
  )
}

function CommandList({ className, ...props }: React.ComponentProps<typeof CommandPrimitive.List>) {
  return <CommandPrimitive.List data-slot="command-list" className={cn('max-h-80 scroll-py-1 overflow-x-hidden overflow-y-auto', className)} {...props} />
}

function CommandEmpty({ ...props }: React.ComponentProps<typeof CommandPrimitive.Empty>) {
  return <CommandPrimitive.Empty data-slot="command-empty" className="py-6 text-center text-sm" {...props} />
}

function CommandGroup({ className, ...props }: React.ComponentProps<typeof CommandPrimitive.Group>) {
  return (
    <CommandPrimitive.Group
      data-slot="command-group"
      className={cn(
        'text-text-positive',
        'overflow-hidden p-1',
        '[&_[cmdk-group-heading]]:text-text-positive-weak',
        '[&_[cmdk-group-heading]]:px-2',
        '[&_[cmdk-group-heading]]:py-1.5',
        '[&_[cmdk-group-heading]]:text-xs',
        '[&_[cmdk-group-heading]]:font-medium',
        className,
      )}
      {...props}
    />
  )
}

function CommandSeparator({ className, ...props }: React.ComponentProps<typeof CommandPrimitive.Separator>) {
  return <CommandPrimitive.Separator data-slot="command-separator" className={cn('bg-border-weak -mx-1 h-px', className)} {...props} />
}

function CommandItem({ className, ...props }: React.ComponentProps<typeof CommandPrimitive.Item>) {
  return (
    <CommandPrimitive.Item
      data-slot="command-item"
      className={cn(
        'relative flex cursor-pointer items-center gap-2 rounded-md p-2.5 text-sm outline-hidden transition-all duration-300 select-none',
        'active:ring-border',
        'active:opacity-60',
        'active:ring-4',
        'data-[selected=true]:bg-accent-muted',
        'data-[selected=true]:text-text-positive-strong',
        'data-[disabled=true]:opacity-50',
        'data-[disabled=true]:pointer-events-none',
        '[&_svg]:shrink-0',
        '[&_svg]:pointer-events-none',
        "[&_svg:not([class*='size-'])]:size-4",
        "[&_svg:not([class*='text-'])]:text-text-positive-muted",
        className,
      )}
      {...props}
    />
  )
}

function CommandShortcut({ className, ...props }: React.ComponentProps<'span'>) {
  return <span data-slot="command-shortcut" className={cn('text-text-positive-muted ml-auto text-xs tracking-widest', className)} {...props} />
}

export { Command, CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator, CommandShortcut }
