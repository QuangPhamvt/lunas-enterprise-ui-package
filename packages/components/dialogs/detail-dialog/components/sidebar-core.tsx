'use client';

import { createContext, use, useCallback, useEffect, useMemo, useState } from 'react';

import { MenuIcon } from 'lucide-react';

import { cn } from '@customafk/react-toolkit/utils';

import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

import { cva, type VariantProps } from 'class-variance-authority';
import { Slot as SlotPrimitive } from 'radix-ui';

export const SIDEBAR_COOKIE_NAME = 'detail_dialog_sidebar_state';
export const SIDEBAR_COOKIE_MAX_AGE = 60 * 60 * 24 * 7;
export const SIDEBAR_WIDTH = '18rem';
export const SIDEBAR_WIDTH_ICON = '3rem';
export const SIDEBAR_KEYBOARD_SHORTCUT = 'p';

export type SidebarContextProps = {
  /** Current visual state of the sidebar. */
  state: 'expanded' | 'collapsed';
  /** Whether the sidebar is open. */
  open: boolean;
  /** Setter for the open state. */
  setOpen: (open: boolean) => void;
  /** Toggles the sidebar between expanded and collapsed. */
  toggleSidebar: () => void;
};

export const SidebarContext = createContext<SidebarContextProps | null>(null);

/**
 * Reads the current sidebar open/collapsed state and toggle handler from context.
 * Also used internally by `DetailDialogSidebarRail` in `./sidebar-extras`.
 */
function useSidebar() {
  const context = use(SidebarContext);
  if (!context) {
    throw new Error('useSidebar must be used within a SidebarProvider.');
  }
  return context;
}

/**
 * Sidebar open/collapsed state, cookie-persisted, with a keyboard shortcut to toggle. Shared by
 * `SidebarProvider` (below, generic/standalone) and `DetailDialogProvider` (`../components/provider`,
 * DetailDialog's own layout shell) so the state logic lives in exactly one place.
 */
function useSidebarState({
  defaultOpen = true,
  open: openProp,
  onOpenChange: setOpenProp,
}: {
  defaultOpen?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}): SidebarContextProps {
  const [_open, _setOpen] = useState<boolean>(defaultOpen);
  const open = openProp ?? _open;
  const setOpen = useCallback(
    (value: boolean | ((value: boolean) => boolean)) => {
      const openState = typeof value === 'function' ? value(open) : value;
      if (setOpenProp) {
        setOpenProp(openState);
      } else {
        _setOpen(openState);
      }
      // biome-ignore lint/suspicious/noDocumentCookie: persists sidebar state across page loads
      document.cookie = `${SIDEBAR_COOKIE_NAME}=${openState}; path=/; max-age=${SIDEBAR_COOKIE_MAX_AGE}`;
    },
    [setOpenProp, open]
  );

  const toggleSidebar = useCallback(() => {
    setOpen(open => !open);
  }, [setOpen]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === SIDEBAR_KEYBOARD_SHORTCUT && (event.metaKey || event.ctrlKey)) {
        event.preventDefault();
        toggleSidebar();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [toggleSidebar]);

  const state = open ? 'expanded' : 'collapsed';

  return useMemo<SidebarContextProps>(() => ({ state, toggleSidebar, open, setOpen }), [state, open, setOpen, toggleSidebar]);
}

/**
 * Generic, standalone-reusable context provider for `Sidebar` — a plain 2-column grid (sidebar |
 * content). For `DetailDialog`'s own header/content grid shell, use `DetailDialogProvider`
 * (`../components/provider`) instead.
 *
 * @example
 * ```tsx
 * import { SidebarProvider, Sidebar } from '@customafk/lunas-ui/dialogs/detail-dialog/components/sidebar';
 *
 * <SidebarProvider defaultOpen={true}>
 *   <Sidebar>{...}</Sidebar>
 *   <main>{...}</main>
 * </SidebarProvider>
 * ```
 */
