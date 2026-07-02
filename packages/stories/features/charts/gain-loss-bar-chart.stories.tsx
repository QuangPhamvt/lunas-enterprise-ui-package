'use client';

import { GainLossBarChart } from '@/components/features/charts';

import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, waitFor, within } from 'storybook/test';

const returnsData = [
  { name: 'Jan', value: 0.032 },
  { name: 'Feb', value: -0.014 },
  { name: 'Mar', value: 0.021 },
  { name: 'Apr', value: -0.008 },
  { name: 'May', value: 0.045 },
];

const meta = {
  title: 'Features/Charts/Gain Loss Bar',
  component: GainLossBarChart,
  tags: ['autodocs'],
  decorators: [
    Story => (
      <div className="w-[640px]">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof GainLossBarChart>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { data: returnsData, animate: false },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await waitFor(() => {
      expect(canvasElement.querySelector('svg.recharts-surface')).toBeInTheDocument();
    });
    expect(canvasElement.querySelectorAll('.recharts-rectangle')).toHaveLength(returnsData.length);
    // Signed percent formatting on the Y-axis
    expect(canvas.getAllByText(/^[+-]\d/).length).toBeGreaterThan(0);
  },
};

export const CustomColors: Story = {
  args: { data: returnsData, upColor: 'var(--chart-1)', downColor: 'var(--chart-8)', animate: false },
  play: async ({ canvasElement }) => {
    await waitFor(() => {
      expect(canvasElement.querySelector('svg.recharts-surface')).toBeInTheDocument();
    });
    expect(canvasElement.querySelectorAll('.recharts-rectangle')).toHaveLength(returnsData.length);
  },
};
