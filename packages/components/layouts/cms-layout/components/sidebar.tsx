'use client';

import { memo } from 'react';

import { PanelLeftIcon } from 'lucide-react';

import { cn } from '@customafk/react-toolkit/utils';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';

import { Slot as SlotPrimitive } from 'radix-ui';

import { useSidebar } from './sidebar-context';

const CMSLayoutSidebar = memo(
  ({
    side = 'left',
    className,
    children,
    ...props
  }: React.ComponentProps<'div'> & {
    side?: 'left' | 'right';
  }) => {
    const { state } = useSidebar();

    return (
      <div
        className="group peer relative col-start-1 row-start-2 block bg-card text-sidebar-foreground"
        data-state={state}
        data-collapsible={state === 'collapsed' ? 'icon' : ''}
        data-side={side}
        data-slot="sidebar"
      >
        <div
          data-slot="sidebar-gap"
          className={cn(
            'relative w-(--sidebar-width) bg-transparent transition-[width] duration-200 ease-linear',
            'group-data-[side=right]:rotate-180',
            'group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)+(--spacing(4)))]'
          )}
        />
        <div
          data-slot="sidebar-container"
          className={cn(
            'absolute inset-y-0 z-10 flex w-(--sidebar-width) p-2 shadow-nav',
            'transition-[left,right,width] duration-200 ease-linear',
            `group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)+(--spacing(4)))]`,
            side === 'left' ? 'left-0' : 'right-0',
            className
          )}
          {...props}
        >
          <div data-sidebar="sidebar" data-slot="sidebar-inner" className="relative flex size-full flex-col">
            {children}
          </div>
        </div>
      </div>
    );
  }
);
CMSLayoutSidebar.displayName = 'CMSLayoutSidebar';

function SidebarTrigger({ className, onClick, ...props }: React.ComponentProps<typeof Button>) {
  const { toggleSidebar } = useSidebar();

  return (
    <Button
      data-sidebar="trigger"
      data-slot="sidebar-trigger"
      variant="ghost"
      size="icon"
      className={cn('size-7', className)}
      onClick={event => {
        onClick?.(event);
        toggleSidebar();
      }}
      {...props}
    >
      <PanelLeftIcon />
      <span className="sr-only">Toggle Sidebar</span>
    </Button>
  );
}

function SidebarRail({ className, ...props }: React.ComponentProps<'button'>) {
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
        'absolute inset-y-0 z-20 hidden w-4 -translate-x-1/2 transition-all ease-linear after:absolute after:inset-y-0 after:left-1/2 after:w-0.5 hover:after:bg-sidebar-border group-data-[side=left]:-right-4 group-data-[side=right]:left-0 sm:flex',
        'in-data-[side=left]:cursor-w-resize in-data-[side=right]:cursor-e-resize',
        '[[data-side=left][data-state=collapsed]_&]:cursor-e-resize [[data-side=right][data-state=collapsed]_&]:cursor-w-resize',
        'group-data-[collapsible=offcanvas]:translate-x-0 hover:group-data-[collapsible=offcanvas]:bg-sidebar group-data-[collapsible=offcanvas]:after:left-full',
        '[[data-side=left][data-collapsible=offcanvas]_&]:-right-2',
        '[[data-side=right][data-collapsible=offcanvas]_&]:-left-2',
        className
      )}
      {...props}
    />
  );
}

const CMSLayoutMain = memo(({ className, children, ...props }: React.ComponentProps<'main'>) => {
  return (
    <main data-slot="sidebar-inset" className={cn('col-start-2 row-start-2 grid min-h-0 min-w-0 grid-rows-1', className)} {...props}>
      <div className="relative grid min-h-0 grid-cols-1 overflow-auto">{children}</div>
    </main>
  );
});
CMSLayoutMain.displayName = 'CMSLayoutMain';

const SidebarInput = memo(({ className, ...props }: React.ComponentProps<typeof Input>) => {
  return <Input data-slot="sidebar-input" data-sidebar="input" className={cn('h-8 w-full bg-background shadow-none', className)} {...props} />;
});
SidebarInput.displayName = 'SidebarInput';

