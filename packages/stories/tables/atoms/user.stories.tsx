import { UITableUserDataDisplay } from '@/components/features/tables';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  tags: ['autodocs'],
  title: 'Features/UI Tables/Atoms/User Data Display',
  component: UITableUserDataDisplay,
} satisfies Meta<typeof UITableUserDataDisplay>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    uuid: '123e4567-e89b-12d3-a456-426614174000',
    username: 'John Doe',
    email: 'user_001@examnple.com',
  },
  render: args => <UITableUserDataDisplay {...args} />,
};
