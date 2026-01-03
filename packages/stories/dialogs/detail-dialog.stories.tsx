import type { Meta, StoryObj } from '@storybook/react-vite';
import { DetailDialog } from '@/components/dialogs/detail-dialog';

const meta = {
  tags: ['autodocs'],
  title: 'Dialogs/DetailDialog',
  component: DetailDialog,
} satisfies Meta<typeof DetailDialog>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    open: true,
    title: 'Detail Dialog Title',
    createdAt: new Date('03-01-2025'),
  },
};
