import { LayoutDashboardIcon, PackageIcon, SettingsIcon, UsersIcon } from 'lucide-react';

import type { Meta, StoryObj } from '@storybook/react-vite';
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
