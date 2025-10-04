import { NameDisplay } from '@/components/data-display/name';
import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  tags: ['autodocs'],
  title: 'Data Display/Name Display',
  component: NameDisplay,
} satisfies Meta<typeof NameDisplay>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    name: 'John Doe',
  },
  render: args => <NameDisplay {...args} />,
};

export const LongName: Story = {
  args: {
    name: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  },
  render: args => <NameDisplay {...args} />,
};
