'use client';

import { useCallback } from 'react';

import { CalendarIcon, CatIcon, XIcon } from 'lucide-react';

import { cn } from '@customafk/react-toolkit/utils';
import { Dialog as DialogPrimitive } from 'radix-ui';

import { DateDisplay } from '@/components/data-display/date';
import { Flex } from '@/components/layouts/flex';
import { Title } from '@/components/typography/title';

import {
  DetailDialogSidebarContent,
  DetailDialogSidebarFooter,
  DetailDialogSidebarHeader,
  DetailDialogSidebarMenu,
  DetailDialogSidebarMenuButton,
  DetailDialogSidebarMenuItem,
  DetailDialogSidebarTrigger,
  Sidebar,
  SidebarProvider,
} from './components/sidebar';

type DetailDialogSidebar = {
  /** Title shown in the collapsible sidebar header. Defaults to `'Detail Dialog'`. */
  title?: string;
  /** Arbitrary content rendered inside the sidebar scrollable area. */
  content?: React.ReactNode;
  /** Arbitrary content rendered at the bottom of the sidebar footer. */
  footer?: React.ReactNode;
};

export type DetailDialogProps = {
  /** Controls whether the dialog is open. */
  open?: boolean;
  /** When `true`, replaces the main content area with a centered loading spinner. */
  isLoading?: boolean;
  /** Primary title displayed in the dialog header. */
  title: string;
  /** ISO string, `Date` object, or Unix timestamp shown as a formatted creation date below the title. */
  createdAt?: string | Date | number | null;
  /** Optional sidebar configuration — title, body content, and footer content. */
  sidebar?: DetailDialogSidebar;
  /** Callback invoked when the dialog open state changes. */
  onOpenChange?: (open: boolean) => void;
};

/**
 * Full-screen detail dialog with a collapsible sidebar, a header with creation date, and a scrollable content area.
 *
 * @example
 * ```tsx
 * import { DetailDialog } from '@customafk/lunas-ui/dialogs/detail-dialog';
 *
 * <DetailDialog
 *   open={open}
 *   title="Order #1234"
 *   createdAt="2024-01-15T09:00:00Z"
 *   sidebar={{ title: 'Navigation', content: <nav>...</nav> }}
 *   onOpenChange={setOpen}
 * >
 *   <p>Detail content goes here.</p>
 * </DetailDialog>
 * ```
 */
export const DetailDialog: React.FC<React.PropsWithChildren<DetailDialogProps>> = ({ open, isLoading, title, createdAt, onOpenChange, sidebar, children }) => {
  const { content: SidebarContent, footer: SidebarFooter } = sidebar || {};

  const handleInteractOutside = useCallback<NonNullable<React.ComponentProps<typeof DialogPrimitive.Content>['onInteractOutside']>>(event => {
    event.preventDefault();
    event.stopPropagation();
  }, []);

  return (
    <DialogPrimitive.Root data-slot="detail-dialog" open={open} onOpenChange={onOpenChange}>
      <DialogPrimitive.Portal data-slot="detail-dialog-portal">
        <DialogPrimitive.Overlay
          data-slot="detail-dialog-overlay"
          className="fixed inset-0 z-50 bg-black/50 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0"
        />
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <DialogPrimitive.Content
            data-slot="dialog-content"
            className={cn(
              'data-[state=open]:animate-in data-[state=closed]:animate-out',
              'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
              'data-[state=closed]:zoom-out-80 data-[state=open]:zoom-in-80',
              'relative z-50 grid',
              'gap-4 overflow-hidden rounded-none border-none bg-background p-0 shadow-dialog outline-none duration-200',
              'h-full max-h-dvh w-full max-w-svw',
              'sm:rounded-lg',
              'sm:max-w-lg',
              'md:max-h-[calc(100dvh-2rem)]',
              'md:max-w-[calc(100svw-2rem)]'
            )}
            onInteractOutside={handleInteractOutside}
          >
            <SidebarProvider>
              <Sidebar collapsible="icon">
                <DetailDialogSidebarHeader>
                  <DetailDialogSidebarMenu>
                    <DetailDialogSidebarMenuItem>
                      <DetailDialogSidebarMenuButton size="lg" tabIndex={-1}>
                        <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                          <CatIcon size={16} />
                        </div>
                        <div className="grid flex-1 text-left text-sm leading-tight">
                          <span className="truncate font-medium">{sidebar?.title || 'Detail Dialog'}</span>
                          <span className="truncate text-xs">Lunas Enterprise</span>
                        </div>
                      </DetailDialogSidebarMenuButton>
                    </DetailDialogSidebarMenuItem>
                  </DetailDialogSidebarMenu>
                </DetailDialogSidebarHeader>
                <DetailDialogSidebarContent>{SidebarContent}</DetailDialogSidebarContent>
                <DetailDialogSidebarFooter>{SidebarFooter}</DetailDialogSidebarFooter>
              </Sidebar>

              <main data-slot="detail-dialog-main" className="relative h-full flex-1">
                <Flex padding="none" gap="none" vertical align="stretch" className="absolute inset-0 size-full">
                  <header className="flex w-full flex-0 items-start gap-x-2.5 border-b border-border-weak bg-card py-2.5 pr-12 pl-2">
                    <DetailDialogSidebarTrigger />
                    <Flex vertical align="start" padding="none" width="null" wrap={false} className="flex-1 gap-0">
                      <Title level={5} className="line-clamp-1 truncate text-wrap">
                        {title || 'Detail Dialog'}
                      </Title>
                      {!!createdAt && (
                        <Flex padding="none" className="relative items-center text-text-positive-weak">
                          <CalendarIcon size={12} />
                          <DateDisplay showTime showHoliday date={createdAt} format="full" />
                        </Flex>
                      )}
                    </Flex>
                  </header>
                  {isLoading ? (
                    <Flex justify="center" className="inset-shadow-sm w-full flex-1 bg-muted-muted">
                      <div className="loader" />
                    </Flex>
                  ) : (
                    <section data-slot="detail-dialog-body" className="relative inset-shadow-sm flex flex-1 snap-y flex-col gap-0 overflow-y-auto bg-card">
                      {children}
                    </section>
                  )}
                </Flex>
              </main>
            </SidebarProvider>

            <DialogPrimitive.Close data-slot="dialog-close" tabIndex={-1} asChild className="absolute top-3 right-3">
              <button className="flex cursor-pointer items-center justify-center rounded-full p-2 text-text-positive-weak transition-colors hover:bg-muted-muted hover:text-text-positive active:bg-muted-weak active:text-text-positive-strong disabled:pointer-events-none disabled:opacity-60">
                <XIcon size={24} />
              </button>
            </DialogPrimitive.Close>
          </DialogPrimitive.Content>
        </div>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
};
