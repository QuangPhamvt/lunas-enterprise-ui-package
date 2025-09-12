import { FormDialog } from '@/components/dialogs/form-dialog'
import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  tags: ['autodocs'],
  title: 'Dialogs/FormDialog',
  component: FormDialog,
} satisfies Meta<typeof FormDialog>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    form: {
      defaultValues: {},
    },
    open: false,
    onOpenChange: (open: boolean) => {
      console.log('Dialog open state changed:', open)
    },
    onSubmit: (data) => {
      console.log('Form submitted with data:', data)
    },
    children: <div className="flex h-10 items-center justify-center">Content</div>,
  },
}
