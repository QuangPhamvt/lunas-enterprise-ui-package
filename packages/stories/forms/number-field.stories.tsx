import { useForm } from 'react-hook-form'
import type { Meta, StoryObj } from '@storybook/react-vite'

import { NumberField } from '@/components/forms/number-field'
import { Form } from '@/components/ui/form'

const meta = {
  tags: ['autodocs'],
  title: 'Forms/NumberField',
  component: NumberField,
} satisfies Meta<typeof NumberField>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    name: 'name',
    onValueChange: (value) => {
      console.log('Value changed:', value)
    },
  },
  render: (args) => {
    const form = useForm({
      defaultValues: {
        name: '',
      },
    })
    return (
      <Form {...form}>
        <NumberField {...args} />
      </Form>
    )
  },
}
