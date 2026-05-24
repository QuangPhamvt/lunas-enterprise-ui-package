import z from 'zod';

import { useTanStackForm } from '@/components/features/tanstack-form';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  tags: ['autodocs'],
  title: 'Features/TanStack Form/Fields/Email Field',
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const { AppField, TanStackContainerForm, TanStackSectionForm } = useTanStackForm({
      defaultValues: {
        value: null as string | null,
      },
      validators: {
        onChange: z.object({
          value: z.string().email('Please enter a valid email address').nullable(),
        }),
      },
    });
    return (
      <TanStackContainerForm>
        <TanStackSectionForm title="Email Field">
          <AppField
            name="value"
            children={({ EmailField }) => (
              <EmailField
                label="Email Address"
                description="We'll use this to send you account notifications."
                placeholder="you@example.com"
                orientation="responsive"
                required
                showErrorMessage
              />
            )}
          />
        </TanStackSectionForm>
      </TanStackContainerForm>
    );
  },
};

export const WithTooltip: Story = {
  render: () => {
    const { AppField, TanStackContainerForm, TanStackSectionForm } = useTanStackForm({
      defaultValues: {
        value: null as string | null,
      },
    });
    return (
      <TanStackContainerForm>
        <TanStackSectionForm title="Email Field — Tooltip">
          <AppField
            name="value"
            children={({ EmailField }) => (
              <EmailField
                label="Work Email"
                description="Used for team collaboration and notifications."
                placeholder="name@company.com"
                orientation="responsive"
                tooltip="Must be a valid email address from your organization's domain."
                helperText="Personal email addresses are not accepted for this field."
                showErrorMessage
              />
            )}
          />
        </TanStackSectionForm>
      </TanStackContainerForm>
    );
  },
};

export const Submitting: Story = {
  render: () => {
    const { AppField, TanStackContainerForm, TanStackSectionForm } = useTanStackForm({
      defaultState: { isSubmitting: true },
      defaultValues: { value: 'user@example.com' as string | null },
    });
    return (
      <TanStackContainerForm>
        <TanStackSectionForm title="Email Field — Submitting">
          <AppField
            name="value"
            children={({ EmailField }) => <EmailField label="Email Address" placeholder="you@example.com" orientation="responsive" showErrorMessage />}
          />
        </TanStackSectionForm>
      </TanStackContainerForm>
    );
  },
};
