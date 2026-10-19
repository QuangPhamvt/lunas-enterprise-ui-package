import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';

import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, fn, userEvent, within } from 'storybook/test';

const meta = {
  tags: ['autodocs'],
  title: 'Components/Switch',
  component: Switch,
} satisfies Meta<typeof Switch>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div className="flex items-center space-x-2">
      <Switch id="airplane-mode" />
      <Label htmlFor="airplane-mode">Airplane Mode</Label>
    </div>
  ),
};

// ─── Behavior tests (hidden from the sidebar and docs; run by `npm run test:storybook`) ───

const TEST_TAGS = ['!dev', '!autodocs'];

export const TestToggle: Story = {
  tags: TEST_TAGS,
  args: { onCheckedChange: fn() },
  render: args => (
    <div className="flex gap-3">
      <Switch aria-label="off" onCheckedChange={args.onCheckedChange} />
      <Switch aria-label="on" checked onCheckedChange={args.onCheckedChange} />
      <Switch aria-label="disabled" disabled onCheckedChange={args.onCheckedChange} />
    </div>
  ),
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);
    const off = canvas.getByRole('switch', { name: 'off' });
    await expect(off).toHaveAttribute('data-slot', 'switch');
    await userEvent.click(off);
    await expect(args.onCheckedChange).toHaveBeenLastCalledWith(true);
    await userEvent.click(canvas.getByRole('switch', { name: 'on' }));
    await expect(args.onCheckedChange).toHaveBeenLastCalledWith(false);

    const disabled = canvas.getByRole('switch', { name: 'disabled' });
    await expect(disabled).toBeDisabled();
    await userEvent.click(disabled, { pointerEventsCheck: 0 });
    await expect(args.onCheckedChange).toHaveBeenCalledTimes(2);
  },
};
