'use client';

import { CheckIcon, XIcon } from 'lucide-react';

import {
  Timeline,
  TimelineConnector,
  TimelineContent,
  TimelineDescription,
  TimelineDot,
  type TimelineDotColor,
  type TimelineDotStatus,
  TimelineIndicator,
  TimelineItem,
  TimelineTime,
  TimelineTitle,
} from '@/components/ui/timeline';

import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within } from 'storybook/test';

const meta = {
  tags: ['autodocs'],
  title: 'Components/Timeline',
  component: Timeline,
} satisfies Meta<typeof Timeline>;

export default meta;

type Story = StoryObj<typeof meta>;

// ─── Default ─────────────────────────────────────────────────────────────────

export const Default: Story = {
  args: {},
  render: () => (
    <Timeline className="w-80">
      <TimelineItem>
        <TimelineIndicator>
          <TimelineDot status="completed">
            <CheckIcon />
          </TimelineDot>
          <TimelineConnector status="completed" />
        </TimelineIndicator>
        <TimelineContent>
          <TimelineTitle>Tạo Đơn</TimelineTitle>
          <TimelineDescription>Đơn hàng đã được tạo thành công.</TimelineDescription>
          <TimelineTime>10:32 26/08/2026</TimelineTime>
        </TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineIndicator>
          <TimelineDot status="current" />
          <TimelineConnector status="current" />
        </TimelineIndicator>
        <TimelineContent>
          <TimelineTitle>Đang Mua</TimelineTitle>
          <TimelineDescription>Đang tiến hành mua hàng từ nhà cung cấp.</TimelineDescription>
        </TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineIndicator>
          <TimelineDot status="upcoming" />
          <TimelineConnector status="upcoming" />
        </TimelineIndicator>
        <TimelineContent>
          <TimelineTitle>Đang Giao</TimelineTitle>
        </TimelineContent>
      </TimelineItem>
    </Timeline>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('Tạo Đơn')).toBeInTheDocument();
    await expect(canvas.getByText('Đang Mua')).toBeInTheDocument();
    await expect(canvas.getByText('Đang Giao')).toBeInTheDocument();
    // Description text must be legible — resolves to the project token, never shadcn's near-white muted-foreground.
    const description = canvas.getByText('Đơn hàng đã được tạo thành công.');
    await expect(description).toHaveClass('text-text-positive-weak');
  },
};

// ─── States ──────────────────────────────────────────────────────────────────

const STATES = [
  { status: 'completed', label: 'Hoàn Thành' },
  { status: 'current', label: 'Đang Xử Lý' },
  { status: 'upcoming', label: 'Sắp Tới' },
  { status: 'error', label: 'Thất Bại' },
] satisfies { status: TimelineDotStatus; label: string }[];

export const States: Story = {
  args: {},
  render: () => (
    <Timeline className="w-80">
      {STATES.map(({ status, label }) => (
        <TimelineItem key={status}>
          <TimelineIndicator>
            <TimelineDot status={status}>
              {status === 'completed' && <CheckIcon />}
              {status === 'error' && <XIcon />}
            </TimelineDot>
            <TimelineConnector status={status} />
          </TimelineIndicator>
          <TimelineContent>
            <TimelineTitle>{label}</TimelineTitle>
          </TimelineContent>
        </TimelineItem>
      ))}
    </Timeline>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    for (const { label } of STATES) {
      await expect(canvas.getByText(label)).toBeInTheDocument();
    }
    const dots = canvasElement.querySelectorAll('[data-slot="timeline-dot"]');
    await expect(dots).toHaveLength(4);

    // `error` must be visually distinct from `completed`: it carries a ring, `completed` does not.
    const errorDot = canvasElement.querySelector('[data-slot="timeline-dot"][data-status="error"]');
    const completedDot = canvasElement.querySelector('[data-slot="timeline-dot"][data-status="completed"]');
    await expect(errorDot).toHaveClass('ring-4');
    await expect(errorDot?.querySelector('svg')).toBeInTheDocument();
    await expect(completedDot).not.toHaveClass('ring-4');
  },
};

// ─── Color override ────────────────────────────────────────────────────────────

const COLOR_OVERRIDES = [
  { color: 'success', label: 'Thành Công' },
  { color: 'warning', label: 'Cảnh Báo' },
  { color: 'danger', label: 'Nguy Hiểm' },
] satisfies { color: TimelineDotColor; label: string }[];

