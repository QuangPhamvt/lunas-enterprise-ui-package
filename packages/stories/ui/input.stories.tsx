import { Input } from '@/components/ui/input'
import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  tags: ['autodocs'],
  title: 'Components/Input',
  component: Input,
} satisfies Meta<typeof Input>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    placeholder: 'Enter text here',
  },
}

export const FileInput: Story = {
  args: {
    type: 'file',
    placeholder: 'Upload a file',
  },
}

export const Error: Story = {
  args: {
    placeholder: 'Error input',
    'aria-invalid': true,
  },
}

export const Disabled: Story = {
  args: {
    placeholder: 'Disabled input',
    disabled: true,
  },
}
