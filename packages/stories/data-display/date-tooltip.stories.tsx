import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, waitFor, within } from 'storybook/test';
import { DateTooltip } from '@/components/data-display/date-tooltip';

const meta = {
  tags: ['autodocs'],
  title: 'Data Display/Date Tooltip',
  component: DateTooltip,
} satisfies Meta<typeof DateTooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

const FIXED_DATE = new Date('2024-03-15T14:30:00Z');

export const Default: Story = {
  args: {
    date: FIXED_DATE,
  },
  render: args => <DateTooltip {...args} />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('15/03/2024')).toBeInTheDocument();
  },
};

export const ShowsFullDateOnHover: Story = {
  args: {
    date: FIXED_DATE,
  },
  render: args => <DateTooltip {...args} />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByText('15/03/2024');
    await userEvent.hover(trigger);
    await waitFor(() => expect(within(canvasElement.ownerDocument.body).getByText('Thứ Sáu, ngày 15 Tháng 03 năm 2024, 21:30:00')).toBeInTheDocument());
  },
};
