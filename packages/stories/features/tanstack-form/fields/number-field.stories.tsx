import z from 'zod';

import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, waitFor, within } from 'storybook/test';

import { useTanStackForm } from '@/components/features/tanstack-form';

const meta = {
  tags: ['autodocs'],
  title: 'Features/TanStack Form/Fields/Number Field',
} satisfies Meta;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const { AppField, TanStackContainerForm, TanStackSectionForm } = useTanStackForm({
      defaultValues: {
        value: null as number | null,
      },
      validators: {
        onChange: z.object({
          value: z.number({ error: 'Required' }).gte(5, 'Minimum 5').lte(3000, 'Maximum 3,000'),
        }),
      },
    });
    return (
      <TanStackContainerForm>
        <TanStackSectionForm title="Number Field">
          <AppField
            name="value"
            children={({ NumberField }) => (
              <NumberField
                label="Quantity"
                description="Must be between 5 and 3,000."
                placeholder="Enter a number"
                orientation="responsive"
                helperText="Helper text for additional context."
                showErrorMessage
                required
              />
            )}
          />
        </TanStackSectionForm>
      </TanStackContainerForm>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole('textbox');

    // starts empty — no error before interaction
    await expect(input).toHaveValue('');
    await expect(canvas.queryByRole('alert')).not.toBeInTheDocument();

    // typing a valid value — no error shown
    await userEvent.type(input, '100');
    await expect(input).toHaveValue('100');
    await expect(canvas.getByRole('alert')).not.toHaveTextContent('Minimum 5');

    // clear then type a value below minimum — error appears
    await userEvent.clear(input);
    await userEvent.type(input, '2');
    await waitFor(() => expect(canvas.getByRole('alert')).toHaveTextContent('Minimum 5'));

    // fix the value — error clears
    await userEvent.clear(input);
    await userEvent.type(input, '10');
    await waitFor(() => expect(canvas.getByRole('alert')).not.toHaveTextContent('Minimum 5'));
  },
};

