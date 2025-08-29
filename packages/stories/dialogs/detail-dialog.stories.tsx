import type { Meta, StoryObj } from '@storybook/react-vite'
import { DetailDialog } from '@/components/dialogs/detail-dialog'

const meta = {
  tags: ['autodocs'],
  title: 'Dialogs/DetailDialog',
  component: DetailDialog,
} satisfies Meta<typeof DetailDialog>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    open: true,
    isLoading: false,
    sidebar: (
      <div className="p-4">
        <h2 className="text-lg font-semibold">Sidebar Content</h2>
        <p>This is some content in the sidebar.</p>
      </div>
    ),
    title: 'Detail Dialog Title',
    sidebarTitle: 'Sidebar Title',
    createdAt: new Date(),
    onOpenChange: (open: boolean) => console.log('Dialog open state changed:', open),
    children: (
      <>
        <p className="p-4">This is the content of the detail dialog.</p>
        <p className="p-4">You can add more content here as needed.</p>
      </>
    ),
  },
}
