import { expect, within } from 'storybook/test';

import { Statistic } from '@/components/data-display/statistic';
import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  tags: ['autodocs'],
  title: 'Data Display/Statistic',
  component: Statistic,
} satisfies Meta<typeof Statistic>;

export default meta;
type Story = StoryObj<typeof Statistic>;

export const Default: Story = {
  args: {
    value: 1234567.123,
  },
};

export const WithPrefixAndSuffix: Story = {
  args: {
    value: 1234567.123,
    prefix: '$',
    suffix: 'USD',
  },
};

export const WithRounding: Story = {
  args: {
    value: 1234.56789,
    precision: 2,
    roundingMode: 'floor',
  },
};

export const WithCustomDecimalAndGroupSeparators: Story = {
  args: {
    value: 1234.5,
    precision: 2,
    showTrailingZeros: true,
  },
};

// ─── Behavior tests (hidden from the sidebar and docs; run by `npm run test:storybook`) ───

const TEST_TAGS = ['!dev', '!autodocs'];

export const TestNumberFormatting: Story = {
  tags: TEST_TAGS,
  render: () => (
    <div className="grid gap-1">
      <Statistic value={1234567.89} precision={2} />
      <Statistic value={1234567.891} />
      <Statistic value={1.5} precision={2} showTrailingZeros />
      <Statistic value={1234567.89} precision={2} decimalSeparator="." groupSeparator="," />
      <Statistic value={1234.5} precision={1} decimalSeparator="." groupSeparator=" " />
      <Statistic value={2.345} precision={2} roundingMode="floor" />
      <Statistic value="98765" />
      <Statistic value="abc" />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    // Vietnamese grouping by default…
    await expect(canvas.getByText('1.234.567,89')).toBeInTheDocument();
    await expect(canvas.getByText('1.234.567,891')).toBeInTheDocument();
    await expect(canvas.getByText('1,50')).toBeInTheDocument();
    // …custom separators map correctly, including a full `.` <-> `,` swap.
    await expect(canvas.getByText('1,234,567.89')).toBeInTheDocument();
    await expect(canvas.getByText('1 234.5')).toBeInTheDocument();
    await expect(canvas.getByText('2,34')).toBeInTheDocument();
    await expect(canvas.getByText('98.765')).toBeInTheDocument();
    await expect(canvas.getByText('N/A')).toBeInTheDocument();
  },
};
