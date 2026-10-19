import { CheckCircle2Icon, PopcornIcon } from 'lucide-react';

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, fn, userEvent, within } from 'storybook/test';

const meta = {
  title: 'Components/Alert',
  component: Alert,
  tags: ['autodocs'],
} satisfies Meta<typeof Alert>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
  render: () => {
    return (
      <div className="grid w-full max-w-xl items-start gap-4">
        <Alert variant="default">
          <CheckCircle2Icon />
          <AlertTitle>Success! Your changes have been saved</AlertTitle>
          <AlertDescription>This is an alert with icon, title and description.</AlertDescription>
        </Alert>
        <Alert variant="default">
          <PopcornIcon />
          <AlertTitle>This Alert has a title and an icon. No description.</AlertTitle>
        </Alert>
        <Alert variant="destructive">
          <AlertTitle>Unable to process your payment.</AlertTitle>
          <AlertDescription>
            <p>Please verify your billing information and try again.</p>
            <ul className="list-inside list-disc text-sm">
              <li>Check your card details</li>
              <li>Ensure sufficient funds</li>
              <li>Verify billing address</li>
            </ul>
          </AlertDescription>
        </Alert>
      </div>
    );
  },
};

export const TitleOnly: Story = {
  args: {
    variant: 'default',
  },
  render: args => {
    return (
      <div className="grid w-full max-w-xl items-start gap-4">
        <Alert {...args}>
          <CheckCircle2Icon />
          <AlertTitle>Success! Your changes have been saved</AlertTitle>
        </Alert>
        <Alert {...args}>
          <PopcornIcon />
          <AlertTitle>This Alert has a title and an icon. No description.</AlertTitle>
        </Alert>
      </div>
    );
  },
};

// ─── Behavior tests (hidden from the sidebar and docs; run by `npm run test:storybook`) ───

const TEST_TAGS = ['!dev', '!autodocs'];
const VARIANTS_WITH_ICON = ['destructive', 'warning', 'success', 'info'] as const;

export const TestStructure: Story = {
  tags: TEST_TAGS,
  render: () => (
    <Alert variant="success">
      <AlertTitle>Operation failed</AlertTitle>
      <AlertDescription>Something went wrong.</AlertDescription>
    </Alert>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const alert = canvas.getByRole('alert');
    await expect(alert).toHaveAttribute('data-slot', 'alert');
    await expect(alert).toHaveAttribute('data-variant', 'success');
    await expect(canvas.getByText('Operation failed')).toHaveAttribute('data-slot', 'alert-title');
    await expect(canvas.getByText('Something went wrong.')).toHaveAttribute('data-slot', 'alert-description');
  },
};

export const TestDefaultIcons: Story = {
  tags: TEST_TAGS,
  render: () => (
    <div className="grid gap-2">
      <Alert data-testid="neutral">Neutral</Alert>
      {VARIANTS_WITH_ICON.map(variant => (
        <Alert key={variant} variant={variant} data-testid={variant}>
          {variant}
        </Alert>
      ))}
      <Alert variant="info" data-testid="custom" icon={<span data-testid="custom-icon" />}>
        Custom icon
      </Alert>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    // The neutral variant has no implied icon; every semantic variant gets one.
    await expect(canvas.getByTestId('neutral').querySelector('svg')).toBeNull();
    for (const variant of VARIANTS_WITH_ICON) {
      await expect(canvas.getByTestId(variant).querySelector('svg')).not.toBeNull();
    }
    // A custom icon replaces the default one.
    await expect(canvas.getByTestId('custom-icon')).toBeInTheDocument();
    await expect(canvas.getByTestId('custom').querySelector('svg')).toBeNull();
  },
};

export const TestDismissible: Story = {
  tags: TEST_TAGS,
  args: { onDismiss: fn() },
  render: args => (
    <div className="grid gap-2">
      <Alert variant="info" dismissible onDismiss={args.onDismiss}>
        Dismissible
      </Alert>
      <Alert variant="info">Not dismissible</Alert>
    </div>
  ),
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);
    const buttons = canvas.getAllByRole('button', { name: 'Đóng thông báo' });
    await expect(buttons).toHaveLength(1);
    await userEvent.click(buttons[0]);
    await expect(args.onDismiss).toHaveBeenCalledTimes(1);
  },
};

export const TestLayout: Story = {
  tags: TEST_TAGS,
  render: () => (
    <div className="grid w-xl gap-2">
      <Alert data-testid="plain">Plain text without an icon</Alert>
      <Alert data-testid="titled">
        <AlertTitle>No icon, with a title</AlertTitle>
        <AlertDescription>And a description.</AlertDescription>
      </Alert>
      <Alert variant="info" data-testid="with-icon">
        <AlertTitle>With icon</AlertTitle>
        <AlertDescription>Content sits in the second column.</AlertDescription>
      </Alert>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    // Without an icon the content spans the full width: a short sentence stays on one line.
    await expect(canvas.getByTestId('plain').getBoundingClientRect().height).toBeLessThan(60);
    const titled = canvas.getByText('No icon, with a title');
    await expect(titled.getBoundingClientRect().left - canvas.getByTestId('titled').getBoundingClientRect().left).toBeLessThan(24);
    // With an icon, title and description start to the right of it.
    const icon = canvas.getByTestId('with-icon').querySelector('svg');
    if (!icon) throw new Error('icon missing');
    await expect(canvas.getByText('With icon').getBoundingClientRect().left).toBeGreaterThan(icon.getBoundingClientRect().right);
    await expect(canvas.getByText('Content sits in the second column.').getBoundingClientRect().left).toBeGreaterThan(icon.getBoundingClientRect().right);
  },
};
