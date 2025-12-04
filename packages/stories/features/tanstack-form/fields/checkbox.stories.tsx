import z from 'zod';

import { useTanStackForm } from '@/components/features/tanstack-form';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  tags: ['autodocs'],
  title: 'Features/TanStack Form/Fields/Checkbox Field',
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const { AppField, TanStackContainerForm, TanStackSectionForm } = useTanStackForm({
      defaultValues: {
        values: [] as string[],
      },
      validators: {
        onChange: z.object({
          values: z.string().array().min(1, 'Please select at least one option'),
        }),
      },
    });
    return (
      <TanStackContainerForm>
        <TanStackSectionForm title="Text Field">
          <AppField
            name="values"
            children={({ CheckboxField }) => {
              return (
                <CheckboxField
                  label="Checkbox Field"
                  description="This is a checkbox field."
                  options={[
                    { label: 'Option 1', value: 'option1' },
                    { label: 'Option 2', value: 'option2' },
                    { label: 'Option 3', value: 'option3' },
                  ]}
                  orientation="responsive"
                  helperText="Please select one or more of the options."
                />
              );
            }}
          />
        </TanStackSectionForm>
      </TanStackContainerForm>
    );
  },
};
