'use client';

import { ActivityHeatmapChart } from '@/components/features/charts';

import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, waitFor } from 'storybook/test';

const activityData = Array.from({ length: 42 }, (_, index) => {
  const date = new Date('2026-05-01');
  date.setDate(date.getDate() + index);
  return { date: date.toISOString().slice(0, 10), value: Math.round(Math.abs(Math.sin(index / 3)) * 12) };
});

const meta = {
  title: 'Features/Charts/Activity Heatmap',
  component: ActivityHeatmapChart,
  tags: ['autodocs'],
  decorators: [
    Story => (
      <div className="w-[640px]">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof ActivityHeatmapChart>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { data: activityData, height: 160 },
  play: async ({ canvasElement }) => {
    await waitFor(() => {
      expect(canvasElement.querySelector('svg.recharts-surface')).toBeInTheDocument();
    });
    const cells = canvasElement.querySelectorAll('svg.recharts-surface rect[rx="3"]');
    await waitFor(() => {
      expect(cells.length).toBe(activityData.length);
    });
  },
};
