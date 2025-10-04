import { DataList, DataListItem } from '@/components/data-display/data-list';
import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  tags: ['autodocs'],
  title: 'Data Display/Data List',
  component: DataList,
} satisfies Meta<typeof DataList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <DataList title="Product Details">
      <DataListItem label="Name" value="Sample Product" />
      <DataListItem label="Description" value="This is a sample product description." />
      <DataListItem label="Price" value="$19.99" />
      <DataListItem label="Stock" value={100} />
    </DataList>
  ),
};
