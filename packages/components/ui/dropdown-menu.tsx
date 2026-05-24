'use client';

import { CheckIcon, ChevronRightIcon, CircleIcon } from 'lucide-react';

import { cn } from '@customafk/react-toolkit/utils';

import { DropdownMenu as DropdownMenuPrimitive } from 'radix-ui';

/**
 * Root provider for the DropdownMenu — wraps all sub-components and controls open state.
 *
 * @example
 * ```tsx
 * import {
 *   DropdownMenu, DropdownMenuTrigger, DropdownMenuContent,
 *   DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator,
 * } from '@customafk/lunas-ui/ui/dropdown-menu';
 *
 * <DropdownMenu>
 *   <DropdownMenuTrigger>Options</DropdownMenuTrigger>
 *   <DropdownMenuContent>
 *     <DropdownMenuLabel>My Account</DropdownMenuLabel>
 *     <DropdownMenuSeparator />
 *     <DropdownMenuItem>Profile</DropdownMenuItem>
 *     <DropdownMenuItem variant="destructive">Delete</DropdownMenuItem>
 *   </DropdownMenuContent>
 * </DropdownMenu>
 * ```
 */
function DropdownMenu({ ...props }: React.ComponentProps<typeof DropdownMenuPrimitive.Root>) {
  return <DropdownMenuPrimitive.Root data-slot="dropdown-menu" {...props} />;
}

/** Portals DropdownMenu content outside the current DOM hierarchy. */
function DropdownMenuPortal({ ...props }: React.ComponentProps<typeof DropdownMenuPrimitive.Portal>) {
  return <DropdownMenuPrimitive.Portal data-slot="dropdown-menu-portal" {...props} />;
}

/** Element that opens the DropdownMenu when activated. */
function DropdownMenuTrigger({ ...props }: React.ComponentProps<typeof DropdownMenuPrimitive.Trigger>) {
  return <DropdownMenuPrimitive.Trigger data-slot="dropdown-menu-trigger" {...props} />;
}

/** Animated floating panel that contains the dropdown items. */
function DropdownMenuContent({ className, sideOffset = 4, align = 'start', ...props }: React.ComponentProps<typeof DropdownMenuPrimitive.Content>) {
  return (
    <DropdownMenuPrimitive.Portal>
      <DropdownMenuPrimitive.Content
        data-slot="dropdown-menu-content"
        sideOffset={sideOffset}
        align={align}
        className={cn(
          'bg-popover text-text-positive',
          'z-50 min-w-32',
          'overflow-y-auto overflow-x-hidden',
          'rounded-md p-1.5 shadow-dropdown',
          'max-h-(--radix-dropdown-menu-content-available-height)',
          'origin-(--radix-dropdown-menu-content-transform-origin)',
          'data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95',
          'data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95',
          'data-[side=bottom]:slide-in-from-top-2',
          'data-[side=left]:slide-in-from-right-2',
          'data-[side=right]:slide-in-from-left-2',
          'data-[side=top]:slide-in-from-bottom-2',
          className
        )}
        {...props}
      />
    </DropdownMenuPrimitive.Portal>
  );
}

/** Groups related DropdownMenuItems under a shared logical section. */
function DropdownMenuGroup({ ...props }: React.ComponentProps<typeof DropdownMenuPrimitive.Group>) {
  return <DropdownMenuPrimitive.Group data-slot="dropdown-menu-group" {...props} />;
}

/**
 * A single clickable row inside a DropdownMenuContent.
 *
 * @param inset - When true, adds left padding to align with items that have icons.
 * @param variant - Visual style: `'default'` or `'destructive'`.
 */
