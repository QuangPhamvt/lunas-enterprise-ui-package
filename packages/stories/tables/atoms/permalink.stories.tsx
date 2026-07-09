import { UITablePermalink } from '@/components/features/tables/components/atoms/permalink';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  tags: ['autodocs'],
  title: 'Features/UI Tables/Atoms/Permalink',
  component: UITablePermalink,
} satisfies Meta<typeof UITablePermalink>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    href: 'https://www.google.com',
    label: 'Google Link Example - Click to Open',
  },
  render: args => <UITablePermalink {...args} />,
};
