'use client';

import { useMemo } from 'react';

import { cn } from '@customafk/react-toolkit/utils';

import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';

import { Slot as SlotPrimitive } from 'radix-ui';
import { useSidebar } from './sidebar-core';

/**
 * Extended sidebar sub-components not used by `DetailDialog` itself — column-group layout,
 * submenus, a standalone skeleton, and the desktop drag rail. Split out of `./sidebar-core` so
 * `DetailDialog`'s own bundle doesn't pay for these; still re-exported in full from `./sidebar.tsx`
 * for direct standalone use.
 */
function DetailDialogSidebarRail({ className, ...props }: React.ComponentProps<'button'>) {
  const { toggleSidebar } = useSidebar();

  return (
    <button
      data-sidebar="rail"
      data-slot="sidebar-rail"
      aria-label="Toggle Sidebar"
      tabIndex={-1}
      onClick={toggleSidebar}
      title="Toggle Sidebar"
      className={cn(
        'absolute inset-y-0 z-20 hidden w-4 -translate-x-1/2 transition-all ease-linear sm:flex',
        'after:absolute after:inset-y-0 after:left-1/2 after:w-0.5',
        'hover:after:bg-sidebar-border',
        'group-data-[side=left]:-right-4 group-data-[side=right]:left-0',
        'in-data-[side=left]:cursor-w-resize in-data-[side=right]:cursor-e-resize',
        '[[data-side=left][data-state=collapsed]_&]:cursor-e-resize [[data-side=right][data-state=collapsed]_&]:cursor-w-resize',
        className
      )}
      {...props}
    />
  );
}

function SidebarInset({ className, ...props }: React.ComponentProps<'main'>) {
  return <main data-slot="sidebar-inset" className={cn('relative flex w-full flex-1 flex-col bg-background', className)} {...props} />;
}

function DetailDialogSidebarGroup({ className, ...props }: React.ComponentProps<'div'>) {
  return <div data-slot="sidebar-group" data-sidebar="group" className={cn('relative flex w-full min-w-0 flex-col p-2', className)} {...props} />;
}

function DetailDialogSidebarGroupLabel({ className, asChild = false, ...props }: React.ComponentProps<'div'> & { asChild?: boolean }) {
  const Comp = asChild ? SlotPrimitive.Slot : 'div';
  return (
    <Comp
      data-slot="sidebar-group-label"
      data-sidebar="group-label"
      className={cn(
        'flex h-8 shrink-0 items-center rounded-md px-2 font-medium text-sidebar-foreground/70 text-xs outline-hidden ring-sidebar-ring transition-[margin,opacity,color] duration-200 ease-linear focus-visible:ring-2',
        '[&>svg]:size-4 [&>svg]:shrink-0',
        'group-data-[collapsible=icon]:-mt-8 group-data-[collapsible=icon]:opacity-0',
        className
      )}
      {...props}
    />
  );
}

function DetailDialogSidebarGroupAction({ className, asChild = false, ...props }: React.ComponentProps<'button'> & { asChild?: boolean }) {
  const Comp = asChild ? SlotPrimitive.Slot : 'button';
  return (
    <Comp
      data-slot="sidebar-group-action"
      data-sidebar="group-action"
      className={cn(
        'absolute top-3.5 right-3 flex aspect-square w-5 items-center justify-center rounded-md p-0 text-sidebar-foreground outline-hidden ring-sidebar-ring transition-[background-color,color,transform]',
        'hover:bg-sidebar-accent hover:text-sidebar-accent-foreground',
        'focus-visible:ring-2',
        '[&>svg]:size-4 [&>svg]:shrink-0',
        // Increases the hit area of the button on mobile.
        'after:absolute after:-inset-2 md:after:hidden',
        'group-data-[collapsible=icon]:hidden',
        className
      )}
      {...props}
    />
  );
}

function DetailDialogSidebarGroupContent({ className, ...props }: React.ComponentProps<'div'>) {
  return <div data-slot="sidebar-group-content" data-sidebar="group-content" className={cn('w-full text-sm', className)} {...props} />;
}

function DetailDialogSidebarMenuAction({
  className,
  asChild = false,
  showOnHover = false,
  ...props
}: React.ComponentProps<'button'> & {
  asChild?: boolean;
  showOnHover?: boolean;
}) {
  const Comp = asChild ? SlotPrimitive.Slot : 'button';
  return (
    <Comp
      data-slot="sidebar-menu-action"
      data-sidebar="menu-action"
      className={cn(
        'absolute top-1.5 right-1 flex aspect-square w-5 items-center justify-center rounded-md p-0 outline-hidden',
        'text-sidebar-foreground ring-sidebar-ring',
        'transition-[background-color,color,opacity]',
        'hover:bg-sidebar-accent hover:text-sidebar-accent-foreground',
        'focus-visible:ring-2',
        'peer-hover/menu-button:text-sidebar-accent-foreground',
        '[&>svg]:size-4 [&>svg]:shrink-0',
        // Increases the hit area of the button on mobile.
        'after:absolute after:-inset-2 md:after:hidden',
        'peer-data-[size=sm]/menu-button:top-1',
        'peer-data-[size=default]/menu-button:top-1.5',
        'peer-data-[size=lg]/menu-button:top-2.5',
        'group-data-[collapsible=icon]:hidden',
        showOnHover && 'peer-data-[active=true]/menu-button:text-sidebar-accent-foreground',
        showOnHover && 'group-focus-within/menu-item:opacity-100',
        showOnHover && 'group-hover/menu-item:opacity-100',
        showOnHover && 'data-[state=open]:opacity-100 md:opacity-0',
        className
      )}
      {...props}
    />
  );
}

