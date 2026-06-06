import z from 'zod';

import { useTanStackForm } from '@/components/features/tanstack-form';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  tags: ['autodocs'],
  title: 'Features/TanStack Form/Fields/Simple Combobox Field',
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const COUNTRIES = [
  { label: 'Australia', value: 'au' },
  { label: 'Brazil', value: 'br' },
  { label: 'Canada', value: 'ca' },
  { label: 'France', value: 'fr' },
  { label: 'Germany', value: 'de' },
  { label: 'India', value: 'in' },
  { label: 'Japan', value: 'jp' },
  { label: 'Mexico', value: 'mx' },
  { label: 'Netherlands', value: 'nl' },
  { label: 'South Korea', value: 'kr' },
  { label: 'Spain', value: 'es' },
  { label: 'Sweden', value: 'se' },
  { label: 'United Kingdom', value: 'gb' },
  { label: 'United States', value: 'us' },
  { label: 'Vietnam', value: 'vn' },
];

export const Default: Story = {
  render: () => {
    const { AppField, TanStackContainerForm, TanStackSectionForm } = useTanStackForm({
      defaultValues: { country: null as string | null },
    });
    return (
      <div className="bg-muted-bg-subtle p-6">
        <TanStackContainerForm>
          <TanStackSectionForm title="Simple Combobox Field">
            <div className="px-4 pb-4">
              <AppField
                name="country"
                children={({ SimpleComboboxField }) => <SimpleComboboxField label="Country" placeholder="Search country…" options={COUNTRIES} />}
              />
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
      defaultValues: { country: null as string | null },
      validators: {
        onChange: z.object({
          country: z.string().min(1, 'Please select a country.').nullable(),
        }),
      },
    });
    return (
      <div className="bg-muted-bg-subtle p-6">
        <TanStackContainerForm>
          <TanStackSectionForm title="Simple Combobox Field — Required">
            <div className="px-4 pb-4">
              <AppField
                name="country"
                children={({ SimpleComboboxField }) => <SimpleComboboxField label="Country" placeholder="Search country…" required options={COUNTRIES} />}
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
      defaultValues: { country: null as string | null },
      validators: {
        onChange: z.object({
          country: z
            .string()
            .refine(v => v !== 'us', { message: 'United States is not available in this region.' })
            .nullable(),
        }),
      },
    });
    return (
      <div className="bg-muted-bg-subtle p-6">
        <TanStackContainerForm>
          <TanStackSectionForm title="Simple Combobox Field — Validation">
            <div className="px-4 pb-4">
              <AppField
                name="country"
                children={({ SimpleComboboxField }) => (
                  <SimpleComboboxField label="Country" placeholder="Search country… (select US to see error)" options={COUNTRIES} />
                )}
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
      defaultValues: { country: 'jp' as string | null },
    });
    return (
      <div className="bg-muted-bg-subtle p-6">
        <TanStackContainerForm>
          <TanStackSectionForm title="Simple Combobox Field — Disabled">
            <div className="px-4 pb-4">
              <AppField
                name="country"
                children={({ SimpleComboboxField }) => <SimpleComboboxField label="Country" placeholder="Search country…" disabled options={COUNTRIES} />}
              />
            </div>
          </TanStackSectionForm>
        </TanStackContainerForm>
      </div>
    );
  },
};

export const Mobile: Story = {
  render: () => {
    const { AppField, TanStackContainerForm, TanStackSectionForm } = useTanStackForm({
      defaultValues: { country: null as string | null },
    });
    return (
      <div className="bg-muted-bg-subtle p-6">
        <TanStackContainerForm>
          <TanStackSectionForm title="Simple Combobox Field — Mobile Drawer">
            <div className="px-4 pb-4">
              <AppField
                name="country"
                children={({ SimpleComboboxField }) => <SimpleComboboxField label="Country" placeholder="Search country…" required options={COUNTRIES} />}
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
