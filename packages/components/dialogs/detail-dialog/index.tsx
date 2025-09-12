import { CatIcon } from 'lucide-react'

import { Flex } from '@/components/layouts/flex'
import { Dialog } from '@/components/ui/dialog'

import { DetailDialogHeader } from './component/header'
import { DetailDialogMain, DetailDialogMainHeader } from './component/main'
import {
  DetailDialogSidebarContent,
  DetailDialogSidebarFooter,
  DetailDialogSidebarGroup,
  DetailDialogSidebarHeader,
  DetailDialogSidebarMenu,
  DetailDialogSidebarMenuButton,
  DetailDialogSidebarMenuItem,
  Sidebar,
  SidebarProvider,
} from './component/sidebar'
import { DetailDialogWrapper } from './component/wrapper'

const DetailDialogSidebar: React.FC<React.PropsWithChildren<{ title?: string; sidebarFooter?: React.ReactNode }>> = ({ title, sidebarFooter, children }) => {
  return (
    <Sidebar collapsible="icon" className="shadow-nav z-20 hidden md:flex">
      <DetailDialogSidebarHeader>
        <DetailDialogSidebarMenu>
          <DetailDialogSidebarMenuItem>
            <DetailDialogSidebarMenuButton size="lg" tabIndex={-1}>
              <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                <CatIcon size={16} />
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">{title || 'Detail Dialog'}</span>
                <span className="truncate text-xs">Lunas Enterprise</span>
              </div>
            </DetailDialogSidebarMenuButton>
          </DetailDialogSidebarMenuItem>
        </DetailDialogSidebarMenu>
      </DetailDialogSidebarHeader>
      <DetailDialogSidebarContent>
        <DetailDialogSidebarGroup>{children}</DetailDialogSidebarGroup>
      </DetailDialogSidebarContent>
      {sidebarFooter && <DetailDialogSidebarFooter>{sidebarFooter}</DetailDialogSidebarFooter>}
    </Sidebar>
  )
}

type Props = {
  open?: boolean
  isLoading?: boolean
  sidebarTitle?: string
  sidebar?: React.ReactNode
  sidebarFooter?: React.ReactNode
  title: string
  createdAt: string | Date | number
  onOpenChange?: (open: boolean) => void | Promise<void>
}
export const DetailDialog: React.FC<React.PropsWithChildren<Props>> = ({
  open,
  isLoading = false,
  sidebarTitle,
  sidebar,
  sidebarFooter,
  title,
  createdAt,
  onOpenChange,
  children,
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DetailDialogWrapper>
        <DetailDialogHeader />
        <SidebarProvider className="h-full min-h-[85svh] items-start">
          <DetailDialogSidebar title={sidebarTitle} sidebarFooter={sidebarFooter} children={sidebar} />
          <DetailDialogMain>
            <DetailDialogMainHeader title={title} createdAt={createdAt} />
            {isLoading ? (
              <Flex justify="center" className="bg-muted-muted w-full flex-1 inset-shadow-sm">
                <div className="loader" />
              </Flex>
            ) : (
              <section className="bg-muted-muted relative flex flex-1 snap-y flex-col gap-0 overflow-y-auto inset-shadow-sm">{children}</section>
            )}
          </DetailDialogMain>
        </SidebarProvider>
      </DetailDialogWrapper>
    </Dialog>
  )
}
