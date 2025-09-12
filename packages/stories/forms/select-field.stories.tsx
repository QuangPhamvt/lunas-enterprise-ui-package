import { useForm } from 'react-hook-form'

import { SelectField } from '@/components/forms/select-field'
import { Form } from '@/components/ui/form'
import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  tags: ['autodocs'],
  title: 'Forms/SelectField',
  component: SelectField,
} satisfies Meta<typeof SelectField>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    name: 'country',
    options: [
      { value: 'us', label: 'United States' },
      { value: 'ca', label: 'Canada' },
      { value: 'mx', label: 'Mexico' },
    ],
  },
  render: (args) => {
    const form = useForm({
      defaultValues: {
        continue: '',
      },
    })
    return (
      <Form {...form}>
        <div className="w-80">
          <SelectField {...args} />
        </div>
      </Form>
    )
  },
}
