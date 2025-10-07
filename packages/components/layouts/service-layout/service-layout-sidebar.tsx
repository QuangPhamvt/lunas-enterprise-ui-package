import { useCallback, useEffect, useMemo, useState } from 'react';

import { LogOutIcon, MenuIcon, ShoppingCartIcon } from 'lucide-react';

import { useIsMobile } from '@customafk/react-toolkit/hooks/useMobile';
import { cn } from '@customafk/react-toolkit/utils';

import { cva, type VariantProps } from 'class-variance-authority';
import { Slot as SlotPrimitive } from 'radix-ui';
import { Button } from '@/components/ui/button';
import { Drawer, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle } from '@/components/ui/drawer';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { useServiceLayout } from './hooks/use-service-layout';
import { SidebarContext, type SidebarContextProps, useServiceLayoutSidebar } from './hooks/use-service-layout-sidebar';

const SIDEBAR_COOKIE_NAME = 'sidebar_state';
const SIDEBAR_COOKIE_MAX_AGE = 60 * 60 * 24 * 7;
const SIDEBAR_WIDTH = '16rem';
const SIDEBAR_WIDTH_MOBILE = '16rem';
const SIDEBAR_WIDTH_ICON = '3rem';
const SIDEBAR_KEYBOARD_SHORTCUT = 'b';

function ServiceLayoutSidebarProvider({
  defaultOpen = true,
  open: openProp,
  onOpenChange: setOpenProp,
  className,
  style,
  children,
  ...props
}: React.ComponentProps<'div'> & {
  defaultOpen?: boolean;
  open?: boolean;
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
      // biome-ignore lint/suspicious/noDocumentCookie: all
      document.cookie = `${SIDEBAR_COOKIE_NAME}=${openState}; path=/; max-age=${SIDEBAR_COOKIE_MAX_AGE}`;
    },
    [setOpenProp, open]
  );

  // Helper to toggle the sidebar.
  const toggleSidebar = useCallback(() => {
    return isMobile ? setOpenMobile(open => !open) : setOpen(open => !open);
  }, [isMobile, setOpen]);

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
    [state, open, setOpen, isMobile, openMobile, toggleSidebar]
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

