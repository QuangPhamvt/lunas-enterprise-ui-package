import { Textarea } from '@/components/ui/textarea';

import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, fn, userEvent, within } from 'storybook/test';

const meta = {
  tags: ['autodocs'],
  title: 'Components/Textarea',
  component: Textarea,
} satisfies Meta<typeof Textarea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <Textarea className="w-100" placeholder="Type your message here." rows={5} />,
};

export const Error: Story = {
  render: () => <Textarea aria-invalid placeholder="Type your message here." rows={5} />,
};

// ─── Behavior tests (hidden from the sidebar and docs; run by `npm run test:storybook`) ───

const TEST_TAGS = ['!dev', '!autodocs'];

export const TestTyping: Story = {
  tags: TEST_TAGS,
  args: { onChange: fn(), onValueChange: fn() },
  render: args => (
    <div className="grid w-72 gap-2">
      <Textarea aria-label="both" placeholder="Write a description…" onChange={args.onChange} onValueChange={args.onValueChange} />
      <Textarea aria-label="uncontrolled" defaultValue="" />
      <Textarea aria-label="controlled" value="hello" readOnly />
      <Textarea aria-label="disabled" disabled />
      <Textarea aria-label="invalid" aria-invalid />
    </div>
  ),
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);
    const both = canvas.getByRole('textbox', { name: 'both' });
    await expect(both).toHaveAttribute('data-slot', 'textarea');
    await expect(canvas.getByPlaceholderText('Write a description…')).toBe(both);

    await userEvent.type(both, 'hi');
    // onChange still receives the native event; onValueChange gets the plain string.
    await expect(args.onChange).toHaveBeenCalledTimes(2);
    await expect(args.onValueChange).toHaveBeenNthCalledWith(1, 'h');
    await expect(args.onValueChange).toHaveBeenNthCalledWith(2, 'hi');

    const uncontrolled = canvas.getByRole('textbox', { name: 'uncontrolled' });
    await userEvent.type(uncontrolled, 'hello');
    await expect(uncontrolled).toHaveValue('hello');

    await expect(canvas.getByRole('textbox', { name: 'controlled' })).toHaveValue('hello');
    await expect(canvas.getByRole('textbox', { name: 'disabled' })).toBeDisabled();
    await expect(canvas.getByRole('textbox', { name: 'invalid' })).toHaveAttribute('aria-invalid', 'true');
  },
};
