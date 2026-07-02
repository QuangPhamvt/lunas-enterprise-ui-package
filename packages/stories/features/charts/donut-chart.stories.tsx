'use client';

import { DonutChart } from '@/components/features/charts';

import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, waitFor, within } from 'storybook/test';

const categoryData = [
  { name: 'Fashion', value: 12400 },
  { name: 'Electronics', value: 8200 },
  { name: 'Home & Living', value: 5600 },
  { name: 'Beauty', value: 3100 },
];

const trafficData = [
  { name: 'Organic search', value: 9200 },
  { name: 'Direct', value: 4800 },
  { name: 'Social', value: 3100 },
  { name: 'Email', value: 2400 },
  { name: 'Paid ads', value: 1900 },
];

const meta = {
  title: 'Features/Charts/Donut',
  component: DonutChart,
  tags: ['autodocs'],
  decorators: [
    Story => (
      <div className="w-[360px]">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof DonutChart>;

export default meta;
type Story = StoryObj<typeof meta>;

export const CategorySales: Story = {
  args: { data: categoryData, centerLabel: 'Total sales', animate: false },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await waitFor(() => {
      expect(canvasElement.querySelector('svg.recharts-surface')).toBeInTheDocument();
    });
    expect(canvasElement.querySelectorAll('.recharts-pie-sector')).toHaveLength(categoryData.length);
    // Center total: 12400 + 8200 + 5600 + 3100 = 29300 → compact
    await expect(canvas.getByText('29.3K')).toBeInTheDocument();
    await expect(canvas.getByText('Total sales')).toBeInTheDocument();
    await expect(canvas.getByText('Fashion')).toBeInTheDocument();
  },
};

export const TrafficSources: Story = {
  args: { data: trafficData, centerLabel: 'Sessions', animate: false },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await waitFor(() => {
      expect(canvasElement.querySelector('svg.recharts-surface')).toBeInTheDocument();
    });
    expect(canvasElement.querySelectorAll('.recharts-pie-sector')).toHaveLength(trafficData.length);
    await expect(canvas.getByText('Organic search')).toBeInTheDocument();
  },
};

export const NoCenterTotal: Story = {
  args: { data: categoryData, showCenterTotal: false, animate: false },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await waitFor(() => {
      expect(canvasElement.querySelector('svg.recharts-surface')).toBeInTheDocument();
    });
    expect(canvas.queryByText('29.3K')).not.toBeInTheDocument();
  },
};
