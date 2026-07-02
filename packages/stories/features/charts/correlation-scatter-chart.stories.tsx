'use client';

import { CorrelationScatterChart } from '@/components/features/charts';

import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, waitFor } from 'storybook/test';

const priceDemandData = [
  { x: 12, y: 4200, z: 40, name: 'Product A' },
  { x: 18, y: 5100, z: 65, name: 'Product B' },
  { x: 9, y: 3600, z: 30, name: 'Product C' },
  { x: 24, y: 6200, z: 90, name: 'Product D' },
  { x: 15, y: 4800, z: 50, name: 'Product E' },
];

const meta = {
  title: 'Features/Charts/Correlation Scatter',
  component: CorrelationScatterChart,
  tags: ['autodocs'],
  decorators: [
    Story => (
      <div className="w-[640px]">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof CorrelationScatterChart>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { data: priceDemandData, xLabel: 'Price ($)', yLabel: 'Units sold', animate: false },
  play: async ({ canvasElement }) => {
    await waitFor(() => {
      expect(canvasElement.querySelector('svg.recharts-surface')).toBeInTheDocument();
    });
    expect(canvasElement.querySelectorAll('.recharts-scatter-symbol')).toHaveLength(priceDemandData.length);
  },
};

export const AsBubbleChart: Story = {
  args: { data: priceDemandData, xLabel: 'Price ($)', yLabel: 'Units sold', showBubbleSize: true, animate: false },
  play: async ({ canvasElement }) => {
    await waitFor(() => {
      expect(canvasElement.querySelector('svg.recharts-surface')).toBeInTheDocument();
    });
    expect(canvasElement.querySelectorAll('.recharts-scatter-symbol')).toHaveLength(priceDemandData.length);
  },
};
