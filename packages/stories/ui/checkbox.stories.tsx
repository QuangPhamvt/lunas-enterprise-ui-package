import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, fn, userEvent, within } from 'storybook/test';

const meta = {
  title: 'Components/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
  render: () => {
    return (
      <div className="flex flex-col gap-6">
        <div className="flex items-center gap-3">
          <Checkbox id="terms" />
          <Label htmlFor="terms">Accept terms and conditions</Label>
        </div>
        <div className="flex items-start gap-3">
          <Checkbox id="terms-2" defaultChecked />
          <div className="grid gap-2">
            <Label htmlFor="terms-2">Accept terms and conditions</Label>
            <p className="text-muted-foreground text-sm">By clicking this checkbox, you agree to the terms and conditions.</p>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <Checkbox id="toggle" disabled />
          <Label htmlFor="toggle">Enable notifications</Label>
        </div>
        <Label className="hover:bg-accent/50 flex items-start gap-3 rounded-lg border p-3 has-[[aria-checked=true]]:border-blue-600 has-[[aria-checked=true]]:bg-blue-50 dark:has-[[aria-checked=true]]:border-blue-900 dark:has-[[aria-checked=true]]:bg-blue-950">
          <Checkbox
            id="toggle-2"
            defaultChecked
            className="data-[state=checked]:border-blue-600 data-[state=checked]:bg-blue-600 data-[state=checked]:text-white dark:data-[state=checked]:border-blue-700 dark:data-[state=checked]:bg-blue-700"
          />
          <div className="grid gap-1.5 font-normal">
            <p className="text-sm leading-none font-medium">Enable notifications</p>
            <p className="text-muted-foreground text-sm">You can enable or disable notifications at any time.</p>
          </div>
        </Label>
      </div>
    );
  },
};

// ─── Behavior tests (hidden from the sidebar and docs; run by `npm run test:storybook`) ───

const TEST_TAGS = ['!dev', '!autodocs'];

export const TestCheckedChange: Story = {
  tags: TEST_TAGS,
  args: { onCheckedChange: fn() },
  render: args => (
    <div className="flex gap-3">
      <Checkbox aria-label="unchecked" onCheckedChange={args.onCheckedChange} />
      <Checkbox aria-label="checked" checked onCheckedChange={args.onCheckedChange} />
      <Checkbox aria-label="disabled" disabled onCheckedChange={args.onCheckedChange} />
      <Checkbox aria-label="invalid" aria-invalid />
    </div>
  ),
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);
    const unchecked = canvas.getByRole('checkbox', { name: 'unchecked' });
    await expect(unchecked).toHaveAttribute('data-slot', 'checkbox');

    await userEvent.click(unchecked);
    await expect(args.onCheckedChange).toHaveBeenLastCalledWith(true);
    await userEvent.click(canvas.getByRole('checkbox', { name: 'checked' }));
    await expect(args.onCheckedChange).toHaveBeenLastCalledWith(false);

    const disabled = canvas.getByRole('checkbox', { name: 'disabled' });
    await expect(disabled).toBeDisabled();
    await userEvent.click(disabled, { pointerEventsCheck: 0 });
    await expect(args.onCheckedChange).toHaveBeenCalledTimes(2);

    await expect(canvas.getByRole('checkbox', { name: 'invalid' })).toHaveAttribute('aria-invalid', 'true');
  },
};
