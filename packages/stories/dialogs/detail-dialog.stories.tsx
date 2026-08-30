import { HistoryIcon, LayoutDashboardIcon, PackageIcon } from 'lucide-react';

import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, waitFor, within } from 'storybook/test';
import { DetailDialog } from '@/components/dialogs/detail-dialog';
import {
  DetailDialogSidebarGroup,
  DetailDialogSidebarGroupContent,
  DetailDialogSidebarGroupLabel,
  DetailDialogSidebarMenu,
  DetailDialogSidebarMenuBadge,
  DetailDialogSidebarMenuButton,
  DetailDialogSidebarMenuItem,
  DetailDialogSidebarMenuSub,
  DetailDialogSidebarMenuSubButton,
  DetailDialogSidebarMenuSubItem,
  DetailDialogSidebarSeparator,
} from '@/components/dialogs/detail-dialog/components/sidebar';

const meta = {
  tags: ['autodocs'],
  title: 'Dialogs/DetailDialog',
  component: DetailDialog,
} satisfies Meta<typeof DetailDialog>;

export default meta;
type Story = StoryObj<typeof meta>;

const body = () => within(document.body);

export const Default: Story = {
  args: {
    open: true,
    title: 'Detail Dialog Title',
    createdAt: new Date('03-01-2025'),
    sidebar: {
      content: (
        <nav className="flex flex-col gap-1">
          {Array.from({ length: 30 }, (_, index) => index + 1).map(item => (
            <a key={`sidebar-story-item-${item}`} href="#void" className="px-2 py-1 text-sm">
              Mục điều hướng số {item}
            </a>
          ))}
        </nav>
      ),
      footer: <div>Footer Content</div>,
    },
    children: (
      <div className="flex flex-col gap-4 p-4">
        {Array.from({ length: 20 }, (_, index) => index + 1).map(line => (
          <p key={`detail-dialog-story-line-${line}`}>Dòng nội dung mẫu số {line} để kiểm tra hành vi cuộn của phần thân dialog.</p>
        ))}
      </div>
    ),
  },
  play: async () => {
    const wrapper = document.body.querySelector<HTMLElement>('[data-slot="detail-dialog-wrapper"]');
    expect(wrapper).not.toBeNull();
    expect(getComputedStyle(wrapper as HTMLElement).display).toBe('grid');
    expect(getComputedStyle(wrapper as HTMLElement).gridTemplateRows).toMatch(/^\S+ \S+$/);

    const header = document.body.querySelector<HTMLElement>('[data-slot="detail-dialog-header"]');
    const main = document.body.querySelector<HTMLElement>('[data-slot="detail-dialog-main"]');
    expect(getComputedStyle(header as HTMLElement).gridRowStart).toBe('1');
    expect(getComputedStyle(header as HTMLElement).display).toBe('grid');
    expect(getComputedStyle(main as HTMLElement).gridRowStart).toBe('2');

    const sidebar = document.body.querySelector<HTMLElement>('[data-slot="sidebar"]');
    expect(sidebar).toHaveAttribute('data-state', 'expanded');

    const bodySection = document.body.querySelector<HTMLElement>('[data-slot="detail-dialog-body"]');
    expect(bodySection).not.toBeNull();
    expect(getComputedStyle(bodySection as HTMLElement).overflowY).toBe('auto');
    expect((bodySection as HTMLElement).scrollHeight).toBeGreaterThan((bodySection as HTMLElement).clientHeight);
    await expect(body().getByText('Dòng nội dung mẫu số 1 để kiểm tra hành vi cuộn của phần thân dialog.')).toBeInTheDocument();

    const trigger = body().getByRole('button', { name: /toggle sidebar/i });
    await userEvent.click(trigger);
    expect(sidebar).toHaveAttribute('data-state', 'collapsed');

    await userEvent.click(trigger);
    expect(sidebar).toHaveAttribute('data-state', 'expanded');

    const dialogContent = document.body.querySelector<HTMLElement>('[data-slot="dialog-content"]');
    const overlay = document.body.querySelector<HTMLElement>('[data-slot="detail-dialog-overlay"]');
    expect(dialogContent?.parentElement).toBe(overlay);
    const overlayStyle = getComputedStyle(overlay as HTMLElement);
    const contentStyle = getComputedStyle(dialogContent as HTMLElement);
    expect(contentStyle.minWidth).toBe('1056px');
    expect(contentStyle.minHeight).toBe('640px');
    expect(overlayStyle.overflowX).toBe('auto');
    expect(overlayStyle.overflowY).toBe('auto');
    expect(overlayStyle.paddingLeft).toBe('16px');
    expect(overlayStyle.paddingRight).toBe('16px');
    expect(overlayStyle.paddingTop).toBe('16px');
    expect(overlayStyle.paddingBottom).toBe('16px');
    expect(contentStyle.marginLeft).toBe(contentStyle.marginRight);
    expect(contentStyle.marginTop).toBe(contentStyle.marginBottom);

    const sidebarContent = document.body.querySelector<HTMLElement>('[data-slot="sidebar-content"]');
    expect(sidebarContent).not.toBeNull();
    expect(getComputedStyle(sidebarContent as HTMLElement).overflowY).toBe('auto');
    expect((sidebarContent as HTMLElement).scrollHeight).toBeGreaterThan((sidebarContent as HTMLElement).clientHeight);
  },
};

