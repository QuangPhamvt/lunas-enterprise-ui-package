import z from 'zod';

import { useTanStackForm } from '@/components/features/tanstack-form';

import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, waitFor, within } from 'storybook/test';

const meta = {
  tags: ['autodocs'],
  title: 'Features/TanStack Form/Fields/Select Field',
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const { AppField, TanStackContainerForm, TanStackSectionForm } = useTanStackForm({
      defaultValues: {
        value: '',
      },
      validators: {
        onChange: z.object({
          value: z.string(),
        }),
      },
    });
    return (
      <TanStackContainerForm>
        <TanStackSectionForm title="Select Field">
          <AppField
            name="value"
            children={({ SelectField }) => {
              return (
                <SelectField
                  label="Select Field"
                  description="This is a select field."
                  placeholder="Select an option"
                  orientation="responsive"
                  options={[
                    { label: 'Option 1', value: 'option_1' },
                    { label: 'Option 2', value: 'option_2' },
                    { label: 'Option 3', value: 'option_3' },
                    { label: 'Option 4', value: 'option_4' },
                    { label: 'Option 5', value: 'option_5' },
                    { label: 'Option 6', value: 'option_6' },
                    { label: 'Option 7', value: 'option_7' },
                    { label: 'Option 8', value: 'option_8' },
                    { label: 'Option 9', value: 'option_9' },
                    { label: 'Option 10', value: 'option_10' },
                    { label: 'Option 11', value: 'option_11' },
                    { label: 'Option 12', value: 'option_12' },
                    { label: 'Option 13', value: 'option_13' },
                    { label: 'Option 14', value: 'option_14' },
                    { label: 'Option 15', value: 'option_15' },
                    { label: 'Option 16', value: 'option_16' },
                    { label: 'Option 17', value: 'option_17' },
                    { label: 'Option 18', value: 'option_18' },
                    { label: 'Option 19', value: 'option_19' },
                    { label: 'Option 20', value: 'option_20' },
                  ]}
                />
              );
            }}
          />
        </TanStackSectionForm>
      </TanStackContainerForm>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const trigger = canvas.getByRole('combobox');
    await userEvent.click(trigger);

    const listbox = await waitFor(() => within(document.body).getByRole('listbox'));
    const option3 = within(listbox).getByText('Option 3');
    await userEvent.click(option3);

    await waitFor(() => expect(trigger).toHaveTextContent('Option 3'));
  },
};

