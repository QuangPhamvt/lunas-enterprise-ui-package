import z from 'zod';

import { useTanStackForm } from '@/components/features/tanstack-form';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  tags: ['autodocs'],
  title: 'Features/TanStack Form/Fields/Simple Email Field',
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const { AppField, TanStackContainerForm, TanStackSectionForm } = useTanStackForm({
      defaultValues: { email: null as string | null },
    });
    return (
      <div className="bg-muted-bg-subtle p-6">
        <TanStackContainerForm>
          <TanStackSectionForm title="Simple Email Field">
            <div className="px-4 pb-4">
              <AppField name="email" children={({ SimpleEmailField }) => <SimpleEmailField label="Email address" placeholder="you@example.com" />} />
            </div>
          </TanStackSectionForm>
        </TanStackContainerForm>
      </div>
    );
  },
};

export const Required: Story = {
  render: () => {
    const { AppField, TanStackContainerForm, TanStackSectionForm } = useTanStackForm({
      defaultValues: { email: null as string | null },
      validators: {
        onChange: z.object({ email: z.string().email('Please enter a valid email.').nullable() }),
      },
    });
    return (
      <div className="bg-muted-bg-subtle p-6">
        <TanStackContainerForm>
          <TanStackSectionForm title="Simple Email Field — Required">
            <div className="px-4 pb-4">
              <AppField name="email" children={({ SimpleEmailField }) => <SimpleEmailField label="Email address" placeholder="you@example.com" required />} />
            </div>
          </TanStackSectionForm>
        </TanStackContainerForm>
      </div>
    );
  },
};

export const WithValidationError: Story = {
  render: () => {
    const { AppField, TanStackContainerForm, TanStackSectionForm } = useTanStackForm({
      defaultValues: { email: 'not-an-email' as string | null },
      validators: {
        onChange: z.object({ email: z.string().email('Please enter a valid email address.').nullable() }),
      },
    });
    return (
      <div className="bg-muted-bg-subtle p-6">
        <TanStackContainerForm>
          <TanStackSectionForm title="Simple Email Field — Validation Error">
            <div className="px-4 pb-4">
              <AppField
                name="email"
                validators={{ onMount: () => 'Please enter a valid email address.' }}
                children={({ SimpleEmailField }) => <SimpleEmailField label="Email address" placeholder="you@example.com" required />}
              />
            </div>
          </TanStackSectionForm>
        </TanStackContainerForm>
      </div>
    );
  },
};

export const Disabled: Story = {
  render: () => {
    const { AppField, TanStackContainerForm, TanStackSectionForm } = useTanStackForm({
      defaultValues: { email: 'tom@example.com' as string | null },
    });
    return (
      <div className="bg-muted-bg-subtle p-6">
        <TanStackContainerForm>
          <TanStackSectionForm title="Simple Email Field — Disabled">
            <div className="px-4 pb-4">
              <AppField name="email" children={({ SimpleEmailField }) => <SimpleEmailField label="Email address" placeholder="you@example.com" disabled />} />
            </div>
          </TanStackSectionForm>
        </TanStackContainerForm>
      </div>
    );
  },
};
