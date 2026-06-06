import z from 'zod';

import { useTanStackForm } from '@/components/features/tanstack-form';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  tags: ['autodocs'],
  title: 'Features/TanStack Form/Fields/Simple Select Field',
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const ROLES = [
  { value: 'admin', label: 'Admin' },
  { value: 'editor', label: 'Editor' },
  { value: 'viewer', label: 'Viewer' },
  { value: 'billing', label: 'Billing' },
  { value: 'support', label: 'Support' },
];

export const Default: Story = {
  render: () => {
    const { AppField, TanStackContainerForm, TanStackSectionForm } = useTanStackForm({
      defaultValues: { role: null as string | null },
    });
    return (
      <div className="bg-muted-bg-subtle p-6">
        <TanStackContainerForm>
          <TanStackSectionForm title="Simple Select Field">
            <div className="px-4 pb-4">
              <AppField name="role" children={({ SimpleSelectField }) => <SimpleSelectField label="Role" placeholder="Select a role" options={ROLES} />} />
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
      defaultValues: { role: null as string | null },
      validators: {
        onChange: z.object({
          role: z.string().min(1, 'Please select a role.').nullable(),
        }),
      },
    });
    return (
      <div className="bg-muted-bg-subtle p-6">
        <TanStackContainerForm>
          <TanStackSectionForm title="Simple Select Field — Required">
            <div className="px-4 pb-4">
              <AppField
                name="role"
                children={({ SimpleSelectField }) => <SimpleSelectField label="Role" placeholder="Select a role" required options={ROLES} />}
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
      defaultValues: { role: null as string | null },
    });
    return (
      <div className="bg-muted-bg-subtle p-6">
        <TanStackContainerForm>
          <TanStackSectionForm title="Simple Select Field — Validation Error">
            <div className="px-4 pb-4">
              <AppField
                name="role"
                validators={{ onMount: () => 'Please select a role.' }}
                children={({ SimpleSelectField }) => <SimpleSelectField label="Role" placeholder="Select a role" required options={ROLES} />}
              />
            </div>
          </TanStackSectionForm>
        </TanStackContainerForm>
      </div>
    );
  },
};

export const EmptyOptions: Story = {
  render: () => {
    const { AppField, TanStackContainerForm, TanStackSectionForm } = useTanStackForm({
      defaultValues: { role: null as string | null },
    });
    return (
      <div className="bg-muted-bg-subtle p-6">
        <TanStackContainerForm>
          <TanStackSectionForm title="Simple Select Field — Empty">
            <div className="px-4 pb-4">
              <AppField name="role" children={({ SimpleSelectField }) => <SimpleSelectField label="Role" placeholder="Select a role" options={[]} />} />
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
      defaultValues: { role: 'editor' as string | null },
    });
    return (
      <div className="bg-muted-bg-subtle p-6">
        <TanStackContainerForm>
          <TanStackSectionForm title="Simple Select Field — Disabled">
            <div className="px-4 pb-4">
              <AppField name="role" children={({ SimpleSelectField }) => <SimpleSelectField label="Role" placeholder="Select a role" options={ROLES} />} />
            </div>
          </TanStackSectionForm>
        </TanStackContainerForm>
      </div>
    );
  },
  parameters: {
    tanStackForm: { isSubmitting: true },
  },
};

export const Mobile: Story = {
  render: () => {
    const { AppField, TanStackContainerForm, TanStackSectionForm } = useTanStackForm({
      defaultValues: { role: null as string | null },
    });
    return (
      <div className="bg-muted-bg-subtle p-6">
        <TanStackContainerForm>
          <TanStackSectionForm title="Simple Select Field — Mobile Drawer">
            <div className="px-4 pb-4">
              <AppField
                name="role"
                children={({ SimpleSelectField }) => <SimpleSelectField label="Role" placeholder="Select a role" required options={ROLES} />}
              />
            </div>
          </TanStackSectionForm>
        </TanStackContainerForm>
      </div>
    );
  },
  parameters: {
    viewport: { defaultViewport: 'iphonex' },
  },
};
