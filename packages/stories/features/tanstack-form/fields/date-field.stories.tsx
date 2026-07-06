import z from 'zod';

import { useTanStackForm } from '@/components/features/tanstack-form';

import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, waitFor, within } from 'storybook/test';

const meta = {
  tags: ['autodocs'],
  title: 'Features/TanStack Form/Fields/Date Field',
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const { AppField, TanStackContainerForm, TanStackSectionForm } = useTanStackForm({
      defaultValues: { value: null as Date | null },
    });
    return (
      <TanStackContainerForm>
        <TanStackSectionForm title="Date Field">
          <AppField
            name="value"
            children={({ DateField }) => (
              <DateField label="Due Date" description="Pick a date from the calendar or use a preset." placeholder="Select a date" orientation="responsive" />
            )}
          />
        </TanStackSectionForm>
      </TanStackContainerForm>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Trigger shows placeholder initially
    const trigger = await canvas.findByRole('button', { name: /select a date/i });
    await userEvent.click(trigger);

    // Click the "Hôm nay" preset — popover should close
    const todayBtn = await waitFor(() => within(document.body).getByRole('button', { name: /hôm nay/i }));
    await userEvent.click(todayBtn);

    // Trigger now shows the formatted date (not the placeholder)
    await waitFor(() => expect(canvas.queryByRole('button', { name: /select a date/i })).not.toBeInTheDocument());
  },
};

