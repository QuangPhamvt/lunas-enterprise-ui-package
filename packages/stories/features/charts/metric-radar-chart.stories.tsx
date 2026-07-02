'use client';

import { MetricRadarChart } from '@/components/features/charts';

import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, waitFor, within } from 'storybook/test';

const teamData = [
  { metric: 'Speed', teamA: 80, teamB: 65 },
  { metric: 'Quality', teamA: 70, teamB: 90 },
  { metric: 'Cost', teamA: 60, teamB: 75 },
  { metric: 'Reliability', teamA: 85, teamB: 70 },
  { metric: 'Support', teamA: 75, teamB: 80 },
];

const series = [
  { key: 'teamA', label: 'Team A' },
  { key: 'teamB', label: 'Team B' },
];

const meta = {
  title: 'Features/Charts/Metric Radar',
  component: MetricRadarChart,
  tags: ['autodocs'],
  decorators: [
    Story => (
      <div className="w-[480px]">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof MetricRadarChart>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { data: teamData, series, animate: false },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await waitFor(() => {
      expect(canvasElement.querySelector('svg.recharts-surface')).toBeInTheDocument();
    });
    expect(canvasElement.querySelectorAll('.recharts-radar-polygon')).toHaveLength(series.length);
    await expect(canvas.getByText('Team A')).toBeInTheDocument();
    await expect(canvas.getByText('Team B')).toBeInTheDocument();
  },
};
