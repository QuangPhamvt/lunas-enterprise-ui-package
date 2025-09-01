import type { Meta, StoryObj } from '@storybook/react-vite'
import {
  AppLayoutHeader,
  AppLayoutMain,
  AppLayoutMainGroup,
  AppLayoutMainGroupContent,
  AppLayoutSidebar,
  AppLayoutSidebarContent,
  AppLayoutSidebarGroup,
  AppLayoutSidebarGroupContent,
  AppLayoutSidebarGroupLabel,
  AppLayoutSidebarMenu,
  AppLayoutSidebarMenuButton,
  AppLayoutSidebarMenuItem,
  AppLayoutWrapper,
} from '@/components/layouts/app-layout'
import { PackageIcon } from 'lucide-react'

const meta = {
  tags: ['autodocs'],
  title: 'Layouts/App Layout',
  component: AppLayoutWrapper,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof AppLayoutWrapper>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
  render: (args) => {
    return (
      <AppLayoutWrapper {...args}>
        <AppLayoutHeader>Header</AppLayoutHeader>

        <AppLayoutSidebar>
          <AppLayoutSidebarContent>
            <AppLayoutSidebarGroup>
              <AppLayoutSidebarGroupLabel>Group 1</AppLayoutSidebarGroupLabel>
              <AppLayoutSidebarGroupContent>
                <AppLayoutSidebarMenu>
                  <AppLayoutSidebarMenuItem>
                    <AppLayoutSidebarMenuButton isActive tooltip="hello world">
                      <PackageIcon />
                      Group 1 - Item 1
                    </AppLayoutSidebarMenuButton>
                  </AppLayoutSidebarMenuItem>

                  <AppLayoutSidebarMenuItem>
                    <AppLayoutSidebarMenuButton>
                      <PackageIcon />
                      Group 1 - Item 2
                    </AppLayoutSidebarMenuButton>
                  </AppLayoutSidebarMenuItem>
                  <AppLayoutSidebarMenuItem>
                    <AppLayoutSidebarMenuButton>
                      <PackageIcon />
                      Group 1 - Item 3
                    </AppLayoutSidebarMenuButton>
                  </AppLayoutSidebarMenuItem>
                  <AppLayoutSidebarMenuItem>
                    <AppLayoutSidebarMenuButton>
                      <PackageIcon />
                      Group 1 - Item 4
                    </AppLayoutSidebarMenuButton>
                  </AppLayoutSidebarMenuItem>
                </AppLayoutSidebarMenu>
              </AppLayoutSidebarGroupContent>
            </AppLayoutSidebarGroup>
          </AppLayoutSidebarContent>
        </AppLayoutSidebar>

        <AppLayoutMain>
          <AppLayoutMainGroup>
            <AppLayoutMainGroupContent>Content</AppLayoutMainGroupContent>
            <AppLayoutMainGroupContent>Content</AppLayoutMainGroupContent>
            <AppLayoutMainGroupContent>Content</AppLayoutMainGroupContent>
            <AppLayoutMainGroupContent>Content</AppLayoutMainGroupContent>
            <AppLayoutMainGroupContent>Content</AppLayoutMainGroupContent>
            <AppLayoutMainGroupContent>Content</AppLayoutMainGroupContent>
            <AppLayoutMainGroupContent>Content</AppLayoutMainGroupContent>
            <AppLayoutMainGroupContent>Content</AppLayoutMainGroupContent>
            <AppLayoutMainGroupContent>Content</AppLayoutMainGroupContent>
            <AppLayoutMainGroupContent>Content</AppLayoutMainGroupContent>
            <AppLayoutMainGroupContent>Content</AppLayoutMainGroupContent>
            <AppLayoutMainGroupContent>Content</AppLayoutMainGroupContent>
            <AppLayoutMainGroupContent>Content</AppLayoutMainGroupContent>
            <AppLayoutMainGroupContent>Content</AppLayoutMainGroupContent>
            <AppLayoutMainGroupContent>Content</AppLayoutMainGroupContent>
            <AppLayoutMainGroupContent>Content</AppLayoutMainGroupContent>
            <AppLayoutMainGroupContent>Content</AppLayoutMainGroupContent>
            <AppLayoutMainGroupContent>Content</AppLayoutMainGroupContent>
            <AppLayoutMainGroupContent>Content</AppLayoutMainGroupContent>
            <AppLayoutMainGroupContent>Content</AppLayoutMainGroupContent>
            <AppLayoutMainGroupContent>Content</AppLayoutMainGroupContent>
            <AppLayoutMainGroupContent>Content</AppLayoutMainGroupContent>
            <AppLayoutMainGroupContent>Content</AppLayoutMainGroupContent>
            <AppLayoutMainGroupContent>Content</AppLayoutMainGroupContent>
            <AppLayoutMainGroupContent>Content</AppLayoutMainGroupContent>
            <AppLayoutMainGroupContent>Content</AppLayoutMainGroupContent>
            <AppLayoutMainGroupContent>Content</AppLayoutMainGroupContent>
            <AppLayoutMainGroupContent>Content</AppLayoutMainGroupContent>
            <AppLayoutMainGroupContent>Content</AppLayoutMainGroupContent>
            <AppLayoutMainGroupContent>Content</AppLayoutMainGroupContent>
            <AppLayoutMainGroupContent>Content</AppLayoutMainGroupContent>
            <AppLayoutMainGroupContent>Content</AppLayoutMainGroupContent>
            <AppLayoutMainGroupContent>Content</AppLayoutMainGroupContent>
            <AppLayoutMainGroupContent>Content</AppLayoutMainGroupContent>
            <AppLayoutMainGroupContent>Content</AppLayoutMainGroupContent>
            <AppLayoutMainGroupContent>Content</AppLayoutMainGroupContent>
            <AppLayoutMainGroupContent>Content</AppLayoutMainGroupContent>
            <AppLayoutMainGroupContent>Content</AppLayoutMainGroupContent>
            <AppLayoutMainGroupContent>Content</AppLayoutMainGroupContent>
            <AppLayoutMainGroupContent>Content</AppLayoutMainGroupContent>
            <AppLayoutMainGroupContent>Content</AppLayoutMainGroupContent>
            <AppLayoutMainGroupContent>Content</AppLayoutMainGroupContent>
            <AppLayoutMainGroupContent>Content</AppLayoutMainGroupContent>
            <AppLayoutMainGroupContent>Content</AppLayoutMainGroupContent>
            <AppLayoutMainGroupContent>Content</AppLayoutMainGroupContent>
            <AppLayoutMainGroupContent>Content</AppLayoutMainGroupContent>
            <AppLayoutMainGroupContent>Content</AppLayoutMainGroupContent>
            <AppLayoutMainGroupContent>Content</AppLayoutMainGroupContent>
            <AppLayoutMainGroupContent>Content</AppLayoutMainGroupContent>
            <AppLayoutMainGroupContent>Content</AppLayoutMainGroupContent>
            <AppLayoutMainGroupContent>Content</AppLayoutMainGroupContent>
            <AppLayoutMainGroupContent>Content</AppLayoutMainGroupContent>
            <AppLayoutMainGroupContent>Content</AppLayoutMainGroupContent>
            <AppLayoutMainGroupContent>Content</AppLayoutMainGroupContent>
            <AppLayoutMainGroupContent>Content</AppLayoutMainGroupContent>
            <AppLayoutMainGroupContent>Content</AppLayoutMainGroupContent>
            <AppLayoutMainGroupContent>Content</AppLayoutMainGroupContent>
            <AppLayoutMainGroupContent>Content</AppLayoutMainGroupContent>
            <AppLayoutMainGroupContent>Content</AppLayoutMainGroupContent>
            <AppLayoutMainGroupContent>Content</AppLayoutMainGroupContent>
            <AppLayoutMainGroupContent>Content</AppLayoutMainGroupContent>
            <AppLayoutMainGroupContent>Content</AppLayoutMainGroupContent>
            <AppLayoutMainGroupContent>Content</AppLayoutMainGroupContent>
            <AppLayoutMainGroupContent>Content</AppLayoutMainGroupContent>
            <AppLayoutMainGroupContent>Content</AppLayoutMainGroupContent>
            <AppLayoutMainGroupContent>Content</AppLayoutMainGroupContent>
            <AppLayoutMainGroupContent>Content</AppLayoutMainGroupContent>
            <AppLayoutMainGroupContent>Content</AppLayoutMainGroupContent>
            <AppLayoutMainGroupContent>Content</AppLayoutMainGroupContent>
            <AppLayoutMainGroupContent>Content</AppLayoutMainGroupContent>
            <AppLayoutMainGroupContent>Content</AppLayoutMainGroupContent>
            <AppLayoutMainGroupContent>Content</AppLayoutMainGroupContent>
            <AppLayoutMainGroupContent>Content</AppLayoutMainGroupContent>
            <AppLayoutMainGroupContent>Content</AppLayoutMainGroupContent>
            <AppLayoutMainGroupContent>Content</AppLayoutMainGroupContent>
            <AppLayoutMainGroupContent>Content</AppLayoutMainGroupContent>
            <AppLayoutMainGroupContent>Content</AppLayoutMainGroupContent>
            <AppLayoutMainGroupContent>Content</AppLayoutMainGroupContent>
            <AppLayoutMainGroupContent>Content</AppLayoutMainGroupContent>
            <AppLayoutMainGroupContent>Content</AppLayoutMainGroupContent>
            <AppLayoutMainGroupContent>Content</AppLayoutMainGroupContent>
            <AppLayoutMainGroupContent>Content</AppLayoutMainGroupContent>
            <AppLayoutMainGroupContent>Content</AppLayoutMainGroupContent>
            <AppLayoutMainGroupContent>Content</AppLayoutMainGroupContent>
            <AppLayoutMainGroupContent>Content</AppLayoutMainGroupContent>
            <AppLayoutMainGroupContent>Content</AppLayoutMainGroupContent>
            <AppLayoutMainGroupContent>Content</AppLayoutMainGroupContent>
            <AppLayoutMainGroupContent>Content</AppLayoutMainGroupContent>
            <AppLayoutMainGroupContent>Content</AppLayoutMainGroupContent>
            <AppLayoutMainGroupContent>Content</AppLayoutMainGroupContent>
            <AppLayoutMainGroupContent>Content</AppLayoutMainGroupContent>
            <AppLayoutMainGroupContent>Content</AppLayoutMainGroupContent>
            <AppLayoutMainGroupContent>Content</AppLayoutMainGroupContent>
            <AppLayoutMainGroupContent>Content</AppLayoutMainGroupContent>
            <AppLayoutMainGroupContent>Content</AppLayoutMainGroupContent>
            <AppLayoutMainGroupContent>Content</AppLayoutMainGroupContent>
            <AppLayoutMainGroupContent>Content</AppLayoutMainGroupContent>
            <AppLayoutMainGroupContent>Content</AppLayoutMainGroupContent>
            <AppLayoutMainGroupContent>Content</AppLayoutMainGroupContent>
            <AppLayoutMainGroupContent>Content</AppLayoutMainGroupContent>
            <AppLayoutMainGroupContent>Content</AppLayoutMainGroupContent>
            <AppLayoutMainGroupContent>Content</AppLayoutMainGroupContent>
            <AppLayoutMainGroupContent>Content</AppLayoutMainGroupContent>
            <AppLayoutMainGroupContent>Content</AppLayoutMainGroupContent>
            <AppLayoutMainGroupContent>Content</AppLayoutMainGroupContent>
            <AppLayoutMainGroupContent>Content</AppLayoutMainGroupContent>
            <AppLayoutMainGroupContent>Content</AppLayoutMainGroupContent>
            <AppLayoutMainGroupContent>Content</AppLayoutMainGroupContent>
          </AppLayoutMainGroup>
        </AppLayoutMain>
      </AppLayoutWrapper>
    )
  },
}
