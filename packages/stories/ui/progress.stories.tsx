import { Progress } from '@/components/ui/progress';
import type { Meta, StoryObj } from '@storybook/react-vite';
const meta = {
  tags: ['autodocs'],
  title: 'Components/Progress',
  component: Progress,
} satisfies Meta<typeof Progress>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    value: 60,
    className: 'w-72',
  },
};
