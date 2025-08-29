import { ErrorDialog } from '@/components/dialogs/error-dialog'
import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  tags: ['autodocs'],
  title: 'Dialogs/ErrorDialog',
  component: ErrorDialog,
} satisfies Meta<typeof ErrorDialog>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    open: false,
    title: 'An error occurred',
    description: 'An unexpected error has occurred. Please try again later.',
    children: <p className="text-muted-foreground text-sm">If the problem persists, please contact support or check the system status for more information.</p>,
  },
  render: (args) => {
    return (
      <div className="grid w-full max-w-xl items-start gap-4">
        <ErrorDialog {...args} />
      </div>
    )
  },
}
