'use client'
import { ShoppingCartIcon } from 'lucide-react'

import { cn } from '@/lib/utils'

import { Sidebar, AppLayoutSidebarInset, SidebarProvider, AppLayoutSidebarTrigger } from './sidebar'

export * from './sidebar'

export const AppLayoutWrapper: React.FC<React.PropsWithChildren> = ({ children }) => {
  return <SidebarProvider>{children}</SidebarProvider>
}

export const AppLayoutHeader: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <header
      className={cn(
        'bg-card',
        'h-(--header-height)',
        'absolute inset-x-0 top-0 z-20 gap-2 px-4',
        'shadow-nav flex items-center',
        'transition-[width,height] ease-linear',
        'group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)',
      )}
    >
      <AppLayoutSidebarTrigger />

      <div className="ml-2.5 flex gap-x-2">
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
  )
}

export const AppLayoutSidebar: React.FC<React.PropsWithChildren & React.ComponentProps<typeof Sidebar>> = ({ children, ...props }) => {
  return (
    <Sidebar variant="inset" collapsible="icon" {...props}>
      {children}
    </Sidebar>
  )
}

export const AppLayoutMain: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <AppLayoutSidebarInset>
      <section className="relative size-full">
        <div className="absolute inset-0">{children}</div>
      </section>
    </AppLayoutSidebarInset>
  )
}

export const AppLayoutMainGroup: React.FC<React.PropsWithChildren<{ className?: string }>> = ({ children, className }) => {
  return (
    <div data-slot="main-group" className={cn('flex size-full snap-y flex-col gap-4 overflow-y-auto p-4', className)}>
      {children}
    </div>
  )
}

export const AppLayoutMainGroupContent: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <div data-slot="main-group-content" className="bg-card shadow-card size-full snap-start snap-always scroll-mt-4 rounded-md p-4">
      {children}
    </div>
  )
}
