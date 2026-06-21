'use client';

import { Button } from '@/components/ui/button';
import type { ButtonVariantProps } from '@/components/ui/button.variants';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { CircleIcon } from 'lucide-react';
import { expect, fn, userEvent, within } from 'storybook/test';

const meta = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

// ─── Visual helpers ────────────────────────────────────────────────────────────

const ButtonCard = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <Card>
    <CardHeader>
      <CardTitle>{label}</CardTitle>
    </CardHeader>
    <CardContent>
      <div className="flex flex-col gap-y-4">{children}</div>
    </CardContent>
  </Card>
);

const ButtonBox = ({
  variant,
  color,
  size,
  disabled,
  isLoading,
}: {
  variant?: ButtonVariantProps['variant'];
  color?: ButtonVariantProps['color'];
  size?: ButtonVariantProps['size'];
  disabled?: boolean;
  isLoading?: boolean;
}) => (
  <div className="flex size-40 items-center justify-center rounded-md border border-border">
    <Button variant={variant} color={color} size={size} disabled={disabled} isLoading={isLoading}>
      <CircleIcon />
      <p>Button</p>
    </Button>
  </div>
);

const ButtonRow = ({
  variant,
  color,
  showLoading = true,
}: {
  variant?: ButtonVariantProps['variant'];
  color?: ButtonVariantProps['color'];
  showLoading?: boolean;
}) => (
  <div className="flex flex-wrap gap-4">
    <ButtonBox variant={variant} color={color} size="xs" />
    <ButtonBox variant={variant} color={color} size="sm" />
    <ButtonBox variant={variant} color={color} size="md" />
    <ButtonBox variant={variant} color={color} size="lg" />
    <ButtonBox variant={variant} color={color} size="xl" />
    <ButtonBox variant={variant} color={color} size="xl" disabled />
    {showLoading && <ButtonBox variant={variant} color={color} size="lg" isLoading />}
  </div>
);

// ─── Showcase ─────────────────────────────────────────────────────────────────

export const Default: Story = {
  args: {},
  render: () => (
    <div className="flex size-full flex-col gap-y-6">
      <ButtonCard label="Default">
        <ButtonRow variant="default" color="primary" />
        <ButtonRow variant="default" color="secondary" />
        <ButtonRow variant="default" color="muted" />
        <ButtonRow variant="default" color="success" />
        <ButtonRow variant="default" color="info" />
        <ButtonRow variant="default" color="warning" />
        <ButtonRow variant="default" color="danger" />
      </ButtonCard>
      <ButtonCard label="Outline">
        <ButtonRow variant="outline" color="primary" />
        <ButtonRow variant="outline" color="secondary" />
        <ButtonRow variant="outline" color="muted" />
        <ButtonRow variant="outline" color="success" />
        <ButtonRow variant="outline" color="info" />
        <ButtonRow variant="outline" color="warning" />
        <ButtonRow variant="outline" color="danger" />
      </ButtonCard>
      <ButtonCard label="Soft">
        <ButtonRow variant="soft" color="primary" />
        <ButtonRow variant="soft" color="secondary" />
        <ButtonRow variant="soft" color="muted" />
        <ButtonRow variant="soft" color="success" />
        <ButtonRow variant="soft" color="info" />
        <ButtonRow variant="soft" color="warning" />
        <ButtonRow variant="soft" color="danger" />
      </ButtonCard>
      <ButtonCard label="Subtle">
        <ButtonRow variant="subtle" color="primary" />
        <ButtonRow variant="subtle" color="secondary" />
        <ButtonRow variant="subtle" color="muted" />
        <ButtonRow variant="subtle" color="success" />
        <ButtonRow variant="subtle" color="info" />
        <ButtonRow variant="subtle" color="warning" />
        <ButtonRow variant="subtle" color="danger" />
      </ButtonCard>
      <ButtonCard label="Ghost">
        <ButtonRow variant="ghost" color="primary" />
        <ButtonRow variant="ghost" color="secondary" />
        <ButtonRow variant="ghost" color="muted" />
        <ButtonRow variant="ghost" color="success" />
        <ButtonRow variant="ghost" color="info" />
        <ButtonRow variant="ghost" color="warning" />
        <ButtonRow variant="ghost" color="danger" />
      </ButtonCard>
      <ButtonCard label="Link">
        <ButtonRow variant="link" color="primary" showLoading={false} />
        <ButtonRow variant="link" color="secondary" showLoading={false} />
        <ButtonRow variant="link" color="muted" showLoading={false} />
        <ButtonRow variant="link" color="success" showLoading={false} />
        <ButtonRow variant="link" color="info" showLoading={false} />
        <ButtonRow variant="link" color="warning" showLoading={false} />
        <ButtonRow variant="link" color="danger" showLoading={false} />
      </ButtonCard>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const buttons = canvas.getAllByRole('button');
    await expect(buttons.length).toBeGreaterThan(0);
    for (const btn of buttons) {
      await expect(btn).toBeInTheDocument();
    }
  },
};

