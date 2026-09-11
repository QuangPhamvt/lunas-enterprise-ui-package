import { UITableStatusListDisplay } from '@/components/features/tables';

import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, within } from 'storybook/test';

const meta = {
  tags: ['autodocs'],
  title: 'Features/UI Tables/Atoms/Status List Display',
  component: UITableStatusListDisplay,
} satisfies Meta<typeof UITableStatusListDisplay>;

export default meta;

type Story = StoryObj<typeof meta>;

const colorMap = {
  PURCHASING: 'warning',
  PURCHASED: 'success',
  IN_TRANSIT: 'info',
  DELIVERED: 'secondary',
  CANCELLED: 'danger',
} as const;

export const SingleStatus: Story = {
  args: {
    items: [{ value: 'PURCHASED', count: 3 }],
    colorMap,
  },
  render: args => <UITableStatusListDisplay {...args} />,
};

export const MultipleStatuses: Story = {
  args: {
    items: [
      { value: 'PURCHASED', count: 4 },
      { value: 'PURCHASING', count: 1 },
      { value: 'IN_TRANSIT', count: 1 },
    ],
    colorMap,
    maxVisible: 1,
  },
  render: args => <UITableStatusListDisplay {...args} />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.hover(canvas.getByText('+2'));
    const body = within(document.body);
    await expect((await body.findAllByText('Purchasing')).length).toBeGreaterThan(0);
    await expect((await body.findAllByText(/×\s*1/)).length).toBeGreaterThan(0);
  },
};

export const CustomLabel: Story = {
  args: {
    items: [
      { value: 'PURCHASED', count: 2 },
      { value: 'CANCELLED', count: 1 },
    ],
    colorMap,
    maxVisible: 2,
    formatLabel: (v: string) => ({ PURCHASED: 'Đã mua', CANCELLED: 'Đã hủy' })[v] ?? v,
  },
  render: args => <UITableStatusListDisplay {...args} />,
};

export const Empty: Story = {
  args: {
    items: [],
  },
  render: args => <UITableStatusListDisplay {...args} />,
};
