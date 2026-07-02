'use client';

import { PriceRangeAreaChart } from '@/components/features/charts';

import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, waitFor, within } from 'storybook/test';

const rangeData = [
  { date: '2026-06-01', high: 146.2, low: 141.8, close: 144.9 },
  { date: '2026-06-02', high: 145.6, low: 141.2, close: 142.1 },
  { date: '2026-06-03', high: 147.3, low: 142.9, close: 146.8 },
  { date: '2026-06-04', high: 149.0, low: 145.5, close: 148.2 },
  { date: '2026-06-05', high: 148.4, low: 144.6, close: 145.9 },
];

const meta = {
  title: 'Features/Charts/Price Range Area',
  component: PriceRangeAreaChart,
  tags: ['autodocs'],
  decorators: [
    Story => (
      <div className="w-[640px]">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof PriceRangeAreaChart>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { data: rangeData, animate: false },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await waitFor(() => {
      expect(canvasElement.querySelector('svg.recharts-surface')).toBeInTheDocument();
    });
    // Two stacked range areas + one close line
    expect(canvasElement.querySelectorAll('.recharts-area')).toHaveLength(2);
    expect(canvasElement.querySelectorAll('.recharts-line')).toHaveLength(1);
    await waitFor(() => {
      expect(canvas.getAllByText(/Jun/).length).toBeGreaterThan(0);
    });
  },
};
