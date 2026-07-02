'use client';

import { IndexedPerformanceLineChart } from '@/components/features/charts';

import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, waitFor, within } from 'storybook/test';

const performanceData = [
  { date: '2026-06-01', aapl: 142.5, spy: 512.1 },
  { date: '2026-06-02', aapl: 145.1, spy: 515.8 },
  { date: '2026-06-03', aapl: 143.8, spy: 514.2 },
  { date: '2026-06-04', aapl: 151.2, spy: 520.4 },
  { date: '2026-06-05', aapl: 149.0, spy: 519.1 },
];

const series = [
  { key: 'aapl', label: 'AAPL' },
  { key: 'spy', label: 'S&P 500' },
];

const meta = {
  title: 'Features/Charts/Indexed Performance',
  component: IndexedPerformanceLineChart,
  tags: ['autodocs'],
  decorators: [
    Story => (
      <div className="w-[640px]">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof IndexedPerformanceLineChart>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { data: performanceData, series, animate: false },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await waitFor(() => {
      expect(canvasElement.querySelector('svg.recharts-surface')).toBeInTheDocument();
    });
    expect(canvasElement.querySelectorAll('.recharts-line')).toHaveLength(series.length);
    await expect(canvas.getByText('AAPL')).toBeInTheDocument();
    await expect(canvas.getByText('S&P 500')).toBeInTheDocument();
  },
};
