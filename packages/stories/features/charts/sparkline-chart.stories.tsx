'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { SparklineChart } from '@/components/features/charts';

import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, waitFor, within } from 'storybook/test';
import { Statistic } from '@/components/data-display/statistic';

const trendData = [12, 18, 14, 26, 22, 31, 28, 36];

const meta = {
  title: 'Features/Charts/Sparkline',
  component: SparklineChart,
  tags: ['autodocs'],
  decorators: [
    Story => (
      <div className="w-[200px]">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof SparklineChart>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Area: Story = {
  args: { data: trendData, animate: false },
  play: async ({ canvasElement }) => {
    await waitFor(() => {
      expect(canvasElement.querySelector('svg.recharts-surface')).toBeInTheDocument();
    });
    expect(canvasElement.querySelector('.recharts-area')).toBeInTheDocument();
    // Sparklines render no axes
    expect(canvasElement.querySelectorAll('.recharts-cartesian-axis')).toHaveLength(0);
  },
};

export const Line: Story = {
  args: { data: trendData, type: 'line', trend: 'down', animate: false },
  play: async ({ canvasElement }) => {
    await waitFor(() => {
      expect(canvasElement.querySelector('svg.recharts-surface')).toBeInTheDocument();
    });
    expect(canvasElement.querySelector('.recharts-line')).toBeInTheDocument();
  },
};

export const KpiCard: Story = {
  args: { data: trendData, trend: 'up', animate: false },
  render: args => (
    <Card className="w-[240px]">
      <CardHeader>
        <CardTitle>Revenue today</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-2">
        <Statistic value={12480} prefix="$" trend="up" />
        <SparklineChart {...args} />
      </CardContent>
    </Card>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await waitFor(() => {
      expect(canvasElement.querySelector('svg.recharts-surface')).toBeInTheDocument();
    });
    await expect(canvas.getByText('12,480')).toBeInTheDocument();
  },
};
