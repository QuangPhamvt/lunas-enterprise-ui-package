import { PackageIcon } from 'lucide-react';

import { DetailDialog } from '@/components/dialogs/detail-dialog';
import { DetailDialogMainGroup, DetailDialogMainGroupItem } from '@/components/dialogs/detail-dialog/component/main';
import { DetailDialogSidebarMenu, DetailDialogSidebarMenuButton, DetailDialogSidebarMenuItem } from '@/components/dialogs/detail-dialog/component/sidebar';
import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  tags: ['autodocs'],
  title: 'Dialogs/DetailDialog',
  component: DetailDialog,
} satisfies Meta<typeof DetailDialog>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    open: true,
    isLoading: false,
    sidebar: (
      <DetailDialogSidebarMenu>
        <DetailDialogSidebarMenuItem>
          <DetailDialogSidebarMenuButton isActive>
            <PackageIcon />
            Group 1 - Item 1
          </DetailDialogSidebarMenuButton>
        </DetailDialogSidebarMenuItem>

        <DetailDialogSidebarMenuItem>
          <DetailDialogSidebarMenuButton>
            <PackageIcon />
            Group 1 - Item 2
          </DetailDialogSidebarMenuButton>
        </DetailDialogSidebarMenuItem>

        <DetailDialogSidebarMenuItem>
          <DetailDialogSidebarMenuButton>
            <PackageIcon />
            Group 1 - Item 3
          </DetailDialogSidebarMenuButton>
        </DetailDialogSidebarMenuItem>
      </DetailDialogSidebarMenu>
    ),
    title: 'Detail Dialog Title',
    sidebarTitle: 'Sidebar Title',
    createdAt: new Date(),
    onOpenChange: (open: boolean) => console.log('Dialog open state changed:', open),
    children: (
      <DetailDialogMainGroup>
        <DetailDialogMainGroupItem
          title="Group Item 1 Content"
          description="This is a description for Group Item 1. It provides additional context about the content."
        >
          Content for Group Item 1. This is where you can put detailed information related to this item.
        </DetailDialogMainGroupItem>
        <DetailDialogMainGroupItem
          title="Group Item 2 Content"
          description="This is a description for Group Item 2. It provides additional context about the content."
        >
          Group Item 2 Content
        </DetailDialogMainGroupItem>
        <DetailDialogMainGroupItem
          title="Group Item 3 Content"
          description="This is a description for Group Item 3. It provides additional context about the content."
        >
          Group Item 3 Content
        </DetailDialogMainGroupItem>
        <DetailDialogMainGroupItem
          title="Group Item 4 Content"
          description="This is a description for Group Item 4. It provides additional context about the content."
        >
          Content for Group Item 4. This is where you can put detailed information related to this item.
        </DetailDialogMainGroupItem>
        <DetailDialogMainGroupItem
          title="Group Item 5 Content"
          description="This is a description for Group Item 5. It provides additional context about the content."
        >
          Group Item 5 Content
        </DetailDialogMainGroupItem>
      </DetailDialogMainGroup>
    ),
  },
};
