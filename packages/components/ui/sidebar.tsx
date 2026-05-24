'use client';
import { createContext, use, useCallback, useEffect, useMemo, useState } from 'react';

import { MenuIcon } from 'lucide-react';

import { useIsMobile } from '@customafk/react-toolkit/hooks/useMobile';
import { cn } from '@customafk/react-toolkit/utils';

import { cva, type VariantProps } from 'class-variance-authority';
import { Slot as SlotPrimitive } from 'radix-ui';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Drawer, DrawerContent, DrawerDescription, DrawerHeader } from './drawer';

const SIDEBAR_COOKIE_NAME = 'sidebar_state';
const SIDEBAR_COOKIE_MAX_AGE = 60 * 60 * 24 * 7;
const SIDEBAR_WIDTH = '16rem';
const SIDEBAR_WIDTH_MOBILE = '18rem';
const SIDEBAR_WIDTH_ICON = '3rem';
const SIDEBAR_KEYBOARD_SHORTCUT = 'b';

type SidebarContextProps = {
  state: 'expanded' | 'collapsed';
  open: boolean;
  setOpen: (open: boolean) => void;
  openMobile: boolean;
  setOpenMobile: (open: boolean) => void;
  isMobile: boolean;
  toggleSidebar: () => void;
};

const SidebarContext = createContext<SidebarContextProps | null>(null);

/**
 * Hook that returns the current sidebar state and control methods from the nearest SidebarProvider.
 * Must be used within a `<SidebarProvider>`.
 */
function useSidebar() {
  const context = use(SidebarContext);
  if (!context) {
    throw new Error('useSidebar must be used within a SidebarProvider.');
  }

  return context;
}

/**
 * Context provider that manages sidebar open/collapsed state, mobile drawer, keyboard shortcut (Ctrl+B), and CSS variables for all child Sidebar components.
 *
 * @example
 * ```tsx
 * import {
 *   SidebarProvider, Sidebar, SidebarHeader, SidebarContent,
 *   SidebarMenu, SidebarMenuItem, SidebarMenuButton,
 *   SidebarInset, SidebarTrigger,
 * } from '@customafk/lunas-ui/ui/sidebar';
 *
 * <SidebarProvider>
 *   <Sidebar>
 *     <SidebarHeader>Logo</SidebarHeader>
 *     <SidebarContent>
 *       <SidebarMenu>
 *         <SidebarMenuItem>
 *           <SidebarMenuButton asChild isActive>
 *             <a href="/dashboard">Dashboard</a>
 *           </SidebarMenuButton>
 *         </SidebarMenuItem>
 *       </SidebarMenu>
 *     </SidebarContent>
 *   </Sidebar>
 *   <SidebarInset>
 *     <SidebarTrigger />
 *     <main>Page content</main>
 *   </SidebarInset>
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
  /** Whether the sidebar starts expanded. @default true */
  defaultOpen?: boolean;
  /** Controlled open state. */
  open?: boolean;
  /** Callback fired when the open state changes. */
  onOpenChange?: (open: boolean) => void;
}) {
  const isMobile = useIsMobile();
  const [openMobile, setOpenMobile] = useState(false);

  // This is the internal state of the sidebar.
  // We use openProp and setOpenProp for control from outside the component.
  const [_open, _setOpen] = useState(defaultOpen);
  const open = openProp ?? _open;
  const setOpen = useCallback(
    (value: boolean | ((value: boolean) => boolean)) => {
      const openState = typeof value === 'function' ? value(open) : value;
      if (setOpenProp) {
        setOpenProp(openState);
      } else {
        _setOpen(openState);
      }

      // This sets the cookie to keep the sidebar state.
      document.cookie = `${SIDEBAR_COOKIE_NAME}=${openState}; path=/; max-age=${SIDEBAR_COOKIE_MAX_AGE}`;
    },
    [setOpenProp, open]
  );

  // Helper to toggle the sidebar.
  const toggleSidebar = useCallback(() => {
    return isMobile ? setOpenMobile(open => !open) : setOpen(open => !open);
  }, [isMobile, setOpen, setOpenMobile]);

  // Adds a keyboard shortcut to toggle the sidebar.
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

  // We add a state so that we can do data-state="expanded" or "collapsed".
  // This makes it easier to style the sidebar with Tailwind classes.
  const state = open ? 'expanded' : 'collapsed';

  const contextValue = useMemo<SidebarContextProps>(
    () => ({
      state,
      isMobile,

      toggleSidebar,

      open,
      setOpen,

      openMobile,
      setOpenMobile,
    }),
    [state, open, setOpen, isMobile, openMobile, setOpenMobile, toggleSidebar]
  );

  return (
    <SidebarContext.Provider value={contextValue}>
      <TooltipProvider delayDuration={0}>
        <div
          data-slot="sidebar-wrapper"
          style={
            {
              '--sidebar-width': SIDEBAR_WIDTH,
              '--sidebar-width-icon': SIDEBAR_WIDTH_ICON,
              ...style,
            } as React.CSSProperties
          }
          className={cn('group/sidebar-wrapper', 'has-data-[variant=inset]:bg-sidebar', 'flex h-dvh w-full', className)}
          {...props}
        >
          {children}
        </div>
      </TooltipProvider>
    </SidebarContext.Provider>
  );
}

