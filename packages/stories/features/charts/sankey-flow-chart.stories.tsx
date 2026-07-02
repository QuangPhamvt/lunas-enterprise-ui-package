'use client';

import { SankeyFlowChart } from '@/components/features/charts';

import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, waitFor, within } from 'storybook/test';

const nodes = [
  'iPhone',
  'Mac',
  'iPad',
  'Wearables, Home and Accessories',
  'Services',
  'Net Sales',
  'Cost of Sales',
  'Gross Profit',
  'R&D',
  'SG&A',
  'Operating Income',
  'Profit before tax',
  'Taxes',
  'Net profit',
];

const links = [
  { source: 'iPhone', target: 'Net Sales', value: 205489 },
  { source: 'Mac', target: 'Net Sales', value: 40177 },
  { source: 'iPad', target: 'Net Sales', value: 29292 },
  { source: 'Wearables, Home and Accessories', target: 'Net Sales', value: 41241 },
  { source: 'Services', target: 'Net Sales', value: 78129 },
  { source: 'Net Sales', target: 'Cost of Sales', value: 223546 },
  { source: 'Net Sales', target: 'Gross Profit', value: 170782 },
  { source: 'Gross Profit', target: 'R&D', value: 26251 },
  { source: 'Gross Profit', target: 'SG&A', value: 25094 },
  { source: 'Gross Profit', target: 'Operating Income', value: 119437 },
  { source: 'Operating Income', target: 'Profit before tax', value: 119103 },
  { source: 'Profit before tax', target: 'Taxes', value: 19300 },
  { source: 'Profit before tax', target: 'Net profit', value: 99803 },
];

const meta = {
  title: 'Features/Charts/Sankey Flow',
  component: SankeyFlowChart,
  tags: ['autodocs'],
  decorators: [
    Story => (
      <div className="w-[1200px]">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof SankeyFlowChart>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { nodes, links, height: 620, animate: false },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await waitFor(() => {
      expect(canvasElement.querySelector('svg.recharts-surface')).toBeInTheDocument();
    });
    expect(canvasElement.querySelectorAll('.recharts-sankey-node')).toHaveLength(nodes.length);
    expect(canvasElement.querySelectorAll('.recharts-sankey-link')).toHaveLength(links.length);
    await expect(canvas.getByText(/iPhone: 205,489/)).toBeInTheDocument();
    await expect(canvas.getByText(/Net profit: 99,803/)).toBeInTheDocument();
  },
};
