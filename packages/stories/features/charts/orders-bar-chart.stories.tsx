'use client';

import { OrdersBarChart } from '@/components/features/charts';

import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, waitFor, within } from 'storybook/test';

const ordersData = [
  { date: '2026-06-01', orders: 38 },
  { date: '2026-06-02', orders: 52 },
  { date: '2026-06-03', orders: 47 },
  { date: '2026-06-04', orders: 61 },
  { date: '2026-06-05', orders: 55 },
];

const stackedData = [
  { date: '2026-06-01', completed: 32, pending: 4, cancelled: 2 },
  { date: '2026-06-02', completed: 44, pending: 6, cancelled: 2 },
  { date: '2026-06-03', completed: 40, pending: 5, cancelled: 2 },
  { date: '2026-06-04', completed: 52, pending: 7, cancelled: 2 },
  { date: '2026-06-05', completed: 46, pending: 6, cancelled: 3 },
];

const statuses = [
  { key: 'completed', label: 'Completed' },
  { key: 'pending', label: 'Pending' },
  { key: 'cancelled', label: 'Cancelled' },
];

const meta = {
  title: 'Features/Charts/Orders Bar',
  component: OrdersBarChart,
  tags: ['autodocs'],
  decorators: [
    Story => (
      <div className="w-[640px]">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof OrdersBarChart>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { data: ordersData, animate: false },
  play: async ({ canvasElement }) => {
    await waitFor(() => {
      expect(canvasElement.querySelector('svg.recharts-surface')).toBeInTheDocument();
    });
    expect(canvasElement.querySelectorAll('.recharts-bar-rectangle')).toHaveLength(ordersData.length);
  },
};

export const StackedByStatus: Story = {
  args: { data: stackedData, statuses, animate: false },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await waitFor(() => {
      expect(canvasElement.querySelector('svg.recharts-surface')).toBeInTheDocument();
    });
    // One rectangle per day per status
    expect(canvasElement.querySelectorAll('.recharts-bar-rectangle')).toHaveLength(stackedData.length * statuses.length);
    await expect(canvas.getByText('Completed')).toBeInTheDocument();
    await expect(canvas.getByText('Pending')).toBeInTheDocument();
    await expect(canvas.getByText('Cancelled')).toBeInTheDocument();
  },
};
