import {
  DataGridSelect,
  DataGridSelectContent,
  DataGridSelectGroup,
  DataGridSelectItem,
  DataGridSelectLabel,
  DataGridSelectTrigger,
  DataGridSelectValue,
} from '@/components/features/data-grid/components/ui/select';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  tags: ['autodocs'],
  title: 'Features/Data Grid/Atoms/Data Grid Select',
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    return (
      <div className="w-full h-10">
        <DataGridSelect>
          <DataGridSelectTrigger>
            <DataGridSelectValue placeholder="Select a fruit" />
          </DataGridSelectTrigger>
          <DataGridSelectContent>
            <DataGridSelectGroup>
              <DataGridSelectLabel>Fruits</DataGridSelectLabel>
              <DataGridSelectItem value="apple">Apple</DataGridSelectItem>
              <DataGridSelectItem value="banana">Banana</DataGridSelectItem>
              <DataGridSelectItem value="blueberry">Blueberry</DataGridSelectItem>
              <DataGridSelectItem value="grapes">Grapes</DataGridSelectItem>
              <DataGridSelectItem value="pineapple">Pineapple</DataGridSelectItem>
            </DataGridSelectGroup>
          </DataGridSelectContent>
        </DataGridSelect>
      </div>
    );
  },
};
