import { MultipleSelector } from '@/components/ui/multi-select';
import type { Meta, StoryObj } from '@storybook/react-vite';

const meta: Meta<typeof MultipleSelector> = {
  title: 'Components/MultiSelect',
  component: MultipleSelector,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    options: [
      { label: 'Option 1', value: 'option1' },
      { label: 'Option 2', value: 'option2' },
      { label: 'Option 3', value: 'option3' },
    ],
    placeholder: 'Select options',
    className: 'w-64',
    onChange: selectedOptions => {
      console.log('Selected options:', selectedOptions);
    },
    onAddNewItem: () => {
      console.log('New item added:');
    },
  },
};
