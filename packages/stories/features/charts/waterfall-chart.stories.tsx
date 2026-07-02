'use client';

import { WaterfallChart } from '@/components/features/charts';

import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, waitFor } from 'storybook/test';

const bridgeData = [
  { label: 'Starting cash', value: 50000, isTotal: true },
  { label: 'Revenue', value: 32000 },
  { label: 'COGS', value: -18000 },
  { label: 'Opex', value: -9000 },
  { label: 'Ending cash', value: 55000, isTotal: true },
];

const meta = {
  title: 'Features/Charts/Waterfall',
  component: WaterfallChart,
  tags: ['autodocs'],
  decorators: [
    Story => (
      <div className="w-[640px]">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof WaterfallChart>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { data: bridgeData, animate: false },
  play: async ({ canvasElement }) => {
    await waitFor(() => {
      expect(canvasElement.querySelector('svg.recharts-surface')).toBeInTheDocument();
    });
    // One visible "size" bar per step, plus invisible "base" bars for the floating (non-total) steps
    expect(canvasElement.querySelectorAll('.recharts-rectangle').length).toBeGreaterThanOrEqual(bridgeData.length);
  },
};
