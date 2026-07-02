'use client';

import { PortfolioAllocationTreemap } from '@/components/features/charts';

import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, waitFor, within } from 'storybook/test';

const holdings = [
  { name: 'AAPL', value: 24000 },
  { name: 'MSFT', value: 18500 },
  { name: 'Bonds', value: 12000 },
  { name: 'Cash', value: 4200 },
];

const meta = {
  title: 'Features/Charts/Portfolio Allocation',
  component: PortfolioAllocationTreemap,
  tags: ['autodocs'],
  decorators: [
    Story => (
      <div className="h-[320px] w-[640px]">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof PortfolioAllocationTreemap>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { data: holdings, animate: false, height: 320 },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await waitFor(() => {
      expect(canvasElement.querySelector('svg.recharts-surface')).toBeInTheDocument();
    });
    await waitFor(() => {
      expect(canvas.getByText('AAPL')).toBeInTheDocument();
    });
    await expect(canvas.getByText('MSFT')).toBeInTheDocument();
  },
};
