'use client';

import { VolumeBarChart } from '@/components/features/charts';

import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, waitFor } from 'storybook/test';

const volumeData = [
  { date: '2026-06-01', close: 142.5, volume: 2_400_000 },
  { date: '2026-06-02', close: 145.1, volume: 3_100_000 },
  { date: '2026-06-03', close: 143.8, volume: 2_800_000 },
  { date: '2026-06-04', close: 147.2, volume: 3_600_000 },
  { date: '2026-06-05', close: 146.0, volume: 2_950_000 },
];

const meta = {
  title: 'Features/Charts/Volume Bar',
  component: VolumeBarChart,
  tags: ['autodocs'],
  decorators: [
    Story => (
      <div className="w-[640px]">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof VolumeBarChart>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { data: volumeData, animate: false },
  play: async ({ canvasElement }) => {
    await waitFor(() => {
      expect(canvasElement.querySelector('svg.recharts-surface')).toBeInTheDocument();
    });
    expect(canvasElement.querySelectorAll('.recharts-rectangle')).toHaveLength(volumeData.length);
  },
};
