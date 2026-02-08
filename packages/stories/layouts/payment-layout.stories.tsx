import { PackageIcon } from 'lucide-react';

import type { Meta, StoryObj } from '@storybook/react-vite';
import { PaymentLayout } from '@/components/layouts/payment-layout';

const meta = {
  tags: ['autodocs'],
  title: 'Layouts/Payment Layout',
  component: PaymentLayout,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof PaymentLayout>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    activeNavItemId: 'posts',
    sidebar: {
      groupcontent: [
        {
          id: '1',
          label: 'Content',
          items: [
            {
              id: 'dashboard',
              label: 'Dashboard',
              icon: <PackageIcon />,
            },
            {
              id: 'posts',
              label: 'Posts',
              icon: <PackageIcon />,
            },
          ],
        },
      ],
    },
  },
  render: args => {
    return <PaymentLayout {...args} />;
  },
};
