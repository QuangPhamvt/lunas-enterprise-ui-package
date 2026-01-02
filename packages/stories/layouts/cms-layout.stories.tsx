import { PackageIcon } from 'lucide-react';

import type { Meta, StoryObj } from '@storybook/react-vite';
import { CMSLayout } from '@/components/layouts/cms-layout';

const meta = {
  tags: ['autodocs'],
  title: 'Layouts/CMS Layout',
  component: CMSLayout,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof CMSLayout>;

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
    return <CMSLayout {...args} />;
  },
};
