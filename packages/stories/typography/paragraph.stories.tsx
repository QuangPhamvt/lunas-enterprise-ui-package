import type { Meta, StoryObj } from '@storybook/react-vite'
import { Paragraph } from '@/components/typography/paragraph'

const meta = {
  tags: ['autodocs'],
  title: 'Typography/Paragraph',
  component: Paragraph,
} satisfies Meta<typeof Paragraph>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    variant: 'p',
    children: 'This is a paragraph. It can contain text, links, and other inline elements.',
  },
}

export const Muted: Story = {
  args: {
    variant: 'muted',
    children: 'This is a muted paragraph. It has a lighter color to indicate less emphasis.',
  },
}
export const Lead: Story = {
  args: {
    variant: 'lead',
    children: 'This is a lead paragraph. It is typically used to introduce the content of a section.',
  },
}

export const Small: Story = {
  args: {
    variant: 'sm',
    children: 'This is a small paragraph. It is used for less important text.',
  },
}

export const Large: Story = {
  args: {
    variant: 'lg',
    children: 'This is a large paragraph. It is used for more emphasis and visibility.',
  },
}
