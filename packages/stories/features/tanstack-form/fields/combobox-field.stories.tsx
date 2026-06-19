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

export const Mobile: Story = {
  render: () => {
    const { AppField, TanStackContainerForm, TanStackSectionForm } = useTanStackForm({
      defaultValues: { value: null as string | null },
    });
    return (
      <TanStackContainerForm>
        <TanStackSectionForm title="Combobox Field — Mobile Drawer">
          <AppField
            name="value"
            children={({ ComboboxField }) => (
              <ComboboxField
                label="Country"
                description="On mobile this opens a bottom drawer with search."
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
  parameters: {
    viewport: { defaultViewport: 'iphonex' },
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

export const Clearable: Story = {
  render: () => {
    const { AppField, TanStackContainerForm, TanStackSectionForm } = useTanStackForm({
      defaultValues: {
        country: 'vn' as string | null,
        language: null as string | null,
      },
    });
    return (
      <TanStackContainerForm>
        <TanStackSectionForm title="Combobox Field — Clearable">
          <AppField
            name="country"
            children={({ ComboboxField }) => (
              <ComboboxField
                label="Country"
                description="Pre-selected. Use the × button to clear."
                placeholder="Search country…"
                orientation="responsive"
                clearable
                showErrorMessage
                options={COUNTRIES}
              />
            )}
          />
          <AppField
            name="language"
            children={({ ComboboxField }) => (
              <ComboboxField
                label="Language"
                description="Empty. Select a value, then clear it."
                placeholder="Search language…"
                orientation="responsive"
                clearable
                showErrorMessage
                options={[
                  { label: 'English', value: 'en' },
                  { label: 'Vietnamese', value: 'vi' },
                  { label: 'Japanese', value: 'ja' },
                  { label: 'French', value: 'fr' },
                  { label: 'German', value: 'de' },
                  { label: 'Spanish', value: 'es' },
                ]}
              />
            )}
          />
        </TanStackSectionForm>
      </TanStackContainerForm>
    );
  },
};

export const Disabled: Story = {
  render: () => {
    const { AppField, TanStackContainerForm, TanStackSectionForm } = useTanStackForm({
      defaultValues: {
        country: 'jp' as string | null,
        empty: null as string | null,
      },
    });
    return (
      <TanStackContainerForm>
        <TanStackSectionForm title="Combobox Field — Disabled">
          <AppField
            name="country"
            children={({ ComboboxField }) => (
              <ComboboxField
                label="Country (pre-selected + disabled)"
                description="Has a value but cannot be changed or cleared."
                placeholder="Search country…"
                orientation="responsive"
                disabled
                clearable
                options={COUNTRIES}
              />
            )}
          />
          <AppField
            name="empty"
            children={({ ComboboxField }) => (
              <ComboboxField
                label="Country (empty + disabled)"
                description="Trigger is locked — popover cannot open."
                placeholder="Search country…"
                orientation="responsive"
                disabled
                options={COUNTRIES}
              />
            )}
          />
        </TanStackSectionForm>
      </TanStackContainerForm>
    );
  },
};

export const EmptyOptions: Story = {
  render: () => {
    const { AppField, TanStackContainerForm, TanStackSectionForm } = useTanStackForm({
      defaultValues: { value: null as string | null },
    });
    return (
      <TanStackContainerForm>
        <TanStackSectionForm title="Combobox Field — Empty Options">
          <AppField
            name="value"
            children={({ ComboboxField }) => (
              <ComboboxField
                label="Category"
                description="No options loaded — shows the empty state inside the command menu."
                placeholder="Search category…"
                orientation="responsive"
                showErrorMessage
                options={[]}
              />
            )}
          />
        </TanStackSectionForm>
      </TanStackContainerForm>
    );
  },
};

export const BlurValidation: Story = {
  render: () => {
    const schema = z.object({
      country: z.string({ required_error: 'Please select a country' }).nullable(),
      shipping: z
        .string()
        .refine(v => v !== 'us', { message: 'US is not available in this region.' })
        .nullable(),
    });
    const { AppField, TanStackContainerForm, TanStackSectionForm } = useTanStackForm({
      defaultValues: {
        country: null as string | null,
        shipping: null as string | null,
      },
      validators: { onChange: schema },
    });
    return (
      <TanStackContainerForm>
        <TanStackSectionForm title="Combobox Field — Blur Validation">
          <AppField
            name="country"
            children={({ ComboboxField }) => (
              <ComboboxField
                label="Country"
                description="Open, then close without selecting — error appears on blur."
                placeholder="Search country…"
                orientation="responsive"
                required
                showErrorMessage
                options={COUNTRIES}
              />
            )}
          />
          <AppField
            name="shipping"
            children={({ ComboboxField }) => (
              <ComboboxField
                label="Shipping Country"
                description="Select United States to trigger a business-rule error."
                placeholder="Search country…"
                orientation="responsive"
                clearable
                showErrorMessage
                options={COUNTRIES}
              />
            )}
          />
        </TanStackSectionForm>
      </TanStackContainerForm>
    );
  },
};

export const Orientations: Story = {
  render: () => {
    const { AppField, TanStackContainerForm, TanStackSectionForm } = useTanStackForm({
      defaultValues: {
        horizontal: null as string | null,
        vertical: null as string | null,
        responsive: null as string | null,
      },
    });
    return (
      <TanStackContainerForm>
        <TanStackSectionForm title="Combobox Field — Orientations">
          <AppField
            name="horizontal"
            children={({ ComboboxField }) => (
              <ComboboxField label="Horizontal" description="Label sits to the left." placeholder="Search…" orientation="horizontal" options={COUNTRIES} />
            )}
          />
          <AppField
            name="vertical"
            children={({ ComboboxField }) => (
              <ComboboxField label="Vertical" description="Label sits above." placeholder="Search…" orientation="vertical" options={COUNTRIES} />
            )}
          />
          <AppField
            name="responsive"
            children={({ ComboboxField }) => (
              <ComboboxField label="Responsive" description="Switches by breakpoint." placeholder="Search…" orientation="responsive" options={COUNTRIES} />
            )}
          />
        </TanStackSectionForm>
      </TanStackContainerForm>
    );
  },
};

export const KitchenSink: Story = {
  render: () => {
    const schema = z.object({
      country: z.string().nullable(),
      language: z.string().nullable(),
      locked: z.string().nullable(),
    });
    const { AppField, AppForm, TanStackContainerForm, TanStackSectionForm, TanStackActionsForm } = useTanStackForm({
      defaultValues: {
        country: null as string | null,
        language: 'vi' as string | null,
        locked: 'jp' as string | null,
      } as z.output<typeof schema>,
      validators: { onChange: schema },
      onSubmit: ({ value }) => console.log('Submitted:', value),
    });
    return (
      <div className="size-full bg-muted-bg-subtle p-4">
        <AppForm>
          <TanStackContainerForm>
            <TanStackSectionForm title="Kitchen Sink — all ComboboxField features">
              <AppField
                name="country"
                children={({ ComboboxField }) => (
                  <ComboboxField
                    label="Country"
                    description="Required. Type to filter the list."
                    placeholder="Search country…"
                    orientation="responsive"
                    required
                    showErrorMessage
                    tooltip="Determines your regional settings and available payment methods."
                    helperText="You can update this anytime in your profile settings."
                    options={COUNTRIES}
                  />
                )}
              />
              <AppField
                name="language"
                children={({ ComboboxField }) => (
                  <ComboboxField
                    label="Language"
                    description="Pre-selected. Clearable via × button."
                    placeholder="Search language…"
                    orientation="responsive"
                    clearable
                    showErrorMessage
                    tooltip="Affects date formats and UI text."
                    options={[
                      { label: 'English', value: 'en' },
                      { label: 'Vietnamese', value: 'vi' },
                      { label: 'Japanese', value: 'ja' },
                      { label: 'French', value: 'fr' },
                      { label: 'German', value: 'de' },
                    ]}
                  />
                )}
              />
              <AppField
                name="locked"
                children={({ ComboboxField }) => (
                  <ComboboxField
                    label="Region (read-only)"
                    description="disabled prop — cannot be changed."
                    placeholder="Search…"
                    orientation="responsive"
                    disabled
                    options={COUNTRIES}
                  />
                )}
              />
            </TanStackSectionForm>
            <TanStackActionsForm type="create" />
          </TanStackContainerForm>
        </AppForm>
      </div>
    );
  },
};
