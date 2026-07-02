'use client';

import { type ChartConfig, ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';

import type { Meta, StoryObj } from '@storybook/react-vite';
import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts';
import { expect, fireEvent, waitFor, within } from 'storybook/test';

const salesData = [
  { month: 'Jan', online: 186, retail: 80 },
  { month: 'Feb', online: 305, retail: 200 },
  { month: 'Mar', online: 237, retail: 120 },
  { month: 'Apr', online: 173, retail: 190 },
  { month: 'May', online: 209, retail: 130 },
  { month: 'Jun', online: 264, retail: 140 },
];

const salesConfig = {
  online: { label: 'Online', color: 'var(--chart-1)' },
  retail: { label: 'Retail', color: 'var(--chart-2)' },
} satisfies ChartConfig;

const themedConfig = {
  online: { label: 'Online', theme: { light: 'oklch(0.61 0.22 293)', dark: 'oklch(0.81 0.1 294)' } },
  retail: { label: 'Retail', theme: { light: 'oklch(0.62 0.19 260)', dark: 'oklch(0.81 0.1 252)' } },
} satisfies ChartConfig;

const meta = {
  title: 'Components/Chart',
  component: ChartContainer,
  tags: ['autodocs'],
} satisfies Meta<typeof ChartContainer>;

export default meta;
type Story = StoryObj<typeof meta>;

const SalesBarChart = ({ indicator }: { indicator?: 'dot' | 'line' | 'dashed' }) => (
  <BarChart data={salesData}>
    <CartesianGrid vertical={false} />
    <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={8} />
    <ChartTooltip content={<ChartTooltipContent indicator={indicator} />} />
    <Bar dataKey="online" fill="var(--color-online)" radius={4} isAnimationActive={false} />
    <Bar dataKey="retail" fill="var(--color-retail)" radius={4} isAnimationActive={false} />
    <ChartLegend content={<ChartLegendContent />} />
  </BarChart>
);

export const Default: Story = {
  args: { config: salesConfig, children: <SalesBarChart /> },
  render: args => (
    <div className="w-[600px]">
      <ChartContainer {...args} />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await waitFor(() => {
      expect(canvasElement.querySelector('svg.recharts-surface')).toBeInTheDocument();
    });
    // Two bar series, one rectangle per month each
    expect(canvasElement.querySelectorAll('.recharts-bar-rectangle')).toHaveLength(salesData.length * 2);
    // Legend labels come from the chart config
    await expect(canvas.getByText('Online')).toBeInTheDocument();
    await expect(canvas.getByText('Retail')).toBeInTheDocument();
    // ChartStyle emits per-series color variables scoped to this chart instance
    const container = canvasElement.querySelector('[data-chart]');
    expect(container).not.toBeNull();
    const style = container?.querySelector('style');
    expect(style?.innerHTML).toContain('--color-online:');
    expect(style?.innerHTML).toContain('--color-retail:');
  },
};

export const TooltipOnHover: Story = {
  args: { config: salesConfig, children: <SalesBarChart /> },
  render: args => (
    <div className="w-[600px]">
      <ChartContainer {...args} />
    </div>
  ),
  play: async ({ canvasElement }) => {
    await waitFor(() => {
      expect(canvasElement.querySelector('svg.recharts-surface')).toBeInTheDocument();
    });
    const svg = canvasElement.querySelector('svg.recharts-surface') as SVGElement;
    const rect = svg.getBoundingClientRect();
    await fireEvent.mouseMove(svg, {
      clientX: rect.left + rect.width / 2,
      clientY: rect.top + rect.height / 2,
    });
    await waitFor(() => {
      expect(canvasElement.querySelector('[data-slot="chart-tooltip-content"]')).toBeInTheDocument();
    });
  },
};

export const ThemedConfig: Story = {
  args: { config: themedConfig, children: <SalesBarChart /> },
  render: args => (
    <div className="w-[600px]">
      <ChartContainer {...args} />
    </div>
  ),
  play: async ({ canvasElement }) => {
    await waitFor(() => {
      expect(canvasElement.querySelector('svg.recharts-surface')).toBeInTheDocument();
    });
    // theme: { light, dark } emits a `.dark`-scoped override rule
    const style = canvasElement.querySelector('[data-chart]')?.querySelector('style');
    expect(style?.innerHTML).toContain('.dark [data-chart=');
    expect(style?.innerHTML).toContain('oklch(0.81 0.1 294)');
  },
};

export const IndicatorVariants: Story = {
  args: { config: salesConfig, children: <SalesBarChart /> },
  render: () => (
    <div className="flex flex-col gap-8">
      <div className="w-[480px]">
        <ChartContainer config={salesConfig}>
          <SalesBarChart indicator="line" />
        </ChartContainer>
      </div>
      <div className="w-[480px]">
        <ChartContainer config={salesConfig}>
          <SalesBarChart indicator="dashed" />
        </ChartContainer>
      </div>
    </div>
  ),
  play: async ({ canvasElement }) => {
    await waitFor(() => {
      expect(canvasElement.querySelectorAll('svg.recharts-surface')).toHaveLength(2);
    });
  },
};
