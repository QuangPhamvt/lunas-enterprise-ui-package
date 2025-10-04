import { LoadingDialog } from '@/components/dialogs/loading-dialog';
import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  title: 'Dialogs/LoadingDialog',
  component: LoadingDialog,
  tags: ['autodocs'],
} satisfies Meta<typeof LoadingDialog>;
export default meta;

type Story = StoryObj<typeof meta>;
export const Default: Story = {
  args: {
    open: true,
  },
};