/**
 * The main sidebar panel; renders as a Drawer on mobile and a fixed `<aside>` on desktop with optional collapse behavior.
 *
 * @param side - Which edge of the viewport the sidebar attaches to. @default `'left'`
 * @param variant - Visual style: `'sidebar'` (default), `'floating'`, or `'inset'`.
 * @param collapsible - Collapse mode: `'offcanvas'` (slides out), `'icon'` (icon-only), or `'none'` (always visible).
 */
function Sidebar({
  side = 'left',
  variant = 'sidebar',
  collapsible = 'offcanvas',
  className,
  children,
  ...props
}: React.ComponentProps<'div'> & {
  side?: 'left' | 'right';
  variant?: 'sidebar' | 'floating' | 'inset';
  collapsible?: 'offcanvas' | 'icon' | 'none';
}) {
  const { isMobile, state, openMobile, setOpenMobile } = useSidebar();

  if (collapsible === 'none') {
    return (
      <aside
        data-slot="sidebar"
        className={cn('bg-sidebar', 'text-sidebar-foreground', 'flex h-full w-(--sidebar-width) flex-col', 'border-r', className)}
        {...props}
      >
        {children}
      </aside>
    );
  }

  if (isMobile) {
    return (
      <Drawer open={openMobile} onOpenChange={setOpenMobile} direction="left">
        <DrawerContent
          data-sidebar="sidebar"
          data-slot="sidebar"
          data-mobile="true"
          className="bg-sidebar text-sidebar-foreground w-(--sidebar-width) p-0 [&>button]:hidden"
          style={
            {
              '--sidebar-width': SIDEBAR_WIDTH_MOBILE,
            } as React.CSSProperties
          }
          // side={side}
        >
          <DrawerHeader className="sr-only">
            <DrawerContent>Sidebar</DrawerContent>
            <DrawerDescription>Displays the mobile sidebar.</DrawerDescription>
          </DrawerHeader>
          <div className="flex h-full w-full flex-col">{children}</div>
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <aside
      className="group peer text-sidebar-foreground bg-card hidden md:block"
      data-state={state}
      data-collapsible={state === 'collapsed' ? collapsible : ''}
      data-variant={variant}
      data-side={side}
      data-slot="sidebar"
    >
      {/* This is what handles the sidebar gap on desktop */}
      <div
        data-slot="sidebar-gap"
        className={cn(
          'relative',
          'bg-transparent',
          'transition-[width] duration-200 ease-linear',
          'h-14 w-(--sidebar-width)',
          'group-data-[collapsible=offcanvas]:w-0',
          'group-data-[side=right]:rotate-180',
          variant === 'floating' || variant === 'inset'
            ? 'group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)+(--spacing(4)))]'
            : 'group-data-[collapsible=icon]:w-(--sidebar-width-icon)'
        )}
      />
      <div
        data-slot="sidebar-container"
        className={cn(
          'hidden md:flex',
          'fixed inset-y-0 top-14 z-10',
          'h-[calc(100dvh-3.5rem)] w-(--sidebar-width)',
          'border-r',
          'transition-[left,right,width] duration-200 ease-linear',
          side === 'left' && 'left-0',
          side === 'left' && 'group-data-[collapsible=offcanvas]:left-[calc(var(--sidebar-width)*-1)]',
          side === 'right' && 'right-0',
          side === 'right' && 'group-data-[collapsible=offcanvas]:right-[calc(var(--sidebar-width)*-1)]',
          // Adjust the padding for floating and inset variants.
          variant === 'floating' || variant === 'inset'
            ? 'p-2 group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)+(--spacing(4))+2px)]'
            : 'group-data-[collapsible=icon]:w-(--sidebar-width-icon) group-data-[side=left]:border-r group-data-[side=right]:border-l',
          className
        )}
        {...props}
      >
        <div
          data-sidebar="sidebar"
          data-slot="sidebar-inner"
          className={cn(
            'flex size-full flex-col',
            'group-data-[variant=floating]:rounded-lg',
            'group-data-[variant=floating]:border',
            'group-data-[variant=floating]:border-sidebar-border',
            'group-data-[variant=floating]:shadow-sm'
          )}
        >
          {children}
        </div>
      </div>
    </aside>
  );
}

/** Icon button that toggles the sidebar open/collapsed state. */
function SidebarTrigger({ className, onClick, ...props }: React.ComponentProps<typeof Button>) {
  const { toggleSidebar } = useSidebar();

  return (
    <Button
      data-sidebar="trigger"
      data-slot="sidebar-trigger"
      variant="ghost"
      size="icon"
      className={cn('size-10 rounded-full', className)}
      onClick={event => {
        onClick?.(event);
        toggleSidebar();
      }}
      {...props}
    >
      <MenuIcon className="!size-6" />
      <span className="sr-only">Toggle Sidebar</span>
    </Button>
  );
}

/** Invisible drag-rail along the sidebar edge that toggles collapse on click. */
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
        'absolute inset-y-0 z-20 hidden w-4 -translate-x-1/2 transition-all ease-linear sm:flex',
        'after:absolute',
        'after:inset-y-0',
        'after:left-1/2',
        'after:w-0.5',
        'group-data-[side=left]:-right-4',
        'group-data-[side=right]:left-0',
        'in-data-[side=left]:cursor-w-resize',
        'in-data-[side=right]:cursor-e-resize',
        '[[data-side=left][data-state=collapsed]_&]:cursor-e-resize',
        '[[data-side=right][data-state=collapsed]_&]:cursor-w-resize',
        'hover:after:bg-sidebar-border',
        'hover:group-data-[collapsible=offcanvas]:bg-sidebar',
        'group-data-[collapsible=offcanvas]:translate-x-0',
        'group-data-[collapsible=offcanvas]:after:left-full',
        '[[data-side=left][data-collapsible=offcanvas]_&]:-right-2',
        '[[data-side=right][data-collapsible=offcanvas]_&]:-left-2',
        className
      )}
      {...props}
    />
  );
}

