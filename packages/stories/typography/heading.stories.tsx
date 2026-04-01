import { Heading } from '@/components/typography/heading';
import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  tags: ['autodocs'],
  title: 'Typography/Heading',
  component: Heading,
} satisfies Meta<typeof Heading>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    level: 'h2',
    children: 'This is a default heading. It is used for section titles and has a strong font weight.',
  },
};

export const H1: Story = {
  args: {
    level: 'h1',
    children: 'This is an H1 heading. It is the largest and most important heading, typically used for page titles.',
  },
};

export const H2: Story = {
  args: {
    level: 'h2',
    children: 'This is an H2 heading. It is used for section titles and has a strong font weight.',
  },
};

export const H3: Story = {
  args: {
    level: 'h3',
    children: 'This is an H3 heading. It is used for sub-section titles and has a slightly smaller font size than H2.',
  },
};

export const H4: Story = {
  args: {
    level: 'h4',
    children: 'This is an H4 heading. It is used for smaller section titles and has a moderate font size.',
  },
};

export const H5: Story = {
  args: {
    level: 'h5',
    children: 'This is an H5 heading. It is used for even smaller section titles and has a smaller font size.',
  },
};
