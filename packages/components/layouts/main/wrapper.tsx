import { SidebarProvider } from '@/components/ui/sidebar'

export const MainLayoutWrapper = ({ children }: React.PropsWithChildren) => {
  return <SidebarProvider className="w-svw">{children}</SidebarProvider>
}
