import { UITableEditButton } from '@/components/features/tables';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  tags: ['autodocs'],
  title: 'Features/UI Tables/Atoms/Edit Button',
  component: UITableEditButton,
  parameters: { layout: 'centered' },
} satisfies Meta<typeof UITableEditButton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'Edit employee details',
    onClick: () => {
      alert('Edit button clicked');
    },
  },
  render: args => <UITableEditButton {...args} />,
};