const SidebarHeader = memo(({ className, ...props }: React.ComponentProps<'div'>) => {
  return <div data-slot="sidebar-header" data-sidebar="header" className={cn('flex flex-col gap-2 p-2', className)} {...props} />;
});
SidebarHeader.displayName = 'SidebarHeader';

const SidebarFooter = memo(({ className, ...props }: React.ComponentProps<'div'>) => {
  return <div data-slot="sidebar-footer" data-sidebar="footer" className={cn('flex flex-col gap-2', className)} {...props} />;
});
SidebarFooter.displayName = 'SidebarFooter';

const SidebarSeparator = memo(({ className, ...props }: React.ComponentProps<typeof Separator>) => {
  return <Separator data-slot="sidebar-separator" data-sidebar="separator" className={cn('mx-2 w-auto bg-sidebar-border', className)} {...props} />;
});
SidebarSeparator.displayName = 'SidebarSeparator';

const SidebarContent = memo(({ className, ...props }: React.ComponentProps<'div'>) => {
  return (
    <div
      data-slot="sidebar-content"
      data-sidebar="content"
      className={cn('flex flex-1 flex-col gap-2 overflow-auto group-data-[collapsible=icon]:overflow-hidden', className)}
      {...props}
    />
  );
});
SidebarContent.displayName = 'SidebarContent';

const SidebarGroup = memo(({ className, ...props }: React.ComponentProps<'div'>) => {
  return <div data-slot="sidebar-group" data-sidebar="group" className={cn('relative flex w-full flex-col', className)} {...props} />;
});
SidebarGroup.displayName = 'SidebarGroup';

const SidebarGroupLabel = memo(({ className, asChild = false, ...props }: React.ComponentProps<'div'> & { asChild?: boolean }) => {
  const Comp = asChild ? SlotPrimitive.Slot : 'div';

  return (
    <Comp
      data-slot="sidebar-group-label"
      data-sidebar="group-label"
      className={cn(
        'flex h-8 shrink-0 items-center rounded-md px-2 font-medium text-sidebar-foreground/70 text-xs outline-hidden ring-sidebar-ring transition-[margin,opacity,color] duration-200 ease-linear focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0',
        'group-data-[collapsible=icon]:-mt-8 group-data-[collapsible=icon]:opacity-0',
        className
      )}
      {...props}
    />
  );
});
SidebarGroupLabel.displayName = 'SidebarGroupLabel';

function SidebarGroupAction({ className, asChild = false, ...props }: React.ComponentProps<'button'> & { asChild?: boolean }) {
  const Comp = asChild ? SlotPrimitive.Slot : 'button';

  return (
    <Comp
      data-slot="sidebar-group-action"
      data-sidebar="group-action"
      className={cn(
        'absolute top-3.5 right-3 flex aspect-square w-5 items-center justify-center rounded-md p-0 text-sidebar-foreground outline-hidden ring-sidebar-ring transition-[background-color,color,transform] hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2',
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

const SidebarGroupContent = memo(({ className, ...props }: React.ComponentProps<'div'>) => {
  return <div data-slot="sidebar-group-content" data-sidebar="group-content" className={cn('w-full text-sm', className)} {...props} />;
});
SidebarGroupContent.displayName = 'SidebarGroupContent';

export {
  CMSLayoutSidebar,
  SidebarTrigger,
  SidebarRail,
  CMSLayoutMain,
  SidebarInput,
  SidebarHeader,
  SidebarFooter,
  SidebarSeparator,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupAction,
  SidebarGroupContent,
};
// biome-ignore lint/style/useComponentExportOnlyModules: the hook is part of this component's public API
export { useSidebar, CMSLayoutProvider } from './sidebar-context';
export {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuAction,
  SidebarMenuBadge,
  SidebarMenuSkeleton,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
} from './sidebar-menu';
