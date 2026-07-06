import z from 'zod';

import { useTanStackForm } from '@/components/features/tanstack-form';

import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, waitFor, within } from 'storybook/test';

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
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Open the combobox popover
    const trigger = await canvas.findByRole('button', { name: /search country/i });
    await userEvent.click(trigger);

    // Type to filter options
    const searchInput = await waitFor(() => within(document.body).getByPlaceholderText(/search country/i));
    await userEvent.type(searchInput, 'viet');

    // Select Vietnam
    const option = await waitFor(() => within(document.body).getByRole('option', { name: 'Vietnam' }));
    await userEvent.click(option);

    // Trigger now shows selected label
    await waitFor(() => expect(canvas.getByRole('button', { name: /vietnam/i })).toBeInTheDocument());
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

export const MobileDialog: Story = {
  render: () => {
    const { AppField, TanStackContainerForm, TanStackSectionForm } = useTanStackForm({
      defaultValues: { value: null as string | null },
    });
    return (
      <TanStackContainerForm>
        <TanStackSectionForm title="Combobox Field — Mobile Dialog">
          <AppField
            name="value"
            children={({ ComboboxField }) => (
              <ComboboxField
                label="Country"
                description="On mobile this opens a bottom dialog with search."
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
                showErrorMessage
                options={COUNTRIES}
              />
            )}
          />
        </TanStackSectionForm>
      </TanStackContainerForm>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const trigger = canvas.getByRole('button', { name: /search country/i });
    await userEvent.click(trigger);

    const searchInput = await waitFor(() => within(document.body).getByPlaceholderText(/search country/i));
    await userEvent.type(searchInput, 'united states');

    const option = await waitFor(() => within(document.body).getByRole('option', { name: 'United States' }));
    await userEvent.click(option);

    await waitFor(() => expect(canvas.getByRole('alert')).toHaveTextContent('US is not available in this region.'));
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
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Country is pre-selected (Vietnam) — clear it
    const [countryClear] = canvas.getAllByRole('button', { name: /xóa lựa chọn/i });
    await userEvent.click(countryClear);

    await waitFor(() => expect(canvas.getByRole('button', { name: /search country/i })).toBeInTheDocument());

    // Re-select Japan via the combobox
    await userEvent.click(canvas.getByRole('button', { name: /search country/i }));
    const searchInput = await waitFor(() => within(document.body).getByPlaceholderText(/search country/i));
    await userEvent.type(searchInput, 'japan');
    await userEvent.click(await waitFor(() => within(document.body).getByRole('option', { name: 'Japan' })));

    await waitFor(() => expect(canvas.getByRole('button', { name: /japan/i })).toBeInTheDocument());

    // Select a language then clear it
    await userEvent.click(canvas.getByRole('button', { name: /search language/i }));
    const langInput = await waitFor(() => within(document.body).getByPlaceholderText(/search language/i));
    await userEvent.type(langInput, 'english');
    await userEvent.click(await waitFor(() => within(document.body).getByRole('option', { name: 'English' })));

    await waitFor(() => expect(canvas.getByRole('button', { name: /english/i })).toBeInTheDocument());

    const [, langClear] = canvas.getAllByRole('button', { name: /xóa lựa chọn/i });
    await userEvent.click(langClear);

    await waitFor(() => expect(canvas.getByRole('button', { name: /search language/i })).toBeInTheDocument());
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
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const disabledTriggers = canvas.getAllByRole('button').filter(b => b.hasAttribute('disabled'));
    expect(disabledTriggers).toHaveLength(2);
    disabledTriggers.forEach(btn => expect(btn).toBeDisabled());

    // No popover/listbox should be open
    expect(within(document.body).queryByRole('listbox')).not.toBeInTheDocument();
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
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await userEvent.click(canvas.getByRole('button', { name: /search category/i }));

    await waitFor(() => expect(within(document.body).getByText(/không tìm thấy kết quả nào phù hợp/i)).toBeInTheDocument());
  },
};

export const BlurValidation: Story = {
  render: () => {
    const schema = z.object({
      country: z
        .string()
        .nullable()
        .refine(v => v !== null, 'Please select a country'),
      shipping: z
        .string()
        .nullable()
        .refine(v => v !== 'us', { message: 'US is not available in this region.' }),
    });
    const { AppField, TanStackContainerForm, TanStackSectionForm } = useTanStackForm({
      defaultValues: {
        country: 'vn' as string | null,
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
                description="Pre-selected. Clear it to see the required-field error."
                placeholder="Search country…"
                orientation="responsive"
                clearable
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
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Country pre-selected (Vietnam) — no errors initially (not yet touched)
    expect(canvas.queryByRole('alert')).not.toBeInTheDocument();

    // Clear country → onChange fires with null → required error shows
    const [countryClear] = canvas.getAllByRole('button', { name: /xóa lựa chọn/i });
    await userEvent.click(countryClear);

    await waitFor(() => expect(canvas.getAllByRole('alert')[0]).toHaveTextContent('Please select a country'));

    // After clearing, both fields show "Search country…" — country is [0], shipping is [1]
    const [countryTrigger] = canvas.getAllByRole('button', { name: /search country/i });
    await userEvent.click(countryTrigger);
    const countryInput = await waitFor(() => within(document.body).getByPlaceholderText(/search country/i));
    await userEvent.type(countryInput, 'vietnam');
    await userEvent.click(await waitFor(() => within(document.body).getByRole('option', { name: 'Vietnam' })));

    // Country now shows "Vietnam" — error clears
    await waitFor(() => expect(canvas.getAllByRole('alert')[0]).not.toHaveTextContent('Please select a country'));

    // Now only the shipping trigger matches "Search country…"
    const shippingTrigger = canvas.getByRole('button', { name: /search country/i });
    await userEvent.click(shippingTrigger);
    const shippingInput = await waitFor(() => within(document.body).getByPlaceholderText(/search country/i));
    await userEvent.type(shippingInput, 'united states');
    await userEvent.click(await waitFor(() => within(document.body).getByRole('option', { name: 'United States' })));

    await waitFor(() => {
      const alerts = canvas.getAllByRole('alert');
      expect(alerts[alerts.length - 1]).toHaveTextContent('US is not available in this region.');
    });
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
