import { UITablePhoneNumberDisplay } from '@/components/features/tables';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  tags: ['autodocs'],
  title: 'Features/UI Tables/Atoms/Number Phone',
  component: UITablePhoneNumberDisplay,
} satisfies Meta<typeof UITablePhoneNumberDisplay>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    value: '0123456789',
  },
  render: args => <UITablePhoneNumberDisplay {...args} />,
};
