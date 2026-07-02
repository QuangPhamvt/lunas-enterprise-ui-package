'use client';

import { RevenueOrdersComposedChart } from '@/components/features/charts';

import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, waitFor, within } from 'storybook/test';

const composedData = [
  { date: '2026-06-01', revenue: 12400, orders: 87 },
  { date: '2026-06-02', revenue: 15100, orders: 104 },
  { date: '2026-06-03', revenue: 13800, orders: 96 },
  { date: '2026-06-04', revenue: 18200, orders: 121 },
  { date: '2026-06-05', revenue: 16800, orders: 110 },
  { date: '2026-06-06', revenue: 21100, orders: 139 },
];

const meta = {
  title: 'Features/Charts/Revenue Orders Composed',
  component: RevenueOrdersComposedChart,
  tags: ['autodocs'],
  decorators: [
    Story => (
      <div className="w-[720px]">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof RevenueOrdersComposedChart>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { data: composedData, animate: false },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await waitFor(() => {
      expect(canvasElement.querySelector('svg.recharts-surface')).toBeInTheDocument();
    });
    // Revenue bars + orders line on independent axes
    expect(canvasElement.querySelectorAll('.recharts-bar-rectangle')).toHaveLength(composedData.length);
    expect(canvasElement.querySelector('.recharts-line')).toBeInTheDocument();
    expect(canvasElement.querySelectorAll('.recharts-yAxis')).toHaveLength(2);
    await expect(canvas.getByText('Revenue')).toBeInTheDocument();
    await expect(canvas.getByText('Orders')).toBeInTheDocument();
  },
};
