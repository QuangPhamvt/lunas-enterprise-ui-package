import { Paragraph } from '@/components/typography/paragraph';
import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  tags: ['autodocs'],
  title: 'Typography/Paragraph',
  component: Paragraph,
} satisfies Meta<typeof Paragraph>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    variant: 'p',
  },
  render: args => (
    <div className="flex flex-col gap-y-4">
      <Paragraph variant="p">This is a default paragraph. It has a normal font weight and is used for regular text content.</Paragraph>
      <Paragraph variant="lead">
        This is a lead paragraph. It is typically used to introduce the content of a section and has a larger font size and stronger text color.
      </Paragraph>
      <Paragraph variant="lg">This is a large paragraph. It is used for more emphasis and visibility, with a larger font size.</Paragraph>
      <Paragraph variant="sm">This is a small paragraph. It is used for less important text and has a smaller font size.</Paragraph>
      <Paragraph variant="muted">
        This is a muted paragraph. It has a lighter color to indicate less emphasis and is often used for secondary information.
      </Paragraph>
    </div>
  ),
};

export const Muted: Story = {
  args: {
    variant: 'muted',
    children: 'This is a muted paragraph. It has a lighter color to indicate less emphasis.',
  },
};
export const Lead: Story = {
  args: {
    variant: 'lead',
    children: 'This is a lead paragraph. It is typically used to introduce the content of a section.',
  },
};

export const Small: Story = {
  args: {
    variant: 'sm',
    children: 'This is a small paragraph. It is used for less important text.',
  },
};

export const Large: Story = {
  args: {
    variant: 'lg',
    children: 'This is a large paragraph. It is used for more emphasis and visibility.',
  },
};
