import z from 'zod';

import { useTanStackForm } from '@/components/features/tanstack-form';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  tags: ['autodocs'],
  title: 'Features/TanStack Form/Fields/Simple Password Field',
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const { AppField, TanStackContainerForm, TanStackSectionForm } = useTanStackForm({
      defaultValues: { password: null as string | null },
    });
    return (
      <div className="bg-muted-bg-subtle p-6">
        <TanStackContainerForm>
          <TanStackSectionForm title="Simple Password Field">
            <div className="px-4 pb-4">
              <AppField name="password" children={({ SimplePasswordField }) => <SimplePasswordField label="Password" placeholder="Enter your password" />} />
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
      defaultValues: { password: null as string | null },
      validators: {
        onChange: z.object({ password: z.string().min(8, 'Password must be at least 8 characters.').nullable() }),
      },
    });
    return (
      <div className="bg-muted-bg-subtle p-6">
        <TanStackContainerForm>
          <TanStackSectionForm title="Simple Password Field — Required">
            <div className="px-4 pb-4">
              <AppField
                name="password"
                children={({ SimplePasswordField }) => <SimplePasswordField label="Password" placeholder="Min. 8 characters" required />}
              />
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
      defaultValues: { password: null as string | null },
    });
    return (
      <div className="bg-muted-bg-subtle p-6">
        <TanStackContainerForm>
          <TanStackSectionForm title="Simple Password Field — Validation Error">
            <div className="px-4 pb-4">
              <AppField
                name="password"
                validators={{ onMount: () => 'Password must be at least 8 characters.' }}
                children={({ SimplePasswordField }) => <SimplePasswordField label="Password" placeholder="Min. 8 characters" required />}
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
      defaultValues: { password: 'mysecretpass' as string | null },
    });
    return (
      <div className="bg-muted-bg-subtle p-6">
        <TanStackContainerForm>
          <TanStackSectionForm title="Simple Password Field — Disabled">
            <div className="px-4 pb-4">
              <AppField
                name="password"
                children={({ SimplePasswordField }) => <SimplePasswordField label="Password" placeholder="Enter your password" disabled />}
              />
            </div>
          </TanStackSectionForm>
        </TanStackContainerForm>
      </div>
    );
  },
};
