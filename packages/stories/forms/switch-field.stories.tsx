import { useForm } from 'react-hook-form';

import { SwitchField } from '@/components/forms/switch-field';
import { Form } from '@/components/ui/form';
import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  tags: ['autodocs'],
  title: 'Forms/SwitchField',
  component: SwitchField,
} satisfies Meta<typeof SwitchField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    name: 'default',
    label: 'Switch Field',
    description: 'This is a switch field description',
  },
  render: args => {
    const form = useForm({
      defaultValues: {
        default: true,
      },
    });
    return (
      <Form {...form}>
        <div className="w-80">
          <SwitchField {...args} />
        </div>
      </Form>
    );
  },
};
