import { UITableDescriptionDisplay } from '@/components/features/tables';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  tags: ['autodocs'],
  title: 'UI Tables/Atoms/Description Display',
  component: UITableDescriptionDisplay,
} satisfies Meta<typeof UITableDescriptionDisplay>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    content:
      '✦ Kích thước sản phẩm: Xấp xỉ 5x6cm\n✦ Chất liệu: Hợp kim kẽm\n✦ Đóng gói: Bìa lót + túi OPP\n✦ Mô tả: Huy hiệu kim loại của series Honkai Star Rail, Ver. Phòng tiếp tân của Owlbert. Được cán UV và men giả.',
  },
  render: args => <UITableDescriptionDisplay {...args} />,
};

export const Empty: Story = {
  args: {
    content: null,
  },
  render: args => <UITableDescriptionDisplay {...args} />,
};
