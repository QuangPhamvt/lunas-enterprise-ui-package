import { toast } from 'sonner';

import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from '@/components/ui/button';
import { Toaster } from '@/components/ui/sonner';

const meta = {
  title: 'Components/Toaster',
  component: Toaster,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Toaster>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Fire all toast variants at once to preview every style. */
export const AllVariants: Story = {
  render: () => (
    <>
      <div className="flex flex-wrap gap-2">
        <Button onClick={() => toast('Primary', { description: 'Default brand intent for system messages.' })}>Primary</Button>
        <Button variant="secondary" onClick={() => toast.info('Info', { description: 'Informational context without urgency.' })}>
          Info
        </Button>
        <Button variant="secondary" onClick={() => toast.success('Success', { description: 'An action completed as expected.' })}>
          Success
        </Button>
        <Button variant="secondary" onClick={() => toast.warning('Warning', { description: 'Something needs attention but is not yet broken.' })}>
          Warning
        </Button>
        <Button variant="secondary" onClick={() => toast.error('Danger', { description: 'An operation failed and needs user action.' })}>
          Danger
        </Button>
        <Button variant="secondary" onClick={() => toast.loading('Loading', { description: 'Please wait while we process your request.' })}>
          Loading
        </Button>
      </div>
      <Toaster />
    </>
  ),
};

/** Default toast — no intent, uses primary brand colour. */
export const Default: Story = {
  render: () => (
    <>
      <Button onClick={() => toast('Primary', { description: 'Default brand intent for system messages.' })}>Show Toast</Button>
      <Toaster />
    </>
  ),
};

/** Confirmation that an action succeeded. */
export const Success: Story = {
  render: () => (
    <>
      <Button onClick={() => toast.success('Success', { description: 'An action completed as expected.' })}>Show Toast</Button>
      <Toaster />
    </>
  ),
};

/** Neutral informational message. */
export const Info: Story = {
  render: () => (
    <>
      <Button onClick={() => toast.info('Info', { description: 'Informational context without urgency.' })}>Show Toast</Button>
      <Toaster />
    </>
  ),
};

/** Non-blocking caution — action may be needed. */
export const Warning: Story = {
  render: () => (
    <>
      <Button onClick={() => toast.warning('Warning', { description: 'Something needs attention but is not yet broken.' })}>Show Toast</Button>
      <Toaster />
    </>
  ),
};

/** Destructive error requiring user action. */
export const Error: Story = {
  render: () => (
    <>
      <Button onClick={() => toast.error('Danger', { description: 'An operation failed and needs user action.' })}>Show Toast</Button>
      <Toaster />
    </>
  ),
};

/** Spinner while an async operation is in progress. */
export const Loading: Story = {
  render: () => (
    <>
      <Button onClick={() => toast.loading('Loading', { description: 'Please wait while we process your request.' })}>Show Toast</Button>
      <Toaster />
    </>
  ),
};

/** Promise-based toast — auto-transitions from loading → success or error. */
export const Promise: Story = {
  render: () => (
    <>
      <Button
        onClick={() =>
          toast.promise(new globalThis.Promise(resolve => setTimeout(resolve, 2000)), {
            loading: 'Saving changes…',
            success: 'Changes saved successfully!',
            error: 'Failed to save changes.',
          })
        }
      >
        Show Promise Toast
      </Button>
      <Toaster />
    </>
  ),
};

/** Toast without a description — title only. */
export const TitleOnly: Story = {
  render: () => (
    <>
      <div className="flex gap-2">
        <Button onClick={() => toast.success('Saved!')}>Success</Button>
        <Button variant="secondary" onClick={() => toast.error('Something went wrong.')}>
          Error
        </Button>
        <Button variant="secondary" onClick={() => toast.info('New update available.')}>
          Info
        </Button>
      </div>
      <Toaster />
    </>
  ),
};
