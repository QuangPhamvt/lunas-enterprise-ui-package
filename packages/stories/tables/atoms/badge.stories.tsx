import { UITableBadgeDisplay } from '@/components/features/tables';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  tags: ['autodocs'],
  title: 'Features/UI Tables/Atoms/Badge Display',
  component: UITableBadgeDisplay,
} satisfies Meta<typeof UITableBadgeDisplay>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Badge New',
  },
  render: args => <UITableBadgeDisplay {...args} />,
};

export const WithRemove: Story = {
  args: {
    label: 'Badge New',
    onClick: () => console.log('Badge clicked'),
    onRemove: () => console.log('Badge removed'),
  },
  render: args => <UITableBadgeDisplay {...args} />,
};

export const Empty: Story = {
  args: {
    label: null,
  },
  render: args => <UITableBadgeDisplay {...args} />,
};
