import { useId } from 'react';

import { Label } from '@/components/ui/label';

import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within } from 'storybook/test';

const meta = {
  tags: ['autodocs'],
  title: 'Components/Label',
  component: Label,
} satisfies Meta<typeof Label>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Label',
  },
};

// ─── Behavior tests (hidden from the sidebar and docs; run by `npm run test:storybook`) ───

const TEST_TAGS = ['!dev', '!autodocs'];

export const TestLabelling: Story = {
  tags: TEST_TAGS,
  render: function Render() {
    const id = useId();
    return (
      <div className="grid gap-2">
        <Label htmlFor={id}>Email address</Label>
        <input id={id} type="email" />
      </div>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('Email address')).toHaveAttribute('data-slot', 'label');
    // htmlFor ties the label to the input, giving the input its accessible name.
    await expect(canvas.getByRole('textbox', { name: 'Email address' })).toHaveAttribute('type', 'email');
  },
};
