import { CalendarIcon, CatIcon, XIcon } from 'lucide-react';

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

export const DetailDialog: React.FC<
  React.PropsWithChildren<{
    open?: boolean;
    isLoading?: boolean;

    title: string;
    createdAt?: string | Date | number | null;

    sidebar?: {
      title?: string;
      content?: React.ReactNode;
      footer?: React.ReactNode;
    };

    onOpenChange?: (open: boolean) => void;
  }>
> = ({ open, isLoading, title, createdAt, onOpenChange, sidebar, children }) => {
  const { content: SidebarContent, footer: SidebarFooter } = sidebar || {};
  return (
    <DialogPrimitive.Root data-slot="detail-dialog" open={open} onOpenChange={onOpenChange}>
      <DialogPrimitive.Portal data-slot="detail-dialog-portal">
        <DialogPrimitive.Overlay
          data-slot="detail-dialog-overlay"
          className="data-[state=open]:fade-in-0 data-[state=closed]:fade-out-0 fixed inset-0 z-50 bg-black/50 data-[state=closed]:animate-out data-[state=open]:animate-in"
        />
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <DialogPrimitive.Content
            data-slot="dialog-content"
            className="data-[state=open]:fade-in-0 data-[state=open]:zoom-in-80 data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-80 relative z-50 grid h-full max-h-dvh w-full max-w-svw gap-4 overflow-hidden rounded-none border-none bg-background p-0 shadow-dialog outline-none duration-200 data-[state=closed]:animate-out data-[state=open]:animate-in sm:max-w-lg md:max-h-[90dvh] md:max-w-[90svw] md:rounded-lg xl:max-h-[90dvh] xl:max-w-[90svw] 2xl:max-h-[90dvh] 2xl:max-w-[90svw]"
            onInteractOutside={e => {
              e.preventDefault();
              e.stopPropagation();
            }}
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
                  <header className="flex w-full flex-0 items-start gap-x-2.5 border-border-weak border-b bg-card py-2.5 pr-12 pl-2">
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
                    <section
                      data-slot="detail-dialog-body-loading"
                      className="relative inset-shadow-sm flex flex-1 snap-y flex-col gap-0 overflow-y-auto bg-muted-bg-subtle"
                    >
                      {children}
                    </section>
                  )}
                </Flex>
              </main>
            </SidebarProvider>

            <DialogPrimitive.Close data-slot="dialog-close" tabIndex={-1} asChild className="absolute top-3 right-3">
              <button className="flex cursor-pointer items-center justify-center rounded-[100px] p-2 text-text-positive-weak transition-colors hover:bg-muted-muted hover:text-text-positive active:bg-muted-weak active:text-text-positive-strong disabled:pointer-events-none disabled:opacity-60">
                <XIcon size={24} />
              </button>
            </DialogPrimitive.Close>
          </DialogPrimitive.Content>
        </div>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
};
