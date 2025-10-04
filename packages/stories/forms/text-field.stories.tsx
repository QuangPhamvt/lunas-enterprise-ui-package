import { useForm } from 'react-hook-form';

import { TextField } from '@/components/forms/text-field';
import { Form } from '@/components/ui/form';
import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  tags: ['autodocs'],
  title: 'Forms/TextField',
  component: TextField,
} satisfies Meta<typeof TextField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    name: 'name',
    isShowErrorMsg: true,
  },
  render: args => {
    const form = useForm({
      defaultValues: {
        name: '',
      },
    });
    const { handleSubmit } = form;
    return (
      <Form {...form}>
        <form
          className="space-y-4"
          onSubmit={handleSubmit(data => {
            console.log('Form submitted:', data);
          })}
        >
          <TextField {...args} />
        </form>
      </Form>
    );
  },
};