export const Submitting: Story = {
  render: () => {
    const { AppField, TanStackContainerForm, TanStackSectionForm } = useTanStackForm({
      defaultState: {
        isSubmitting: true,
      },
      defaultValues: {
        value: 42 as number | null,
      },
      validators: {
        onChange: z.object({
          value: z.number().gte(5, 'Minimum 5').lte(50, 'Maximum 50'),
        }),
      },
    });
    return (
      <TanStackContainerForm>
        <TanStackSectionForm title="Number Field — Submitting">
          <AppField
            name="value"
            children={({ NumberField }) => (
              <NumberField
                label="Quantity"
                description="Disabled while the form is submitting."
                placeholder="Enter a number"
                orientation="responsive"
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
    const input = canvas.getByRole('textbox');

    // input is disabled while form is submitting
    await expect(input).toBeDisabled();

    // spinner is shown, ban icon is hidden
    await expect(canvas.queryByRole('alert')).not.toBeInTheDocument();
  },
};

export const WithUnit: Story = {
  render: () => {
    const { AppField, TanStackContainerForm, TanStackSectionForm } = useTanStackForm({
      defaultValues: {
        weight: null as number | null,
        percentage: null as number | null,
        price: null as number | null,
      },
    });
    return (
      <TanStackContainerForm>
        <TanStackSectionForm title="Number Field — Unit Labels">
          <AppField
            name="weight"
            children={({ NumberField }) => <NumberField label="Weight" placeholder="0" unit="kg" orientation="responsive" showErrorMessage />}
          />
          <AppField
            name="percentage"
            children={({ NumberField }) => (
              <NumberField label="Discount" placeholder="0" unit="%" decimalPlaces={1} orientation="responsive" showErrorMessage />
            )}
          />
          <AppField
            name="price"
            children={({ NumberField }) => <NumberField label="Price" placeholder="0" unit="USD" decimalPlaces={2} orientation="responsive" showErrorMessage />}
          />
        </TanStackSectionForm>
      </TanStackContainerForm>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // all unit labels are rendered
    await expect(canvas.getByText('kg')).toBeInTheDocument();
    await expect(canvas.getByText('%')).toBeInTheDocument();
    await expect(canvas.getByText('USD')).toBeInTheDocument();

    // typing into the weight field works
    const inputs = canvas.getAllByRole('textbox');
    await userEvent.type(inputs[0], '75');
    await expect(inputs[0]).toHaveValue('75');
  },
};

export const AllowNegative: Story = {
  render: () => {
    const { AppField, TanStackContainerForm, TanStackSectionForm } = useTanStackForm({
      defaultValues: {
        temperature: null as number | null,
        adjustment: null as number | null,
      },
      validators: {
        onChange: z.object({
          temperature: z.number().min(-100, 'Min −100').max(100, 'Max 100').nullable(),
          adjustment: z.number().nullable(),
        }),
      },
    });
    return (
      <TanStackContainerForm>
        <TanStackSectionForm title="Number Field — Allow Negative">
          <AppField
            name="temperature"
            children={({ NumberField }) => (
              <NumberField
                label="Temperature"
                description="Accepts values from −100 to 100."
                placeholder="e.g. −5"
                unit="°C"
                allowNegative
                orientation="responsive"
                showErrorMessage
              />
            )}
          />
          <AppField
            name="adjustment"
            children={({ NumberField }) => (
              <NumberField
                label="Price Adjustment"
                description="Positive or negative offset."
                placeholder="e.g. −50"
                unit="USD"
                allowNegative
                decimalPlaces={2}
                orientation="responsive"
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
    const inputs = canvas.getAllByRole('textbox');

    // negative numbers are accepted
    await userEvent.type(inputs[0], '-5');
    await expect(inputs[0]).toHaveValue('-5');

    // values exceeding the max trigger an error
    await userEvent.clear(inputs[0]);
    await userEvent.type(inputs[0], '200');
    await waitFor(() => expect(canvas.getByRole('alert')).toHaveTextContent('Max 100'));

    // a positive-only field does not accept the minus character
    await userEvent.clear(inputs[0]);
    await userEvent.type(inputs[1], '25.50');
    await expect(inputs[1]).toHaveValue('25.50');
  },
};

export const WithDecimalPlaces: Story = {
  render: () => {
    const { AppField, TanStackContainerForm, TanStackSectionForm } = useTanStackForm({
      defaultValues: {
        integer: null as number | null,
        oneDecimal: null as number | null,
        twoDecimal: null as number | null,
      },
    });
    return (
      <TanStackContainerForm>
        <TanStackSectionForm title="Number Field — Decimal Places">
          <AppField
            name="integer"
            children={({ NumberField }) => (
              <NumberField
                label="Whole Numbers Only"
                description="decimalPlaces=0 — no decimal input allowed."
                placeholder="0"
                decimalPlaces={0}
                orientation="responsive"
                showErrorMessage
              />
            )}
          />
          <AppField
            name="oneDecimal"
            children={({ NumberField }) => (
              <NumberField
                label="One Decimal Place"
                description="decimalPlaces=1"
                placeholder="0.0"
                decimalPlaces={1}
                orientation="responsive"
                showErrorMessage
              />
            )}
          />
          <AppField
            name="twoDecimal"
            children={({ NumberField }) => (
              <NumberField
                label="Two Decimal Places"
                description="decimalPlaces=2 (default)"
                placeholder="0.00"
                decimalPlaces={2}
                orientation="responsive"
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
    const inputs = canvas.getAllByRole('textbox');

    // all three inputs render enabled and empty
    await expect(inputs).toHaveLength(3);
    for (const input of inputs) {
      await expect(input).not.toBeDisabled();
      await expect(input).toHaveValue('');
    }

    // two-decimal field accepts fractional input
    await userEvent.type(inputs[2], '3.14');
    await expect(inputs[2]).toHaveValue('3.14');
  },
};

export const Disabled: Story = {
  render: () => {
    const { AppField, TanStackContainerForm, TanStackSectionForm } = useTanStackForm({
      defaultValues: {
        locked: 9999 as number | null,
        empty: null as number | null,
      },
    });
    return (
      <TanStackContainerForm>
        <TanStackSectionForm title="Number Field — Disabled">
          <AppField
            name="locked"
            children={({ NumberField }) => (
              <NumberField
                label="Locked Value"
                description="disabled prop prevents all interaction."
                unit="pcs"
                orientation="responsive"
                disabled
                showErrorMessage
              />
            )}
          />
          <AppField
            name="empty"
            children={({ NumberField }) => (
              <NumberField
                label="Empty Disabled"
                description="Disabled with no pre-filled value."
                placeholder="N/A"
                orientation="responsive"
                disabled
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
    const inputs = canvas.getAllByRole('textbox');

    // both inputs are disabled
    for (const input of inputs) {
      await expect(input).toBeDisabled();
    }

    // no error containers rendered
    await expect(canvas.queryByRole('alert')).not.toBeInTheDocument();
  },
};

export const ValidationError: Story = {
  render: () => {
    const { AppField, TanStackContainerForm, TanStackSectionForm } = useTanStackForm({
      defaultValues: {
        stock: null as number | null,
      },
      validators: {
        onChange: z.object({
          stock: z.number({ error: 'Trường này là bắt buộc' }).int('Must be a whole number').min(1, 'Must be at least 1').max(500, 'Cannot exceed 500'),
        }),
      },
    });
    return (
      <TanStackContainerForm>
        <TanStackSectionForm title="Number Field — Validation Error">
          <AppField
            name="stock"
            children={({ NumberField }) => (
              <NumberField
                label="Stock Count"
                description="Integer between 1 and 500."
                placeholder="Enter stock"
                unit="pcs"
                decimalPlaces={0}
                orientation="responsive"
                showErrorMessage
                required
              />
            )}
          />
        </TanStackSectionForm>
      </TanStackContainerForm>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole('textbox');

    // no error before interaction
    await expect(canvas.queryByRole('alert')).not.toBeInTheDocument();

    // typing 0 — below minimum
    await userEvent.type(input, '0');
    await waitFor(() => expect(canvas.getByRole('alert')).toHaveTextContent('Must be at least 1'));

    // fix to valid value — error disappears
    await userEvent.clear(input);
    await userEvent.type(input, '50');
    await waitFor(() => expect(canvas.getByRole('alert')).not.toHaveTextContent('Must be at least 1'));

    // exceed the maximum
    await userEvent.clear(input);
    await userEvent.type(input, '600');
    await waitFor(() => expect(canvas.getByRole('alert')).toHaveTextContent('Cannot exceed 500'));
  },
};

export const Orientations: Story = {
  render: () => {
    const { AppField, TanStackContainerForm, TanStackSectionForm } = useTanStackForm({
      defaultValues: {
        horizontal: null as number | null,
        vertical: null as number | null,
        responsive: null as number | null,
      },
    });
    return (
      <TanStackContainerForm>
        <TanStackSectionForm title="Number Field — Orientations">
          <AppField
            name="horizontal"
            children={({ NumberField }) => (
              <NumberField label="Horizontal" description="Label sits to the left of the input." placeholder="0" orientation="horizontal" showErrorMessage />
            )}
          />
          <AppField
            name="vertical"
            children={({ NumberField }) => (
              <NumberField label="Vertical" description="Label sits above the input." placeholder="0" orientation="vertical" showErrorMessage />
            )}
          />
          <AppField
            name="responsive"
            children={({ NumberField }) => (
              <NumberField label="Responsive" description="Switches layout at the breakpoint." placeholder="0" orientation="responsive" showErrorMessage />
            )}
          />
        </TanStackSectionForm>
      </TanStackContainerForm>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const inputs = canvas.getAllByRole('textbox');

    // all three orientations render enabled, empty inputs
    await expect(inputs).toHaveLength(3);
    for (const input of inputs) {
      await expect(input).not.toBeDisabled();
      await expect(input).toHaveValue('');
    }

    // each input accepts independent values
    await userEvent.type(inputs[0], '1');
    await userEvent.type(inputs[1], '2');
    await userEvent.type(inputs[2], '3');
    await expect(inputs[0]).toHaveValue('1');
    await expect(inputs[1]).toHaveValue('2');
    await expect(inputs[2]).toHaveValue('3');
  },
};

export const KitchenSink: Story = {
  render: () => {
    const schema = z.object({
      quantity: z.number({ error: 'Trường này là bắt buộc' }).int().min(1, 'At least 1').max(999, 'Max 999'),
      price: z.number({ error: 'Trường này là bắt buộc' }).min(0.01, 'Must be positive').max(99999, 'Max $99,999'),
      discount: z.number().min(0, 'Min 0%').max(100, 'Max 100%').nullable(),
      temperature: z.number().min(-273, 'Below absolute zero').max(1000, 'Too hot').nullable(),
    });

    const { AppField, AppForm, TanStackContainerForm, TanStackSectionForm, TanStackActionsForm } = useTanStackForm({
      defaultValues: {
        quantity: null as number | null,
        price: null as number | null,
        discount: 10 as number | null,
        temperature: null as number | null,
      } as z.output<typeof schema>,
      validators: { onChange: schema },
      onSubmit: ({ value }) => console.log('Submitted:', value),
    });

    return (
      <div className="size-full bg-muted-bg-subtle p-4">
        <AppForm>
          <TanStackContainerForm>
            <TanStackSectionForm title="Kitchen Sink — all NumberField features">
              <AppField
                name="quantity"
                children={({ NumberField }) => (
                  <NumberField
                    label="Quantity"
                    description="Integer 1–999. Required."
                    placeholder="0"
                    unit="pcs"
                    decimalPlaces={0}
                    orientation="responsive"
                    showErrorMessage
                    required
                    tooltip="Number of units to order."
                    helperText="Contact procurement for quantities over 999."
                  />
                )}
              />
              <AppField
                name="price"
                children={({ NumberField }) => (
                  <NumberField
                    label="Unit Price"
                    description="Max 2 decimal places. Required."
                    placeholder="0.00"
                    unit="USD"
                    decimalPlaces={2}
                    rounding="nearest"
                    orientation="responsive"
                    showErrorMessage
                    required
                    tooltip="Price per unit before discount."
                  />
                )}
              />
              <AppField
                name="discount"
                children={({ NumberField }) => (
                  <NumberField
                    label="Discount"
                    description="Pre-filled at 10%. Optional."
                    placeholder="0"
                    unit="%"
                    decimalPlaces={1}
                    orientation="responsive"
                    showErrorMessage
                    tooltip="Applied to the final invoice."
                  />
                )}
              />
              <AppField
                name="temperature"
                children={({ NumberField }) => (
                  <NumberField
                    label="Storage Temperature"
                    description="Accepts negative values. Optional."
                    placeholder="e.g. −18"
                    unit="°C"
                    decimalPlaces={1}
                    allowNegative
                    orientation="responsive"
                    showErrorMessage
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
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const inputs = canvas.getAllByRole('textbox');

    // discount field is pre-filled; others start empty
    await expect(inputs[2]).toHaveValue('10');
    await expect(inputs[0]).toHaveValue('');
    await expect(inputs[1]).toHaveValue('');
    await expect(inputs[3]).toHaveValue('');

    // quantity — type an invalid value, see error
    await userEvent.type(inputs[0], '0');
    await waitFor(() => expect(canvas.getAllByRole('alert')[0]).toHaveTextContent('At least 1'));

    // fix quantity
    await userEvent.clear(inputs[0]);
    await userEvent.type(inputs[0], '5');
    await waitFor(() => expect(canvas.getAllByRole('alert')[0]).not.toHaveTextContent('At least 1'));

    // temperature accepts a negative value
    await userEvent.type(inputs[3], '-18');
    await expect(inputs[3]).toHaveValue('-18');
  },
};