export const MobileDialog: Story = {
  render: () => {
    const { AppField, TanStackContainerForm, TanStackSectionForm } = useTanStackForm({
      defaultValues: {
        value: null as string | null,
      },
    });
    return (
      <TanStackContainerForm>
        <TanStackSectionForm title="Select Field — Mobile Dialog">
          <AppField
            name="value"
            children={({ SelectField }) => (
              <SelectField
                label="Select Field"
                description="On mobile this opens a centered dialog."
                placeholder="Select an option"
                orientation="responsive"
                clearable
                options={[
                  { label: 'Option 1', value: 'option_1' },
                  { label: 'Option 2', value: 'option_2' },
                  { label: 'Option 3', value: 'option_3' },
                  { label: 'Option 4', value: 'option_4' },
                  { label: 'Option 5', value: 'option_5' },
                ]}
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

export const Submitting: Story = {
  render: () => {
    const { AppField, TanStackContainerForm, TanStackSectionForm } = useTanStackForm({
      defaultState: {
        isSubmitting: true,
      },
      defaultValues: {
        value: '',
      },
      validators: {
        onChange: z.object({
          value: z.string().min(5, 'Minimum 5 characters').max(50, 'Maximum 50 characters'),
        }),
      },
    });
    return (
      <TanStackContainerForm>
        <TanStackSectionForm title="Select Field - Submitting">
          <AppField
            name="value"
            children={({ SelectField }) => {
              return (
                <SelectField
                  label="Select Field"
                  description="This is a select field."
                  placeholder="Select an option"
                  orientation="responsive"
                  options={[
                    { label: 'Option 1', value: 'option_1' },
                    { label: 'Option 2', value: 'option_2' },
                    { label: 'Option 3', value: 'option_3' },
                  ]}
                />
              );
            }}
          />
        </TanStackSectionForm>
      </TanStackContainerForm>
    );
  },
};

const COUNTRY_OPTIONS = [
  { label: 'Vietnam', value: 'vn' },
  { label: 'Japan', value: 'jp' },
  { label: 'United States', value: 'us' },
  { label: 'United Kingdom', value: 'gb' },
  { label: 'Germany', value: 'de' },
  { label: 'France', value: 'fr' },
  { label: 'Australia', value: 'au' },
  { label: 'Canada', value: 'ca' },
];

const ROLE_OPTIONS = [
  { label: 'Viewer', value: 'viewer' },
  { label: 'Editor', value: 'editor' },
  { label: 'Admin', value: 'admin' },
  { label: 'Owner', value: 'owner' },
];

export const Clearable: Story = {
  render: () => {
    const { AppField, TanStackContainerForm, TanStackSectionForm } = useTanStackForm({
      defaultValues: {
        country: 'vn' as string | null,
        role: null as string | null,
      },
    });
    return (
      <TanStackContainerForm>
        <TanStackSectionForm title="Select Field - Clearable">
          <AppField
            name="country"
            children={({ SelectField }) => (
              <SelectField
                label="Country"
                description="Pre-selected. Use the × button to clear the value."
                placeholder="Select a country"
                orientation="responsive"
                clearable
                showErrorMessage
                options={COUNTRY_OPTIONS}
              />
            )}
          />
          <AppField
            name="role"
            children={({ SelectField }) => (
              <SelectField
                label="Role"
                description="Empty. Select a value then clear it."
                placeholder="Select a role"
                orientation="responsive"
                clearable
                showErrorMessage
                options={ROLE_OPTIONS}
              />
            )}
          />
        </TanStackSectionForm>
      </TanStackContainerForm>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Country is pre-selected — clear button should be visible; click it
    const clearBtn = canvas.getByRole('button', { name: /xóa lựa chọn/i });
    await userEvent.click(clearBtn);

    // After clearing, the trigger should show the placeholder
    await waitFor(() => expect(canvas.getAllByText('Select a country')[0]).toBeInTheDocument());

    // Select a role, then clear it
    const [, roleTrigger] = canvas.getAllByRole('combobox');
    await userEvent.click(roleTrigger);
    const listbox = await waitFor(() => within(document.body).getByRole('listbox'));
    await userEvent.click(within(listbox).getByText('Editor'));

    await waitFor(() => {
      const clearBtns = canvas.getAllByRole('button', { name: /xóa lựa chọn/i });
      expect(clearBtns.length).toBeGreaterThan(0);
    });
  },
};

export const Disabled: Story = {
  render: () => {
    const { AppField, TanStackContainerForm, TanStackSectionForm } = useTanStackForm({
      defaultValues: {
        country: 'jp' as string | null,
        role: null as string | null,
      },
    });
    return (
      <TanStackContainerForm>
        <TanStackSectionForm title="Select Field - Disabled">
          <AppField
            name="country"
            children={({ SelectField }) => (
              <SelectField
                label="Country (pre-selected + disabled)"
                description="Has a value but cannot be changed or cleared."
                placeholder="Select a country"
                orientation="responsive"
                disabled
                clearable
                options={COUNTRY_OPTIONS}
              />
            )}
          />
          <AppField
            name="role"
            children={({ SelectField }) => (
              <SelectField
                label="Role (empty + disabled)"
                description="Cannot be opened while disabled."
                placeholder="Select a role"
                orientation="responsive"
                disabled
                options={ROLE_OPTIONS}
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
      country: z
        .string()
        .nullable()
        .refine(v => v !== null, 'Please select a country'),
      role: z
        .string()
        .nullable()
        .refine(v => v !== null, 'Please select a role'),
    });
    const { AppField, TanStackContainerForm, TanStackSectionForm } = useTanStackForm({
      defaultValues: {
        country: 'vn' as string | null,
        role: null as string | null,
      },
      validators: { onChange: schema },
    });
    return (
      <TanStackContainerForm>
        <TanStackSectionForm title="Select Field - Blur Validation">
          <AppField
            name="country"
            children={({ SelectField }) => (
              <SelectField
                label="Country"
                description="Pre-selected. Clear it to see the validation error appear."
                placeholder="Select a country"
                orientation="responsive"
                clearable
                showErrorMessage
                required
                options={COUNTRY_OPTIONS}
              />
            )}
          />
          <AppField
            name="role"
            children={({ SelectField }) => (
              <SelectField
                label="Role"
                description="Select a value then clear it — validation error reappears."
                placeholder="Select a role"
                orientation="responsive"
                clearable
                showErrorMessage
                required
                options={ROLE_OPTIONS}
              />
            )}
          />
        </TanStackSectionForm>
      </TanStackContainerForm>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Country is pre-selected — no error initially (not yet touched)
    expect(canvas.queryByRole('alert')).not.toBeInTheDocument();

    // Clear country → onChange fires with null → refine fails → error shows
    const [countryClear] = canvas.getAllByRole('button', { name: /xóa lựa chọn/i });
    await userEvent.click(countryClear);

    await waitFor(() => {
      const alerts = canvas.getAllByRole('alert');
      expect(alerts[0]).toHaveTextContent('Please select a country');
    });

    // Re-select country → error clears
    const [countryTrigger] = canvas.getAllByRole('combobox');
    await userEvent.click(countryTrigger);
    const listbox1 = await waitFor(() => within(document.body).getByRole('listbox'));
    await userEvent.click(within(listbox1).getByText('Vietnam'));

    await waitFor(() => expect(canvas.getAllByRole('alert')[0]).not.toHaveTextContent('Please select a country'));

    // Select a role then clear it — error appears for role
    const [, roleTrigger] = canvas.getAllByRole('combobox');
    await userEvent.click(roleTrigger);
    const listbox2 = await waitFor(() => within(document.body).getByRole('listbox'));
    await userEvent.click(within(listbox2).getByText('Admin'));

    await waitFor(() => {
      const alerts = canvas.getAllByRole('alert');
      expect(alerts.length).toBeGreaterThanOrEqual(1);
      expect(alerts[alerts.length - 1]).not.toHaveTextContent('Please select a role');
    });

    const [, roleClear] = canvas.getAllByRole('button', { name: /xóa lựa chọn/i });
    await userEvent.click(roleClear);

    await waitFor(() => {
      const alerts = canvas.getAllByRole('alert');
      expect(alerts[alerts.length - 1]).toHaveTextContent('Please select a role');
    });
  },
};

export const EmptyOptions: Story = {
  render: () => {
    const { AppField, TanStackContainerForm, TanStackSectionForm } = useTanStackForm({
      defaultValues: { value: null as string | null },
    });
    return (
      <TanStackContainerForm>
        <TanStackSectionForm title="Select Field - Empty Options">
          <AppField
            name="value"
            children={({ SelectField }) => (
              <SelectField
                label="Category"
                description="No options have been loaded yet — shows the empty state."
                placeholder="Select a category"
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
        <TanStackSectionForm title="Select Field - Orientations">
          <AppField
            name="horizontal"
            children={({ SelectField }) => (
              <SelectField label="Horizontal" description="Label sits to the left." placeholder="Select…" orientation="horizontal" options={ROLE_OPTIONS} />
            )}
          />
          <AppField
            name="vertical"
            children={({ SelectField }) => (
              <SelectField label="Vertical" description="Label sits above." placeholder="Select…" orientation="vertical" options={ROLE_OPTIONS} />
            )}
          />
          <AppField
            name="responsive"
            children={({ SelectField }) => (
              <SelectField
                label="Responsive"
                description="Switches layout by breakpoint."
                placeholder="Select…"
                orientation="responsive"
                options={ROLE_OPTIONS}
              />
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
      role: z.string().nullable(),
      locked: z.string().nullable(),
    });
    const { AppField, AppForm, TanStackContainerForm, TanStackSectionForm, TanStackActionsForm } = useTanStackForm({
      defaultValues: {
        country: null as string | null,
        role: 'editor' as string | null,
        locked: 'admin' as string | null,
      } as z.output<typeof schema>,
      validators: { onChange: schema },
      onSubmit: ({ value }) => console.log('Submitted:', value),
    });
    return (
      <div className="size-full bg-muted-bg-subtle p-4">
        <AppForm>
          <TanStackContainerForm>
            <TanStackSectionForm title="Kitchen Sink — all SelectField features">
              <AppField
                name="country"
                children={({ SelectField }) => (
                  <SelectField
                    label="Country"
                    description="Required. Validates on blur."
                    placeholder="Select a country"
                    orientation="responsive"
                    required
                    showErrorMessage
                    tooltip="Determines your regional settings and tax information."
                    helperText="You can change this later in your profile."
                    options={COUNTRY_OPTIONS}
                  />
                )}
              />
              <AppField
                name="role"
                children={({ SelectField }) => (
                  <SelectField
                    label="Role"
                    description="Pre-selected. Clearable — use the × button."
                    placeholder="Select a role"
                    orientation="responsive"
                    clearable
                    showErrorMessage
                    tooltip="Controls what actions you can perform."
                    options={ROLE_OPTIONS}
                  />
                )}
              />
              <AppField
                name="locked"
                children={({ SelectField }) => (
                  <SelectField
                    label="Plan (read-only)"
                    description="disabled prop — cannot be changed."
                    placeholder="Select a plan"
                    orientation="responsive"
                    disabled
                    options={[
                      { label: 'Free', value: 'free' },
                      { label: 'Pro', value: 'pro' },
                      { label: 'Admin', value: 'admin' },
                    ]}
                  />
                )}
              />
            </TanStackSectionForm>
            <TanStackActionsForm type="update" />
          </TanStackContainerForm>
        </AppForm>
      </div>
    );
  },
};