/** The main content area that sits beside the Sidebar; expands to fill the remaining viewport width. */
function SidebarInset({ className, children, ...props }: React.ComponentProps<'main'>) {
  return (
    <main data-slot="sidebar-inset" className={cn('w-full', 'relative', 'flex flex-1 flex-col', className)} {...props}>
      <div className="h-14 w-full" />
      <div className={cn('flex-1 inset-shadow-sm')}>{children}</div>
    </main>
  );
}

/** A compact search input styled for use inside a sidebar header. */
function SidebarInput({ className, ...props }: React.ComponentProps<typeof Input>) {
  return <Input data-slot="sidebar-input" data-sidebar="input" className={cn('bg-background h-8 w-full shadow-none', className)} {...props} />;
}

/** Sticky top section of the Sidebar, typically holding a logo or workspace switcher. */
function SidebarHeader({ className, ...props }: React.ComponentProps<'div'>) {
  return <div data-slot="sidebar-header" data-sidebar="header" className={cn('flex flex-col gap-2 p-2', className)} {...props} />;
}

/** Sticky bottom section of the Sidebar, typically holding user account info or settings. */
function SidebarFooter({ className, ...props }: React.ComponentProps<'div'>) {
  return <div data-slot="sidebar-footer" data-sidebar="footer" className={cn('flex flex-col gap-2 p-2', className)} {...props} />;
}

