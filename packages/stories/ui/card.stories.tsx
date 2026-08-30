import { EllipsisVerticalIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, fn, userEvent, within } from 'storybook/test';

const meta = {
  title: 'Components/Card',
  component: Card,
  tags: ['autodocs'],
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

// ─── Default ────────────────────────────────────────────────────────────────

export const Default: Story = {
  args: {},
  render: () => {
    return (
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>
            Login to your account
            <CardAction>
              <Button variant="ghost">Sign Up</Button>
            </CardAction>
          </CardTitle>
          <CardDescription>Enter your email below to login to your account</CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input type="email" placeholder="m@example.com" required />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <a href="#" className="ml-auto inline-block text-sm underline-offset-4 hover:underline">
                    Forgot your password?
                  </a>
                </div>
                <Input type="password" required />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex-col gap-2">
          <Button type="submit" className="w-full">
            Login
          </Button>
          <Button variant="outline" color="muted" className="w-full">
            Login with Google
          </Button>
        </CardFooter>
      </Card>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await expect(canvas.getByText('Login to your account')).toBeInTheDocument();
    await expect(canvas.getByText('Enter your email below to login to your account')).toBeInTheDocument();
    await expect(canvas.getByRole('button', { name: 'Sign Up' })).toBeInTheDocument();
    await expect(canvas.getByPlaceholderText('m@example.com')).toBeInTheDocument();
    await expect(canvas.getByRole('button', { name: 'Login' })).toBeInTheDocument();
    await expect(canvas.getByRole('button', { name: 'Login with Google' })).toBeInTheDocument();
  },
};

// ─── Simple ───────────────────────────────────────────────────────────────────

export const Simple: Story = {
  args: {},
  render: () => (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Plan overview</CardTitle>
        <CardDescription>Your current subscription details.</CardDescription>
      </CardHeader>
      <CardContent>Monthly usage: 42 / 100 requests</CardContent>
    </Card>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await expect(canvas.getByText('Plan overview')).toBeInTheDocument();
    await expect(canvas.getByText('Your current subscription details.')).toBeInTheDocument();
    await expect(canvas.getByText('Monthly usage: 42 / 100 requests')).toBeInTheDocument();
    // No action/footer in this case
    await expect(canvas.queryByRole('button')).not.toBeInTheDocument();
  },
};

// ─── WithAction ─────────────────────────────────────────────────────────────

export const WithAction: Story = {
  args: {},
  render: () => (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>
          Team members
          <CardAction>
            <Button variant="ghost" color="muted" size="icon" aria-label="More options">
              <EllipsisVerticalIcon />
            </Button>
          </CardAction>
        </CardTitle>
        <CardDescription>Manage who has access to this workspace.</CardDescription>
      </CardHeader>
      <CardContent>3 members, 1 pending invite</CardContent>
    </Card>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const action = canvas.getByRole('button', { name: 'More options' });

    await expect(action).toBeInTheDocument();

    await userEvent.click(action);
    await expect(action).toBeInTheDocument();
  },
};

// ─── WithDividers ───────────────────────────────────────────────────────────

export const WithDividers: Story = {
  args: {},
  render: () => (
    <Card className="w-full max-w-sm">
      <CardHeader className="border-b">
        <CardTitle>Danger zone</CardTitle>
        <CardDescription>These actions cannot be undone.</CardDescription>
      </CardHeader>
      <CardContent>Deleting your account removes all associated data permanently.</CardContent>
      <CardFooter className="border-t">
        <Button variant="outline" color="danger">
          Delete account
        </Button>
      </CardFooter>
    </Card>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const header = canvas.getByText('Danger zone').closest('[data-slot="card-header"]');
    const footer = canvas.getByRole('button', { name: 'Delete account' }).closest('[data-slot="card-footer"]');

    await expect(header).toHaveClass('border-b');
    await expect(footer).toHaveClass('border-t');
  },
};

// ─── Interactive ────────────────────────────────────────────────────────────

export const Interactive: Story = {
  args: {
    onClick: fn(),
  },
  render: args => (
    <Card data-interactive="true" tabIndex={0} role="button" className="w-full max-w-sm" onClick={args.onClick}>
      <CardHeader>
        <CardTitle>Upgrade to Pro</CardTitle>
        <CardDescription>Unlock unlimited requests and priority support.</CardDescription>
      </CardHeader>
      <CardContent>Click anywhere on this card to continue.</CardContent>
    </Card>
  ),
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const card = canvas.getByRole('button', { name: /Upgrade to Pro/ });

    await expect(card).toHaveAttribute('data-interactive', 'true');

    card.focus();
    await expect(card).toHaveFocus();

    await userEvent.click(card);
    await expect(args.onClick).toHaveBeenCalledTimes(1);
  },
};

// ─── ContentOnly ────────────────────────────────────────────────────────────

export const ContentOnly: Story = {
  args: {},
  render: () => (
    <Card className="w-full max-w-sm">
      <CardContent>A minimal card with only a content section — no header or footer.</CardContent>
    </Card>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await expect(canvas.getByText('A minimal card with only a content section — no header or footer.')).toBeInTheDocument();
    await expect(canvas.queryByRole('button')).not.toBeInTheDocument();
  },
};

// ─── Showcase ───────────────────────────────────────────────────────────────

export const Showcase: Story = {
  args: {},
  render: () => (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Simple</CardTitle>
          <CardDescription>Title and description only.</CardDescription>
        </CardHeader>
        <CardContent>Monthly usage: 42 / 100 requests</CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>
            With action
            <CardAction>
              <Button variant="ghost" color="muted" size="icon" aria-label="Card options">
                <EllipsisVerticalIcon />
              </Button>
            </CardAction>
          </CardTitle>
          <CardDescription>Header includes a trailing action slot.</CardDescription>
        </CardHeader>
        <CardContent>3 members, 1 pending invite</CardContent>
      </Card>
      <Card>
        <CardHeader className="border-b">
          <CardTitle>With dividers</CardTitle>
          <CardDescription>Header/footer borders add extra spacing.</CardDescription>
        </CardHeader>
        <CardContent>Deleting your account removes all associated data permanently.</CardContent>
        <CardFooter className="border-t">
          <Button variant="outline" color="danger">
            Delete account
          </Button>
        </CardFooter>
      </Card>
      <Card data-interactive="true" tabIndex={0} role="button">
        <CardHeader>
          <CardTitle>Interactive</CardTitle>
          <CardDescription>Hover, focus, and click states enabled.</CardDescription>
        </CardHeader>
        <CardContent>Click anywhere on this card to continue.</CardContent>
      </Card>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await expect(canvas.getByText('Simple')).toBeInTheDocument();
    await expect(canvas.getByText('With action')).toBeInTheDocument();
    await expect(canvas.getByText('With dividers')).toBeInTheDocument();
    await expect(canvas.getByText('Interactive')).toBeInTheDocument();

    const cards = canvasElement.querySelectorAll('[data-slot="card"]');
    await expect(cards.length).toBe(4);
  },
};