function SidebarProvider({
  defaultOpen = true,
  open: openProp,
  onOpenChange: setOpenProp,
  className,
  style,
  children,
  ...props
}: React.ComponentProps<'div'> & {
  /** Whether the sidebar is open by default (uncontrolled). Defaults to `true`. */
  defaultOpen?: boolean;
  /** Controlled open state. When provided the component becomes controlled. */
  open?: boolean;
  /** Callback fired when the open state changes in controlled mode. */
  onOpenChange?: (open: boolean) => void;
}) {
  const contextValue = useSidebarState({ defaultOpen, open: openProp, onOpenChange: setOpenProp });

  return (
    <SidebarContext.Provider value={contextValue}>
      <TooltipProvider delayDuration={0}>
        <div
          data-slot="sidebar-wrapper"
          style={{ '--sidebar-width': SIDEBAR_WIDTH, '--sidebar-width-icon': SIDEBAR_WIDTH_ICON, ...style } as React.CSSProperties}
          className={cn('group/sidebar-wrapper grid h-full min-h-[85dvh] w-full grid-cols-[auto_1fr]', className)}
          {...props}
        >
          {children}
        </div>
      </TooltipProvider>
    </SidebarContext.Provider>
  );
}

/**
 * Sidebar container that collapses to an icon strip. Always rendered inline, regardless of viewport size.
 *
 * @example
 * ```tsx
 * import { Sidebar } from '@customafk/lunas-ui/dialogs/detail-dialog/components/sidebar';
 *
 * <Sidebar side="left">
 *   {children}
 * </Sidebar>
 * ```
 */
function Sidebar({
  side = 'left',
  className,
  children,
  ...props
}: React.ComponentProps<'div'> & {
  /** Which edge the sidebar is anchored to. Defaults to `'left'`. */
  side?: 'left' | 'right';
}) {
  const { state } = useSidebar();

  return (
    <div
      className="group peer block text-sidebar-foreground"
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
          'group-data-[collapsible=icon]:w-(--sidebar-width-icon)'
        )}
      />
      <div
        data-slot="sidebar-container"
        className={cn(
          'absolute inset-y-0 z-20 flex w-(--sidebar-width) shadow-nav transition-[left,right,width] duration-200 ease-linear',
          'group-data-[collapsible=icon]:w-(--sidebar-width-icon)',
          side === 'left' ? 'left-0' : 'right-0',
          className
        )}
        {...props}
      >
        <div data-sidebar="sidebar" data-slot="sidebar-inner" className="grid size-full grid-rows-[auto_minmax(0,1fr)_auto] shadow-nav">
          {children}
        </div>
      </div>
    </div>
  );
}

/**
 * Icon button that toggles the detail-dialog sidebar open or collapsed.
 *
 * @example
 * ```tsx
 * import { DetailDialogSidebarTrigger } from '@customafk/lunas-ui/dialogs/detail-dialog/components/sidebar';
 *
 * <DetailDialogSidebarTrigger />
 * ```
 */
function DetailDialogSidebarTrigger({ className, onClick, ...props }: React.ComponentProps<typeof Button>) {
  const { toggleSidebar } = useSidebar();

  return (
    <Button
      data-sidebar="trigger"
      data-slot="sidebar-trigger"
      variant="ghost"
      color="secondary"
      size="icon"
      className={cn('size-10 rounded-full [&_svg]:size-6!', className)}
      onClick={event => {
        onClick?.(event);
        toggleSidebar();
      }}
      {...props}
    >
      <MenuIcon />
      <span className="sr-only">Toggle Sidebar</span>
    </Button>
  );
}

function DetailDialogSidebarHeader({ className, ...props }: React.ComponentProps<'div'>) {
  return <div data-slot="sidebar-header" data-sidebar="header" className={cn('flex flex-col gap-2 p-2', className)} {...props} />;
}

function DetailDialogSidebarFooter({ className, children, ...props }: React.ComponentProps<'div'>) {
  const { open } = useSidebar();
  return (
    <div data-slot="sidebar-footer" data-sidebar="footer" className={cn('flex flex-col gap-2 p-2', className)} {...props}>
      <DetailDialogSidebarMenu>
        {open && <DetailDialogSidebarMenuItem>{children}</DetailDialogSidebarMenuItem>}
        {open && (
          <DetailDialogSidebarMenuItem>
            <p className="pt-2 text-center text-text-positive-subtle text-xs">Copyright © {new Date().getFullYear()}, Lunas.</p>
          </DetailDialogSidebarMenuItem>
        )}
      </DetailDialogSidebarMenu>
    </div>
  );
}

