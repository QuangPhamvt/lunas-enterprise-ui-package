import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within } from 'storybook/test';
import { DateDisplay } from '@/components/data-display/date';

const meta = {
  tags: ['autodocs'],
  title: 'Data Display/Date',
  component: DateDisplay,
} satisfies Meta<typeof DateDisplay>;

export default meta;
type Story = StoryObj<typeof meta>;

const FIXED_DATE = new Date('2024-03-15T14:30:00Z');

export const Short: Story = {
  args: {
    date: FIXED_DATE,
    format: 'short',
  },
  render: args => <DateDisplay {...args} />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('15/03/24')).toBeInTheDocument();
  },
};

export const Medium: Story = {
  args: {
    date: FIXED_DATE,
    format: 'medium',
  },
  render: args => <DateDisplay {...args} />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('15/03/2024')).toBeInTheDocument();
  },
};

export const Long: Story = {
  args: {
    date: FIXED_DATE,
    format: 'long',
  },
  render: args => <DateDisplay {...args} />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('15 Tháng 03 2024')).toBeInTheDocument();
  },
};

export const Full: Story = {
  args: {
    date: FIXED_DATE,
    format: 'full',
  },
  render: args => <DateDisplay {...args} />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('Thứ Sáu, ngày 15 Tháng 03 năm 2024')).toBeInTheDocument();
  },
};

export const Relative: Story = {
  args: {
    date: new Date(Date.now() - 2 * 60 * 60 * 1000),
    format: 'relative',
  },
  render: args => <DateDisplay {...args} />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('2 giờ trước')).toBeInTheDocument();
  },
};

export const DateTime: Story = {
  args: {
    date: FIXED_DATE,
    format: 'datetime',
  },
  render: args => <DateDisplay {...args} />,
};

export const TimeOnly: Story = {
  args: {
    date: FIXED_DATE,
    format: 'time',
  },
  render: args => <DateDisplay {...args} />,
};

export const Smart: Story = {
  args: {
    date: new Date(),
    format: 'smart',
  },
  render: args => <DateDisplay {...args} />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('Hôm nay')).toBeInTheDocument();
  },
};

export const WithHoliday: Story = {
  args: {
    date: new Date('2024-01-01T00:00:00Z'),
    format: 'medium',
    showHoliday: true,
  },
  render: args => <DateDisplay {...args} />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('01/01/2024 (Tết Dương lịch)')).toBeInTheDocument();
  },
};

export const InvalidDate: Story = {
  args: {
    date: 'not-a-date',
    format: 'medium',
  },
  render: args => <DateDisplay {...args} />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('--/--/----')).toBeInTheDocument();
  },
};
