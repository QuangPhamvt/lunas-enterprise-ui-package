import { Badge } from '@/components/ui/badge';
import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  tags: ['autodocs'],
  title: 'Components/Badge',
  component: Badge,
} satisfies Meta<typeof Badge>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Badge',
    color: 'primary',
    variant: 'solid',
    pill: true,
    size: 'md',
  },
};

export const Solid: Story = {
  args: { ...Default.args, variant: 'solid', children: 'Solid' },
};

export const Soft: Story = {
  args: { ...Default.args, variant: 'soft', children: 'Soft' },
};

export const Outline: Story = {
  args: { ...Default.args, variant: 'outline', children: 'Outline' },
};

export const Primary: Story = {
  args: { ...Default.args, color: 'primary', children: 'Primary' },
};

export const Secondary: Story = {
  args: { ...Default.args, color: 'secondary', children: 'Secondary' },
};

export const Muted: Story = {
  args: { ...Default.args, color: 'muted', children: 'Muted' },
};

export const Accent: Story = {
  args: { ...Default.args, color: 'accent', children: 'Accent' },
};

export const Info: Story = {
  args: { ...Default.args, color: 'info', children: 'Info' },
};

export const Success: Story = {
  args: { ...Default.args, color: 'success', children: 'Success' },
};

export const Warning: Story = {
  args: { ...Default.args, color: 'warning', children: 'Warning' },
};

export const Danger: Story = {
  args: { ...Default.args, color: 'danger', children: 'Danger' },
};

export const Square: Story = {
  args: { ...Default.args, pill: false, children: 'Square' },
};

export const SizeXs: Story = {
  args: { ...Default.args, size: 'xs', children: 'XS' },
};

export const SizeSm: Story = {
  args: { ...Default.args, size: 'sm', children: 'SM' },
};

export const SizeLg: Story = {
  args: { ...Default.args, size: 'lg', children: 'LG' },
};

export const SizeXl: Story = {
  args: { ...Default.args, size: 'xl', children: 'XL' },
};
