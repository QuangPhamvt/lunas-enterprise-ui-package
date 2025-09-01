import { Button } from '@/components/ui/button'
import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: 'Button',
    size: 'default',
    isLoading: false,
    className: 'w-40',
  },
}

export const DefaultSecondary: Story = {
  args: {
    ...Default.args,
    color: 'secondary',
  },
}

export const DefaultSuccess: Story = {
  args: {
    ...Default.args,
    color: 'success',
  },
}

export const DefaultImportant: Story = {
  args: {
    ...Default.args,
    color: 'important',
  },
}

export const DefaultInfo: Story = {
  args: {
    ...Default.args,
    color: 'info',
  },
}

export const DefaultWarning: Story = {
  args: {
    ...Default.args,
    color: 'warning',
  },
}

export const DefaultDanger: Story = {
  args: {
    ...Default.args,
    color: 'danger',
  },
}

export const OutlineMuted: Story = {
  args: {
    ...Default.args,
    variant: 'outline',
    color: 'muted',
  },
}

export const OutlinePrimary: Story = {
  args: {
    ...Default.args,
    variant: 'outline',
    color: 'primary',
  },
}

export const OutlineSecondary: Story = {
  args: {
    ...Default.args,
    variant: 'outline',
    color: 'secondary',
  },
}

export const OutlineSuccess: Story = {
  args: {
    ...Default.args,
    variant: 'outline',
    color: 'success',
  },
}

export const OutlineImportant: Story = {
  args: {
    ...Default.args,
    variant: 'outline',
    color: 'important',
  },
}

export const OutlineInfo: Story = {
  args: {
    ...Default.args,
    variant: 'outline',
    color: 'info',
  },
}

export const OutlineWarning: Story = {
  args: {
    ...Default.args,
    variant: 'outline',
    color: 'warning',
  },
}

export const OutlineDanger: Story = {
  args: {
    ...Default.args,
    variant: 'outline',
    color: 'danger',
  },
}

export const GhostPrimary: Story = {
  args: {
    ...Default.args,
    variant: 'ghost',
    color: 'primary',
  },
}

export const GhostSecondary: Story = {
  args: {
    ...Default.args,
    variant: 'ghost',
    color: 'secondary',
  },
}

export const GhostSuccess: Story = {
  args: {
    ...Default.args,
    variant: 'ghost',
    color: 'success',
  },
}

export const GhostImportant: Story = {
  args: {
    ...Default.args,
    variant: 'ghost',
    color: 'important',
  },
}

export const GhostInfo: Story = {
  args: {
    ...Default.args,
    variant: 'ghost',
    color: 'info',
  },
}

export const GhostWarning: Story = {
  args: {
    ...Default.args,
    variant: 'ghost',
    color: 'warning',
  },
}

export const GhostDanger: Story = {
  args: {
    ...Default.args,
    variant: 'ghost',
    color: 'danger',
  },
}
