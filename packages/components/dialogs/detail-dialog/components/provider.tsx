'use client';

import { cn } from '@customafk/react-toolkit/utils';

import { TooltipProvider } from '@/components/ui/tooltip';

import { SIDEBAR_WIDTH, SIDEBAR_WIDTH_ICON, SidebarContext, useSidebarState } from './sidebar-core';

/**
 * Context provider for `DetailDialog`'s sidebar/header/content grid shell. Manages sidebar
 * open/collapsed state (persisted via a cookie, shared with `SidebarProvider` via
 * `useSidebarState`) and renders the 2x2 grid wrapper — sidebar spanning both rows in column 1,
 * header/content in column 2. DetailDialog-specific, not a standalone-reusable provider like
 * `./sidebar-core`'s `SidebarProvider`.
 */
export function DetailDialogProvider({
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
          data-slot="detail-dialog-wrapper"
          style={{ '--sidebar-width': SIDEBAR_WIDTH, '--sidebar-width-icon': SIDEBAR_WIDTH_ICON, ...style } as React.CSSProperties}
          className={cn('group/sidebar-wrapper size-full min-h-[85dvh]', 'grid grid-cols-[auto_1fr] grid-rows-[auto_1fr]', className)}
          {...props}
        >
          {children}
        </div>
      </TooltipProvider>
    </SidebarContext.Provider>
  );
}
