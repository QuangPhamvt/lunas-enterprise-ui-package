import { EmptyDisplay } from '@/components/data-display/empty';
import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  tags: ['autodocs'],
  title: 'Data Display/Empty',
  component: EmptyDisplay,
} satisfies Meta<typeof EmptyDisplay>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
