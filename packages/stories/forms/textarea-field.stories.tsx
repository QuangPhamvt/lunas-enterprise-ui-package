import { useForm } from 'react-hook-form'

import { TextareaField } from '@/components/forms/textarea-field'
import { Form } from '@/components/ui/form'
import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  tags: ['autodocs'],
  title: 'Forms/TextareaField',
  component: TextareaField,
} satisfies Meta<typeof TextareaField>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    name: 'textarea',
  },
  render: (args) => {
    const form = useForm({
      defaultValues: {
        name: '',
      },
    })
    return (
      <div className="w-120">
        <Form {...form}>
          <TextareaField {...args} />
        </Form>
      </div>
    )
  },
}
