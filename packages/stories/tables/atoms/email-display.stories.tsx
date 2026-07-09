import { UITableEmailDisplay } from '@/components/features/tables';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  tags: ['autodocs'],
  title: 'Features/UI Tables/Atoms/Email Display',
  component: UITableEmailDisplay,
} satisfies Meta<typeof UITableEmailDisplay>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    email: 'jane.smith@example.com',
    linkable: true,
  },
  render: args => <UITableEmailDisplay {...args} />,
};

export const NotLinkable: Story = {
  args: {
    email: 'jane.smith@example.com',
    linkable: false,
  },
  render: args => <UITableEmailDisplay {...args} />,
};

export const LongEmail: Story = {
  args: {
    email: 'very.long.user.name+alias@subdomain.organization.example.com',
    linkable: true,
  },
  render: args => <UITableEmailDisplay {...args} />,
};

export const Empty: Story = {
  args: {
    email: null,
  },
  render: args => <UITableEmailDisplay {...args} />,
};
