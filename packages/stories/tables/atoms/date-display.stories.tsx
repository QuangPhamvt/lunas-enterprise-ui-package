import { UITableDateDisplay } from '@/components/features/tables';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  tags: ['autodocs'],
  title: 'Features/UI Tables/Atoms/Date Display',
  component: UITableDateDisplay,
} satisfies Meta<typeof UITableDateDisplay>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    date: new Date(),
  },
  render: args => <UITableDateDisplay {...args} />,
};

export const Empty: Story = {
  args: {
    date: null,
  },
  render: args => <UITableDateDisplay {...args} />,
};
