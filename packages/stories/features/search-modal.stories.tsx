import type { Meta, StoryObj } from '@storybook/react-vite';
import { SearchModal } from '@/components/features/search-modal';

const meta = {
  tags: ['autodocs'],
  title: 'Features/Search Modal',
  component: SearchModal,
} satisfies Meta<typeof SearchModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  tags: ['autodocs'],
  render: () => <SearchModal />,
};
