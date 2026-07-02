'use client';

import { StackedAreaChart } from '@/components/features/charts';

import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, waitFor, within } from 'storybook/test';

const channelData = [
  { date: '2026-06-01', direct: 4200, organic: 3100, paid: 1800 },
  { date: '2026-06-02', direct: 4600, organic: 3400, paid: 2100 },
  { date: '2026-06-03', direct: 4100, organic: 3600, paid: 1950 },
  { date: '2026-06-04', direct: 5200, organic: 3900, paid: 2400 },
  { date: '2026-06-05', direct: 4800, organic: 4100, paid: 2200 },
];

const series = [
  { key: 'direct', label: 'Direct' },
  { key: 'organic', label: 'Organic' },
  { key: 'paid', label: 'Paid' },
];

const meta = {
  title: 'Features/Charts/Stacked Area',
  component: StackedAreaChart,
  tags: ['autodocs'],
  decorators: [
    Story => (
      <div className="w-[640px]">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof StackedAreaChart>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { data: channelData, series, animate: false },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await waitFor(() => {
      expect(canvasElement.querySelector('svg.recharts-surface')).toBeInTheDocument();
    });
    expect(canvasElement.querySelectorAll('.recharts-area')).toHaveLength(series.length);
    await expect(canvas.getByText('Direct')).toBeInTheDocument();
    await expect(canvas.getByText('Organic')).toBeInTheDocument();
    await expect(canvas.getByText('Paid')).toBeInTheDocument();
  },
};
