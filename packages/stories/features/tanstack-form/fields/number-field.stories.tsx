import z from 'zod';

import { useTanStackForm } from '@/components/features/tanstack-form';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  tags: ['autodocs'],
  title: 'Features/TanStack Form/Fields/Number Field',
} satisfies Meta;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const { AppField, TanStackContainerForm, TanStackSectionForm } = useTanStackForm({
      defaultValues: {
        value: 0,
      },
      listeners: {
        onChange: ({ fieldApi }) => {
          console.log('Number Field Changed:', fieldApi.state.value);
        },
      },
      validators: {
        onChange: z.object({
          value: z.number().gte(5, 'Minimum 5').lte(3000, 'Maximum 3000'),
        }),
      },
    });
    return (
      <TanStackContainerForm>
        <TanStackSectionForm title="Number Field">
          <AppField
            name="value"
            children={({ NumberField }) => {
              return (
                <NumberField
                  label="Number Field"
                  description="This is a Number field."
                  placeholder="Enter some Number"
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
        value: 0,
      },
      validators: {
        onChange: z.object({
          value: z.number().gte(5, 'Minimum 5').lte(50, 'Maximum 50'),
        }),
      },
    });
    return (
      <TanStackContainerForm>
        <TanStackSectionForm title="Number Field - Submitting">
          <AppField
            name="value"
            children={({ NumberField }) => {
              return (
                <NumberField
                  label="Number Field"
                  description="This is a number field."
                  placeholder="Enter some number"
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