function DetailDialogSidebarContent({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="sidebar-content"
      data-sidebar="content"
      className={cn('flex min-h-0 flex-1 flex-col gap-2 overflow-auto group-data-[collapsible=icon]:overflow-hidden', className)}
      {...props}
    />
  );
}

function DetailDialogSidebarMenu({ className, ...props }: React.ComponentProps<'ul'>) {
  return <ul data-slot="sidebar-menu" data-sidebar="menu" className={cn('flex w-full min-w-0 flex-col gap-1', className)} {...props} />;
}

function DetailDialogSidebarMenuItem({ className, ...props }: React.ComponentProps<'li'>) {
  return <li data-slot="sidebar-menu-item" data-sidebar="menu-item" className={cn('group/menu-item relative', className)} {...props} />;
}

const sidebarMenuButtonVariants = cva(
  [
    'peer/menu-button',
    'cursor-pointer',
    'flex w-full items-center gap-2',
    'overflow-hidden rounded-md p-2 outline-hidden',
    'truncate text-left font-normal',
    'transition-[color,background-color,width,height,padding]',
    'active:bg-sidebar-accent active:text-sidebar-accent-foreground',
    'disabled:pointer-events-none disabled:opacity-50',
    'group-has-data-[sidebar=menu-action]/menu-item:pr-8',
    'aria-disabled:pointer-events-none aria-disabled:opacity-50',
    'data-[active=true]:bg-sidebar-primary-muted data-[active=true]:font-normal data-[active=true]:text-sidebar-primary',
    'data-[state=open]:hover:bg-sidebar-accent data-[state=open]:hover:text-sidebar-accent-foreground',
    'group-data-[collapsible=icon]:size-8! group-data-[collapsible=icon]:p-2!',
    '[&>svg]:size-4 [&>svg]:shrink-0',
    '[&>span:last-child]:truncate',
  ],
  {
    variants: {
      variant: {
        default: 'hover:bg-sidebar-accent/60 hover:text-sidebar-accent-foreground',
        outline:
          'bg-background shadow-[0_0_0_1px_hsl(var(--sidebar-border))] hover:bg-sidebar-accent hover:text-sidebar-accent-foreground hover:shadow-[0_0_0_1px_hsl(var(--sidebar-accent))]',
      },
      size: {
        default: 'h-8 text-sm',
        sm: 'h-7 text-xs',
        lg: 'h-12 text-sm group-data-[collapsible=icon]:p-0!',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

function DetailDialogSidebarMenuButton({
  asChild = false,
  isActive = false,
  variant = 'default',
  size = 'default',
  tooltip,
  className,
  ...props
}: React.ComponentProps<'button'> & {
  asChild?: boolean;
  isActive?: boolean;
  tooltip?: string | React.ComponentProps<typeof TooltipContent>;
} & VariantProps<typeof sidebarMenuButtonVariants>) {
  const Comp = asChild ? SlotPrimitive.Slot : 'button';
  const { state } = useSidebar();

  const button = (
    <Comp
      data-slot="sidebar-menu-button"
      data-sidebar="menu-button"
      data-size={size}
      data-active={isActive}
      className={cn(sidebarMenuButtonVariants({ variant, size }), className)}
      {...props}
    />
  );

  if (!tooltip) return button;

  if (typeof tooltip === 'string') {
    tooltip = { children: tooltip };
  }

  return (
    <Tooltip>
      <TooltipTrigger asChild>{button}</TooltipTrigger>
      <TooltipContent side="right" align="center" hidden={state !== 'collapsed'} {...tooltip} />
    </Tooltip>
  );
}

export {
  DetailDialogSidebarContent,
  DetailDialogSidebarFooter,
  DetailDialogSidebarHeader,
  DetailDialogSidebarMenu,
  DetailDialogSidebarMenuButton,
  DetailDialogSidebarMenuItem,
  DetailDialogSidebarTrigger,
  Sidebar,
  SidebarProvider,
  // biome-ignore lint/style/useComponentExportOnlyModules: true
  useSidebar,
  // biome-ignore lint/style/useComponentExportOnlyModules: true
  useSidebarState,
};
