import { DataTableHeader } from '@/components/table/data-table-header'
import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  tags: ['autodocs'],
  title: 'Table/Header',
  component: DataTableHeader,
} satisfies Meta<typeof DataTableHeader>

export default meta
type Story = StoryObj<typeof DataTableHeader>

export const Default: Story = {
  args: {
    onAdd: () => console.log('Add new item'),
    onRefresh: () => console.log('Refresh table'),
  },
}