/** A horizontal Separator styled for use between sections inside a Sidebar. */
function SidebarSeparator({ className, ...props }: React.ComponentProps<typeof Separator>) {
  return <Separator data-slot="sidebar-separator" data-sidebar="separator" className={cn('bg-sidebar-border mx-2 w-auto', className)} {...props} />;
}

/** Scrollable middle section of the Sidebar that grows to fill available space. */
function SidebarContent({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="sidebar-content"
      data-sidebar="content"
      className={cn('flex min-h-0 flex-1 flex-col gap-2 overflow-auto group-data-[collapsible=icon]:overflow-hidden', className)}
      {...props}
    />
  );
}

/** A logical section within SidebarContent, grouping related SidebarMenu items. */
function SidebarGroup({ className, ...props }: React.ComponentProps<'div'>) {
  return <div data-slot="sidebar-group" data-sidebar="group" className={cn('relative flex w-full min-w-0 flex-col p-2', className)} {...props} />;
}

/**
 * Small all-caps heading label at the top of a SidebarGroup; hidden automatically in icon-only collapse mode.
 *
 * @param asChild - When true, renders as the child element via Radix Slot.
 */
function SidebarGroupLabel({ className, asChild = false, ...props }: React.ComponentProps<'div'> & { asChild?: boolean }) {
  const Comp = asChild ? SlotPrimitive.Slot : 'div';

  return (
    <Comp
      data-slot="sidebar-group-label"
      data-sidebar="group-label"
      className={cn(
        'text-sidebar-foreground/70',
        'ring-sidebar-ring flex h-8 shrink-0 items-center rounded-md px-2 text-xs font-medium outline-hidden transition-[margin,opacity] duration-200 ease-linear',
        'focus-visible:ring-2',
        '[&>svg]:size-4',
        '[&>svg]:shrink-0',
        'group-data-[collapsible=icon]:-mt-8',
        'group-data-[collapsible=icon]:opacity-0',
        className
      )}
      {...props}
    />
  );
}

/**
 * Action button (e.g. "Add") positioned absolutely at the top-right of a SidebarGroup label.
 *
 * @param asChild - When true, renders as the child element via Radix Slot.
 */
function SidebarGroupAction({ className, asChild = false, ...props }: React.ComponentProps<'button'> & { asChild?: boolean }) {
  const Comp = asChild ? SlotPrimitive.Slot : 'button';

  return (
    <Comp
      data-slot="sidebar-group-action"
      data-sidebar="group-action"
      className={cn(
        'text-sidebar-foreground ring-sidebar-ring',
        'absolute top-3.5 right-3 flex aspect-square w-5 items-center justify-center rounded-md p-0 outline-hidden transition-transform',
        'focus-visible:ring-2',
        'hover:bg-sidebar-accent',
        'hover:text-sidebar-accent-foreground',
        '[&>svg]:size-4',
        '[&>svg]:shrink-0',
        // Increases the hit area of the button on mobile.
        'after:absolute after:-inset-2 md:after:hidden',
        'group-data-[collapsible=icon]:hidden',
        className
      )}
      {...props}
    />
  );
}

