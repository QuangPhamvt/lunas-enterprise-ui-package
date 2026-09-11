import { UITableListDisplay } from '@/components/features/tables';

import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, within } from 'storybook/test';

const meta = {
  tags: ['autodocs'],
  title: 'Features/UI Tables/Atoms/List Display',
  component: UITableListDisplay,
} satisfies Meta<typeof UITableListDisplay>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    items: ['React', 'TypeScript', 'TailwindCSS'],
    maxVisible: 3,
  },
  render: args => <UITableListDisplay {...args} />,
};

export const WithOverflow: Story = {
  args: {
    items: ['React', 'TypeScript', 'TailwindCSS', 'Vite', 'Storybook', 'Biome'],
    maxVisible: 3,
  },
  render: args => <UITableListDisplay {...args} />,
};

export const SingleItem: Story = {
  args: {
    items: ['Admin'],
    maxVisible: 3,
  },
  render: args => <UITableListDisplay {...args} />,
};

export const NumericItems: Story = {
  args: {
    items: [101, 204, 305, 408, 512],
    maxVisible: 3,
  },
  render: args => <UITableListDisplay {...args} />,
};

export const LargeMaxVisible: Story = {
  args: {
    items: ['Alpha', 'Beta', 'Gamma', 'Delta', 'Epsilon'],
    maxVisible: 5,
  },
  render: args => <UITableListDisplay {...args} />,
};

export const Empty: Story = {
  args: {
    items: [],
  },
  render: args => <UITableListDisplay {...args} />,
};

export const TagVariant: Story = {
  args: {
    items: ['SPX-1023', 'SPX-1044', 'SPX-2087'],
    maxVisible: 1,
    variant: 'tag',
    tooltipItems: 'all',
    moreLabel: (n: number) => `+${n}`,
  },
  render: args => <UITableListDisplay {...args} />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.hover(canvas.getByText('+2'));
    const tooltip = await within(document.body).findAllByText('SPX-1044');
    await expect(tooltip.length).toBeGreaterThan(0);
  },
};
