import z from 'zod';

import type { Meta, StoryObj } from '@storybook/react-vite';
import { useTanStackForm } from '@/components/features/tanstack-form';

const meta = {
  tags: ['autodocs'],
  title: 'Features/TanStack Form/Fields/Textarea Field',
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
          value: z.string().min(5, 'Minimum 5 characters').max(3000, 'Maximum 3000 characters'),
        }),
      },
    });
    return (
      <TanStackContainerForm>
        <TanStackSectionForm title="Text Field">
          <AppField
            name="value"
            children={({ TextareaField }) => {
              return (
                <TextareaField
                  label="Text Field"
                  description="This is a text field."
                  placeholder="Enter some text"
                  maxLength={3000}
                  orientation="responsive"
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
            children={({ TextareaField }) => {
              return (
                <TextareaField
                  label="Text Field"
                  description="This is a text field."
                  placeholder="Enter some text"
                  maxLength={50}
                  orientation="responsive"
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
