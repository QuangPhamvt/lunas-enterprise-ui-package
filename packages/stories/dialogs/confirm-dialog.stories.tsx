import { ConfirmDialog } from '@/components/dialogs/confirm-dialog'
import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  tags: ['autodocs'],
  title: 'Dialogs/ConfirmDialog',
  component: ConfirmDialog,
} satisfies Meta<typeof ConfirmDialog>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    open: false,
    isLoading: false,
    title: 'Confirm Action',
    description: 'Are you sure you want to proceed with this action?',
    onOpenChange: (open) => console.log('Dialog open state:', open),
  },
  render: (args) => (
    <ConfirmDialog {...args}>
      <p>This is a custom content inside the dialog.</p>
    </ConfirmDialog>
  ),
}
