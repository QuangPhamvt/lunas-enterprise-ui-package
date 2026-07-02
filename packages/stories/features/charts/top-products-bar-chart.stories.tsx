'use client';

import { TopProductsBarChart } from '@/components/features/charts';

import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, waitFor, within } from 'storybook/test';

const productsData = [
  { name: 'Wireless Earbuds', value: 1245 },
  { name: 'Smart Watch', value: 986 },
  { name: 'Phone Case', value: 854 },
  { name: 'USB-C Cable', value: 712 },
  { name: 'Power Bank', value: 598 },
  { name: 'Screen Protector', value: 431 },
];

const meta = {
  title: 'Features/Charts/Top Products',
  component: TopProductsBarChart,
  tags: ['autodocs'],
  decorators: [
    Story => (
      <div className="w-[640px]">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof TopProductsBarChart>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { data: productsData, animate: false },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await waitFor(() => {
      expect(canvasElement.querySelector('svg.recharts-surface')).toBeInTheDocument();
    });
    expect(canvasElement.querySelectorAll('.recharts-bar-rectangle')).toHaveLength(productsData.length);
    // Long category labels wrap across tspans — match on a substring
    expect(canvas.getAllByText(/Wireless/).length).toBeGreaterThan(0);
    // Compact value label at the end of the top bar
    await expect(canvas.getByText('1.2K')).toBeInTheDocument();
  },
};

export const MaxItems: Story = {
  args: { data: productsData, maxItems: 3, animate: false },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await waitFor(() => {
      expect(canvasElement.querySelector('svg.recharts-surface')).toBeInTheDocument();
    });
    expect(canvasElement.querySelectorAll('.recharts-bar-rectangle')).toHaveLength(3);
    expect(canvas.queryByText(/Protector/)).not.toBeInTheDocument();
  },
};
