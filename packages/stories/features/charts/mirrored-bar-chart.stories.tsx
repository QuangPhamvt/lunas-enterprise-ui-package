'use client';

import { MirroredBarChart } from '@/components/features/charts';

import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, waitFor, within } from 'storybook/test';

const ageDistribution = [
  { category: '18-24', left: 1200, right: 1400 },
  { category: '25-34', left: 2600, right: 2100 },
  { category: '35-44', left: 2100, right: 2400 },
  { category: '45-54', left: 1500, right: 1300 },
  { category: '55+', left: 900, right: 1100 },
];

const meta = {
  title: 'Features/Charts/Mirrored Bar',
  component: MirroredBarChart,
  tags: ['autodocs'],
  decorators: [
    Story => (
      <div className="w-[640px]">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof MirroredBarChart>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { data: ageDistribution, leftLabel: 'Male', rightLabel: 'Female', animate: false },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await waitFor(() => {
      expect(canvasElement.querySelector('svg.recharts-surface')).toBeInTheDocument();
    });
    // One bar per side per category
    expect(canvasElement.querySelectorAll('.recharts-rectangle')).toHaveLength(ageDistribution.length * 2);
    await expect(canvas.getByText('Male')).toBeInTheDocument();
    await expect(canvas.getByText('Female')).toBeInTheDocument();
  },
};
