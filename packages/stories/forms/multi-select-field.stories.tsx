import { useForm } from 'react-hook-form';

import { MultiSelectField } from '@/components/forms/multi-select-field';
import { Form } from '@/components/ui/form';
import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  tags: ['autodocs'],
  title: 'Forms/MultiSelectField',
  component: MultiSelectField,
} satisfies Meta<typeof MultiSelectField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    name: 'tags',
    label: 'Tags',
    placeholder: 'Select tags',
    options: [
      { value: 'react', label: 'React' },
      { value: 'javascript', label: 'JavaScript' },
      { value: 'css', label: 'CSS' },
      { value: 'html', label: 'HTML' },
    ],
  },
  render: args => {
    const form = useForm({
      defaultValues: {
        tags: [],
      },
    });
    return (
      <Form {...form}>
        <div className="w-80">
          <MultiSelectField {...args} />
        </div>
      </Form>
    );
  },
};
