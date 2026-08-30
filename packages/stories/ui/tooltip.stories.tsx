import { InfoIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, waitFor, within } from 'storybook/test';

const meta = {
  tags: ['autodocs'],
  title: 'Components/Tooltip',
  component: Tooltip,
} satisfies Meta<typeof Tooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

const body = () => within(document.body);

export const Default: Story = {
  render: () => (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="outline" color="muted">
          Di chuột vào đây
        </Button>
      </TooltipTrigger>
      <TooltipContent>Nội dung gợi ý mặc định</TooltipContent>
    </Tooltip>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByRole('button', { name: 'Di chuột vào đây' });

    expect(body().queryByText('Nội dung gợi ý mặc định')).not.toBeInTheDocument();

    await userEvent.hover(trigger);
    await waitFor(() => expect(body().getByText('Nội dung gợi ý mặc định')).toBeInTheDocument());

    await userEvent.unhover(trigger);
    await waitFor(() => expect(body().queryByText('Nội dung gợi ý mặc định')).not.toBeInTheDocument());
  },
};

export const IconTrigger: Story = {
  name: 'Kích hoạt bằng icon',
  render: () => (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="ghost" size="icon" aria-label="Thông tin thêm">
          <InfoIcon />
        </Button>
      </TooltipTrigger>
      <TooltipContent>Thông tin bổ sung cho trường này</TooltipContent>
    </Tooltip>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByRole('button', { name: 'Thông tin thêm' });

    await userEvent.hover(trigger);
    await waitFor(() => expect(body().getByText('Thông tin bổ sung cho trường này')).toBeInTheDocument());
  },
};

export const Placement: Story = {
  name: 'Vị trí hiển thị',
  render: () => (
    <div className="flex items-center gap-6 p-12">
      {(['top', 'right', 'bottom', 'left'] as const).map(side => (
        <Tooltip key={side}>
          <TooltipTrigger asChild>
            <Button variant="outline" color="muted">
              {side}
            </Button>
          </TooltipTrigger>
          <TooltipContent side={side}>Gợi ý phía {side}</TooltipContent>
        </Tooltip>
      ))}
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByRole('button', { name: 'right' });

    await userEvent.hover(trigger);
    await waitFor(() => {
      const content = document.body.querySelector<HTMLElement>('[data-slot="tooltip-content"]');
      expect(content).not.toBeNull();
      expect(content).toHaveAttribute('data-side', 'right');
    });
  },
};

export const CustomDelay: Story = {
  name: 'Tuỳ chỉnh thời gian trễ',
  render: () => (
    <TooltipProvider delayDuration={500}>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline" color="muted">
            Trễ 500ms
          </Button>
        </TooltipTrigger>
        <TooltipContent>Gợi ý xuất hiện sau khi trễ</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByRole('button', { name: 'Trễ 500ms' });

    await userEvent.hover(trigger);
    await waitFor(() => expect(body().getByText('Gợi ý xuất hiện sau khi trễ')).toBeInTheDocument());
  },
};

export const DisabledTrigger: Story = {
  name: 'Trigger bị vô hiệu hoá',
  render: () => (
    <Tooltip>
      <TooltipTrigger asChild>
        <span tabIndex={0}>
          <Button variant="outline" color="muted" disabled className="pointer-events-none">
            Nút bị khoá
          </Button>
        </span>
      </TooltipTrigger>
      <TooltipContent>Không thể thao tác lúc này</TooltipContent>
    </Tooltip>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByText('Nút bị khoá').closest('span') as HTMLElement;

    await userEvent.hover(trigger);
    await waitFor(() => expect(body().getByText('Không thể thao tác lúc này')).toBeInTheDocument());
  },
};

export const LongContent: Story = {
  name: 'Nội dung dài',
  render: () => (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="outline" color="muted">
          Xem chi tiết
        </Button>
      </TooltipTrigger>
      <TooltipContent className="max-w-64">
        Đây là một đoạn nội dung gợi ý khá dài để kiểm tra hành vi ngắt dòng và giới hạn chiều rộng của tooltip khi văn bản vượt quá không gian hiển thị mặc
        định.
      </TooltipContent>
    </Tooltip>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByRole('button', { name: 'Xem chi tiết' });

    await userEvent.hover(trigger);
    await waitFor(() => {
      const content = document.body.querySelector<HTMLElement>('[data-slot="tooltip-content"]');
      expect(content).not.toBeNull();
      expect(content).toHaveClass('max-w-64');
    });
  },
};
