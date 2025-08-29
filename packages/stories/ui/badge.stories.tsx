import { Badge } from '@/components/ui/badge'
import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  tags: ['autodocs'],
  title: 'Components/Badge',
  component: Badge,
} satisfies Meta<typeof Badge>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    pill: true,
    children: 'Badge',
  },
}

export const Pill: Story = {
  args: {
    pill: true,
    children: 'Pill Badge',
  },
}

export const Red: Story = {
  args: {
    ...Default.args,
    color: 'red',
    children: 'Red Badge',
  },
}

export const Orange: Story = {
  args: {
    ...Default.args,
    color: 'orange',
    children: 'Orange Badge',
  },
}

export const Amber: Story = {
  args: {
    ...Default.args,
    color: 'amber',
    children: 'Amber Badge',
  },
}

export const Yellow: Story = {
  args: {
    ...Default.args,
    color: 'yellow',
    children: 'Yellow Badge',
  },
}

export const Lime: Story = {
  args: {
    ...Default.args,
    color: 'lime',
    children: 'Lime Badge',
  },
}

export const Green: Story = {
  args: {
    ...Default.args,
    color: 'green',
    children: 'Green Badge',
  },
}

export const Emerald: Story = {
  args: {
    ...Default.args,
    color: 'emerald',
    children: 'Emerald Badge',
  },
}

export const Teal: Story = {
  args: {
    ...Default.args,
    color: 'teal',
    children: 'Teal Badge',
  },
}

export const Cyan: Story = {
  args: {
    ...Default.args,
    color: 'cyan',
    children: 'Cyan Badge',
  },
}

export const Sky: Story = {
  args: {
    ...Default.args,
    color: 'sky',
    children: 'Sky Badge',
  },
}

export const Blue: Story = {
  args: {
    ...Default.args,
    color: 'blue',
    children: 'Blue Badge',
  },
}

export const Indigo: Story = {
  args: {
    ...Default.args,
    color: 'indigo',
    children: 'Indigo Badge',
  },
}

export const Violet: Story = {
  args: {
    ...Default.args,
    color: 'violet',
    children: 'Violet Badge',
  },
}

export const Purple: Story = {
  args: {
    ...Default.args,
    color: 'purple',
    children: 'Purple Badge',
  },
}

export const Fuchsia: Story = {
  args: {
    ...Default.args,
    color: 'fuchsia',
    children: 'Fuchsia Badge',
  },
}

export const Pink: Story = {
  args: {
    ...Default.args,
    color: 'pink',
    children: 'Pink Badge',
  },
}

export const Rose: Story = {
  args: {
    ...Default.args,
    color: 'rose',
    children: 'Rose Badge',
  },
}

export const Zinc: Story = {
  args: {
    ...Default.args,
    color: 'zinc',
    children: 'Zinc Badge',
  },
}
