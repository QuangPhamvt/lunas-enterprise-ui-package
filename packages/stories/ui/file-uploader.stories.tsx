import { FileUploader } from '@/components/ui/file-uploader'
import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  tags: ['autodocs'],
  title: 'Components/FileUploader',
  component: FileUploader,
} satisfies Meta<typeof FileUploader>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    maxFileCount: 10,
    onValueChange: (value) => console.log('onValueChange', value),
  },
}
