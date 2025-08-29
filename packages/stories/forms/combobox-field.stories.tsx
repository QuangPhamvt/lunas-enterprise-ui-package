import { useForm } from 'react-hook-form'
import type { Meta, StoryObj } from '@storybook/react-vite'

import { ComboboxField } from '@/components/forms/combobox-field'
import { Form } from '@/components/ui/form'

const meta = {
  tags: ['autodocs'],
  title: 'Forms/ComboboxField',
  component: ComboboxField,
} satisfies Meta<typeof ComboboxField>
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    name: 'combobox',
    options: [
      { value: 'option1', label: 'Option 1' },
      { value: 'option2', label: 'Option 2' },
      { value: 'option3', label: 'Option 3' },
    ],
  },
  render: (args) => {
    const form = useForm({
      defaultValues: {
        combobox: '',
      },
    })
    return (
      <div className="w-80">
        <Form {...form}>
          <ComboboxField {...args} />
        </Form>
      </div>
    )
  },
}
