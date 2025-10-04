'use client';
import { cn } from '@customafk/react-toolkit/utils';

import { ShoppingCartIcon } from 'lucide-react';

import { AppLayoutSidebarInset, AppLayoutSidebarTrigger, Sidebar, SidebarProvider } from './sidebar';

// eslint-disable-next-line react-refresh/only-export-components
export * from './sidebar';

export const AppLayoutWrapper: React.FC<React.PropsWithChildren> = ({ children }) => {
  return <SidebarProvider>{children}</SidebarProvider>;
};

export const AppLayoutHeader: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <header
      className={cn(
        'bg-card',
        'h-(--header-height)',
        'sm:h-[calc(var(--header-height)_+_0.5rem)]',
        'sm:px-4 sm:pr-6',
        'absolute inset-x-0 top-0 z-20 gap-2 px-2 pr-4.5',
        'shadow-nav flex items-center',
        'transition-[width,height] ease-linear',
        'group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)',
        'sm:group-has-data-[collapsible=icon]/sidebar-wrapper:h-[calc(var(--header-height)_+_0.5rem)]'
      )}
    >
      <AppLayoutSidebarTrigger />

      <div className="flex gap-x-2 sm:ml-2.5">
        <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
          <ShoppingCartIcon size={20} />
        </div>
        <div className="grid flex-1 text-left text-sm leading-tight">
          <span className="truncate font-medium">Lunas Store</span>
          <span className="truncate text-xs">Established 2023</span>
        </div>
      </div>

      <div className="flex flex-1 items-center justify-end">{children}</div>
    </header>
  );
};

export const AppLayoutSidebar: React.FC<React.PropsWithChildren & React.ComponentProps<typeof Sidebar>> = ({ children, ...props }) => {
  return (
    <Sidebar variant="inset" collapsible="icon" {...props}>
      {children}
    </Sidebar>
  );
};

export const AppLayoutMain: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <AppLayoutSidebarInset>
      <section className="relative size-full">
        <div className="absolute inset-0 flex flex-col">{children}</div>
      </section>
    </AppLayoutSidebarInset>
  );
};
export const AppLayoutMainHeader: React.FC<React.PropsWithChildren & { className?: string }> = ({ className, children }) => {
  return (
    <div data-slot="main-header" className={cn('flex-0 snap-start', className)}>
      {children}
    </div>
  );
};

export const AppLayoutMainContent: React.FC<React.PropsWithChildren & { className?: string }> = ({ className, children }) => {
  return (
    <div data-slot="main-content" className={cn('flex w-full flex-1 snap-y flex-col gap-4 overflow-y-auto px-2 sm:px-4', className)}>
      {children}
    </div>
  );
};

export const AppLayoutMainFooter: React.FC<React.PropsWithChildren & { className?: string }> = ({ className, children }) => {
  return (
    <div data-slot="main-footer" className={cn('border-border-weak hidden w-full flex-0 border-t pt-2 sm:flex', className)}>
      {children}
    </div>
  );
};

export const AppLayoutMainGroup: React.FC<React.PropsWithChildren<{ className?: string }>> = ({ children, className }) => {
  return (
    <div data-slot="main-group" className={cn('flex size-full flex-col gap-4', className)}>
      {children}
    </div>
  );
};

export const AppLayoutMainGroupContent: React.FC<React.PropsWithChildren & { className?: string }> = ({ className, children }) => {
  return (
    <div
      data-slot="main-group-content"
      className={cn('bg-card shadow-card size-full max-w-5xl flex-1 snap-start snap-always scroll-mt-4 rounded-md p-4', className)}
    >
      {children}
    </div>
  );
};