export const WithoutSidebarContent: Story = {
  name: 'Không có nội dung sidebar',
  args: {
    open: true,
    title: 'Chi Tiết Đơn Hàng',
    createdAt: new Date('05-10-2025'),
    children: <div className="p-4">Nội dung chính không kèm cấu hình sidebar tuỳ chỉnh.</div>,
  },
  play: async () => {
    const sidebarHeader = document.body.querySelector<HTMLElement>('[data-slot="sidebar-header"]');
    await expect(within(sidebarHeader as HTMLElement).getByText('Detail Dialog')).toBeInTheDocument();

    const footerMenuItems = document.body.querySelectorAll('[data-slot="sidebar-footer"] [data-slot="sidebar-menu-item"]');
    expect(footerMenuItems).toHaveLength(2);
    expect(footerMenuItems[0]).toBeEmptyDOMElement();
    await expect(body().getByText(/copyright ©/i)).toBeInTheDocument();
  },
};

export const CustomSidebarTitleAndWidth: Story = {
  name: 'Tuỳ chỉnh tiêu đề và độ rộng sidebar',
  args: {
    open: true,
    title: 'Chi Tiết Khách Hàng',
    sidebar: {
      sidebarTitle: 'Điều Hướng Khách Hàng',
      width: '26rem',
      content: <nav className="p-2 text-sm">Danh sách điều hướng khách hàng</nav>,
    },
    children: <div className="p-4">Nội dung chi tiết khách hàng.</div>,
  },
  play: async () => {
    await expect(body().getByText('Điều Hướng Khách Hàng')).toBeInTheDocument();

    const wrapper = document.body.querySelector<HTMLElement>('[data-slot="detail-dialog-wrapper"]');
    expect((wrapper as HTMLElement).style.getPropertyValue('--sidebar-width')).toBe('26rem');
  },
};

export const WithoutFooterContent: Story = {
  name: 'Không có nội dung footer tuỳ chỉnh',
  args: {
    open: true,
    title: 'Chi Tiết Sản Phẩm',
    sidebar: {
      content: <nav className="p-2 text-sm">Danh sách điều hướng sản phẩm</nav>,
    },
    children: <div className="p-4">Nội dung chi tiết sản phẩm.</div>,
  },
  play: async () => {
    const footerMenuItems = document.body.querySelectorAll('[data-slot="sidebar-footer"] [data-slot="sidebar-menu-item"]');
    expect(footerMenuItems).toHaveLength(2);
    expect(footerMenuItems[0]).toBeEmptyDOMElement();
    await expect(body().getByText(/copyright ©/i)).toBeInTheDocument();
  },
};

export const Loading: Story = {
  name: 'Trạng thái đang tải',
  args: {
    open: true,
    title: 'Chi Tiết Đơn Hàng',
    isLoading: true,
    sidebar: {
      content: <nav className="p-2 text-sm">Danh sách điều hướng</nav>,
    },
    children: <div className="p-4">Nội dung này sẽ không hiển thị khi đang tải.</div>,
  },
  play: async () => {
    const bodySection = document.body.querySelector<HTMLElement>('[data-slot="detail-dialog-body"]');
    expect(bodySection).toBeNull();

    const main = document.body.querySelector<HTMLElement>('[data-slot="detail-dialog-main"]');
    const loader = main?.querySelector<HTMLElement>('.loader');
    expect(loader).not.toBeNull();
  },
};

export const CustomHeaderComponent: Story = {
  name: 'Header tuỳ chỉnh',
  args: {
    open: true,
    title: 'Tiêu đề mặc định (bị thay thế)',
    createdAt: new Date('01-01-2025'),
    headerComponent: (
      <div className="flex items-center gap-2">
        <span className="font-semibold">Header Tuỳ Chỉnh Cho Đơn Hàng #4821</span>
      </div>
    ),
    sidebar: {
      content: <nav className="p-2 text-sm">Danh sách điều hướng</nav>,
    },
    children: <div className="p-4">Nội dung chi tiết.</div>,
  },
  play: async () => {
    await expect(body().getByText('Header Tuỳ Chỉnh Cho Đơn Hàng #4821')).toBeInTheDocument();
    expect(body().queryByText('Tiêu đề mặc định (bị thay thế)')).not.toBeInTheDocument();
  },
};

