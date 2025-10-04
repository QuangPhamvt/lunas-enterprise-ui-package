import { PhoneNumberDisplay } from '@/components/data-display/phone-number';
import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  tags: ['autodocs'],
  title: 'Data Display/Phone Number',
  component: PhoneNumberDisplay,
} satisfies Meta<typeof PhoneNumberDisplay>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    value: '1234567890',
  },
};
