import z from 'zod';

import { useTanStackForm } from '@/components/features/tanstack-form';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  tags: ['autodocs'],
  title: 'Features/TanStack Form/Fields/Simple Radio Group Field',
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const PLAN_OPTIONS = [
  { value: 'free', label: 'Free' },
  { value: 'pro', label: 'Pro' },
  { value: 'enterprise', label: 'Enterprise' },
];

export const Default: Story = {
  render: () => {
    const { AppField, TanStackContainerForm, TanStackSectionForm } = useTanStackForm({
      defaultValues: { plan: null as string | null },
    });
    return (
      <div className="bg-muted-bg-subtle p-6">
        <TanStackContainerForm>
          <TanStackSectionForm title="Simple Radio Group Field">
            <div className="px-4 pb-4">
              <AppField name="plan" children={({ SimpleRadioGroupField }) => <SimpleRadioGroupField label="Plan" options={PLAN_OPTIONS} />} />
            </div>
          </TanStackSectionForm>
        </TanStackContainerForm>
      </div>
    );
  },
};

export const Horizontal: Story = {
  render: () => {
    const { AppField, TanStackContainerForm, TanStackSectionForm } = useTanStackForm({
      defaultValues: { plan: 'pro' as string | null },
    });
    return (
      <div className="bg-muted-bg-subtle p-6">
        <TanStackContainerForm>
          <TanStackSectionForm title="Simple Radio Group Field — Horizontal">
            <div className="px-4 pb-4">
              <AppField
                name="plan"
                children={({ SimpleRadioGroupField }) => <SimpleRadioGroupField label="Plan" options={PLAN_OPTIONS} orientation="horizontal" />}
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
      defaultValues: { plan: null as string | null },
      validators: {
        onChange: z.object({
          plan: z.string().min(1, 'Please select a plan.').nullable(),
        }),
      },
    });
    return (
      <div className="bg-muted-bg-subtle p-6">
        <TanStackContainerForm>
          <TanStackSectionForm title="Simple Radio Group Field — Validation">
            <div className="px-4 pb-4">
              <AppField
                name="plan"
                validators={{
                  onMount: () => 'Please select a plan.',
                }}
                children={({ SimpleRadioGroupField }) => <SimpleRadioGroupField label="Plan" required options={PLAN_OPTIONS} />}
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
      defaultValues: { plan: 'pro' as string | null },
    });
    return (
      <div className="bg-muted-bg-subtle p-6">
        <TanStackContainerForm>
          <TanStackSectionForm title="Simple Radio Group Field — Disabled">
            <div className="px-4 pb-4">
              <AppField name="plan" children={({ SimpleRadioGroupField }) => <SimpleRadioGroupField label="Plan" options={PLAN_OPTIONS} disabled />} />
            </div>
          </TanStackSectionForm>
        </TanStackContainerForm>
      </div>
    );
  },
};
