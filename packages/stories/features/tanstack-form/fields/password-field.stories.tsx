import z from 'zod';

import { useTanStackForm } from '@/components/features/tanstack-form';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  tags: ['autodocs'],
  title: 'Features/TanStack Form/Fields/Password Field',
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const passwordSchema = z.object({
  value: z
    .string()
    .min(8, 'Must be at least 8 characters')
    .regex(/[A-Z]/, 'Must contain an uppercase letter')
    .regex(/[a-z]/, 'Must contain a lowercase letter')
    .regex(/[0-9]/, 'Must contain a number')
    .nullable(),
});

export const Default: Story = {
  render: () => {
    const { AppField, TanStackContainerForm, TanStackSectionForm } = useTanStackForm({
      defaultValues: { value: null as string | null },
      validators: { onChange: passwordSchema },
    });
    return (
      <TanStackContainerForm>
        <TanStackSectionForm title="Password Field">
          <AppField
            name="value"
            children={({ PasswordField }) => (
              <PasswordField
                label="Password"
                description="Use a mix of letters, numbers, and symbols for a stronger password."
                placeholder="Enter your password"
                orientation="responsive"
                helperText="Minimum 8 characters — uppercase, lowercase, and a number required."
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
      defaultValues: { value: null as string | null },
    });
    return (
      <TanStackContainerForm>
        <TanStackSectionForm title="Password Field — Tooltip">
          <AppField
            name="value"
            children={({ PasswordField }) => (
              <PasswordField
                label="New Password"
                placeholder="Enter a strong password"
                orientation="responsive"
                tooltip="Your password is encrypted with AES-256 and never stored in plain text."
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
      defaultValues: { value: 'MyPassword123' as string | null },
    });
    return (
      <TanStackContainerForm>
        <TanStackSectionForm title="Password Field — Submitting">
          <AppField
            name="value"
            children={({ PasswordField }) => <PasswordField label="Password" placeholder="Enter your password" orientation="responsive" showErrorMessage />}
          />
        </TanStackSectionForm>
      </TanStackContainerForm>
    );
  },
};
