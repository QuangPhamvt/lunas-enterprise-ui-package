import z from 'zod';

import { useTanStackForm } from '@/components/features/tanstack-form';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  tags: ['autodocs'],
  title: 'Features/TanStack Form/Fields/Select Field',
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
          value: z.string(),
        }),
      },
    });
    return (
      <TanStackContainerForm>
        <TanStackSectionForm title="Select Field">
          <AppField
            name="value"
            children={({ SelectField }) => {
              return (
                <SelectField
                  label="Select Field"
                  description="This is a select field."
                  placeholder="Select an option"
                  orientation="responsive"
                  options={[
                    { label: 'Option 1', value: 'option_1' },
                    { label: 'Option 2', value: 'option_2' },
                    { label: 'Option 3', value: 'option_3' },
                  ]}
                />
              );
            }}
          />
        </TanStackSectionForm>
      </TanStackContainerForm>
    );
  },
};

export const Submitting: Story = {
  render: () => {
    const { AppField, TanStackContainerForm, TanStackSectionForm } = useTanStackForm({
      defaultState: {
        isSubmitting: true,
      },
      defaultValues: {
        value: '',
      },
      validators: {
        onChange: z.object({
          value: z.string().min(5, 'Minimum 5 characters').max(50, 'Maximum 50 characters'),
        }),
      },
    });
    return (
      <TanStackContainerForm>
        <TanStackSectionForm title="Select Field - Submitting">
          <AppField
            name="value"
            children={({ SelectField }) => {
              return (
                <SelectField
                  label="Select Field"
                  description="This is a select field."
                  placeholder="Select an option"
                  orientation="responsive"
                  options={[
                    { label: 'Option 1', value: 'option_1' },
                    { label: 'Option 2', value: 'option_2' },
                    { label: 'Option 3', value: 'option_3' },
                  ]}
                />
              );
            }}
          />
        </TanStackSectionForm>
      </TanStackContainerForm>
    );
  },
};
