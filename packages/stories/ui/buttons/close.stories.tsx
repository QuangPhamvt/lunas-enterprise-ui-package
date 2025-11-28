import { CloseButton } from '@/components/ui/buttons/close';
import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  tags: ['autodocs'],
  title: 'Components/Buttons/Close',
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    return <CloseButton />;
  },
};
