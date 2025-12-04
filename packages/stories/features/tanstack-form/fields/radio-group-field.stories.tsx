import z from 'zod';

import { useTanStackForm } from '@/components/features/tanstack-form';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  tags: ['autodocs'],
  title: 'Features/TanStack Form/Fields/Radio Group Field',
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const { AppField, TanStackContainerForm, TanStackSectionForm } = useTanStackForm({
      defaultValues: {
        value: '',
      },
      validators: {
        onChange: z.object({
          value: z.string().min(1, 'Please select an option'),
        }),
      },
    });
    return (
      <TanStackContainerForm>
        <TanStackSectionForm title="Text Field">
          <AppField
            name="value"
            children={({ RadioGroupField }) => {
              return (
                <RadioGroupField
                  label="Radio Group Field"
                  description="This is a radio group field."
                  options={[
                    { label: 'Option 1', value: 'option1', description: 'This is option 1' },
                    { label: 'Option 2', value: 'option2', description: 'This is option 2' },
                    { label: 'Option 3', value: 'option3', description: 'This is option 3' },
                  ]}
                  orientation="responsive"
                  helperText="Please select one of the options."
                />
              );
            }}
          />
        </TanStackSectionForm>
      </TanStackContainerForm>
    );
  },
};
