'use client'
import { createContext, useContext, useState } from 'react'
import { useMediaQuery } from '@customafk/react-toolkit/hooks/useMediaQuery'
import { cn } from '@customafk/react-toolkit/utils'

import { LogInIcon, LogOutIcon, ShoppingCartIcon, UserIcon } from 'lucide-react'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Drawer, DrawerContent, DrawerFooter, DrawerHeader, DrawerTitle } from '@/components/ui/drawer'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Separator } from '@/components/ui/separator'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { type CredentialResponse, GoogleLogin } from '@react-oauth/google'

import {
  ServiceLayoutSidebar as LayoutSidebar,
  ServiceLayoutSidebarInset,
  ServiceLayoutSidebarProvider,
  ServiceLayoutSidebarTrigger,
} from './service-layout-sidebar'

type ServiceLayoutContextProps = {
  isLoggedIn?: boolean
  username?: string
  email?: string
  onGoogleLoginSuccess?: (params: CredentialResponse) => void | Promise<void>
  onLogout?: () => void | Promise<void>
}
const ServiceLayoutContext = createContext<ServiceLayoutContextProps | null>(null)

// eslint-disable-next-line react-refresh/only-export-components
export const useServiceLayout = () => {
  const context = useContext(ServiceLayoutContext)
  if (!context) {
    throw new Error('useServiceLayoutContext must be used within a ServiceLayoutProvider')
  }
  return context
}

export const ServiceLayoutProvider: React.FC<React.PropsWithChildren<ServiceLayoutContextProps>> = ({
  isLoggedIn = false,
  username,
  email,
  onGoogleLoginSuccess,
  onLogout,
  children,
}) => {
  return <ServiceLayoutContext.Provider value={{ isLoggedIn, username, email, onGoogleLoginSuccess, onLogout }}>{children}</ServiceLayoutContext.Provider>
}

export const ServiceLayoutWrapper: React.FC<React.PropsWithChildren> = ({ children }) => {
  return <ServiceLayoutSidebarProvider>{children}</ServiceLayoutSidebarProvider>
}

type ServiceLayoutUserInfoProps = {
  userName?: string
  userEmail?: string
  onLogout?: () => void | Promise<void>
}
export const ServiceLayoutUserInfo: React.FC<ServiceLayoutUserInfoProps> = ({ userName = 'Keith Kennedy', userEmail = 'k.kennedy@originui.com', onLogout }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size="icon" variant="ghost" color="secondary" className="size-10 rounded-full">
          <Avatar className="size-10">
            <AvatarImage src={''} alt={''} />
            <AvatarFallback className="bg-muted-muted size-full">
              <UserIcon />
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="max-w-64">
        <DropdownMenuLabel className="flex min-w-0 flex-col">
          <span className="text-text-positive truncate text-sm font-medium">{userName}</span>
          <span className="text-text-positive-weak truncate text-xs font-normal">{userEmail}</span>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={onLogout}>
          <LogOutIcon size={16} aria-hidden="true" />
          <span className="text-text-positive">Logout</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export const ServiceLayoutCartInfo: React.FC = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button size="icon" variant="ghost" color="secondary" className="size-10 rounded-full">
          <ShoppingCartIcon />
        </Button>
      </SheetTrigger>
      <SheetContent className="w-svw">
        <SheetHeader className="border-border-weak border-b">
          <SheetTitle>Giỏ hàng của bạn</SheetTitle>
        </SheetHeader>
        <section className="p-4 pt-0">
          <Tabs defaultValue="pre_order">
            <TabsList className="w-full">
              <TabsTrigger value="in_stock" className="">
                In Stock
              </TabsTrigger>
              <TabsTrigger value="pre_order" className="">
                Pre Order
              </TabsTrigger>
            </TabsList>
            <TabsContent value="pre_order">
              <Card></Card>
            </TabsContent>
            <TabsContent value="in_stock">
              <Card></Card>
            </TabsContent>
          </Tabs>
        </section>
      </SheetContent>
    </Sheet>
  )
}

