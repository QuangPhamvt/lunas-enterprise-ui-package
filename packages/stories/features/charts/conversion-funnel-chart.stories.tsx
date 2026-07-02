'use client';

import { ConversionFunnelChart } from '@/components/features/charts';

import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, waitFor, within } from 'storybook/test';

const funnelData = [
  { name: 'Sessions', value: 50000 },
  { name: 'Product views', value: 32000 },
  { name: 'Added to cart', value: 8400 },
  { name: 'Purchased', value: 2900 },
];

const meta = {
  title: 'Features/Charts/Conversion Funnel',
  component: ConversionFunnelChart,
  tags: ['autodocs'],
  decorators: [
    Story => (
      <div className="w-[640px]">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof ConversionFunnelChart>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { data: funnelData, animate: false },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await waitFor(() => {
      expect(canvasElement.querySelector('svg.recharts-surface')).toBeInTheDocument();
    });
    expect(canvasElement.querySelectorAll('.recharts-funnel-trapezoid')).toHaveLength(funnelData.length);
    await expect(canvas.getByText('Sessions')).toBeInTheDocument();
    // Value + conversion rate against the first stage: 2900 / 50000 = 5.8%
    await expect(canvas.getByText('2.9K (5.8%)')).toBeInTheDocument();
  },
};

export const WithoutRates: Story = {
  args: { data: funnelData, showConversionRates: false, animate: false },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await waitFor(() => {
      expect(canvasElement.querySelector('svg.recharts-surface')).toBeInTheDocument();
    });
    await expect(canvas.getByText('2.9K')).toBeInTheDocument();
    expect(canvas.queryByText('2.9K (5.8%)')).not.toBeInTheDocument();
  },
};
