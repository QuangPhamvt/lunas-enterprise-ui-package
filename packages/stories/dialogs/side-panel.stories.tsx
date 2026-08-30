import type { ComponentProps } from 'react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';

import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, waitFor, within } from 'storybook/test';
import { SidePanel } from '@/components/dialogs/side-panel';

const meta = {
  tags: ['autodocs'],
  title: 'Dialogs/SidePanel',
  component: SidePanel,
} satisfies Meta<typeof SidePanel>;

export default meta;
type Story = StoryObj<typeof meta>;

const SCROLL_DEMO_LINES = Array.from({ length: 80 }, (_, index) => `Dòng nội dung có thể cuộn số ${index + 1}`);

type SidePanelDemoProps = ComponentProps<typeof SidePanel> & { triggerLabel?: string };

/** Shared render wrapper: manages open state locally and exposes a trigger button, since SidePanel is fully controlled. */
const SidePanelDemo = ({ triggerLabel = 'Mở bảng chi tiết', open: openProp, ...props }: SidePanelDemoProps) => {
  const [open, setOpen] = useState(openProp ?? false);
  return (
    <div className="flex flex-col items-start gap-4">
      <Button variant="outline" color="muted" onClick={() => setOpen(true)}>
        {triggerLabel}
      </Button>
      <SidePanel {...props} open={open} onOpenChange={setOpen} />
    </div>
  );
};

export const Default: Story = {
  args: {
    open: false,
    title: 'Chi tiết đơn hàng',
    description: 'Xem và cập nhật thông tin đơn hàng.',
    footer: <Button type="submit">Lưu thay đổi</Button>,
    children: (
      <div className="flex flex-col">
        {SCROLL_DEMO_LINES.map(line => (
          <p key={line} className="py-2 text-sm text-text-positive-weak">
            {line}
          </p>
        ))}
      </div>
    ),
  },
  render: args => <SidePanelDemo {...args} />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const body = within(document.body);

    await expect(body.queryByText('Chi tiết đơn hàng')).not.toBeInTheDocument();

    await userEvent.click(canvas.getByRole('button', { name: 'Mở bảng chi tiết' }));
    await expect(body.getByText('Chi tiết đơn hàng')).toBeInTheDocument();

    await userEvent.keyboard('{Escape}');
    await waitFor(() => expect(body.queryByText('Chi tiết đơn hàng')).not.toBeInTheDocument());
  },
};

export const WithoutFooter: Story = {
  name: 'Không có footer',
  args: {
    open: false,
    title: 'Thông báo hệ thống',
    description: 'Bảng này không có footer, nội dung vẫn cuộn bình thường.',
    children: (
      <div className="flex flex-col">
        {SCROLL_DEMO_LINES.slice(0, 30).map(line => (
          <p key={line} className="py-2 text-sm text-text-positive-weak">
            {line}
          </p>
        ))}
      </div>
    ),
  },
  render: args => <SidePanelDemo {...args} triggerLabel="Mở (không footer)" />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const body = within(document.body);

    await userEvent.click(canvas.getByRole('button', { name: 'Mở (không footer)' }));
    await expect(body.getByText('Thông báo hệ thống')).toBeInTheDocument();

    await userEvent.keyboard('{Escape}');
    await waitFor(() => expect(body.queryByText('Thông báo hệ thống')).not.toBeInTheDocument());
  },
};

export const WithoutHeader: Story = {
  name: 'Không có title/description',
  args: {
    open: false,
    footer: <Button type="submit">Đóng</Button>,
    children: <p className="text-sm text-text-positive-weak">Bảng này không có title/description, chỉ có nội dung và footer.</p>,
  },
  render: args => <SidePanelDemo {...args} triggerLabel="Mở (không header)" />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const body = within(document.body);

    await userEvent.click(canvas.getByRole('button', { name: 'Mở (không header)' }));
    await expect(body.getByText('Bảng này không có title/description, chỉ có nội dung và footer.')).toBeInTheDocument();

    await userEvent.keyboard('{Escape}');
    await waitFor(() => expect(body.queryByText('Bảng này không có title/description, chỉ có nội dung và footer.')).not.toBeInTheDocument());
  },
};

