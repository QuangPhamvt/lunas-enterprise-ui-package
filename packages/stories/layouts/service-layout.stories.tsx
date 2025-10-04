import { PackageIcon } from 'lucide-react';

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
} from '@/components/layouts/service-layout';
import ReactOAuth from '@/components/systems/google';
import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  tags: ['autodocs'],
  title: 'Layouts/ServiceLayout',
  component: ServiceLayoutProvider,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof ServiceLayoutProvider>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    isLoggedIn: false,
    username: 'CustomAFK',
    email: 'quangpm220503vt@gmail.com',
    inStockCarts: [
      {
        productUuid: '1',
        productName: 'Nike Air Max 97',
        variantUuid: '1-1',
        variantName: 'White/Black',
        imageUrl: 'https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/55f6abe8-760c-427f-8cfa-b2df31e5bf5b/air-max-97-shoes-EzcZ6m.png',
        optionValue: '42',
        optionTitle: 'Size',
        quantity: 1,
        price: 4500000,
      },
      {
        productUuid: '2',
        productName: 'Nike Dunk Low',
        variantUuid: '2-1',
        variantName: 'Panda',
        imageUrl: 'https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/5e7687f1-c13e-4bac-8467-18c3fb74fdfe/dunk-low-shoes-p6dC9q.png',
        optionValue: '41',
        optionTitle: 'Size',
        quantity: 2,
        price: 3200000,
      },
    ],
    orderedCarts: [],
    onLogout: () => {
      console.log('Logout');
    },
    onUpdatingCart: async (id: string, quantity: number, type: 'in_stock' | 'pre_order') => {
      console.log(`Updating cart item with id: ${id}, quantity: ${quantity}, type: ${type}`);
    },
    onDeletingCart: async (id: string) => {
      const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
      await wait(2000);
      console.log('Deleting cart item with id:', id);
    },
  },
  render: args => {
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
    );
  },
};