function ServiceLayoutSidebar({
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
  const { isMobile, state, openMobile, setOpenMobile } = useServiceLayoutSidebar();

  if (collapsible === 'none') {
    return (
      <aside data-slot="sidebar" className={cn('bg-sidebar', 'text-sidebar-foreground', 'flex h-full w-(--sidebar-width) flex-col', className)} {...props}>
        {children}
      </aside>
    );
  }

  if (isMobile) {
    return (
      <Drawer direction="left" open={openMobile} onOpenChange={setOpenMobile}>
        <DrawerContent
          data-sidebar="sidebar"
          data-slot="sidebar"
          data-mobile="true"
          className="bg-sidebar text-sidebar-foreground w-(--sidebar-width) p-0 data-[vaul-drawer-direction=left]:w-3xs data-[vaul-drawer-direction=left]:sm:max-w-3xs [&>button]:hidden"
          style={
            {
              '--sidebar-width': SIDEBAR_WIDTH_MOBILE,
            } as React.CSSProperties
          }
        >
          <DrawerHeader className="sr-only">
            <DrawerTitle>Sidebar</DrawerTitle>
            <DrawerDescription>Displays the mobile sidebar.</DrawerDescription>
          </DrawerHeader>
          <div className="flex size-full flex-col">
            <div className="border-border-weak flex flex-0 items-center gap-x-2 border-b p-2 pr-4">
              <ServiceLayoutSidebarTrigger />
              <div className="bg-sidebar-primary text-sidebar-primary-foreground ml-2 flex aspect-square size-8 items-center justify-center rounded-lg">
                <ShoppingCartIcon size={20} />
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">Lunas Store</span>
                <span className="truncate text-xs">Established 2023</span>
              </div>
            </div>
            <div className="flex flex-1 flex-col p-2">{children}</div>
          </div>
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
          'h-(--header-height) w-(--sidebar-width)',
          'sm:h-[calc(var(--header-height) + 0.5rem)]',
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
          'shadow-nav fixed inset-y-0 top-14 z-10',
          'h-[calc(100dvh-3.5rem)] w-(--sidebar-width)',
          'transition-[left,right,width] duration-200 ease-linear',
          side === 'left' && 'left-0 group-data-[collapsible=offcanvas]:left-[calc(var(--sidebar-width)*-1)]',
          side === 'right' && 'right-0 group-data-[collapsible=offcanvas]:right-[calc(var(--sidebar-width)*-1)]',
          // Adjust the padding for floating and inset variants.
          variant === 'floating' || variant === 'inset'
            ? 'p-2 group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)+(--spacing(4)))]'
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

function ServiceLayoutSidebarTrigger({ className, onClick, ...props }: React.ComponentProps<typeof Button>) {
  const { toggleSidebar } = useServiceLayoutSidebar();

  return (
    <Button
      data-sidebar="trigger"
      data-slot="sidebar-trigger"
      variant="ghost"
      color="muted"
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

function ServiceLayoutSidebarRail({ className, ...props }: React.ComponentProps<'button'>) {
  const { toggleSidebar } = useServiceLayoutSidebar();

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
        'after:absolute after:inset-y-0 after:left-1/2 after:w-[2px]',
        'group-data-[side=left]:-right-4',
        'group-data-[side=right]:left-0',
        'in-data-[side=left]:cursor-w-resize',
        'in-data-[side=right]:cursor-e-resize',
        'hover:after:bg-sidebar-border',
        'hover:group-data-[collapsible=offcanvas]:bg-sidebar',
        'group-data-[collapsible=offcanvas]:translate-x-0',
        'group-data-[collapsible=offcanvas]:after:left-full',
        '[[data-side=left][data-state=collapsed]_&]:cursor-e-resize',
        '[[data-side=right][data-state=collapsed]_&]:cursor-w-resize',
        '[[data-side=left][data-collapsible=offcanvas]_&]:-right-2',
        '[[data-side=right][data-collapsible=offcanvas]_&]:-left-2',
        className
      )}
      {...props}
    />
  );
}

function ServiceLayoutSidebarInset({ className, children, ...props }: React.ComponentProps<'main'>) {
  return (
    <main data-slot="sidebar-inset" className={cn('relative flex w-full flex-1 flex-col', className)} {...props}>
      <div className="h-(--header-height) w-full sm:h-[calc(var(--header-height)_+_0.5rem)]" />
      <div className={cn('flex-1 inset-shadow-sm')}>{children}</div>
    </main>
  );
}

function ServiceLayoutSidebarHeader({ className, ...props }: React.ComponentProps<'div'>) {
  return <div data-slot="sidebar-header" data-sidebar="header" className={cn('flex flex-col gap-2 p-2', className)} {...props} />;
}

function ServiceLayoutSidebarFooter({ className, children, ...props }: React.ComponentProps<'div'>) {
  const { open } = useServiceLayoutSidebar();
  const { onLogout } = useServiceLayout();
  return (
    <div data-slot="sidebar-footer" data-sidebar="footer" className={cn('flex flex-col gap-2', className)} {...props}>
      {children}
      <ServiceLayoutSidebarMenu>
        <ServiceLayoutSidebarMenuItem>
          <ServiceLayoutSidebarMenuButton className="border-border border" onClick={onLogout}>
            <LogOutIcon className="text-text-positive-weak" />
            Đăng xuất
          </ServiceLayoutSidebarMenuButton>
        </ServiceLayoutSidebarMenuItem>
        {open && (
          <ServiceLayoutSidebarMenuItem className="border-t-border mt-2 border-t">
            <p className="text-muted-foreground pt-2 text-center text-xs">Copyright © 2025, Lunas.</p>
          </ServiceLayoutSidebarMenuItem>
        )}
      </ServiceLayoutSidebarMenu>
    </div>
  );
}

function ServiceLayoutSidebarSeparator({ className, ...props }: React.ComponentProps<typeof Separator>) {
  return <Separator data-slot="sidebar-separator" data-sidebar="separator" className={cn('bg-sidebar-border mx-2 w-auto', className)} {...props} />;
}

function ServiceLayoutSidebarContent({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="sidebar-content"
      data-sidebar="content"
      className={cn('flex min-h-0 flex-1 flex-col gap-2 overflow-auto group-data-[collapsible=icon]:overflow-hidden', className)}
      {...props}
    />
  );
}

function ServiceLayoutSidebarGroup({ className, ...props }: React.ComponentProps<'div'>) {
  return <div data-slot="sidebar-group" data-sidebar="group" className={cn('relative flex w-full min-w-0 flex-col', className)} {...props} />;
}

function ServiceLayoutSidebarGroupLabel({ className, asChild = false, ...props }: React.ComponentProps<'div'> & { asChild?: boolean }) {
  const Comp = asChild ? SlotPrimitive.Slot : 'div';

  return (
    <Comp
      data-slot="sidebar-group-label"
      data-sidebar="group-label"
      className={cn(
        'flex h-8 shrink-0 items-center rounded-md px-2 text-xs font-medium outline-hidden transition-[margin,opacity] duration-200 ease-linear focus-visible:ring-2',
        'text-sidebar-foreground/70',
        'ring-sidebar-ring',
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

function ServiceLayoutSidebarGroupAction({ className, asChild = false, ...props }: React.ComponentProps<'button'> & { asChild?: boolean }) {
  const Comp = asChild ? SlotPrimitive.Slot : 'button';

  return (
    <Comp
      data-slot="sidebar-group-action"
      data-sidebar="group-action"
      className={cn(
        'text-sidebar-foreground ring-sidebar-ring hover:bg-sidebar-accent hover:text-sidebar-accent-foreground absolute top-3.5 right-3 flex aspect-square w-5 items-center justify-center rounded-md p-0 outline-hidden transition-transform',
        'focus-visible:ring-2',
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

function ServiceLayoutSidebarGroupContent({ className, ...props }: React.ComponentProps<'div'>) {
  return <div data-slot="sidebar-group-content" data-sidebar="group-content" className={cn('w-full text-sm', className)} {...props} />;
}

function ServiceLayoutSidebarMenu({ className, ...props }: React.ComponentProps<'ul'>) {
  return <ul data-slot="sidebar-menu" data-sidebar="menu" className={cn('flex w-full min-w-0 flex-col gap-1', className)} {...props} />;
}

function ServiceLayoutSidebarMenuItem({ className, ...props }: React.ComponentProps<'li'>) {
  return <li data-slot="sidebar-menu-item" data-sidebar="menu-item" className={cn('group/menu-item relative', className)} {...props} />;
}

const sidebarMenuButtonVariants = cva(
  [
    'peer/menu-button',
    'cursor-pointer',
    'flex w-full items-center gap-2',
    'overflow-hidden rounded-md p-2 outline-hidden',
    'text-left truncate',
    'transition-[color,width,height,padding]',
    'hover:bg-sidebar-accent',
    'hover:text-sidebar-accent-foreground',
    'active:bg-sidebar-accent',
    'active:text-sidebar-accent-foreground',
    'disabled:pointer-events-none',
    'disabled:opacity-50',
    'group-has-data-[sidebar=menu-action]/menu-item:pr-8',
    'aria-disabled:pointer-events-none',
    'aria-disabled:opacity-50',
    'data-[active=true]:bg-sidebar-primary-muted',
    'data-[active=true]:font-medium',
    'data-[active=true]:text-sidebar-primary',
    'data-[state=open]:hover:bg-sidebar-accent',
    'data-[state=open]:hover:text-sidebar-accent-foreground',
    'group-data-[collapsible=icon]:size-12!',
    'group-data-[collapsible=icon]:p-3!',
    'group-data-[collapsible=icon]:gap-3!',
    '[&>svg]:size-6',
    '[&>svg]:shrink-0',
    '[&>span:last-child]:truncate',
  ],
  {
    variants: {
      variant: {
        default: 'hover:bg-sidebar-accent/60 hover:text-sidebar-accent-foreground/80',
        outline:
          'bg-background shadow-[0_0_0_1px_hsl(var(--sidebar-border))] hover:bg-sidebar-accent hover:text-sidebar-accent-foreground hover:shadow-[0_0_0_1px_hsl(var(--sidebar-accent))]',
      },
      size: {
        default: 'h-10 text-sm',
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

function ServiceLayoutSidebarMenuButton({
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
  const { isMobile, state } = useServiceLayoutSidebar();

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

function ServiceLayoutSidebarMenuAction({
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

function ServiceLayoutSidebarMenuBadge({ className, ...props }: React.ComponentProps<'div'>) {
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

function ServiceLayoutSidebarMenuSkeleton({
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

function ServiceLayoutSidebarMenuSub({ className, ...props }: React.ComponentProps<'ul'>) {
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

function ServiceLayoutSidebarMenuSubItem({ className, ...props }: React.ComponentProps<'li'>) {
  return <li data-slot="sidebar-menu-sub-item" data-sidebar="menu-sub-item" className={cn('group/menu-sub-item relative', className)} {...props} />;
}

function ServiceLayoutSidebarMenuSubButton({
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
        'text-sidebar-foreground',
        'ring-sidebar-ring',
        'flex h-7 min-w-0 -translate-x-px items-center gap-2 overflow-hidden rounded-md px-2 outline-hidden',
        'focus-visible:ring-2',
        'hover:bg-sidebar-accent',
        'hover:text-sidebar-accent-foreground',
        'active:bg-sidebar-accent',
        'active:text-sidebar-accent-foreground',
        'disabled:pointer-events-none',
        'disabled:opacity-50',
        'aria-disabled:pointer-events-none',
        'aria-disabled:opacity-50',
        '[&>svg]:size-4',
        '[&>svg]:shrink-0',
        '[&>svg]:text-sidebar-accent-foreground',
        '[&>span:last-child]:truncate',
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
  ServiceLayoutSidebar,
  ServiceLayoutSidebarContent,
  ServiceLayoutSidebarFooter,
  ServiceLayoutSidebarGroup,
  ServiceLayoutSidebarGroupAction,
  ServiceLayoutSidebarGroupContent,
  ServiceLayoutSidebarGroupLabel,
  ServiceLayoutSidebarHeader,
  ServiceLayoutSidebarInset,
  ServiceLayoutSidebarMenu,
  ServiceLayoutSidebarMenuAction,
  ServiceLayoutSidebarMenuBadge,
  ServiceLayoutSidebarMenuButton,
  ServiceLayoutSidebarMenuItem,
  ServiceLayoutSidebarMenuSkeleton,
  ServiceLayoutSidebarMenuSub,
  ServiceLayoutSidebarMenuSubButton,
  ServiceLayoutSidebarMenuSubItem,
  ServiceLayoutSidebarProvider,
  ServiceLayoutSidebarRail,
  ServiceLayoutSidebarSeparator,
  ServiceLayoutSidebarTrigger,
  // eslint-disable-next-line react-refresh/only-export-components
  useServiceLayoutSidebar,
};
