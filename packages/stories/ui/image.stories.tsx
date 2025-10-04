import { Image } from '@/components/ui/image';
import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  tags: ['autodocs'],
  title: 'Components/Image',
  component: Image,
} satisfies Meta<typeof Image>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    src: 'https://ui.shadcn.com/placeholder.svg',
    width: 300,
    height: 300,
  },
};

export const Error: Story = {
  args: {
    src: 'https://ui.shadcn.com/placeholde.png',
    width: 300,
    height: 300,
  },
};