/** The content area of a SidebarGroup, typically wrapping a SidebarMenu. */
function SidebarGroupContent({ className, ...props }: React.ComponentProps<'div'>) {
  return <div data-slot="sidebar-group-content" data-sidebar="group-content" className={cn('w-full text-sm', className)} {...props} />;
}

/** Vertical list `<ul>` that holds SidebarMenuItems. */
function SidebarMenu({ className, ...props }: React.ComponentProps<'ul'>) {
  return <ul data-slot="sidebar-menu" data-sidebar="menu" className={cn('flex w-full min-w-0 flex-col gap-1', className)} {...props} />;
}

/** A single `<li>` entry in a SidebarMenu that may include a button, action, and badge. */
function SidebarMenuItem({ className, ...props }: React.ComponentProps<'li'>) {
  return <li data-slot="sidebar-menu-item" data-sidebar="menu-item" className={cn('group/menu-item relative', className)} {...props} />;
}

const sidebarMenuButtonVariants = cva(
  [
    'peer/menu-button cursor-pointer flex w-full items-center gap-2 overflow-hidden rounded-md p-2 text-left text-sm outline-hidden ring-sidebar-ring transition-[width,height,padding]',
    'hover:bg-sidebar-accent',
    'hover:text-sidebar-accent-foreground',
    'focus-visible:ring-2',
    'active:bg-sidebar-accent',
    'active:text-sidebar-accent-foreground',
    'disabled:pointer-events-none',
    'disabled:opacity-50',
    'group-has-data-[sidebar=menu-action]/menu-item:pr-8',
    'aria-disabled:pointer-events-none',
    'aria-disabled:opacity-50',
    'data-[active=true]:bg-sidebar-accent',
    'data-[active=true]:font-medium',
    'data-[active=true]:text-sidebar-accent-foreground',
    'data-[state=open]:hover:bg-sidebar-accent',
    'data-[state=open]:hover:text-sidebar-accent-foreground',
    'group-data-[collapsible=icon]:size-8!',
    'group-data-[collapsible=icon]:p-2!',
    '[&>span:last-child]:truncate',
    '[&>svg]:size-4',
    '[&>svg]:shrink-0',
  ],
  {
    variants: {
      variant: {
        default: 'hover:bg-sidebar-accent hover:text-sidebar-accent-foreground',
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

/**
 * The primary clickable button within a SidebarMenuItem; collapses to an icon-only view when the sidebar is in icon-collapse mode and optionally shows a tooltip.
 *
 * @param asChild - When true, renders as the child element via Radix Slot (useful for router links).
 * @param isActive - Marks the button as the currently active route.
 * @param tooltip - A string or TooltipContent props shown when the sidebar is collapsed to icon-only mode.
 * @param variant - `'default'` or `'outline'`.
 * @param size - `'default'`, `'sm'`, or `'lg'`.
 */
function SidebarMenuButton({
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
  const { isMobile, state } = useSidebar();

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

  if (!tooltip) {
    return button;
  }

  if (typeof tooltip === 'string') {
    tooltip = {
      children: tooltip,
    };
  }

  return (
    <Tooltip>
      <TooltipTrigger asChild>{button}</TooltipTrigger>
      <TooltipContent side="right" align="center" hidden={state !== 'collapsed' || isMobile} {...tooltip} />
    </Tooltip>
  );
}

/**
 * An icon action button (e.g. more-options) positioned at the right of a SidebarMenuButton.
 *
 * @param asChild - When true, renders as the child element via Radix Slot.
 * @param showOnHover - When true, the action is only visible on hover or when the menu item is focused.
 */
function SidebarMenuAction({
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
        'text-sidebar-foreground ring-sidebar-ring hover:bg-sidebar-accent hover:text-sidebar-accent-foreground peer-hover/menu-button:text-sidebar-accent-foreground absolute top-1.5 right-1 flex aspect-square w-5 items-center justify-center rounded-md p-0 outline-hidden transition-transform',
        'focus-visible:ring-2',
        '[&>svg]:size-4',
        '[&>svg]:shrink-0',
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

/** Small numeric or text badge rendered at the right of a SidebarMenuButton (e.g. unread count). */
function SidebarMenuBadge({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="sidebar-menu-badge"
      data-sidebar="menu-badge"
      className={cn(
        'text-sidebar-foreground pointer-events-none absolute right-1 flex h-5 min-w-5 items-center justify-center rounded-md px-1 text-xs font-medium tabular-nums select-none',
        'peer-hover/menu-button:text-sidebar-accent-foreground',
        'peer-data-[active=true]/menu-button:text-sidebar-accent-foreground',
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

/**
 * Placeholder skeleton row rendered in place of a SidebarMenuButton while menu items are loading.
 *
 * @param showIcon - When true, also renders a small square skeleton for the icon slot.
 */
function SidebarMenuSkeleton({
  className,
  showIcon = false,
  ...props
}: React.ComponentProps<'div'> & {
  showIcon?: boolean;
}) {
  // Random width between 50 to 90%.
  const width = useMemo(() => {
    return `${Math.floor(Math.random() * 40) + 50}%`;
  }, []);

  return (
    <div data-slot="sidebar-menu-skeleton" data-sidebar="menu-skeleton" className={cn('flex h-8 items-center gap-2 rounded-md px-2', className)} {...props}>
      {showIcon && <Skeleton className="size-4 rounded-md" data-sidebar="menu-skeleton-icon" />}
      <Skeleton
        className="h-4 max-w-(--skeleton-width) flex-1"
        data-sidebar="menu-skeleton-text"
        style={
          {
            '--skeleton-width': width,
          } as React.CSSProperties
        }
      />
    </div>
  );
}

/** Indented nested list of SidebarMenuSubItems rendered below a parent SidebarMenuItem. */
function SidebarMenuSub({ className, ...props }: React.ComponentProps<'ul'>) {
  return (
    <ul
      data-slot="sidebar-menu-sub"
      data-sidebar="menu-sub"
      className={cn(
        'border-sidebar-border mx-3.5 flex min-w-0 translate-x-px flex-col gap-1 border-l px-2.5 py-0.5',
        'group-data-[collapsible=icon]:hidden',
        className
      )}
      {...props}
    />
  );
}

/** A single `<li>` entry inside a SidebarMenuSub. */
function SidebarMenuSubItem({ className, ...props }: React.ComponentProps<'li'>) {
  return <li data-slot="sidebar-menu-sub-item" data-sidebar="menu-sub-item" className={cn('group/menu-sub-item relative', className)} {...props} />;
}

/**
 * The clickable link/button for a nested sub-menu entry inside a SidebarMenuSub.
 *
 * @param asChild - When true, renders as the child element via Radix Slot.
 * @param size - `'sm'` for smaller text, `'md'` for normal text.
 * @param isActive - Highlights the button as the currently active sub-route.
 */
function SidebarMenuSubButton({
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
        'hover:bg-sidebar-accent',
        'hover:text-sidebar-accent-foreground',
        'active:bg-sidebar-accent',
        'active:text-sidebar-accent-foreground',
        'focus-visible:ring-2',
        'disabled:pointer-events-none',
        'disabled:opacity-50',
        'aria-disabled:pointer-events-none',
        'aria-disabled:opacity-50',
        '[&>span:last-child]:truncate',
        '[&>svg]:size-4',
        '[&>svg]:shrink-0',
        '[&>svg]:text-sidebar-accent-foreground',
        'data-[active=true]:bg-sidebar-accent',
        'data-[active=true]:text-sidebar-accent-foreground',
        size === 'sm' && 'text-xs',
        size === 'md' && 'text-sm',
        'group-data-[collapsible=icon]:hidden',
        className
      )}
      {...props}
    />
  );
}

export {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInput,
  SidebarInset,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSkeleton,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarRail,
  SidebarSeparator,
  SidebarTrigger,
  // eslint-disable-next-line react-refresh/only-export-components
  useSidebar,
};