export const Submitting: Story = {
  render: () => {
    const { AppField, TanStackContainerForm, TanStackSectionForm } = useTanStackForm({
      defaultState: { isSubmitting: true },
      defaultValues: { value: new Date() },
    });
    return (
      <TanStackContainerForm>
        <TanStackSectionForm title="Date Field — Submitting">
          <AppField
            name="value"
            children={({ DateField }) => (
              <DateField
                label="Due Date"
                description="Trigger is disabled while the form is submitting."
                placeholder="Select a date"
                orientation="responsive"
              />
            )}
          />
        </TanStackSectionForm>
      </TanStackContainerForm>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const trigger = await canvas.findByRole('button');
    expect(trigger).toBeDisabled();
  },
};

export const Disabled: Story = {
  render: () => {
    const { AppField, TanStackContainerForm, TanStackSectionForm } = useTanStackForm({
      defaultValues: {
        withValue: new Date() as Date | null,
        empty: null as Date | null,
      },
    });
    return (
      <TanStackContainerForm>
        <TanStackSectionForm title="Date Field — Disabled">
          <AppField
            name="withValue"
            children={({ DateField }) => (
              <DateField
                label="Start Date (pre-selected + disabled)"
                description="Has a value but cannot be changed."
                placeholder="Select a date"
                orientation="responsive"
                disabled
              />
            )}
          />
          <AppField
            name="empty"
            children={({ DateField }) => (
              <DateField
                label="End Date (empty + disabled)"
                description="Cannot be opened while disabled."
                placeholder="Select a date"
                orientation="responsive"
                disabled
              />
            )}
          />
        </TanStackSectionForm>
      </TanStackContainerForm>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const triggers = await canvas.findAllByRole('button');
    triggers.forEach(btn => expect(btn).toBeDisabled());
    expect(within(document.body).queryByRole('listbox')).not.toBeInTheDocument();
  },
};

export const Validation: Story = {
  render: () => {
    const schema = z.object({
      value: z
        .date()
        .nullable()
        .refine(v => v !== null, 'Please select a date'),
    });
    const { AppField, TanStackContainerForm, TanStackSectionForm } = useTanStackForm({
      defaultValues: { value: null as Date | null },
      // onMount pre-computes errors; they're revealed once the field is touched
      validators: { onMount: schema, onChange: schema },
    });
    return (
      <TanStackContainerForm>
        <TanStackSectionForm title="Date Field — Validation">
          <AppField
            name="value"
            children={({ DateField }) => (
              <DateField
                label="Due Date"
                description="Open and close without selecting to see the required-field error."
                placeholder="Select a date"
                orientation="responsive"
                required
                showErrorMessage
              />
            )}
          />
        </TanStackSectionForm>
      </TanStackContainerForm>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // No error initially (field not yet touched)
    expect(canvas.queryByRole('alert')).not.toBeInTheDocument();

    // Open then close without selecting → blur fires → error appears
    const trigger = await canvas.findByRole('button', { name: /select a date/i });
    await userEvent.click(trigger);
    await userEvent.keyboard('{Escape}');

    await waitFor(() => expect(canvas.getByRole('alert')).toHaveTextContent('Please select a date'));

    // Select today → error clears
    await userEvent.click(canvas.getByRole('button', { name: /select a date/i }));
    const todayBtn = await waitFor(() => within(document.body).getByRole('button', { name: /hôm nay/i }));
    await userEvent.click(todayBtn);

    await waitFor(() => expect(canvas.getByRole('alert')).not.toHaveTextContent('Please select a date'));
  },
};

export const WithConstraints: Story = {
  render: () => {
    const today = new Date();
    const minDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 7);
    const maxDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 7);
    const { AppField, TanStackContainerForm, TanStackSectionForm } = useTanStackForm({
      defaultValues: { value: null as Date | null },
    });
    return (
      <TanStackContainerForm>
        <TanStackSectionForm title="Date Field — With Constraints">
          <AppField
            name="value"
            children={({ DateField }) => (
              <DateField
                label="Appointment Date"
                description="Only dates within ±7 days from today are available."
                placeholder="Select a date"
                orientation="responsive"
                minDate={minDate}
                maxDate={maxDate}
              />
            )}
          />
        </TanStackSectionForm>
      </TanStackContainerForm>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await userEvent.click(await canvas.findByRole('button', { name: /select a date/i }));

    // Calendar should be visible
    await waitFor(() => expect(within(document.body).getByRole('grid')).toBeInTheDocument());

    // Close without selecting
    await userEvent.keyboard('{Escape}');
    await waitFor(() => expect(within(document.body).queryByRole('grid')).not.toBeInTheDocument());
  },
};

export const WithTooltip: Story = {
  render: () => {
    const { AppField, TanStackContainerForm, TanStackSectionForm } = useTanStackForm({
      defaultValues: { value: null as Date | null },
    });
    return (
      <TanStackContainerForm>
        <TanStackSectionForm title="Date Field — Tooltip & Helper">
          <AppField
            name="value"
            children={({ DateField }) => (
              <DateField
                label="Contract Expiry"
                description="Date on which the contract expires."
                placeholder="Select a date"
                orientation="responsive"
                tooltip="This date determines when automatic renewal triggers."
                helperText="You will receive a reminder 30 days before this date."
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
        horizontal: null as Date | null,
        vertical: null as Date | null,
        responsive: null as Date | null,
      },
    });
    return (
      <TanStackContainerForm>
        <TanStackSectionForm title="Date Field — Orientations">
          <AppField
            name="horizontal"
            children={({ DateField }) => <DateField label="Horizontal" description="Label sits to the left." placeholder="Select…" orientation="horizontal" />}
          />
          <AppField
            name="vertical"
            children={({ DateField }) => <DateField label="Vertical" description="Label sits above." placeholder="Select…" orientation="vertical" />}
          />
          <AppField
            name="responsive"
            children={({ DateField }) => <DateField label="Responsive" description="Switches by breakpoint." placeholder="Select…" orientation="responsive" />}
          />
        </TanStackSectionForm>
      </TanStackContainerForm>
    );
  },
};

export const KitchenSink: Story = {
  render: () => {
    const schema = z.object({
      start: z
        .date()
        .nullable()
        .refine(v => v !== null, 'Start date is required'),
      end: z.date().nullable(),
      locked: z.date().nullable(),
    });
    const { AppField, AppForm, TanStackContainerForm, TanStackSectionForm, TanStackActionsForm } = useTanStackForm({
      defaultValues: {
        start: null as Date | null,
        end: new Date() as Date | null,
        locked: new Date() as Date | null,
      } as z.output<typeof schema>,
      validators: { onChange: schema },
      onSubmit: ({ value }) => console.log('Submitted:', value),
    });
    return (
      <div className="size-full bg-muted-bg-subtle p-4">
        <AppForm>
          <TanStackContainerForm>
            <TanStackSectionForm title="Kitchen Sink — all DateField features">
              <AppField
                name="start"
                children={({ DateField }) => (
                  <DateField
                    label="Start Date"
                    description="Required. Opens to show validation error."
                    placeholder="Select start date"
                    orientation="responsive"
                    required
                    showErrorMessage
                    tooltip="The project officially begins on this date."
                    helperText="Must be a business day."
                  />
                )}
              />
              <AppField
                name="end"
                children={({ DateField }) => (
                  <DateField
                    label="End Date"
                    description="Pre-selected. Can be changed."
                    placeholder="Select end date"
                    orientation="responsive"
                    showErrorMessage
                  />
                )}
              />
              <AppField
                name="locked"
                children={({ DateField }) => (
                  <DateField
                    label="Review Date (read-only)"
                    description="disabled prop — cannot be changed."
                    placeholder="Select date"
                    orientation="responsive"
                    disabled
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