type ServiceLayoutHeaderProps = {
  isLoggedIn?: boolean
}
export const ServiceLayoutHeader: React.FC<ServiceLayoutHeaderProps> = () => {
  const { isLoggedIn, username, email, onGoogleLoginSuccess, onLogout } = useServiceLayout()

  const isDesktop = useMediaQuery('(min-width: 640px)')

  const [loginOpen, setLoginOpen] = useState<boolean>(false)

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
      )}
    >
      <ServiceLayoutSidebarTrigger />

      <div className="flex gap-x-2 sm:ml-2.5">
        <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
          <ShoppingCartIcon size={20} />
        </div>
        <div className="grid flex-1 text-left text-sm leading-tight">
          <span className="truncate font-medium">Lunas Store</span>
          <span className="truncate text-xs">Established 2023</span>
        </div>
      </div>

      <div className="flex flex-1 items-center justify-end gap-x-2">
        {!isLoggedIn && (
          <Button className="w-8 sm:w-fit" onClick={() => setLoginOpen(true)}>
            <LogInIcon />
            <span className="sr-only sm:not-sr-only">Đăng nhập</span>
          </Button>
        )}
        {isLoggedIn && (
          <>
            <ServiceLayoutUserInfo userName={username} userEmail={email} onLogout={onLogout} />
            <Separator orientation="vertical" className="min-h-6 w-px" />
            <ServiceLayoutCartInfo />
          </>
        )}
      </div>

      {isDesktop && (
        <Dialog open={loginOpen} onOpenChange={setLoginOpen}>
          <DialogContent showCloseButton={false} className="flex flex-col gap-0 border-none p-0 sm:max-w-sm">
            <DialogHeader className="flex-0 gap-2 p-6">
              <DialogTitle className="text-center">Chào mừng bạn đến với Lunas Store!</DialogTitle>
            </DialogHeader>
            <div className="flex flex-1 flex-col">
              <main className="bg-card size-full flex-1 p-4 pt-0">
                <div className="flex flex-col items-center gap-y-1">
                  <p className="text-text-positive-weak text-sm">Đăng nhập với Google</p>
                  <GoogleLogin
                    size="large"
                    theme="outline"
                    width={240}
                    onSuccess={async (response) => {
                      if (!response.clientId || !response.credential || !response.select_by) return
                      await onGoogleLoginSuccess?.({
                        clientId: response.clientId,
                        credential: response.credential,
                        select_by: response.select_by,
                      })
                    }}
                  />
                </div>
              </main>
            </div>
            <DialogFooter className="p-2" />
          </DialogContent>
        </Dialog>
      )}

      {!isDesktop && (
        <Drawer open={loginOpen} onOpenChange={setLoginOpen}>
          <DrawerContent>
            <DrawerHeader className="text-left">
              <DrawerTitle>Chào mừng bạn đến với Lunas Store!</DrawerTitle>
            </DrawerHeader>
            <div className="flex flex-1 flex-col">
              <main className="flex size-full flex-1 flex-col p-4 pt-0">
                <div className="flex flex-col items-center gap-y-1">
                  <p className="text-text-positive-weak text-sm">Đăng nhập với Google</p>
                  <GoogleLogin
                    size="large"
                    theme="outline"
                    onSuccess={async (response) => {
                      if (!response.clientId || !response.credential || !response.select_by) return
                      await onGoogleLoginSuccess?.({
                        clientId: response.clientId,
                        credential: response.credential,
                        select_by: response.select_by,
                      })
                    }}
                  />
                </div>
              </main>
            </div>
            <DrawerFooter />
          </DrawerContent>
        </Drawer>
      )}
    </header>
  )
}

export const ServiceLayoutSidebar: React.FC<React.PropsWithChildren & React.ComponentProps<typeof LayoutSidebar>> = ({ children, ...props }) => {
  return (
    <LayoutSidebar variant="inset" collapsible="icon" {...props}>
      {children}
    </LayoutSidebar>
  )
}

export const ServiceLayoutMain: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <ServiceLayoutSidebarInset>
      <section className="relative size-full">
        <div className="absolute inset-0 flex flex-col">{children}</div>
      </section>
    </ServiceLayoutSidebarInset>
  )
}
export const ServiceLayoutMainHeader: React.FC<React.PropsWithChildren & { className?: string }> = ({ className, children }) => {
  return (
    <div data-slot="main-header" className={cn('flex-0 snap-start', className)}>
      {children}
    </div>
  )
}

export const ServiceLayoutMainContent: React.FC<React.PropsWithChildren & { className?: string }> = ({ className, children }) => {
  return (
    <div data-slot="main-content" className={cn('flex w-full flex-1 flex-col gap-4 overflow-y-auto px-2 sm:px-4', className)}>
      {children}
    </div>
  )
}

export const ServiceLayoutMainFooter: React.FC<React.PropsWithChildren & { className?: string }> = ({ className, children }) => {
  return (
    <div data-slot="main-footer" className={cn('border-border-weak hidden w-full flex-0 border-t pt-2 sm:flex', className)}>
      {children}
    </div>
  )
}

export const ServiceLayoutMainGroup: React.FC<React.PropsWithChildren<{ className?: string }>> = ({ children, className }) => {
  return (
    <div data-slot="main-group" className={cn('flex size-full flex-col gap-4', className)}>
      {children}
    </div>
  )
}

export const ServiceLayoutMainGroupContent: React.FC<React.PropsWithChildren & { className?: string }> = ({ className, children }) => {
  return (
    <div data-slot="main-group-content" className={cn('bg-card shadow-card max-w-8xl size-full flex-1 rounded-md p-4', className)}>
      {children}
    </div>
  )
}