// ─── Sizes ────────────────────────────────────────────────────────────────────

export const Sizes: Story = {
  args: {},
  render: () => (
    <div className="flex flex-col gap-y-6">
      <ButtonCard label="Sizes — default variant / primary color">
        <div className="flex flex-wrap items-center gap-4">
          {(['xs', 'sm', 'md', 'lg', 'xl'] as const).map(size => (
            <Button key={size} size={size}>
              {size}
            </Button>
          ))}
        </div>
      </ButtonCard>
      <ButtonCard label="Icon — square icon-only button">
        <div className="flex flex-wrap items-center gap-4">
          {(['default', 'outline', 'soft', 'subtle', 'ghost'] as const).map(variant => (
            <Button key={variant} size="icon" variant={variant} aria-label={`Icon ${variant}`}>
              <CircleIcon />
            </Button>
          ))}
        </div>
      </ButtonCard>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    for (const size of ['xs', 'sm', 'md', 'lg', 'xl']) {
      await expect(canvas.getByRole('button', { name: size })).toBeInTheDocument();
    }
    for (const variant of ['default', 'outline', 'soft', 'subtle', 'ghost']) {
      await expect(canvas.getByRole('button', { name: `Icon ${variant}` })).toBeInTheDocument();
    }
  },
};

// ─── Click ────────────────────────────────────────────────────────────────────

export const Click: Story = {
  args: {
    children: 'Save changes',
    onClick: fn(),
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button', { name: 'Save changes' });

    await expect(button).toBeInTheDocument();
    await expect(button).not.toBeDisabled();

    await userEvent.click(button);
    await expect(args.onClick).toHaveBeenCalledTimes(1);

    await userEvent.click(button);
    await expect(args.onClick).toHaveBeenCalledTimes(2);
  },
};

// ─── Disabled ─────────────────────────────────────────────────────────────────

export const Disabled: Story = {
  args: {
    children: 'Cannot click',
    disabled: true,
    onClick: fn(),
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button', { name: 'Cannot click' });

    await expect(button).toBeDisabled();
    await expect(button).toHaveAttribute('aria-disabled', 'true');

    // userEvent respects disabled — click is silently dropped
    await userEvent.click(button, { pointerEventsCheck: 0 });
    await expect(args.onClick).not.toHaveBeenCalled();
  },
};

// ─── Loading ──────────────────────────────────────────────────────────────────

export const Loading: Story = {
  args: {
    children: 'Submitting',
    isLoading: true,
    onClick: fn(),
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button');

    // Accessibility attributes
    await expect(button).toHaveAttribute('aria-busy', 'true');
    await expect(button).toHaveAttribute('aria-disabled', 'true');
    await expect(button).toHaveAttribute('data-state', 'loading');
    await expect(button).toBeDisabled();

    // Screen-reader loading label from sr-only span
    await expect(canvas.getByText('Loading')).toBeInTheDocument();

    // Children are still in the DOM but visually hidden
    await expect(canvas.getByText('Submitting')).toBeInTheDocument();

    // Click is blocked while loading
    await userEvent.click(button, { pointerEventsCheck: 0 });
    await expect(args.onClick).not.toHaveBeenCalled();
  },
};

// ─── Keyboard navigation ──────────────────────────────────────────────────────

export const KeyboardNavigation: Story = {
  args: {
    children: 'Keyboard target',
    onClick: fn(),
  },
  render: args => (
    <div className="flex flex-col gap-y-2">
      <Button variant="ghost" color="muted">
        Prior focus
      </Button>
      <Button {...args} />
    </div>
  ),
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button', { name: 'Keyboard target' });

    button.focus();
    await expect(button).toHaveFocus();

    // Enter fires onClick
    await userEvent.keyboard('{Enter}');
    await expect(args.onClick).toHaveBeenCalledTimes(1);

    // Space fires onClick
    await userEvent.keyboard(' ');
    await expect(args.onClick).toHaveBeenCalledTimes(2);
  },
};

// ─── AsChild ──────────────────────────────────────────────────────────────────

export const AsChild: Story = {
  args: {
    asChild: true,
    variant: 'outline',
    color: 'primary',
  },
  render: args => (
    <Button {...args}>
      <a href="#section">Go to section</a>
    </Button>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const link = canvas.getByRole('link', { name: 'Go to section' });

    await expect(link).toBeInTheDocument();
    await expect(link).toHaveAttribute('href', '#section');
    // Radix Slot merges data-slot onto the child element
    await expect(link).toHaveAttribute('data-slot', 'button');
  },
};
