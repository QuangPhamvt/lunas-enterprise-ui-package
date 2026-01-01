import { PackageIcon } from 'lucide-react';

import type { Meta, StoryObj } from '@storybook/react-vite';
import { CMSLayout } from '@/components/layouts/cms-layout';

const meta = {
  tags: ['autodocs'],
  title: 'Layouts/CMS Layout',
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
  render: args => {
    return (
      <CMSLayout
        sidebar={{
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
        }}
      />
    );
  },
};
