import { Title } from '@/components/typography/title';
import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  tags: ['autodocs'],
  title: 'Typography/Title',
  component: Title,
} satisfies Meta<typeof Title>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    level: 1,
    children: 'H1. Heading 1',
  },
};

export const H2: Story = {
  args: {
    level: 2,
    children: 'H2. Heading 2',
  },
};

export const H3: Story = {
  args: {
    level: 3,
    children: 'H3. Heading 3',
  },
};

export const H4: Story = {
  args: {
    level: 4,
    children: 'H4. Heading 4',
  },
};
