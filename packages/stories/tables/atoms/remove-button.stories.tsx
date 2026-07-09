import { UITableRemoveButton } from '@/components/features/tables';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  tags: ['autodocs'],
  title: 'Features/UI Tables/Atoms/Remove Button',
  component: UITableRemoveButton,
} satisfies Meta<typeof UITableRemoveButton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    onClick: () => {
      alert('Remove button clicked');
    },
  },
  render: args => <UITableRemoveButton {...args} />,
};
