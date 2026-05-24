'use client';

import { SearchIcon } from 'lucide-react';

import { cn } from '@customafk/react-toolkit/utils';

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';

import { Command as CommandPrimitive } from 'cmdk';

/**
 * A cmdk-powered command palette for searching and executing commands.
 *
 * @example
 * ```tsx
 * import {
 *   Command, CommandInput, CommandList, CommandEmpty,
 *   CommandGroup, CommandItem,
 * } from '@customafk/lunas-ui/ui/command';
 *
 * <Command>
 *   <CommandInput placeholder="Type a command…" />
 *   <CommandList>
 *     <CommandEmpty>No results found.</CommandEmpty>
 *     <CommandGroup heading="Suggestions">
 *       <CommandItem>Calendar</CommandItem>
 *       <CommandItem>Search</CommandItem>
 *     </CommandGroup>
 *   </CommandList>
 * </Command>
 * ```
 */
function Command({ className, ...props }: React.ComponentProps<typeof CommandPrimitive>) {
  return (
    <CommandPrimitive
      data-slot="command"
      className={cn('flex size-full flex-col overflow-hidden rounded-md border-border-weak bg-popover text-text-positive', className)}
      {...props}
    />
  );
}

/**
 * A Command palette rendered inside a Dialog overlay.
 *
 * @param title - Accessible title for the dialog (screen-reader only).
 * @param description - Accessible description for the dialog (screen-reader only).
 * @param showCloseButton - Whether to show the built-in close button on the dialog.
 */
function CommandDialog({
  title = 'Command Palette',
  description = 'Search for a command to run...',
  children,
  className,
  showCloseButton = true,
  ...props
}: React.ComponentProps<typeof Dialog> & {
  title?: string;
  description?: string;
  className?: string;
  showCloseButton?: boolean;
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
            '**:[[cmdk-group-heading]]:text-text-positive-muted',
            '**:data-[slot=command-input-wrapper]:h-12',
            '**:[[cmdk-group-heading]]:px-2',
            '**:[[cmdk-group-heading]]:font-medium',
            '**:[[cmdk-group]]:px-2',
            '[&_[cmdk-group]:not([hidden])_~[cmdk-group]]:pt-0',
            '[&_[cmdk-input-wrapper]_svg]:size-5',
            '**:[[cmdk-input]]:h-12',
            '**:[[cmdk-item]]:px-2',
            '**:[[cmdk-item]]:py-3',
            '[&_[cmdk-item]_svg]:size-5'
          )}
        >
          {children}
        </Command>
      </DialogContent>
    </Dialog>
  );
}

/** Search input with a leading search icon that filters CommandItems in real time. */
function CommandInput({ className, ...props }: React.ComponentProps<typeof CommandPrimitive.Input>) {
  return (
    <div data-slot="command-input-wrapper" className="flex h-9 items-center gap-2 border-border-weak border-b px-3">
      <SearchIcon className="size-4 shrink-0 opacity-50" />
      <CommandPrimitive.Input
        data-slot="command-input"
        className={cn(
          'flex h-10 w-full rounded-md bg-transparent py-3 text-sm outline-hidden',
          'placeholder:text-text-positive-muted',
          'disabled:cursor-not-allowed',
          'disabled:opacity-50',
          className
        )}
        {...props}
      />
    </div>
  );
}

/** Scrollable list that renders filtered CommandGroups and CommandItems. */
function CommandList({ className, ...props }: React.ComponentProps<typeof CommandPrimitive.List>) {
  return <CommandPrimitive.List data-slot="command-list" className={cn('max-h-80 scroll-py-1 overflow-y-auto overflow-x-hidden', className)} {...props} />;
}

/** Fallback message displayed when no CommandItems match the current search query. */
function CommandEmpty({ ...props }: React.ComponentProps<typeof CommandPrimitive.Empty>) {
  return <CommandPrimitive.Empty data-slot="command-empty" className="py-6 text-center text-sm" {...props} />;
}

/** Groups CommandItems under an optional heading label. */
function CommandGroup({ className, ...props }: React.ComponentProps<typeof CommandPrimitive.Group>) {
  return (
    <CommandPrimitive.Group
      data-slot="command-group"
      className={cn(
        'text-text-positive',
        'overflow-hidden p-1',
        '**:[[cmdk-group-heading]]:text-text-positive-weak',
        '**:[[cmdk-group-heading]]:px-2',
        '**:[[cmdk-group-heading]]:py-1.5',
        '**:[[cmdk-group-heading]]:text-xs',
        '**:[[cmdk-group-heading]]:font-medium',
        className
      )}
      {...props}
    />
  );
}

/** Horizontal dividing line between groups in a CommandList. */
function CommandSeparator({ className, ...props }: React.ComponentProps<typeof CommandPrimitive.Separator>) {
  return <CommandPrimitive.Separator data-slot="command-separator" className={cn('-mx-1 h-px bg-border-weak', className)} {...props} />;
}

/** A selectable row inside a CommandGroup that is highlighted when active or hovered. */
function CommandItem({ className, ...props }: React.ComponentProps<typeof CommandPrimitive.Item>) {
  return (
    <CommandPrimitive.Item
      data-slot="command-item"
      className={cn(
        'relative flex cursor-pointer select-none items-center gap-2 rounded-md p-2.5 text-sm outline-hidden transition-all duration-300',
        'active:ring-border',
        'active:opacity-60',
        'active:ring-4',
        'data-[selected=true]:bg-muted-muted',
        'data-[selected=true]:text-text-positive-strong',
        'data-[disabled=true]:opacity-50',
        'data-[disabled=true]:pointer-events-none',
        '[&_svg]:shrink-0',
        '[&_svg]:pointer-events-none',
        "[&_svg:not([class*='size-'])]:size-4",
        "[&_svg:not([class*='text-'])]:text-text-positive-muted",
        className
      )}
      {...props}
    />
  );
}

/** Displays a keyboard shortcut hint aligned to the right of a CommandItem. */
function CommandShortcut({ className, ...props }: React.ComponentProps<'span'>) {
  return <span data-slot="command-shortcut" className={cn('ml-auto text-text-positive-muted text-xs tracking-widest', className)} {...props} />;
}

export { Command, CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator, CommandShortcut };
