import { useState } from 'react';

import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, waitFor, within } from 'storybook/test';

import { NumberInput } from '@/components/ui/inputs/number-input';

const meta = {
  tags: ['autodocs'],
  title: 'Components/Number Input',
  component: NumberInput,
} satisfies Meta<typeof NumberInput>;

export default meta;
type Story = StoryObj<typeof meta>;

// ─── Controlled value display ──────────────────────────────────────────────────

/**
 * Fully controlled input — the parent owns the value.
 * Shows how `onValueChange` delivers a `number | null` (never a raw string).
 * Type a number, blur to see comma-formatted display.
 */
export const Controlled: Story = {
  render: () => {
    const [value, setValue] = useState<number | null>(null);

    return (
      <div className="flex w-72 flex-col gap-3">
        <NumberInput value={value} onValueChange={setValue} placeholder="Type a number…" />
        <p className="text-sm text-muted-foreground">
          Raw value:{' '}
          <strong data-testid="raw-value" className="font-mono">
            {value === null ? 'null' : String(value)}
          </strong>
        </p>
      </div>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole('textbox');

    // starts empty → value is null
    await expect(input).toHaveValue('');
    await expect(canvas.getByTestId('raw-value')).toHaveTextContent('null');

    // type a number → onValueChange fires with a number
    await userEvent.type(input, '1234');
    await expect(input).toHaveValue('1234');
    await expect(canvas.getByTestId('raw-value')).toHaveTextContent('1234');

    // blur → display is comma-formatted; raw value stays numeric
    await userEvent.tab();
    await waitFor(() => expect(input).toHaveValue('1,234'));
    await expect(canvas.getByTestId('raw-value')).toHaveTextContent('1234');

    // clear → value returns to null
    await userEvent.click(input);
    await userEvent.clear(input);
    await expect(canvas.getByTestId('raw-value')).toHaveTextContent('null');
  },
};

// ─── Unit labels ──────────────────────────────────────────────────────────────

/**
 * `unitText` appends a right-aligned label inside the input.
 * The component auto-measures the label width and adds matching padding so the
 * number never overlaps the unit.
 */
export const WithUnit: Story = {
  render: () => (
    <div className="flex w-72 flex-col gap-4">
      {[
        { unit: 'kg', placeholder: '0' },
        { unit: '%', placeholder: '0' },
        { unit: 'USD', placeholder: '0.00' },
        { unit: '°C', placeholder: '−18' },
        { unit: 'km/h', placeholder: '0' },
      ].map(({ unit, placeholder }) => (
        // No duplicate text node — unit only appears inside NumberInput's span
        <div key={unit} className="flex flex-col gap-1">
          <p className="text-sm font-medium text-muted-foreground">{unit} field</p>
          <NumberInput placeholder={placeholder} unitText={unit} />
        </div>
      ))}
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // each unit label appears exactly once (inside NumberInput's internal span)
    for (const unit of ['kg', '%', 'USD', '°C', 'km/h']) {
      await expect(canvas.getByText(unit)).toBeInTheDocument();
    }

    // typing into the first input still works with the unit visible
    const inputs = canvas.getAllByRole('textbox');
    await userEvent.type(inputs[0], '75');
    await expect(inputs[0]).toHaveValue('75');
  },
};

// ─── Negative numbers ─────────────────────────────────────────────────────────

/**
 * By default the input rejects the minus character.
 * Set `allowNegative` to permit negative values.
 */
export const AllowNegative: Story = {
  render: () => {
    const [positive, setPositive] = useState<number | null>(null);
    const [negative, setNegative] = useState<number | null>(null);

    return (
      <div className="flex w-96 flex-col gap-6">
        <div className="flex flex-col gap-2">
          <p className="text-sm font-medium">Positive only (default)</p>
          <NumberInput value={positive} onValueChange={setPositive} placeholder="0" unitText="USD" />
          <p className="text-xs text-muted-foreground">
            Value: <code>{positive === null ? 'null' : positive}</code>
          </p>
        </div>

        <div className="flex flex-col gap-2">
          <p className="text-sm font-medium">Allow negative</p>
          <NumberInput value={negative} onValueChange={setNegative} placeholder="e.g. −50" allowNegative unitText="USD" />
          <p className="text-xs text-muted-foreground">
            Value: <code data-testid="neg-value">{negative === null ? 'null' : negative}</code>
          </p>
        </div>
      </div>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const [positiveInput, negativeInput] = canvas.getAllByRole('textbox');

    // positive-only input accepts regular numeric input
    await userEvent.type(positiveInput, '50');
    await expect(positiveInput).toHaveValue('50');

    // allowNegative input accepts the minus sign and produces a negative value
    await userEvent.type(negativeInput, '-50');
    await expect(negativeInput).toHaveValue('-50');
    await expect(canvas.getByTestId('neg-value')).toHaveTextContent('-50');
  },
};

// ─── Decimal places ───────────────────────────────────────────────────────────

/**
 * `numberAfterDecimalPoint` caps how many digits the user can type after the
 * decimal separator. Extra digits are silently rejected on each keystroke.
 */
export const DecimalPlaces: Story = {
  render: () => (
    <div className="flex w-80 flex-col gap-6">
      {[
        { label: 'Integers only', decimals: 0, placeholder: '0' },
        { label: '1 decimal place', decimals: 1, placeholder: '0.0' },
        { label: '2 decimal places (default)', decimals: 2, placeholder: '0.00' },
        { label: '4 decimal places', decimals: 4, placeholder: '0.0000' },
      ].map(({ label, decimals, placeholder }) => (
        <div key={label} className="flex flex-col gap-1">
          <p className="text-sm font-medium">{label}</p>
          <NumberInput placeholder={placeholder} numberAfterDecimalPoint={decimals} />
          <p className="text-xs text-muted-foreground">numberAfterDecimalPoint={decimals}</p>
        </div>
      ))}
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const inputs = canvas.getAllByRole('textbox');

    // four inputs rendered
    await expect(inputs).toHaveLength(4);

    // 1-decimal input: third digit after the decimal point is rejected
    // (numberAfterDecimalPoint=1 → validateDecimalPoint rejects a 2nd decimal digit)
    await userEvent.type(inputs[1], '3.141');
    await expect(inputs[1]).toHaveValue('3.1');

    // 2-decimal input accepts up to 2 decimal places
    await userEvent.type(inputs[2], '3.14');
    await expect(inputs[2]).toHaveValue('3.14');

    // 2-decimal input rejects a 3rd decimal digit
    await userEvent.type(inputs[2], '9');
    await expect(inputs[2]).toHaveValue('3.14');
  },
};

// ─── Rounding rules ───────────────────────────────────────────────────────────

/**
 * `roundingRule` is applied **on blur** together with `precision`.
 * Type a multi-decimal value, then click or tab away to see it rounded.
 *
 * - `'up'`      always rounds away from zero
 * - `'down'`    always rounds toward zero
 * - `'nearest'` rounds to the nearest half-step
 * - `'none'`    no rounding applied (default)
 *
 * Here `precision=2` means round to 2 significant decimal places.
 * `numberAfterDecimalPoint=4` lets you type up to 4 digits to see the rounding.
 */
export const RoundingRules: Story = {
  render: () => {
    const rules = ['up', 'down', 'nearest', 'none'] as const;

    return (
      <div className="flex w-80 flex-col gap-6">
        {rules.map(rule => (
          <div key={rule} className="flex flex-col gap-1">
            <p className="text-sm font-medium">
              roundingRule=<code>"{rule}"</code>
            </p>
            <NumberInput placeholder="e.g. 2.1364" roundingRule={rule} precision={2} numberAfterDecimalPoint={4} />
            <p className="text-xs text-muted-foreground">Type a decimal, then blur to apply rounding</p>
          </div>
        ))}
      </div>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const inputs = canvas.getAllByRole('textbox');

    // Type into "up" input, blur → rounds up to 2 decimal places
    await userEvent.type(inputs[0], '2.1364');
    await userEvent.tab();
    await waitFor(() => expect(inputs[0]).toHaveValue('2.14'));

    // Type into "down" input, blur → rounds down
    await userEvent.type(inputs[1], '2.1364');
    await userEvent.tab();
    await waitFor(() => expect(inputs[1]).toHaveValue('2.13'));

    // "none" → value kept exactly as typed (within decimal limit)
    await userEvent.type(inputs[3], '2.1364');
    await userEvent.tab();
    // no rounding — shows the formatted raw value
    await waitFor(() => expect(inputs[3]).toHaveValue('2.1364'));
  },
};

// ─── Decimal tuple (total digit budget) ──────────────────────────────────────

/**
 * The `decimal` prop accepts a `[totalDigits, decimalDigits]` tuple.
 * It constrains **both** the integer length **and** the decimal length.
 *
 * Example: `decimal={[5, 2]}` → max 3 integer digits + max 2 decimal digits.
 */
export const DecimalRange: Story = {
  render: () => (
    <div className="flex w-80 flex-col gap-6">
      {(
        [
          {
            label: 'decimal={[5, 2]}',
            desc: 'Up to 999.99',
            decimal: [5, 2] as [number, number],
            placeholder: '999.99',
          },
          {
            label: 'decimal={[6, 3]}',
            desc: 'Up to 999.999',
            decimal: [6, 3] as [number, number],
            placeholder: '999.999',
          },
          {
            label: 'decimal={[8, 4]}',
            desc: 'Up to 9999.9999',
            decimal: [8, 4] as [number, number],
            placeholder: '9999.9999',
          },
        ] as const
      ).map(({ label, desc, decimal, placeholder }) => (
        <div key={label} className="flex flex-col gap-1">
          <p className="text-sm font-medium">
            <code>{label}</code>
          </p>
          <NumberInput placeholder={placeholder} decimal={decimal} />
          <p className="text-xs text-muted-foreground">{desc}</p>
        </div>
      ))}
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const inputs = canvas.getAllByRole('textbox');

    // [5,2] → max 3 integer digits; "9999" (4 digits) should be rejected
    await userEvent.type(inputs[0], '9999');
    // only "999" is accepted (3 integer digits for [5,2])
    await expect(inputs[0]).toHaveValue('999');

    // decimal part is still allowed up to 2 places
    await userEvent.type(inputs[0], '.12');
    await expect(inputs[0]).toHaveValue('999.12');

    // a 3rd decimal digit is rejected
    await userEvent.type(inputs[0], '3');
    await expect(inputs[0]).toHaveValue('999.12');
  },
};

// ─── ReadOnly ─────────────────────────────────────────────────────────────────

/**
 * `readOnly` shows the value in a muted style and blocks all keyboard input.
 * When `value` is `null`, the input displays `"0"` as a safe fallback.
 */
export const ReadOnly: Story = {
  render: () => (
    <div className="flex w-72 flex-col gap-4">
      <div className="flex flex-col gap-1">
        <p className="text-sm font-medium">Read-only with value</p>
        <NumberInput value={12345.67} readOnly unitText="USD" />
      </div>
      <div className="flex flex-col gap-1">
        <p className="text-sm font-medium">Read-only with null → shows 0</p>
        <NumberInput value={null} readOnly unitText="kg" />
      </div>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const inputs = canvas.getAllByRole('textbox');

    // first input is read-only
    await expect(inputs[0]).toHaveAttribute('readonly');

    // second input shows "0" when value is null
    await expect(inputs[1]).toHaveAttribute('readonly');
    await expect(inputs[1]).toHaveValue('0');

    // read-only inputs have pointer-events: none — verify value is unchanged instead
    await expect(inputs[0]).toHaveValue('12,345.67');
  },
};

// ─── Disabled ─────────────────────────────────────────────────────────────────

/**
 * `disabled` prevents all interaction and dims the input via `opacity-50`
 * (from the base `Input` component's disabled styles).
 */
export const Disabled: Story = {
  render: () => (
    <div className="flex w-72 flex-col gap-4">
      <div className="flex flex-col gap-1">
        <p className="text-sm font-medium">Disabled with value</p>
        <NumberInput value={500} disabled unitText="pcs" />
      </div>
      <div className="flex flex-col gap-1">
        <p className="text-sm font-medium">Disabled empty</p>
        <NumberInput value={null} disabled placeholder="N/A" />
      </div>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const inputs = canvas.getAllByRole('textbox');

    for (const input of inputs) {
      await expect(input).toBeDisabled();
    }

    // unit label still renders when disabled
    await expect(canvas.getByText('pcs')).toBeInTheDocument();
  },
};

// ─── Invalid state ────────────────────────────────────────────────────────────

/**
 * Pass `aria-invalid` to trigger the danger outline and background from the
 * base `Input` component. This is how `NumberField` signals validation errors
 * without re-implementing the visual logic here.
 */
export const Invalid: Story = {
  render: () => (
    <div className="flex w-72 flex-col gap-4">
      <div className="flex flex-col gap-1">
        <p className="text-sm font-medium">Valid</p>
        <NumberInput value={42} aria-invalid={false} unitText="kg" />
      </div>
      <div className="flex flex-col gap-1">
        <p className="text-sm font-medium">Invalid</p>
        <NumberInput value={-1} aria-invalid={true} unitText="kg" />
        <p className="text-xs text-danger-strong">Value must be positive</p>
      </div>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const inputs = canvas.getAllByRole('textbox');

    // valid input has no aria-invalid attribute (or false)
    await expect(inputs[0]).not.toHaveAttribute('aria-invalid', 'true');

    // invalid input has aria-invalid="true"
    await expect(inputs[1]).toHaveAttribute('aria-invalid', 'true');
  },
};

// ─── Kitchen sink ─────────────────────────────────────────────────────────────

/**
 * All configuration options in one place for a visual regression reference.
 */
export const KitchenSink: Story = {
  render: () => {
    const [weight, setWeight] = useState<number | null>(null);
    const [price, setPrice] = useState<number | null>(1299.99);
    const [discount, setDiscount] = useState<number | null>(15);
    const [temp, setTemp] = useState<number | null>(-18);

    return (
      <div className="flex w-full max-w-lg flex-col gap-6 p-4">
        <div className="flex flex-col gap-1">
          <p className="text-sm font-medium">Weight (kg) — integer only</p>
          <NumberInput value={weight} onValueChange={setWeight} placeholder="0" unitText="kg" numberAfterDecimalPoint={0} />
        </div>

        <div className="flex flex-col gap-1">
          <p className="text-sm font-medium">Price (USD) — 2 decimal, round nearest</p>
          <NumberInput
            value={price}
            onValueChange={setPrice}
            placeholder="0.00"
            unitText="USD"
            numberAfterDecimalPoint={4}
            precision={2}
            roundingRule="nearest"
          />
          <p className="text-xs text-muted-foreground">Type extra decimals then blur to see rounding</p>
        </div>

        <div className="flex flex-col gap-1">
          <p className="text-sm font-medium">Discount (%) — 1 decimal, read-only</p>
          <NumberInput value={discount} onValueChange={setDiscount} placeholder="0" unitText="%" numberAfterDecimalPoint={1} readOnly />
        </div>

        <div className="flex flex-col gap-1">
          <p className="text-sm font-medium">Temperature (°C) — negative allowed</p>
          <NumberInput value={temp} onValueChange={setTemp} placeholder="e.g. −18" unitText="°C" allowNegative numberAfterDecimalPoint={1} />
        </div>

        <div className="flex flex-col gap-1">
          <p className="text-sm font-medium">Stock — disabled</p>
          <NumberInput value={9999} disabled unitText="pcs" />
        </div>

        <div className="flex flex-col gap-1">
          <p className="text-sm font-medium">Overstock — invalid</p>
          <NumberInput value={15000} aria-invalid={true} unitText="pcs" />
          <p className="text-xs text-danger-strong">Exceeds warehouse capacity</p>
        </div>
      </div>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const inputs = canvas.getAllByRole('textbox');

    // 6 inputs total
    await expect(inputs).toHaveLength(6);

    // weight — type a whole number (decimal behaviour depends on numberAfterDecimalPoint=0 edge case)
    await userEvent.type(inputs[0], '75');
    await expect(inputs[0]).toHaveValue('75');

    // temperature — accepts negative
    await userEvent.clear(inputs[3]);
    await userEvent.type(inputs[3], '-5');
    await expect(inputs[3]).toHaveValue('-5');

    // stock is disabled
    await expect(inputs[4]).toBeDisabled();

    // overstock is marked invalid
    await expect(inputs[5]).toHaveAttribute('aria-invalid', 'true');

    // discount is read-only
    await expect(inputs[2]).toHaveAttribute('readonly');
  },
};
