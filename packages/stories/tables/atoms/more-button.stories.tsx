import { UITableMoreButton } from '@/components/features/tables/components/atoms/more-button';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  tags: ['autodocs'],
  title: 'UI Tables/Atoms/More Button',
  component: UITableMoreButton,
} satisfies Meta<typeof UITableMoreButton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    items: [
      { id: '1', label: 'Create', onClick: id => console.log(`Item ${id} clicked`) },
      { id: '2', label: 'Update', onClick: id => console.log(`Item ${id} clicked`) },
      { id: '3', label: 'Delete', onClick: id => console.log(`Item ${id} clicked`) },
    ],
  },
  render: args => <UITableMoreButton {...args} />,
};
