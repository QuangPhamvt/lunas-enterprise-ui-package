'use client';

import { createContext, memo, useCallback, useContext, useEffect, useMemo, useState } from 'react';

import { MenuIcon, PanelLeftIcon } from 'lucide-react';

import { useIsMobile } from '@customafk/react-toolkit/hooks/useMobile';
import { cn } from '@customafk/react-toolkit/utils';

import { Button } from '@/components/ui/button';
import { LunasLogo } from '@/components/features/logo';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Skeleton } from '@/components/ui/skeleton';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

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

function useSidebar() {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error('useSidebar must be used within a SidebarProvider.');
  }
  return context;
}

function CMSLayoutProvider({
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
      // biome-ignore lint/suspicious/noDocumentCookie: persists sidebar state across page loads
      document.cookie = `${SIDEBAR_COOKIE_NAME}=${openState}; path=/; max-age=${SIDEBAR_COOKIE_MAX_AGE}`;
    },
    [setOpenProp, open]
  );

  const toggleSidebar = useCallback(() => {
    return isMobile ? setOpenMobile(open => !open) : setOpen(open => !open);
  }, [isMobile, setOpen]);

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

  const contextValue = useMemo<SidebarContextProps>(
    () => ({ state, open, setOpen, isMobile, openMobile, setOpenMobile, toggleSidebar }),
    [state, open, setOpen, isMobile, openMobile, toggleSidebar]
  );

  return (
    <SidebarContext.Provider value={contextValue}>
      <TooltipProvider delayDuration={0}>
        <section
          data-slot="layout-wrapper"
          style={{ '--sidebar-width': SIDEBAR_WIDTH, '--sidebar-width-icon': SIDEBAR_WIDTH_ICON, ...style } as React.CSSProperties}
          className={cn('relative group/sidebar-wrapper flex h-dvh bg-sidebar', className)}
          {...props}
        >
          {children}
        </section>
      </TooltipProvider>
    </SidebarContext.Provider>
  );
}

