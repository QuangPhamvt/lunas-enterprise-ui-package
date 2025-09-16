import { PackageIcon } from 'lucide-react'

import {
  ServiceLayoutHeader,
  ServiceLayoutMain,
  ServiceLayoutMainContent,
  ServiceLayoutMainGroup,
  ServiceLayoutMainGroupContent,
  ServiceLayoutMainHeader,
  ServiceLayoutProvider,
  ServiceLayoutSidebar,
  ServiceLayoutSidebarContent,
  ServiceLayoutSidebarFooter,
  ServiceLayoutSidebarGroup,
  ServiceLayoutSidebarGroupContent,
  ServiceLayoutSidebarMenu,
  ServiceLayoutSidebarMenuButton,
  ServiceLayoutSidebarMenuItem,
  ServiceLayoutWrapper,
} from '@/components/layouts/service-layout'
import ReactOAuth from '@/components/systems/google'
import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  tags: ['autodocs'],
  title: 'Layouts/ServiceLayout',
  component: ServiceLayoutProvider,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof ServiceLayoutProvider>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    isLoggedIn: false,
    username: 'CustomAFK',
    email: 'quangpm220503vt@gmail.com',
    onLogout: () => {
      console.log('Logout')
    },
  },
  render: (args) => {
    return (
      <ReactOAuth clientId="" isDisabled={false} onGoogleLoginSuccess={() => {}}>
        <ServiceLayoutProvider {...args}>
          <ServiceLayoutWrapper>
            <ServiceLayoutHeader />

            <ServiceLayoutSidebar>
              <ServiceLayoutSidebarContent>
                <ServiceLayoutSidebarGroup>
                  <ServiceLayoutSidebarGroupContent>
                    <ServiceLayoutSidebarMenu>
                      <ServiceLayoutSidebarMenuItem>
                        <ServiceLayoutSidebarMenuButton isActive tooltip="hello world">
                          <PackageIcon />
                          Group 1 - Item 1
                        </ServiceLayoutSidebarMenuButton>
                      </ServiceLayoutSidebarMenuItem>

                      <ServiceLayoutSidebarMenuItem>
                        <ServiceLayoutSidebarMenuButton>
                          <PackageIcon />
                          Group 1 - Item 2
                        </ServiceLayoutSidebarMenuButton>
                      </ServiceLayoutSidebarMenuItem>
                      <ServiceLayoutSidebarMenuItem>
                        <ServiceLayoutSidebarMenuButton>
                          <PackageIcon />
                          Group 1 - Item 3
                        </ServiceLayoutSidebarMenuButton>
                      </ServiceLayoutSidebarMenuItem>
                      <ServiceLayoutSidebarMenuItem>
                        <ServiceLayoutSidebarMenuButton>
                          <PackageIcon />
                          Group 1 - Item 4
                        </ServiceLayoutSidebarMenuButton>
                      </ServiceLayoutSidebarMenuItem>
                    </ServiceLayoutSidebarMenu>
                  </ServiceLayoutSidebarGroupContent>
                </ServiceLayoutSidebarGroup>
              </ServiceLayoutSidebarContent>
              <ServiceLayoutSidebarFooter />
            </ServiceLayoutSidebar>

            <ServiceLayoutMain>
              <ServiceLayoutMainContent>
                <ServiceLayoutMainHeader>App Layout Main Header</ServiceLayoutMainHeader>
                <ServiceLayoutMainGroup>
                  {Array.from({ length: 100 }).map((_, index) => (
                    <ServiceLayoutMainGroupContent key={index}>Content</ServiceLayoutMainGroupContent>
                  ))}
                </ServiceLayoutMainGroup>
              </ServiceLayoutMainContent>
            </ServiceLayoutMain>
          </ServiceLayoutWrapper>
        </ServiceLayoutProvider>
      </ReactOAuth>
    )
  },
}