export const WithoutCloseButton: Story = {
  name: 'Không có nút đóng',
  args: {
    open: false,
    title: 'Bắt buộc xác nhận',
    description: 'Không có nút đóng ở góc, chỉ có thể đóng qua footer hoặc phím Escape.',
    showCloseButton: false,
    footer: <Button type="submit">Xác nhận</Button>,
    children: <p className="text-sm text-text-positive-weak">Nội dung ngắn, không cần cuộn.</p>,
  },
  render: args => <SidePanelDemo {...args} triggerLabel="Mở (không nút đóng)" />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const body = within(document.body);

    await userEvent.click(canvas.getByRole('button', { name: 'Mở (không nút đóng)' }));
    await expect(body.getByText('Bắt buộc xác nhận')).toBeInTheDocument();

    await userEvent.keyboard('{Escape}');
    await waitFor(() => expect(body.queryByText('Bắt buộc xác nhận')).not.toBeInTheDocument());
  },
};

export const ShortContent: Story = {
  name: 'Nội dung ngắn (không cuộn)',
  args: {
    open: false,
    title: 'Xác nhận nhanh',
    description: 'Nội dung ngắn, footer vẫn nằm cố định dưới cùng thay vì trồi lên ngay dưới nội dung.',
    footer: (
      <>
        <Button variant="outline" color="muted">
          Hủy bỏ
        </Button>
        <Button type="submit">Đồng ý</Button>
      </>
    ),
    children: <p className="text-sm text-text-positive-weak">Chỉ một dòng nội dung ngắn.</p>,
  },
  render: args => <SidePanelDemo {...args} triggerLabel="Mở (nội dung ngắn)" />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const body = within(document.body);

    await userEvent.click(canvas.getByRole('button', { name: 'Mở (nội dung ngắn)' }));
    await expect(body.getByText('Xác nhận nhanh')).toBeInTheDocument();
    await expect(body.getByRole('button', { name: 'Đồng ý' })).toBeInTheDocument();

    await userEvent.keyboard('{Escape}');
    await waitFor(() => expect(body.queryByText('Xác nhận nhanh')).not.toBeInTheDocument());
  },
};

export const NonModal: Story = {
  name: 'Không modal (tương tác được nội dung ngoài)',
  args: {
    open: false,
    modal: false,
    title: 'Xem nhanh',
    description: 'Không có overlay, bạn vẫn thao tác được với nội dung bên ngoài. Chỉ đóng được bằng nút X.',
    footer: <Button type="submit">Lưu</Button>,
    children: <p className="text-sm text-text-positive-weak">Thử bấm nút bên ngoài hoặc nhấn Escape — panel sẽ không đóng.</p>,
  },
  render: args => {
    const [open, setOpen] = useState(args.open ?? false);
    return (
      <div className="flex flex-col items-start gap-4">
        <Button variant="outline" color="muted" onClick={() => setOpen(true)}>
          Mở (không modal)
        </Button>
        <Button variant="outline" color="muted">
          Nút bên ngoài panel
        </Button>
        <SidePanel {...args} open={open} onOpenChange={setOpen} />
      </div>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const body = within(document.body);

    await userEvent.click(canvas.getByRole('button', { name: 'Mở (không modal)' }));
    await expect(body.getByText('Xem nhanh')).toBeInTheDocument();

    // Nội dung bên ngoài vẫn bấm được và không đóng panel
    await userEvent.click(canvas.getByRole('button', { name: 'Nút bên ngoài panel' }));
    await expect(body.getByText('Xem nhanh')).toBeInTheDocument();

    // Escape không đóng panel khi modal=false
    await userEvent.keyboard('{Escape}');
    await expect(body.getByText('Xem nhanh')).toBeInTheDocument();

    // Chỉ nút X mới đóng được panel
    await userEvent.click(body.getByRole('button', { name: 'Đóng' }));
    await waitFor(() => expect(body.queryByText('Xem nhanh')).not.toBeInTheDocument());
  },
};