const CMSLayoutSidebar = memo(
  ({
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
  }) => {
    const { isMobile, state, openMobile, setOpenMobile, toggleSidebar } = useSidebar();

    const handleToggleSidebar = useCallback<React.MouseEventHandler<HTMLButtonElement>>(
      event => {
        toggleSidebar();
        event.preventDefault();
        event.stopPropagation();
      },
      [toggleSidebar]
    );

    if (collapsible === 'none') {
      return (
        <aside data-slot="sidebar" className={cn('flex w-(--sidebar-width) flex-col bg-sidebar text-sidebar-foreground', className)} {...props}>
          {children}
        </aside>
      );
    }

    if (isMobile) {
      return (
        <Sheet open={openMobile} onOpenChange={setOpenMobile} {...props}>
          <SheetContent
            data-sidebar="sidebar"
            data-slot="sidebar"
            data-mobile="true"
            style={{ '--sidebar-width': SIDEBAR_WIDTH_MOBILE } as React.CSSProperties}
            side={side}
            className="w-(--sidebar-width) bg-sidebar p-0 text-sidebar-foreground sm:max-w-3xs [&>button]:hidden"
          >
            <SheetHeader className="sr-only">
              <SheetTitle>Sidebar</SheetTitle>
              <SheetDescription>Displays the mobile sidebar.</SheetDescription>
            </SheetHeader>
            <div className="flex size-full flex-col">
              <div className="flex flex-0 items-center gap-x-2 border-b border-border-weak p-2 pr-4">
                <Button
                  data-sidebar="trigger"
                  data-slot="sidebar-trigger"
                  variant="ghost"
                  color="muted"
                  size="icon"
                  className={cn('size-10 rounded-full', className)}
                  onClick={handleToggleSidebar}
                >
                  <MenuIcon className="size-6!" />
                  <span className="sr-only">Toggle Sidebar</span>
                </Button>
                <LunasLogo variant="horizontal" size="xs" className="ml-2" />
              </div>
              <div className="flex flex-1 flex-col p-2">{children}</div>
            </div>
          </SheetContent>
        </Sheet>
      );
    }

    return (
      <aside
        className="group peer hidden bg-card text-sidebar-foreground md:block"
        data-state={state}
        data-collapsible={state === 'collapsed' ? collapsible : ''}
        data-variant={variant}
        data-side={side}
        data-slot="sidebar"
      >
        <div
          data-slot="sidebar-gap"
          className={cn(
            'bg-transparent',
            'transition-[width] duration-200 ease-linear',
            'h-(--header-height) sm:h-[calc(var(--header-height)+0.5rem)]',
            'w-(--sidebar-width)',
            'group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)+(--spacing(4)))]'
          )}
        />
        <div
          data-slot="sidebar-container"
          className={cn(
            'hidden md:flex shadow-nav',
            'fixed left-0 inset-y-0 p-2',
            'top-[calc(var(--header-height)+0.5rem)] z-10',
            'w-(--sidebar-width)',
            'transition-all duration-200 ease-linear',
            'group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)+(--spacing(4)))]',
            className
          )}
          {...props}
        >
          <div data-sidebar="sidebar" data-slot="sidebar-inner" className="relative flex size-full flex-col">
            {children}
          </div>
        </div>
      </aside>
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
    <main data-slot="sidebar-inset" className={cn('relative flex w-full flex-1 flex-col', className)} {...props}>
      <div className="h-(--header-height) sm:h-[calc(var(--header-height)+0.5rem)]" />
      <div className="relative flex-1 size-full overflow-auto">{children}</div>
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
  const Comp = asChild ? Slot : 'div';

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
  const Comp = asChild ? Slot : 'button';

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

const SidebarMenu = memo(({ className, ...props }: React.ComponentProps<'ul'>) => {
  return <ul data-slot="sidebar-menu" data-sidebar="menu" className={cn('flex w-full min-w-0 flex-col gap-1', className)} {...props} />;
});
SidebarMenu.displayName = 'SidebarMenu';

const SidebarMenuItem = memo(({ className, ...props }: React.ComponentProps<'li'>) => {
  return <li data-slot="sidebar-menu-item" data-sidebar="menu-item" className={cn('group/menu-item relative', className)} {...props} />;
});
SidebarMenuItem.displayName = 'SidebarMenuItem';

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
    'data-[active=true]:bg-sidebar-primary-muted data-[active=true]:text-sidebar-primary',
    'data-[state=open]:hover:bg-sidebar-accent data-[state=open]:hover:text-sidebar-accent-foreground',
    'group-data-[collapsible=icon]:size-12! group-data-[collapsible=icon]:p-3! group-data-[collapsible=icon]:gap-3!',
    '[&>svg]:size-6 [&>svg]:shrink-0',
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

const SidebarMenuButton = memo(
  ({
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
    onClick?: () => void;
  } & VariantProps<typeof sidebarMenuButtonVariants>) => {
    const Comp = asChild ? Slot : 'button';
    const { isMobile, state } = useSidebar();

    const handleClick = useCallback<React.MouseEventHandler<HTMLButtonElement>>(
      event => {
        props.onClick?.();
        event.preventDefault();
        event.stopPropagation();
      },
      [props.onClick]
    );

    const button = (
      <Comp
        data-slot="sidebar-menu-button"
        data-sidebar="menu-button"
        data-size={size}
        data-active={isActive}
        className={cn(sidebarMenuButtonVariants({ variant, size }), className)}
        onClick={handleClick}
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
        <TooltipContent side="right" align="center" hidden={state !== 'collapsed' || isMobile} {...tooltip} />
      </Tooltip>
    );
  }
);
SidebarMenuButton.displayName = 'SidebarMenuButton';

function SidebarMenuAction({
  className,
  asChild = false,
  showOnHover = false,
  ...props
}: React.ComponentProps<'button'> & {
  asChild?: boolean;
  showOnHover?: boolean;
}) {
  const Comp = asChild ? Slot : 'button';

  return (
    <Comp
      data-slot="sidebar-menu-action"
      data-sidebar="menu-action"
      className={cn(
        'absolute top-1.5 right-1 flex aspect-square w-5 items-center justify-center rounded-md p-0 text-sidebar-foreground outline-hidden ring-sidebar-ring transition-[background-color,color,opacity] hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 peer-hover/menu-button:text-sidebar-accent-foreground [&>svg]:size-4 [&>svg]:shrink-0',
        // Increases the hit area of the button on mobile.
        'after:absolute after:-inset-2 md:after:hidden',
        'peer-data-[size=sm]/menu-button:top-1',
        'peer-data-[size=default]/menu-button:top-1.5',
        'peer-data-[size=lg]/menu-button:top-2.5',
        'group-data-[collapsible=icon]:hidden',
        showOnHover &&
          'group-focus-within/menu-item:opacity-100 group-hover/menu-item:opacity-100 data-[state=open]:opacity-100 peer-data-[active=true]/menu-button:text-sidebar-accent-foreground md:opacity-0',
        className
      )}
      {...props}
    />
  );
}

function SidebarMenuBadge({ className, ...props }: React.ComponentProps<'div'>) {
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

function SidebarMenuSkeleton({
  className,
  showIcon = false,
  ...props
}: React.ComponentProps<'div'> & {
  showIcon?: boolean;
}) {
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

function SidebarMenuSub({ className, ...props }: React.ComponentProps<'ul'>) {
  return (
    <ul
      data-slot="sidebar-menu-sub"
      data-sidebar="menu-sub"
      className={cn(
        'mx-3.5 flex min-w-0 translate-x-px flex-col gap-1 border-l border-sidebar-border px-2.5 py-0.5',
        'group-data-[collapsible=icon]:hidden',
        className
      )}
      {...props}
    />
  );
}

function SidebarMenuSubItem({ className, ...props }: React.ComponentProps<'li'>) {
  return <li data-slot="sidebar-menu-sub-item" data-sidebar="menu-sub-item" className={cn('group/menu-sub-item relative', className)} {...props} />;
}

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
  const Comp = asChild ? Slot : 'a';

  return (
    <Comp
      data-slot="sidebar-menu-sub-button"
      data-sidebar="menu-sub-button"
      data-size={size}
      data-active={isActive}
      className={cn(
        'flex h-7 min-w-0 -translate-x-px items-center gap-2 overflow-hidden rounded-md px-2 text-sidebar-foreground outline-hidden ring-sidebar-ring transition-[background-color,color] hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 active:bg-sidebar-accent active:text-sidebar-accent-foreground disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50 [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0 [&>svg]:text-sidebar-accent-foreground',
        'data-[active=true]:bg-sidebar-accent data-[active=true]:text-sidebar-accent-foreground',
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
  CMSLayoutSidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInput,
  CMSLayoutMain,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSkeleton,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  CMSLayoutProvider,
  SidebarRail,
  SidebarSeparator,
  SidebarTrigger,
  // biome-ignore lint/style/useComponentExportOnlyModules: true
  useSidebar,
};
