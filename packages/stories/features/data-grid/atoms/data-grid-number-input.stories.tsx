import { DataGridNumberInput } from '@/components/features/data-grid/components/ui/number-input';
import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  tags: ['autodocs'],
  title: 'Features/Data Grid/Atoms/Data Grid Number Input',
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {
  render: () => {
    return (
      <div className="h-24 w-full">
        <DataGridNumberInput />
      </div>
    );
  },
};
