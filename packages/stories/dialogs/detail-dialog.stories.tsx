import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, within } from 'storybook/test';
import { DetailDialog } from '@/components/dialogs/detail-dialog';

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
