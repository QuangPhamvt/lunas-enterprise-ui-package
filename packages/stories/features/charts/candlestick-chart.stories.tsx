'use client';

import { CandlestickChart } from '@/components/features/charts';

import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, waitFor } from 'storybook/test';

const ohlcData = [
  { date: '2026-06-01', open: 140.0, high: 146.2, low: 138.5, close: 144.9 },
  { date: '2026-06-02', open: 144.9, high: 145.6, low: 141.2, close: 142.1 },
  { date: '2026-06-03', open: 142.1, high: 147.3, low: 141.9, close: 146.8 },
  { date: '2026-06-04', open: 146.8, high: 149.0, low: 145.5, close: 148.2 },
  { date: '2026-06-05', open: 148.2, high: 148.4, low: 144.6, close: 145.9 },
];

const meta = {
  title: 'Features/Charts/Candlestick',
  component: CandlestickChart,
  tags: ['autodocs'],
  decorators: [
    Story => (
      <div className="w-[640px]">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof CandlestickChart>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { data: ohlcData, animate: false },
  play: async ({ canvasElement }) => {
    await waitFor(() => {
      expect(canvasElement.querySelector('svg.recharts-surface')).toBeInTheDocument();
    });
    // One candle body <rect> per period
    const bodies = canvasElement.querySelectorAll('svg.recharts-surface > g > g > rect');
    await waitFor(() => {
      expect(bodies.length).toBe(ohlcData.length);
    });
    // First candle is up (close > open) → success color; second is down → danger color
    expect(bodies[0]?.getAttribute('fill')).toBe('var(--success)');
    expect(bodies[1]?.getAttribute('fill')).toBe('var(--danger)');
  },
};

export const CustomColors: Story = {
  args: { data: ohlcData, upColor: 'var(--chart-1)', downColor: 'var(--chart-8)', animate: false },
  play: async ({ canvasElement }) => {
    await waitFor(() => {
      expect(canvasElement.querySelector('svg.recharts-surface')).toBeInTheDocument();
    });
    const bodies = canvasElement.querySelectorAll('svg.recharts-surface > g > g > rect');
    await waitFor(() => {
      expect(bodies.length).toBe(ohlcData.length);
    });
    expect(bodies[0]?.getAttribute('fill')).toBe('var(--chart-1)');
  },
};
