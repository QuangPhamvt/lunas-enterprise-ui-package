'use client';

import { Status } from '@/components/ui/status';
import type { StatusVariants } from '@/components/ui/status.variants';

import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within } from 'storybook/test';

const meta = {
  tags: ['autodocs'],
  title: 'Components/Status',
  component: Status,
} satisfies Meta<typeof Status>;

export default meta;

type Story = StoryObj<typeof meta>;

const ALL_COLORS: NonNullable<StatusVariants['color']>[] = [
  'slate',
  'gray',
  'zinc',
  'neutral',
  'stone',
  'red',
  'orange',
  'amber',
  'yellow',
  'lime',
  'green',
  'emerald',
  'teal',
  'cyan',
  'sky',
  'blue',
  'indigo',
  'violet',
  'purple',
  'fuchsia',
  'pink',
  'rose',
];

export const Default: Story = {
  args: {
    children: 'Đang hoạt động',
    variant: 'dot',
    color: 'gray',
    size: 'md',
  },
};

export const Unset: Story = {
  args: { ...Default.args, color: 'none', children: 'Chưa thiết lập' },
};

// ─── Variants ──────────────────────────────────────────────────────────────────

export const Variants: Story = {
  args: {},
  render: () => (
    <div className="flex flex-col gap-y-3">
      <Status variant="dot" color="orange">
        Đang tư vấn
      </Status>
      <Status variant="solid" color="orange">
        Đang tư vấn
      </Status>
      <Status variant="soft" color="orange">
        Đang tư vấn
      </Status>
      <Status variant="bar" color="orange">
        Đang tư vấn
      </Status>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const labels = canvas.getAllByText('Đang tư vấn');
    await expect(labels).toHaveLength(4);
  },
};

// ─── Pipeline example (mirrors the deal/lead status set from the design) ───────

const PIPELINE = [
  { color: 'none', label: 'Chưa thiết lập' },
  { color: 'red', label: 'Chưa xử lý' },
  { color: 'orange', label: 'Đang tư vấn' },
  { color: 'green', label: 'Đang đàm phán' },
  { color: 'cyan', label: 'Chờ ký hợp đồng' },
  { color: 'blue', label: 'Đang giao dịch' },
  { color: 'pink', label: 'Hoàn tất giao dịch' },
] satisfies { color: NonNullable<StatusVariants['color']>; label: string }[];

export const PipelineDot: Story = {
  args: {},
  render: () => (
    <div className="flex flex-col gap-y-3">
      {PIPELINE.map(({ color, label }) => (
        <Status key={color} variant="dot" color={color}>
          {label}
        </Status>
      ))}
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    for (const { label } of PIPELINE) {
      await expect(canvas.getByText(label)).toBeInTheDocument();
    }
  },
};

export const PipelineSolid: Story = {
  args: {},
  render: () => (
    <div className="flex flex-col gap-y-3">
      {PIPELINE.map(({ color, label }) => (
        <Status key={color} variant="solid" color={color}>
          {label}
        </Status>
      ))}
    </div>
  ),
};

export const PipelineSoft: Story = {
  args: {},
  render: () => (
    <div className="flex flex-col gap-y-3">
      {PIPELINE.map(({ color, label }) => (
        <Status key={color} variant="soft" color={color}>
          {label}
        </Status>
      ))}
    </div>
  ),
};

// ─── Bar variant, stacked as a status list (right panel of the design) ─────────

const BAR_LIST = [
  { color: 'red', label: 'Chưa xử lý' },
  { color: 'orange', label: 'Đang tư vấn' },
  { color: 'green', label: 'Đang đàm phán' },
  { color: 'cyan', label: 'Chờ ký hợp đồng' },
  { color: 'blue', label: 'Đang giao dịch' },
  { color: 'pink', label: 'Hoàn tất giao dịch' },
  { color: 'gray', label: 'Mất đơn hàng' },
] satisfies { color: NonNullable<StatusVariants['color']>; label: string }[];

export const BarList: Story = {
  args: {},
  render: () => (
    <div className="flex flex-col gap-y-2">
      {BAR_LIST.map(({ color, label }) => (
        <Status key={color} variant="bar" color={color} size="lg">
          {label}
        </Status>
      ))}
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    for (const { label } of BAR_LIST) {
      await expect(canvas.getByText(label)).toBeInTheDocument();
    }
  },
};

// ─── Full Tailwind color sweep ──────────────────────────────────────────────────

export const AllColors: Story = {
  args: {},
  render: () => (
    <div className="grid grid-cols-4 gap-3">
      {ALL_COLORS.map(color => (
        <Status key={color} variant="soft" color={color}>
          {color}
        </Status>
      ))}
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    for (const color of ALL_COLORS) {
      await expect(canvas.getByText(color)).toBeInTheDocument();
    }
  },
};

// ─── Sizes ──────────────────────────────────────────────────────────────────────

export const Sizes: Story = {
  args: {},
  render: () => (
    <div className="flex items-center gap-x-3">
      <Status size="sm" color="blue">
        Nhỏ
      </Status>
      <Status size="md" color="blue">
        Vừa
      </Status>
      <Status size="lg" color="blue">
        Lớn
      </Status>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('Nhỏ')).toBeInTheDocument();
    await expect(canvas.getByText('Vừa')).toBeInTheDocument();
    await expect(canvas.getByText('Lớn')).toBeInTheDocument();
  },
};
