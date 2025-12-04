import z from 'zod';

import { useTanStackForm } from '@/components/features/tanstack-form';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  tags: ['autodocs'],
  title: 'Features/TanStack Form/Fields/Text Field',
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
          value: z.string().min(5, 'Minimum 5 characters').max(50, 'Maximum 50 characters'),
        }),
      },
    });
    return (
      <TanStackContainerForm>
        <TanStackSectionForm title="Text Field">
          <AppField
            name="value"
            children={({ TextField }) => {
              return (
                <TextField
                  label="Text Field"
                  description="This is a text field."
                  placeholder="Enter some text"
                  orientation="responsive"
                  showClearButton={true}
                  showErrorMessage={true}
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
        <TanStackSectionForm title="Text Field - Submitting">
          <AppField
            name="value"
            children={({ TextField }) => {
              return (
                <TextField
                  label="Text Field"
                  description="This is a text field."
                  placeholder="Enter some text"
                  orientation="responsive"
                  showClearButton={true}
                  showErrorMessage={true}
                />
              );
            }}
          />
        </TanStackSectionForm>
      </TanStackContainerForm>
    );
  },
};