export const SidebarMenuItems: Story = {
  name: 'Sidebar có nhóm mục điều hướng, icon, active, badge, submenu',
  args: {
    open: true,
    title: 'Chi Tiết Đơn Hàng #4821',
    sidebar: {
      sidebarTitle: 'Điều Hướng Đơn Hàng',
      content: (
        <>
          <DetailDialogSidebarGroup>
            <DetailDialogSidebarGroupLabel>Tổng Quan</DetailDialogSidebarGroupLabel>
            <DetailDialogSidebarGroupContent>
              <DetailDialogSidebarMenu>
                <DetailDialogSidebarMenuItem>
                  <DetailDialogSidebarMenuButton isActive tooltip="Thông tin đơn hàng">
                    <LayoutDashboardIcon />
                    <span>Thông tin đơn hàng</span>
                  </DetailDialogSidebarMenuButton>
                </DetailDialogSidebarMenuItem>
                <DetailDialogSidebarMenuItem>
                  <DetailDialogSidebarMenuButton tooltip="Sản phẩm">
                    <PackageIcon />
                    <span>Sản phẩm</span>
                  </DetailDialogSidebarMenuButton>
                  <DetailDialogSidebarMenuBadge>3</DetailDialogSidebarMenuBadge>
                </DetailDialogSidebarMenuItem>
              </DetailDialogSidebarMenu>
            </DetailDialogSidebarGroupContent>
          </DetailDialogSidebarGroup>

          <DetailDialogSidebarSeparator />

          <DetailDialogSidebarGroup>
            <DetailDialogSidebarGroupLabel>Khác</DetailDialogSidebarGroupLabel>
            <DetailDialogSidebarGroupContent>
              <DetailDialogSidebarMenu>
                <DetailDialogSidebarMenuItem>
                  <DetailDialogSidebarMenuButton tooltip="Lịch sử thay đổi">
                    <HistoryIcon />
                    <span>Lịch sử thay đổi</span>
                  </DetailDialogSidebarMenuButton>
                  <DetailDialogSidebarMenuSub>
                    <DetailDialogSidebarMenuSubItem>
                      <DetailDialogSidebarMenuSubButton href="#void">Tạo đơn</DetailDialogSidebarMenuSubButton>
                    </DetailDialogSidebarMenuSubItem>
                    <DetailDialogSidebarMenuSubItem>
                      <DetailDialogSidebarMenuSubButton href="#void" isActive>
                        Xác nhận thanh toán
                      </DetailDialogSidebarMenuSubButton>
                    </DetailDialogSidebarMenuSubItem>
                  </DetailDialogSidebarMenuSub>
                </DetailDialogSidebarMenuItem>
              </DetailDialogSidebarMenu>
            </DetailDialogSidebarGroupContent>
          </DetailDialogSidebarGroup>
        </>
      ),
    },
    children: <div className="p-4">Nội dung chi tiết đơn hàng.</div>,
  },
  play: async () => {
    await expect(body().getByText('Tổng Quan')).toBeInTheDocument();
    await expect(body().getByText('Khác')).toBeInTheDocument();

    const activeButton = document.body.querySelector('[data-slot="sidebar-menu-button"][data-active="true"]');
    await expect(within(activeButton as HTMLElement).getByText('Thông tin đơn hàng')).toBeInTheDocument();

    await expect(body().getByText('3')).toBeInTheDocument();

    const activeSubButton = document.body.querySelector('[data-slot="sidebar-menu-sub-button"][data-active="true"]');
    await expect(within(activeSubButton as HTMLElement).getByText('Xác nhận thanh toán')).toBeInTheDocument();

    const trigger = body().getByRole('button', { name: /toggle sidebar/i });
    await userEvent.click(trigger);

    const sidebar = document.body.querySelector('[data-slot="sidebar"]');
    expect(sidebar).toHaveAttribute('data-state', 'collapsed');

    await userEvent.hover(activeButton as HTMLElement);
    await waitFor(() => {
      const tooltip = document.body.querySelector('[data-slot="tooltip-content"]');
      expect(tooltip).not.toBeNull();
      expect(within(tooltip as HTMLElement).getByText('Thông tin đơn hàng')).toBeInTheDocument();
    });
  },
};
