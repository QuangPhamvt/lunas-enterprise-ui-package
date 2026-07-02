'use client';

import { SalesTargetRadialChart } from '@/components/features/charts';

import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, waitFor, within } from 'storybook/test';

const meta = {
  title: 'Features/Charts/Sales Target Radial',
  component: SalesTargetRadialChart,
  tags: ['autodocs'],
  decorators: [
    Story => (
      <div className="w-[320px]">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof SalesTargetRadialChart>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { value: 65_000, target: 100_000, label: 'Monthly target', animate: false },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await waitFor(() => {
      expect(canvasElement.querySelector('svg.recharts-surface')).toBeInTheDocument();
    });
    await expect(canvas.getByText('65%')).toBeInTheDocument();
    await expect(canvas.getByText('Monthly target')).toBeInTheDocument();
    expect(canvasElement.querySelector('.recharts-radial-bar-sector')).toBeInTheDocument();
  },
};

export const Complete: Story = {
  args: { value: 112_000, target: 100_000, label: 'Q2 target', animate: false },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await waitFor(() => {
      expect(canvasElement.querySelector('svg.recharts-surface')).toBeInTheDocument();
    });
    // Center figure reports raw progress even past the clamped gauge
    await expect(canvas.getByText('112%')).toBeInTheDocument();
  },
};
