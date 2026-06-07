import z from 'zod';

import { useTanStackForm } from '@/components/features/tanstack-form';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  tags: ['autodocs'],
  title: 'Features/TanStack Form/Fields/Simple Boolean Field',
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const CheckboxVariant: Story = {
  render: () => {
    const { AppField, TanStackContainerForm, TanStackSectionForm } = useTanStackForm({
      defaultValues: { agreed: null as boolean | null },
      validators: {
        onChange: z.object({
          agreed: z
            .boolean()
            .refine(v => v === true, { message: 'You must accept the terms.' })
            .nullable(),
        }),
      },
    });
    return (
      <div className="bg-muted-bg-subtle p-6">
        <TanStackContainerForm>
          <TanStackSectionForm title="Simple Boolean Field — Checkbox">
            <div className="px-4 pb-4">
              <AppField
                name="agreed"
                children={({ SimpleBooleanField }) => <SimpleBooleanField label="I accept the terms and conditions" required variant="checkbox" />}
              />
            </div>
          </TanStackSectionForm>
        </TanStackContainerForm>
      </div>
    );
  },
};

export const SwitchVariant: Story = {
  render: () => {
    const { AppField, TanStackContainerForm, TanStackSectionForm } = useTanStackForm({
      defaultValues: { notifications: false as boolean | null },
    });
    return (
      <div className="bg-muted-bg-subtle p-6">
        <TanStackContainerForm>
          <TanStackSectionForm title="Simple Boolean Field — Switch">
            <div className="px-4 pb-4">
              <AppField
                name="notifications"
                children={({ SimpleBooleanField }) => <SimpleBooleanField label="Enable email notifications" variant="switch" />}
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
      defaultValues: { agreed: null as boolean | null },
      validators: {
        onChange: z.object({
          agreed: z
            .boolean()
            .refine(v => v === true, { message: 'You must accept the terms to continue.' })
            .nullable(),
        }),
      },
    });
    return (
      <div className="bg-muted-bg-subtle p-6">
        <TanStackContainerForm>
          <TanStackSectionForm title="Simple Boolean Field — Validation">
            <div className="px-4 pb-4">
              <AppField
                name="agreed"
                validators={{
                  onMount: () => 'You must accept the terms to continue.',
                }}
                children={({ SimpleBooleanField }) => <SimpleBooleanField label="I accept the terms and conditions" required />}
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
      defaultValues: { active: true as boolean | null },
    });
    return (
      <div className="bg-muted-bg-subtle p-6">
        <TanStackContainerForm>
          <TanStackSectionForm title="Simple Boolean Field — Disabled">
            <div className="px-4 pb-4 flex flex-col gap-3">
              <AppField name="active" children={({ SimpleBooleanField }) => <SimpleBooleanField label="Active (checked, disabled)" disabled />} />
              <AppField
                name="active"
                children={({ SimpleBooleanField }) => <SimpleBooleanField label="Active (checked, disabled switch)" disabled variant="switch" />}
              />
            </div>
          </TanStackSectionForm>
        </TanStackContainerForm>
      </div>
    );
  },
};
