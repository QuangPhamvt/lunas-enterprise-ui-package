import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import type { InputVariantProps } from '@/components/ui/input.variants';

import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, fn, userEvent, within } from 'storybook/test';

const InputVariant: React.FC<
  React.PropsWithChildren<{
    variant?: InputVariantProps['variant'];
  }>
> = ({ variant }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Input Variants</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-y-4">
          <Input variant={variant} size="xs" placeholder="Extra Small" />
          <Input variant={variant} size="sm" placeholder="Small" />
          <Input variant={variant} size="md" placeholder="Medium" />
          <Input variant={variant} size="lg" placeholder="Large" />
          <Input variant={variant} size="xl" placeholder="Extra Large" />
          <Input variant={variant} size="md" placeholder="With value" aria-invalid value="Invalid" />
          <Input variant={variant} size="md" placeholder="Disabled" disabled />
          <Input variant={variant} size="md" placeholder="Disabled" disabled value="Disabled" />
          <Input variant={variant} size="md" placeholder="Read-only" readOnly value="Read-only" />
        </div>
      </CardContent>
    </Card>
  );
};

const meta = {
  tags: ['autodocs'],
  title: 'Components/Input',
  component: Input,
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: 'Enter text here',
  },
  render: () => {
    return (
      <div className="flex w-full flex-col gap-y-4">
        <InputVariant variant="outline" />
      </div>
    );
  },
};

// ─── Behavior tests (hidden from the sidebar and docs; run by `npm run test:storybook`) ───

const TEST_TAGS = ['!dev', '!autodocs'];

export const TestTyping: Story = {
  tags: TEST_TAGS,
  args: { onChange: fn(), onValueChange: fn() },
  render: args => (
    <div className="grid w-72 gap-2">
      <Input aria-label="both" placeholder="Enter name" onChange={args.onChange} onValueChange={args.onValueChange} />
      <Input aria-label="uncontrolled" defaultValue="" />
      <Input aria-label="controlled" value="hello" readOnly />
      <Input aria-label="disabled" disabled />
      <Input aria-label="invalid" aria-invalid />
    </div>
  ),
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);
    const both = canvas.getByRole('textbox', { name: 'both' });
    await expect(both).toHaveAttribute('data-slot', 'input');
    await expect(canvas.getByPlaceholderText('Enter name')).toBe(both);

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

export const TestVariants: Story = {
  tags: TEST_TAGS,
  render: () => (
    <div className="grid w-72 gap-2">
      {(['outline', 'ghost', 'none', 'soft', 'subtle'] as const).map(variant => (
        <Input key={variant} variant={variant} aria-label={variant} />
      ))}
    </div>
  ),
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getAllByRole('textbox')).toHaveLength(5);
  },
};
