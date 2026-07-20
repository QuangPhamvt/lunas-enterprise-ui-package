import { LayoutDashboardIcon, PackageIcon, SettingsIcon, UsersIcon } from 'lucide-react';

import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, within } from 'storybook/test';
import { CMSLayout } from '@/components/layouts/cms-layout';

const meta = {
  tags: ['autodocs'],
  title: 'Layouts/CMS Layout',
  component: CMSLayout,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof CMSLayout>;

export default meta;
type Story = StoryObj<typeof meta>;

const sidebar = {
  groupcontent: [
    {
      id: 'main',
      label: 'Main',
      items: [
        { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboardIcon /> },
        { id: 'posts', label: 'Posts', icon: <PackageIcon /> },
        { id: 'users', label: 'Users', icon: <UsersIcon /> },
      ],
    },
    {
      id: 'system',
      label: 'System',
      items: [{ id: 'settings', label: 'Settings', icon: <SettingsIcon /> }],
    },
  ],
};

/** Full header: avatar, name, email, i18n switcher, logout. */
export const WithUser: Story = {
  args: {
    i18nText: 'En',
    activeNavItemId: 'posts',
    sidebar,
    onChangeToEnLocale: () => console.log('EN'),
    onChangeToViLocale: () => console.log('VI'),
    onLogout: () => console.log('Logout'),
    user: {
      name: 'Nguyễn Văn An',
      email: 'an@lunas.vn',
      role: 'Administrator',
    },
  },
  render: args => (
    <CMSLayout {...args}>
      <div className="p-6 text-sm text-muted-foreground">Main content goes here</div>
    </CMSLayout>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const wrapper = canvasElement.querySelector<HTMLElement>('[data-slot="layout-wrapper"]');
    expect(wrapper).not.toBeNull();
    const wrapperStyle = getComputedStyle(wrapper as HTMLElement);
    expect(wrapperStyle.display).toBe('grid');
    expect(wrapperStyle.gridTemplateRows).toMatch(/^\S+ \S+$/);
    expect(wrapperStyle.minWidth).toBe('1056px');
    expect(wrapperStyle.minHeight).toBe('640px');

    const scrollContainer = canvasElement.querySelector<HTMLElement>('[data-slot="layout-scroll-container"]');
    expect(scrollContainer).not.toBeNull();
    expect(getComputedStyle(scrollContainer as HTMLElement).overflow).toBe('auto');

    const header = canvasElement.querySelector<HTMLElement>('[data-slot="cms-layout-header"]');
    expect(getComputedStyle(header as HTMLElement).gridRowStart).toBe('1');
    expect(getComputedStyle(header as HTMLElement).gridColumnEnd).toBe('span 2');

    const sidebar = canvasElement.querySelector<HTMLElement>('[data-slot="sidebar"]');
    expect(getComputedStyle(sidebar as HTMLElement).gridColumnStart).toBe('1');
    expect(getComputedStyle(sidebar as HTMLElement).gridRowStart).toBe('2');
    expect(sidebar).toHaveAttribute('data-state', 'expanded');

    // Regression guard: the sidebar's absolutely-positioned visible box must be contained by
    // its own grid item (position: relative), not escape to the full-height wrapper and get
    // tucked underneath the header.
    expect(getComputedStyle(sidebar as HTMLElement).position).toBe('relative');
    const sidebarContainer = canvasElement.querySelector<HTMLElement>('[data-slot="sidebar-container"]');
    expect(getComputedStyle(sidebarContainer as HTMLElement).position).toBe('absolute');
    const headerBottom = (header as HTMLElement).getBoundingClientRect().bottom;
    const sidebarContainerTop = (sidebarContainer as HTMLElement).getBoundingClientRect().top;
    expect(sidebarContainerTop).toBeGreaterThanOrEqual(headerBottom);

    const main = canvasElement.querySelector<HTMLElement>('[data-slot="sidebar-inset"]');
    expect(getComputedStyle(main as HTMLElement).gridColumnStart).toBe('2');
    expect(getComputedStyle(main as HTMLElement).gridRowStart).toBe('2');

    const trigger = canvas.getByRole('button', { name: /toggle sidebar/i });
    await userEvent.click(trigger);
    expect(sidebar).toHaveAttribute('data-state', 'collapsed');

    await userEvent.click(trigger);
    expect(sidebar).toHaveAttribute('data-state', 'expanded');
  },
};

/** Header with a custom avatar image URL. */
export const WithAvatar: Story = {
  args: {
    activeNavItemId: 'dashboard',
    sidebar,
    onLogout: () => console.log('Logout'),
    user: {
      name: 'Trần Thị Bình',
      email: 'binh@lunas.vn',
      role: 'Editor',
      avatarUrl: 'https://api.dicebear.com/9.x/avataaars/svg?seed=binh',
    },
  },
  render: args => (
    <CMSLayout {...args}>
      <div className="p-6 text-sm text-muted-foreground">Main content goes here</div>
    </CMSLayout>
  ),
};

/** No user — header only shows brand and i18n switcher. */
export const NoUser: Story = {
  args: {
    i18nText: 'Vi',
    activeNavItemId: 'settings',
    sidebar,
    onChangeToEnLocale: () => console.log('EN'),
    onChangeToViLocale: () => console.log('VI'),
    onLogout: () => console.log('Logout'),
  },
  render: args => (
    <CMSLayout {...args}>
      <div className="p-6 text-sm text-muted-foreground">Main content goes here</div>
    </CMSLayout>
  ),
};

/** User with name only — no email, no role. */
export const UserNameOnly: Story = {
  args: {
    activeNavItemId: 'dashboard',
    sidebar,
    onLogout: () => console.log('Logout'),
    user: { name: 'Admin' },
  },
  render: args => (
    <CMSLayout {...args}>
      <div className="p-6 text-sm text-muted-foreground">Main content goes here</div>
    </CMSLayout>
  ),
};

/** Default export (backwards-compat alias). */
export const Default: Story = {
  args: {
    i18nText: 'En',
    activeNavItemId: 'posts',
    sidebar: {
      groupcontent: [
        {
          id: '1',
          label: 'Content',
          items: [
            { id: 'dashboard', label: 'Dashboard', icon: <PackageIcon /> },
            { id: 'posts', label: 'Posts', icon: <PackageIcon /> },
          ],
        },
      ],
    },
    onChangeToEnLocale: () => console.log('Change to English locale'),
    onChangeToViLocale: () => console.log('Change to Vietnamese locale'),
    onLogout: () => console.log('Logout'),
    user: {
      name: 'Nguyễn Văn An',
      email: 'an@lunas.vn',
      role: 'Administrator',
    },
  },
  render: args => <CMSLayout {...args}>{/*<div className="h-300">Main content goes here</div>*/}</CMSLayout>,
};
