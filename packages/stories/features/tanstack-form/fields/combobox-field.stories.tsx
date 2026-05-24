import z from 'zod';

import { useTanStackForm } from '@/components/features/tanstack-form';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  tags: ['autodocs'],
  title: 'Features/TanStack Form/Fields/Combobox Field',
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
      defaultValues: { value: null as string | null },
      validators: {
        onChange: z.object({
          value: z.string().min(1, 'Please select a country').nullable(),
        }),
      },
    });
    return (
      <TanStackContainerForm>
        <TanStackSectionForm title="Combobox Field">
          <AppField
            name="value"
            children={({ ComboboxField }) => (
              <ComboboxField
                label="Country"
                description="Select your country of residence."
                placeholder="Search country…"
                orientation="responsive"
                options={COUNTRIES}
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
        <TanStackSectionForm title="Combobox Field — Tooltip">
          <AppField
            name="value"
            children={({ ComboboxField }) => (
              <ComboboxField
                label="Billing Country"
                description="Used to calculate applicable taxes and shipping rates."
                placeholder="Search country…"
                orientation="responsive"
                tooltip="This must match the country registered on your payment method."
                options={COUNTRIES}
              />
            )}
          />
        </TanStackSectionForm>
      </TanStackContainerForm>
    );
  },
};

export const WithValidation: Story = {
  render: () => {
    const { AppField, TanStackContainerForm, TanStackSectionForm } = useTanStackForm({
      defaultValues: { value: null as string | null },
      validators: {
        onChange: z.object({
          value: z
            .string()
            .refine(v => v !== 'us', { message: 'US is not available in this region.' })
            .nullable(),
        }),
      },
    });
    return (
      <TanStackContainerForm>
        <TanStackSectionForm title="Combobox Field — Validation">
          <AppField
            name="value"
            children={({ ComboboxField }) => (
              <ComboboxField
                label="Shipping Country"
                description="Select United States to see the validation error."
                placeholder="Search country…"
                orientation="responsive"
                options={COUNTRIES}
              />
            )}
          />
        </TanStackSectionForm>
      </TanStackContainerForm>
    );
  },
};
