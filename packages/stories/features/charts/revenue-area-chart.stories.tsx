'use client';

import { RevenueAreaChart } from '@/components/features/charts';

import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, waitFor, within } from 'storybook/test';

const revenueData = [
  { date: '2026-06-01', value: 4200, previousValue: 3800 },
  { date: '2026-06-02', value: 5100, previousValue: 4300 },
  { date: '2026-06-03', value: 4800, previousValue: 4600 },
  { date: '2026-06-04', value: 6200, previousValue: 4100 },
  { date: '2026-06-05', value: 5800, previousValue: 5200 },
  { date: '2026-06-06', value: 7100, previousValue: 5600 },
];

const meta = {
  title: 'Features/Charts/Revenue Area',
  component: RevenueAreaChart,
  tags: ['autodocs'],
  decorators: [
    Story => (
      <div className="w-[640px]">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof RevenueAreaChart>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { data: revenueData, animate: false },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await waitFor(() => {
      expect(canvasElement.querySelector('svg.recharts-surface')).toBeInTheDocument();
    });
    // Single revenue series
    expect(canvasElement.querySelectorAll('.recharts-area')).toHaveLength(1);
    // Currency-formatted Y-axis ticks
    expect(canvas.getAllByText(/^\$/).length).toBeGreaterThan(0);
    // Date-formatted X-axis ticks
    expect(canvas.getAllByText(/Jun/).length).toBeGreaterThan(0);
  },
};

export const WithComparison: Story = {
  args: { data: revenueData, showComparison: true, animate: false },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await waitFor(() => {
      expect(canvasElement.querySelector('svg.recharts-surface')).toBeInTheDocument();
    });
    // Current + previous-period series
    expect(canvasElement.querySelectorAll('.recharts-area')).toHaveLength(2);
    await expect(canvas.getByText('Revenue')).toBeInTheDocument();
    await expect(canvas.getByText('Previous period')).toBeInTheDocument();
  },
};

export const CustomFormatter: Story = {
  args: {
    data: revenueData,
    label: 'Doanh thu',
    valueFormatter: value => `${(value / 1000).toFixed(1)}k đ`,
    animate: false,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await waitFor(() => {
      expect(canvasElement.querySelector('svg.recharts-surface')).toBeInTheDocument();
    });
    expect(canvas.getAllByText(/k đ$/).length).toBeGreaterThan(0);
  },
};
