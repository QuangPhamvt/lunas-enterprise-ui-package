import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, waitFor, within } from 'storybook/test';
import { ClampedText } from '@/components/data-display/clamped-text';

const meta = {
  tags: ['autodocs'],
  title: 'Data Display/Clamped Text',
  component: ClampedText,
} satisfies Meta<typeof ClampedText>;

export default meta;
type Story = StoryObj<typeof meta>;

const LONG_TEXT = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.';

export const Break: Story = {
  args: {
    content: LONG_TEXT,
    wrap: 'break',
  },
  render: args => <ClampedText {...args} />,
};

export const Truncate: Story = {
  args: {
    content: 'John Doe',
    wrap: 'truncate',
  },
  render: args => <ClampedText {...args} />,
};

export const Interactive: Story = {
  args: {
    content: LONG_TEXT,
    wrap: 'break',
    interactive: true,
  },
  render: args => <ClampedText {...args} />,
};

export const NoCharCount: Story = {
  args: {
    content: 'Nguyễn Văn An',
    wrap: 'truncate',
    showCharCount: false,
  },
  render: args => <ClampedText {...args} />,
};

export const ShowsTooltipWithCharCount: Story = {
  args: {
    content: LONG_TEXT,
    wrap: 'break',
  },
  render: args => <ClampedText {...args} />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByText(LONG_TEXT);
    await userEvent.hover(trigger);
    await waitFor(() => expect(within(canvasElement.ownerDocument.body).getByText(`${LONG_TEXT.length} chars`)).toBeInTheDocument());
  },
};