function DetailDialogSidebarMenuBadge({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="sidebar-menu-badge"
      data-sidebar="menu-badge"
      className={cn(
        'pointer-events-none absolute right-1 flex h-5 min-w-5 select-none items-center justify-center rounded-md px-1 font-medium text-sidebar-foreground text-xs tabular-nums transition-colors',
        'peer-hover/menu-button:text-sidebar-accent-foreground peer-data-[active=true]/menu-button:text-sidebar-accent-foreground',
        'peer-data-[size=sm]/menu-button:top-1',
        'peer-data-[size=default]/menu-button:top-1.5',
        'peer-data-[size=lg]/menu-button:top-2.5',
        'group-data-[collapsible=icon]:hidden',
        className
      )}
      {...props}
    />
  );
}

function DetailDialogSidebarMenuSkeleton({ className, showIcon = false, ...props }: React.ComponentProps<'div'> & { showIcon?: boolean }) {
  const width = useMemo(() => `${Math.floor(Math.random() * 40) + 50}%`, []);
  return (
    <div data-slot="sidebar-menu-skeleton" data-sidebar="menu-skeleton" className={cn('flex h-8 items-center gap-2 rounded-md px-2', className)} {...props}>
      {showIcon && <Skeleton className="size-4 rounded-md" data-sidebar="menu-skeleton-icon" />}
      <Skeleton
        className="h-4 max-w-(--skeleton-width) flex-1"
        data-sidebar="menu-skeleton-text"
        style={{ '--skeleton-width': width } as React.CSSProperties}
      />
    </div>
  );
}

function DetailDialogSidebarMenuSub({ className, ...props }: React.ComponentProps<'ul'>) {
  return (
    <ul
      data-slot="sidebar-menu-sub"
      data-sidebar="menu-sub"
      className={cn(
        'mx-3.5 flex min-w-0 translate-x-px flex-col gap-1 border-sidebar-border border-l px-2.5 py-0.5',
        'group-data-[collapsible=icon]:hidden',
        className
      )}
      {...props}
    />
  );
}

function DetailDialogSidebarMenuSubItem({ className, ...props }: React.ComponentProps<'li'>) {
  return <li data-slot="sidebar-menu-sub-item" data-sidebar="menu-sub-item" className={cn('group/menu-sub-item relative', className)} {...props} />;
}

function DetailDialogSidebarMenuSubButton({
  asChild = false,
  size = 'md',
  isActive = false,
  className,
  ...props
}: React.ComponentProps<'a'> & {
  asChild?: boolean;
  size?: 'sm' | 'md';
  isActive?: boolean;
}) {
  const Comp = asChild ? SlotPrimitive.Slot : 'a';
  return (
    <Comp
      data-slot="sidebar-menu-sub-button"
      data-sidebar="menu-sub-button"
      data-size={size}
      data-active={isActive}
      className={cn(
        'text-sidebar-foreground ring-sidebar-ring',
        'flex h-7 min-w-0 -translate-x-px items-center gap-2 overflow-hidden rounded-md px-2 outline-hidden',
        'transition-[background-color,color]',
        'hover:bg-sidebar-accent hover:text-sidebar-accent-foreground',
        'active:bg-sidebar-accent active:text-sidebar-accent-foreground',
        'focus-visible:ring-2',
        'disabled:pointer-events-none disabled:opacity-50',
        'aria-disabled:pointer-events-none aria-disabled:opacity-50',
        'data-[active=true]:bg-sidebar-accent data-[active=true]:text-sidebar-accent-foreground',
        'group-data-[collapsible=icon]:hidden',
        '[&>span:last-child]:truncate',
        '[&>svg]:size-4 [&>svg]:shrink-0 [&>svg]:text-sidebar-accent-foreground',
        size === 'sm' && 'text-xs',
        size === 'md' && 'text-sm',
        className
      )}
      {...props}
    />
  );
}

function DetailDialogSidebarSeparator({ className, ...props }: React.ComponentProps<typeof Separator>) {
  return <Separator data-slot="sidebar-separator" data-sidebar="separator" className={cn('mx-2 w-auto bg-sidebar-border', className)} {...props} />;
}

export {
  DetailDialogSidebarGroup,
  DetailDialogSidebarGroupAction,
  DetailDialogSidebarGroupContent,
  DetailDialogSidebarGroupLabel,
  DetailDialogSidebarMenuAction,
  DetailDialogSidebarMenuBadge,
  DetailDialogSidebarMenuSkeleton,
  DetailDialogSidebarMenuSub,
  DetailDialogSidebarMenuSubButton,
  DetailDialogSidebarMenuSubItem,
  DetailDialogSidebarRail,
  DetailDialogSidebarSeparator,
  SidebarInset,
};