export const ColorOverride: Story = {
  args: {},
  render: () => (
    <Timeline className="w-80">
      {COLOR_OVERRIDES.map(({ color, label }) => (
        <TimelineItem key={color}>
          <TimelineIndicator>
            <TimelineDot status="completed" color={color} />
            <TimelineConnector status="completed" color={color} />
          </TimelineIndicator>
          <TimelineContent>
            <TimelineTitle>{label}</TimelineTitle>
          </TimelineContent>
        </TimelineItem>
      ))}
    </Timeline>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    for (const { label } of COLOR_OVERRIDES) {
      await expect(canvas.getByText(label)).toBeInTheDocument();
    }
    const warningDot = canvasElement.querySelectorAll('[data-slot="timeline-dot"]')[1];
    await expect(warningDot).toHaveClass('bg-warning');
  },
};

// ─── Order status history (real milestone vocabulary) ────────────────────────

const ORDER_STATUS_HISTORY = [
  { status: 'completed', label: 'Tạo Đơn', description: 'Đơn hàng đã được tạo thành công.', time: '08:12 20/08/2026' },
  { status: 'completed', label: 'Gửi Báo Giá', description: 'Báo giá đã được gửi cho khách hàng.', time: '08:30 20/08/2026' },
  { status: 'completed', label: 'Xác Nhận', description: 'Khách hàng đã xác nhận đơn hàng.', time: '09:05 20/08/2026' },
  { status: 'completed', label: 'Đã Cọc', description: 'Đã nhận tiền cọc từ khách hàng.', time: '09:40 20/08/2026' },
  { status: 'current', label: 'Đang Mua', description: 'Đang tiến hành mua hàng từ nhà cung cấp.', time: '14:16 21/08/2026' },
  { status: 'upcoming', label: 'Đã Mua', description: undefined, time: undefined },
  { status: 'upcoming', label: 'Kho Ngoại', description: undefined, time: undefined },
  { status: 'upcoming', label: 'VC Quốc Tế', description: undefined, time: undefined },
  { status: 'upcoming', label: 'Về VN', description: undefined, time: undefined },
  { status: 'upcoming', label: 'Đóng Gói', description: undefined, time: undefined },
  { status: 'upcoming', label: 'Bàn Giao', description: undefined, time: undefined },
  { status: 'upcoming', label: 'Đang Giao', description: undefined, time: undefined },
  { status: 'upcoming', label: 'Đã Giao', description: undefined, time: undefined },
] satisfies { status: TimelineDotStatus; label: string; description?: string; time?: string }[];

export const OrderStatusHistory: Story = {
  args: {},
  render: () => (
    <Timeline className="w-96">
      {ORDER_STATUS_HISTORY.map(({ status, label, description, time }) => (
        <TimelineItem key={label}>
          <TimelineIndicator>
            <TimelineDot status={status}>{status === 'completed' && <CheckIcon />}</TimelineDot>
            <TimelineConnector status={status} />
          </TimelineIndicator>
          <TimelineContent>
            <TimelineTitle>{label}</TimelineTitle>
            {description ? <TimelineDescription>{description}</TimelineDescription> : null}
            {time ? <TimelineTime>{time}</TimelineTime> : null}
          </TimelineContent>
        </TimelineItem>
      ))}
    </Timeline>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    for (const { label } of ORDER_STATUS_HISTORY) {
      await expect(canvas.getByText(label)).toBeInTheDocument();
    }
    const currentDots = canvasElement.querySelectorAll('[data-slot="timeline-dot"][data-status="current"]');
    await expect(currentDots).toHaveLength(1);

    // Completed segments form a tinted progress track; upcoming segments stay neutral.
    const connectors = [...canvasElement.querySelectorAll('[data-slot="timeline-connector"]')];
    const completedConnector = connectors.find(c => (c as HTMLElement).dataset.status === 'completed');
    const upcomingConnector = connectors.find(c => (c as HTMLElement).dataset.status === 'upcoming');
    await expect(completedConnector).toHaveClass('bg-success');
    await expect(upcomingConnector).toHaveClass('bg-border');
  },
};

// ─── Sizes ──────────────────────────────────────────────────────────────────────

export const Sizes: Story = {
  args: {},
  render: () => (
    <div className="flex items-center gap-x-4">
      <TimelineDot status="completed" size="sm" />
      <TimelineDot status="completed" size="md" />
      <TimelineDot status="completed" size="lg" />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const dots = canvasElement.querySelectorAll('[data-slot="timeline-dot"]');
    await expect(dots).toHaveLength(3);
    await expect(dots[0]).toHaveClass('size-2.5');
    await expect(dots[1]).toHaveClass('size-3');
    await expect(dots[2]).toHaveClass('size-3.5');
  },
};
