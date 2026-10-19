import { Badge } from '@/components/ui/badge';

import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within } from 'storybook/test';

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

// ─── Behavior tests (hidden from the sidebar and docs; run by `npm run test:storybook`) ───

const TEST_TAGS = ['!dev', '!autodocs'];

const BADGE_VARIANTS = ['solid', 'soft', 'outline'] as const;
const BADGE_COLORS = ['primary', 'secondary', 'muted', 'accent', 'info', 'success', 'warning', 'danger'] as const;
const BADGE_SIZES = ['xs', 'sm', 'md', 'lg', 'xl'] as const;

export const TestRendering: Story = {
  tags: TEST_TAGS,
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge>Pill</Badge>
      <Badge pill={false}>Square</Badge>
      {BADGE_VARIANTS.map(variant => (
        <Badge key={variant} variant={variant}>{`v-${variant}`}</Badge>
      ))}
      {BADGE_COLORS.map(color => (
        <Badge key={color} color={color}>{`c-${color}`}</Badge>
      ))}
      {BADGE_SIZES.map(size => (
        <Badge key={size} size={size}>{`s-${size}`}</Badge>
      ))}
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const pill = canvas.getByText('Pill');
    await expect(pill.tagName).toBe('SPAN');
    await expect(pill).toHaveClass('rounded-full');
    await expect(canvas.getByText('Square')).toHaveClass('rounded');
    await expect(canvas.getByText('Square')).not.toHaveClass('rounded-full');
    for (const label of [...BADGE_VARIANTS.map(v => `v-${v}`), ...BADGE_COLORS.map(c => `c-${c}`), ...BADGE_SIZES.map(s => `s-${s}`)]) {
      await expect(canvas.getByText(label)).toBeVisible();
    }
  },
};