function DropdownMenuItem({
  className,
  inset,
  variant = 'default',
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Item> & {
  inset?: boolean;
  variant?: 'default' | 'destructive';
}) {
  return (
    <DropdownMenuPrimitive.Item
      data-slot="dropdown-menu-item"
      data-inset={inset}
      data-variant={variant}
      className={cn(
        'relative flex cursor-pointer select-none items-center gap-2 rounded-md px-2 py-2.5 text-sm outline-hidden transition-colors',
        'focus:bg-muted-muted focus:text-text-positive-strong',
        'data-inset:pl-8',
        'data-disabled:pointer-events-none data-disabled:opacity-50',
        'data-[variant=destructive]:text-danger',
        'data-[variant=destructive]:focus:bg-danger-muted data-[variant=destructive]:focus:text-danger-strong',
        'data-[variant=destructive]:*:[svg]:text-danger!',
        '[&_svg]:pointer-events-none [&_svg]:shrink-0',
        "[&_svg:not([class*='size-'])]:size-4",
        "[&_svg:not([class*='text-'])]:text-text-positive-weak",
        className
      )}
      {...props}
    />
  );
}

/** A checkable menu item that displays a checkmark when selected. */
function DropdownMenuCheckboxItem({ className, children, checked, ...props }: React.ComponentProps<typeof DropdownMenuPrimitive.CheckboxItem>) {
  return (
    <DropdownMenuPrimitive.CheckboxItem
      data-slot="dropdown-menu-checkbox-item"
      className={cn(
        'relative flex cursor-pointer select-none items-center gap-2 rounded-md py-2.5 pr-2 pl-8 text-sm outline-hidden transition-colors',
        'focus:bg-muted-muted focus:text-text-positive-strong',
        'data-disabled:pointer-events-none data-disabled:opacity-50',
        '[&_svg]:pointer-events-none [&_svg]:shrink-0',
        "[&_svg:not([class*='size-'])]:size-4",
        className
      )}
      checked={checked}
      {...props}
    >
      <span className="pointer-events-none absolute left-2 flex size-3.5 items-center justify-center">
        <DropdownMenuPrimitive.ItemIndicator>
          <CheckIcon size={16} />
        </DropdownMenuPrimitive.ItemIndicator>
      </span>
      {children}
    </DropdownMenuPrimitive.CheckboxItem>
  );
}

/** Groups DropdownMenuRadioItems so only one can be selected at a time. */
function DropdownMenuRadioGroup({ ...props }: React.ComponentProps<typeof DropdownMenuPrimitive.RadioGroup>) {
  return <DropdownMenuPrimitive.RadioGroup data-slot="dropdown-menu-radio-group" {...props} />;
}

/** A radio-button menu item; shows a filled circle when selected. */
function DropdownMenuRadioItem({ className, children, ...props }: React.ComponentProps<typeof DropdownMenuPrimitive.RadioItem>) {
  return (
    <DropdownMenuPrimitive.RadioItem
      data-slot="dropdown-menu-radio-item"
      className={cn(
        'relative flex cursor-pointer select-none items-center gap-2 rounded-md py-2.5 pr-2 pl-8 text-sm outline-hidden transition-colors',
        'focus:bg-muted-muted focus:text-text-positive-strong',
        'data-disabled:pointer-events-none data-disabled:opacity-50',
        '[&_svg]:pointer-events-none [&_svg]:shrink-0',
        "[&_svg:not([class*='size-'])]:size-4",
        className
      )}
      {...props}
    >
      <span className="pointer-events-none absolute left-2 flex size-3.5 items-center justify-center">
        <DropdownMenuPrimitive.ItemIndicator>
          <CircleIcon className="size-2 fill-current" />
        </DropdownMenuPrimitive.ItemIndicator>
      </span>
      {children}
    </DropdownMenuPrimitive.RadioItem>
  );
}

/**
 * Non-interactive label used to describe a group of items.
 *
 * @param inset - When true, adds left padding to align with inset items.
 */
function DropdownMenuLabel({
  className,
  inset,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Label> & {
  inset?: boolean;
}) {
  return (
    <DropdownMenuPrimitive.Label
      data-slot="dropdown-menu-label"
      data-inset={inset}
      className={cn('px-2 py-1.5 font-medium text-sm text-text-positive-weak data-inset:pl-8', className)}
      {...props}
    />
  );
}

/** Horizontal dividing line between groups of dropdown items. */
function DropdownMenuSeparator({ className, ...props }: React.ComponentProps<typeof DropdownMenuPrimitive.Separator>) {
  return <DropdownMenuPrimitive.Separator data-slot="dropdown-menu-separator" className={cn('-mx-1 my-1 h-px bg-border-weak', className)} {...props} />;
}

/** Displays a keyboard shortcut hint aligned to the right of a menu item. */
function DropdownMenuShortcut({ className, ...props }: React.ComponentProps<'span'>) {
  return <span data-slot="dropdown-menu-shortcut" className={cn('ml-auto text-xs text-text-positive-muted tracking-widest', className)} {...props} />;
}

/** Root container for a nested sub-menu inside a DropdownMenu. */
function DropdownMenuSub({ ...props }: React.ComponentProps<typeof DropdownMenuPrimitive.Sub>) {
  return <DropdownMenuPrimitive.Sub data-slot="dropdown-menu-sub" {...props} />;
}

/**
 * Menu item that reveals a nested DropdownMenuSubContent on hover or activation.
 *
 * @param inset - When true, adds left padding to align with inset items.
 */
function DropdownMenuSubTrigger({
  className,
  inset,
  children,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.SubTrigger> & {
  inset?: boolean;
}) {
  return (
    <DropdownMenuPrimitive.SubTrigger
      data-slot="dropdown-menu-sub-trigger"
      data-inset={inset}
      className={cn(
        'flex cursor-pointer select-none items-center gap-2 rounded-md px-2 py-2.5 text-sm outline-hidden transition-colors',
        'focus:bg-muted-muted focus:text-text-positive-strong',
        'data-[state=open]:bg-muted-muted data-[state=open]:text-text-positive-strong',
        'data-inset:pl-8',
        '[&_svg]:pointer-events-none [&_svg]:shrink-0',
        "[&_svg:not([class*='size-'])]:size-4",
        className
      )}
      {...props}
    >
      {children}
      <ChevronRightIcon className="ml-auto size-4" />
    </DropdownMenuPrimitive.SubTrigger>
  );
}

/** Floating panel that contains the items of a nested sub-menu. */
function DropdownMenuSubContent({ className, ...props }: React.ComponentProps<typeof DropdownMenuPrimitive.SubContent>) {
  return (
    <DropdownMenuPrimitive.SubContent
      data-slot="dropdown-menu-sub-content"
      className={cn(
        'bg-popover text-text-positive',
        'z-50 min-w-32',
        'overflow-y-auto overflow-x-hidden',
        'origin-(--radix-dropdown-menu-content-transform-origin) rounded-md p-1.5 shadow-dropdown',
        'data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95',
        'data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95',
        'data-[side=bottom]:slide-in-from-top-2',
        'data-[side=left]:slide-in-from-right-2',
        'data-[side=right]:slide-in-from-left-2',
        'data-[side=top]:slide-in-from-bottom-2',
        className
      )}
      {...props}
    />
  );
}

export {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
};
